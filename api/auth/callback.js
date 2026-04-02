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

  const token = data.access_token;

  return res.send(`
    <!DOCTYPE html>
    <html>
    <body>
    <script>
      (function() {
        function receiveMessage(e) {
          window.opener.postMessage(
            'authorization:github:success:' + JSON.stringify({ token: '${token}', provider: 'github' }),
            e.origin
          );
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
    </body>
    </html>
  `);
};
