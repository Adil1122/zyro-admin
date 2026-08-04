import nodemailer from 'nodemailer';

export async function sendOtpEmail(to: string, otp: string): Promise<void> {
  // Dev fallback: log to console when SMTP is not configured
  if (!process.env.SMTP_HOST) {
    console.log(`\n╔══════════════════════════════════════╗`);
    console.log(`║  OTP for ${to}`);
    console.log(`║  Code: ${otp}`);
    console.log(`║  (No SMTP configured — dev mode log)`);
    console.log(`╚══════════════════════════════════════╝\n`);
    return;
  }

  const transport = nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   parseInt(process.env.SMTP_PORT ?? '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const from = process.env.SMTP_FROM ?? `Zyro Ops <${process.env.SMTP_USER}>`;

  await transport.sendMail({
    from,
    to,
    subject: `${otp} — your Zyro Ops sign-in code`,
    text: [
      `Your Zyro Ops sign-in code is: ${otp}`,
      ``,
      `This code expires in 5 minutes. Do not share it with anyone.`,
      ``,
      `If you didn't attempt to sign in, your password may be compromised.`,
      `Contact your security team immediately.`,
    ].join('\n'),
    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a1c16;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table cellpadding="0" cellspacing="0" width="100%" style="max-width:480px;margin:40px auto;padding:0 16px;">
    <tr><td>
      <div style="background:#122720;border:1px solid rgba(255,255,255,0.13);border-radius:16px;padding:32px;">
        <!-- Logo -->
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:24px;">
          <div style="width:32px;height:32px;background:linear-gradient(135deg,#7ef2c0 0%,#22c55e 55%,#0e9f63 100%);border-radius:8px;display:inline-flex;align-items:center;justify-content:center;color:#04231a;font-weight:800;font-size:14px;line-height:32px;text-align:center;">Z</div>
          <span style="font-size:17px;font-weight:800;color:#fff;">Zyro Ops</span>
          <span style="font-size:10px;font-weight:800;letter-spacing:0.06em;color:#f0b429;background:rgba(240,180,41,0.11);padding:2px 8px;border-radius:20px;margin-left:2px;">OPS</span>
        </div>

        <p style="color:#8fa79c;font-size:13px;margin:0 0 20px;line-height:1.6;">
          Use the code below to complete your Zyro Ops sign-in.
          It expires in <strong style="color:#ffffff;">5 minutes</strong>.
        </p>

        <!-- OTP block -->
        <div style="background:#1d3f34;border:1px solid rgba(255,255,255,0.13);border-radius:12px;padding:28px;text-align:center;margin-bottom:24px;">
          <div style="font-size:40px;font-weight:800;letter-spacing:0.2em;color:#7ef2c0;font-variant-numeric:tabular-nums;">${otp}</div>
          <div style="font-size:12px;color:#7a8f86;margin-top:10px;">Expires in 5 minutes</div>
        </div>

        <p style="color:#7a8f86;font-size:12px;margin:0;line-height:1.6;">
          If you did not attempt to sign in to Zyro Ops, your password may be compromised.
          Contact your security team immediately.
        </p>
      </div>
    </td></tr>
  </table>
</body>
</html>`,
  });
}
