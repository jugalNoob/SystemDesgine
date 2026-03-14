export async function sendEmail(email) {
  console.log("📧 Sending email to", email);
  await new Promise(r => setTimeout(r, 2000));
  console.log("✅ Email sent");
}
