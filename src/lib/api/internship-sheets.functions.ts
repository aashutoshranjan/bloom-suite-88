// Server function that appends one internship application to the owner's
// Google Sheet. Invoked from the /internship form; the row is written before
// the candidate is redirected to /payment.

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { appendInternshipRow } from "./google-sheets.server";

// Same five fields collected on /internship, in the exact column order
// written to the sheet: Name, Email, Position, Location, Date.
const applicationSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  position: z.string().trim().min(2).max(100),
  location: z.string().trim().min(2).max(120),
  start_date: z.string().min(1),
});

export const appendInternshipToGoogleSheet = createServerFn({ method: "POST" })
  .inputValidator((data) => applicationSchema.parse(data))
  .handler(async ({ data }) => {
    await appendInternshipRow([
      data.full_name,
      data.email,
      data.position,
      data.location,
      data.start_date,
    ]);
    return { ok: true as const };
  });
