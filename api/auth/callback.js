const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

module.exports = async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Kein Code erhalten.');
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }),
  });

  const data = await response.json();

  if (data.error) {
    return res.status(401).send(`Auth Fehler: ${data.error_description}`);
  }

  const message = JSON.stringify({
    token: data.access_token,
    provider: 'github'
  });

  return res.send(`
    <!DOCTYPE html>
    <html>
    <body>
    <script>
      (function() {
        const msg = 'authorization:github:success:' + ${JSON.stringify(message)};
        window.opener.postMessage(msg, '*');
        window.close();
      })();
    </script>
    </body>
    </html>
  `);
};
