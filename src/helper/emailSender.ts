import nodemailer from "nodemailer";

const emailSender = async (email: string, subject: string, code: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.emailSender_email,
      pass: process.env.emailSender_app_pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: '"hirePeople" <ar9485727@gmail.com>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    //text: "Hello world?", // plain text body
    html: verificationEmailTemplate(code), // html body
  });
};

const verificationEmailTemplate = (code: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
    
    <tr>
      <td style="background:#4f46e5; padding:20px; text-align:center;">
        <h1 style="color:#ffffff; margin:0; font-size:24px;">Verify Your Email</h1>
      </td>
    </tr>

    <tr>
      <td style="padding:30px; text-align:center;">
        <h2 style="margin:0 0 15px; color:#333;">Your Verification Code</h2>
        
        <p style="font-size:16px; color:#555; margin-bottom:25px;">
          Use the following code to verify your account. This code will expire in 10 minutes.
        </p>

        <div style="display:inline-block; padding:15px 25px; font-size:28px; font-weight:bold; letter-spacing:5px; background:#f3f4f6; color:#111; border-radius:6px;">
          ${code}
        </div>

        <p style="margin-top:30px; font-size:14px; color:#777;">
          If you did not create this account, you can safely ignore this email.
        </p>
      </td>
    </tr>

    <tr>
      <td style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#999;">
        © ${new Date().getFullYear()} Your Company. All rights reserved.
      </td>
    </tr>

  </table>

</body>
</html>
`;

export default emailSender;
