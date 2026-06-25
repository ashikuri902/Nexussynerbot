export default async function handler(req, res) {

  // Browser Test
  if (req.method === "GET") {
    return res.status(200).send("Postback API is working.");
  }

  // Only POST Allowed
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const BOT_TOKEN = "YOUR_BOT_TOKEN";
  const CHAT_ID = "YOUR_CHAT_ID";

  // Optional Password
  const PASSWORD = "secret123";
  if (PASSWORD && req.body.password !== PASSWORD) {
    return res.status(403).send("Access Denied");
  }

  const payout = req.body.payout || "0";
  const offer = req.body.offer_id || "-";
  const tracking = req.body.tracking_id || "-";

  const text =
`🎉 <b>New Conversion</b>
💰 $${payout}
📦 Offer: ${offer}
🆔 ${tracking}`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json(data);
    }

    return res.status(200).send("OK");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
