export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).send("Postback API is working.");
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const BOT_TOKEN = "8757239334:AAFRkYJ62w2n3WhcWharR_O06h4GYgpPMcU";
  const CHAT_ID = "-1003762912239";
  const PASSWORD = "";

  const body = req.body || {};

  if (PASSWORD && body.password !== PASSWORD) {
    return res.status(403).send("Access Denied");
  }

  const payout = body.payout || "0";
  const offer = body.offer_id || "-";
  const tracking = body.tracking_id || "-";

  const text =
`🎉 <b>New Conversion</b>
💰 $${payout}
📦 Offer: ${offer}
🆔 ${tracking}`;

  try {
    const tg = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    });

    if (!tg.ok) {
      const err = await tg.text();
      return res.status(500).send(err);
    }

    return res.status(200).send("OK");
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
}
