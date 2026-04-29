export default async function handler(req, res) {
  const { click_id, payout, aff_id } = req.query;

  const BOT_TOKEN = "8324019323:AAG5xdX94GyXdHna3fjVbx3Ovky9Fd7HF4Q";
  const CHAT_ID = "-7185227392";

  const message = `🔥 New Conversion!

📦 Offer: Kelly Services
💰 Payout: $${payout}
🆔 Click ID: ${click_id}
👤 Affiliate: ${aff_id}

━━━━━━━━━━━━━━━
✅ Status: Approved`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    })
  });

  res.status(200).send("OK");
}
