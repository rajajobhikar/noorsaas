export async function GET() {
  const clientId = process.env.GITHUB_CLIENT_ID!;
  const redirectUri = encodeURIComponent(
    "http://localhost:3000/api/oauth/github/callback"
  );
  const scope = "read:user user:email";
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  return Response.redirect(url);
}
