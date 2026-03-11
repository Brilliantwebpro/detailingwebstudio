## Demo Request Email Notifications Setup

Email notifications are triggered in `POST /api/leads/demo`.

### 1) Configure SMTP in `server/.env`

Use real SMTP credentials (not placeholders):

```env
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-real-smtp-username
SMTP_PASS=your-real-smtp-password
SMTP_SECURE=false
SMTP_REQUIRE_TLS=true
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=Detailing Web Studio
LEAD_NOTIFY_EMAIL=you@yourdomain.com
CALENDLY_URL=https://calendly.com/detailingwebstudio360/30min
```

Notes:
- For port `465`, set `SMTP_SECURE=true`.
- For port `587`, keep `SMTP_SECURE=false` and `SMTP_REQUIRE_TLS=true`.

### 2) Restart backend

```bash
cd server
npm run dev
```

### 3) Verify configuration

Check:

`GET http://localhost:5000/api/health`

`emailConfigured: true` means SMTP values are present and not placeholders.

### 4) Test submission

Submit the request demo form on `/contact`.

Expected:
- Admin receives "New Demo Lead" notification.
- Lead receives confirmation email.

