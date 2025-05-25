const CLIENT_ID = "Iv1.Ov23liYhJNALsopN29ER";
const REDIRECT_URI = "https://mls-yu.github.io/test/login.html";
const API_ENDPOINT = "https://gjjf68ffz5.execute-api.ap-northeast-1.amazonaws.com/default/HomepageAuth/callback";

async function handleRedirect() {
  const code = new URLSearchParams(window.location.search).get("code");

  if (code) {
    console.log("Detected code:", code);
    try {
      const res = await fetch(`${API_ENDPOINT}?code=${code}`);
      const data = await res.json();
      console.log("Lambda response:", data);

      if (data.token && data.org_ok) {
        localStorage.setItem("gh_token", data.token);
        localStorage.setItem("org_ok", "true");
        window.location.href = "index.html";
      } else {
        document.body.innerHTML += "<p>Unauthorized or organization check failed.</p>";
      }
    } catch (e) {
      document.body.innerHTML += "<p>Fetch failed: " + e + "</p>";
    }
  } else {
    console.log("No code found, redirecting to GitHub...");
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=read:org`;
    window.location.href = githubUrl;
  }
}

handleRedirect();
