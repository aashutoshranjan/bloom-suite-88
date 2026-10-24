# Project decisions

- UPI ID on /payment is resolved server-side (getUpiId server fn: `process.env.UPI_ID || company.upiId`) so the owner can change it daily on their own VPS via the `UPI_ID` environment variable without a rebuild; the default lives in `src/lib/company.ts`.
- Payment page changes are additive only — never modify or remove existing payment layout, form fields, styling, or gateway logic (user requirement).
- Site self-hosts on a Node VPS (node-server Nitro preset, port 3005, PM2/Nginx); central company branding lives in `src/lib/company.ts`.
