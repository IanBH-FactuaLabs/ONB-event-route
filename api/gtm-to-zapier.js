export default async function handler(req, res) {
    // Allow CORS for all origins
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
    // Handle preflight (OPTIONS) requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  
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
        const text = await zapierRes.text();
        console.error("Zapier error:", text);
        return res.status(500).json({ error: 'Failed to forward to Zapier' });
      }
  
      return res.status(200).json({ message: 'Forwarded to Zapier' });
    } catch (err) {
      console.error("Unexpected error:", err);
      return res.status(500).json({ error: 'Unexpected error' });
    }
  }
  