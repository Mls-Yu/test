const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
const REDIRECT_URI = "https://mls-yu.github.io/test/login.html";
const LAMBDA_ENDPOINT = "https://your-api-id.execute-api.ap-northeast-1.amazonaws.com/default/AuthHandler";

document.getElementById("login").onclick = () => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${CLIENT_ID}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&response_type=token` +
    `&scope=email`;

  window.location.href = authUrl;
};

window.onload = async () => {
  const hash = window.location.hash;
  if (hash.includes("access_token")) {
    const params = new URLSearchParams(hash.slice(1));
    const accessToken = params.get("access_token");

    const res = await fetch(`${LAMBDA_ENDPOINT}?access_token=${accessToken}`);
    const data = await res.json();

    if (data.domain_ok) {
      document.getElementById("status").textContent = `ようこそ ${data.email}`;
      // localStorage.setItem("auth", "true"); 等も可能
    } else {
      document.getElementById("status").textContent = "許可されていないドメインです";
    }
  }
};
