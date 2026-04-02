const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export default async function handler(req, res) {
  const { code } = req.query;

  // Schritt 1: Weiterleitung zu GitHub Login
  if (!code) {
    return res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`
    );
  }

  // Schritt 2: Code gegen Access Token tauschen
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }),
  });

  const data = await response.json();

  if (data.error) {
    return res.status(401).send(`Auth Fehler: ${data.error_description}`);
  }

  // Schritt 3: Token an Decap CMS zurückgeben
  return res.send(`
    <!DOCTYPE html>
    <html>
    <body>
    <script>
      window.opener.postMessage(
        'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}',
        '*'
      );
    </script>
    </body>
    </html>
  `);
}
