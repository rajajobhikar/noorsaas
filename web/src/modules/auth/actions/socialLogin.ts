export async function socialLogin(profile: {
  email: string;
  name: string;
  provider: string;
}) {
  const res = await fetch("/api/auth/social-callback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });

  const data = await res.json();
  if (data.success) {
    window.location.href = "/dashboard";
  } else {
    alert("Social login failed");
  }
}
