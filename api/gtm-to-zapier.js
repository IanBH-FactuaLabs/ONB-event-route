export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const zapierWebhook = 'https://hooks.zapier.com/hooks/catch/18620594/ub0qyiy/';

    const zapierRes = await fetch(zapierWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    if (!zapierRes.ok) {
      console.error(await zapierRes.text());
      return res.status(500).json({ error: 'Failed to forward to Zapier' });
    }

    return res.status(200).json({ message: 'Data forwarded to Zapier' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unexpected error' });
  }
}