// Server-only helper: appends internship application rows to the owner's
// Google Sheet with a service-account credential. Credentials are read from
// the host environment only (env var or credentials file on disk) — never
// bundled into the browser. The .server.ts suffix keeps this file out of
// client bundles.

import crypto from "node:crypto";
import { readFileSync } from "node:fs";
import process from "node:process";
import { company } from "@/lib/company";

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_API = "https://sheets.googleapis.com/v4";

interface ServiceAccount {
  client_email: string;
  private_key: string;
}

let cachedToken: { value: string; expiresAtMs: number } | null = null;

function b64urlJson(value: unknown): string {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function getSheetsTarget(): { spreadsheetId: string; range: string } {
  const spreadsheetId =
    process.env["GOOGLE_SHEETS_SPREADSHEET_ID"] || company.googleSheetsSpreadsheetId;
  const range = process.env["GOOGLE_SHEETS_RANGE"] || "Sheet1!A1";
  if (!spreadsheetId) {
    throw new Error(
      "Google Sheets spreadsheet ID is not configured (set GOOGLE_SHEETS_SPREADSHEET_ID or company.googleSheetsSpreadsheetId)",
    );
  }
  return { spreadsheetId, range };
}

function loadServiceAccount(): ServiceAccount {
  const inline = process.env["GOOGLE_SERVICE_ACCOUNT_JSON"];
  if (inline) {
    const parsed = JSON.parse(inline) as ServiceAccount;
    if (!parsed.client_email || !parsed.private_key) {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is missing client_email or private_key");
    }
    return parsed;
  }

  const filePath =
    process.env["GOOGLE_SERVICE_ACCOUNT_FILE"] || "/root/email_automation/credentials.json";
  let raw: string;
  try {
    raw = readFileSync(filePath, "utf8");
  } catch {
    throw new Error(`Google Sheets credentials file not found at ${filePath}`);
  }
  const parsed = JSON.parse(raw) as ServiceAccount;
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error(`Credentials file at ${filePath} is missing client_email or private_key`);
  }
  return parsed;
}

async function getAccessToken(account: ServiceAccount): Promise<string> {
  const nowMs = Date.now();
  if (cachedToken && cachedToken.expiresAtMs - 60_000 > nowMs) return cachedToken.value;

  const nowSec = Math.floor(nowMs / 1000);
  const header = b64urlJson({ alg: "RS256", typ: "JWT" });
  const claims = b64urlJson({
    iss: account.client_email,
    scope: SHEETS_SCOPE,
    aud: TOKEN_URL,
    iat: nowSec,
    exp: nowSec + 3600,
  });
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const signature = signer.sign(account.private_key, "base64url");
  const assertion = `${header}.${claims}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Google token exchange failed [${res.status}]: ${body}`);
  }
  const token = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!token.access_token) throw new Error("Google token exchange returned no access token");
  cachedToken = { value: token.access_token, expiresAtMs: nowMs + (token.expires_in ?? 3600) * 1000 };
  return token.access_token;
}

/**
 * Appends one row to the owner's Google Sheet.
 * Column order (must match the sheet headers): Name, Email, Position, Location, Date.
 * Throws on any failure — callers must treat a resolved promise as "row written".
 */
export async function appendInternshipRow(
  row: readonly [string, string, string, string, string],
): Promise<void> {
  const { spreadsheetId, range } = getSheetsTarget();
  const account = loadServiceAccount();
  const accessToken = await getAccessToken(account);

  // The A1 range contains a colon — it is valid in the URL path, never encode it.
  const url = `${SHEETS_API}/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [row] }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Google Sheets append failed [${res.status}]: ${body}`);
    throw new Error(`Google Sheets append failed [${res.status}]`);
  }
}
