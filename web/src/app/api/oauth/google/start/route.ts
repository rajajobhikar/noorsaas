export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const redirectUri = encodeURIComponent(
    "http://localhost:3000/api/oauth/google/callback"
  );
  const scope = encodeURIComponent("profile email");
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  return Response.redirect(url);
}
