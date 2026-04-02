const CLIENT_ID = process.env.GITHUB_CLIENT_ID;

module.exports = function handler(req, res) {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`
  );
};
