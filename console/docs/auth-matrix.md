# Console staff auth matrix

Order: **password → email code → authenticator (TOTP)**.

| # | Step | Input | Expected |
|---|------|-------|----------|
| A1 | start-signin | Unknown email + any password | `401` Wrong email or password |
| A2 | start-signin | Staff email + password &lt; 8 chars | `400` Enter your console password… |
| A3 | start-signin | Staff email + wrong password | `401` Wrong email or password |
| A4 | start-signin | Staff email + correct password | `200` `next: otp` + email sent |
| B1 | verify-otp | Wrong 8-digit code | `401` That email code is wrong… |
| B2 | verify-otp | Expired / missing challenge | `401` Session expired… / wrong or expired |
| B3 | verify-otp | Correct code, TOTP already enrolled | `200` `next: totp` |
| B4 | verify-otp | Correct code, first time / not enrolled | `200` `next: enroll-totp` + QR secret |
| B5 | resend-otp | Valid mid-flow challenge | `200` new code emailed |
| C1 | verify-totp | Wrong 6-digit code | `401` That authenticator code is wrong… |
| C2 | verify-totp | Correct code | `200` `session` tokens |
| C3 | confirm-enroll | Wrong code | `401` wrong authenticator code |
| C4 | confirm-enroll | Correct code | `200` `session` + `enrolled: true` |
| D1 | Enter key mid-flow | No submitter | Stays on current step (client) |
| D2 | Start over | Mid-flow | Cancels challenge, back to email+password |
| D3 | Keep signed in | Checked after success | Session restored on reload |
| D4 | Keep signed in | Unchecked | Tab-only session |

Client also shows red error / green ok notes for each failure and success message.
