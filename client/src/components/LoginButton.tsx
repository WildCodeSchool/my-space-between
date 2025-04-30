import { useState, useEffect } from "react";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const SCOPE = import.meta.env.VITE_SCOPE;

interface UserProfile {
  display_name: string;
  images: { url: string }[];
}

const LoginButton = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // -------------------
  // PKCE helpers
  function generateRandomString(length: number) {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () =>
      possible.charAt(Math.floor(Math.random() * possible.length))
    ).join("");
  }

  async function generateCodeChallenge(codeVerifier: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const handleLogin = async () => {
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    localStorage.setItem("code_verifier", codeVerifier);

    const args = new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      scope: SCOPE,
      redirect_uri: REDIRECT_URI,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${args.toString()}`;
  };

  const getAuthCodeFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("code");
  };

  const fetchAccessToken = async (authCode: string): Promise<void> => {
    const codeVerifier = localStorage.getItem("code_verifier");
    if (!codeVerifier) {
      console.error("Pas de code_verifier trouvé.");
      return;
    }

    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem("spotifyAccessToken", data.access_token);
      fetchUserProfile(data.access_token);
      // Clean URL
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  const fetchUserProfile = async (token: string): Promise<void> => {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: UserProfile = await response.json();
    localStorage.setItem("spotifyUserProfile", JSON.stringify(data));
    setUserProfile(data);
    setIsConnected(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("spotifyAccessToken");
    localStorage.removeItem("spotifyUserProfile");
    localStorage.removeItem("code_verifier");
    setUserProfile(null);
    setIsConnected(false);

    const newUrl = window.location.origin + window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("spotifyAccessToken");
    const savedProfile = localStorage.getItem("spotifyUserProfile");

    if (savedToken && savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
      setIsConnected(true);
    } else if (savedToken) {
      fetchUserProfile(savedToken);
    } else {
      const authCode = getAuthCodeFromUrl();
      if (authCode) {
        fetchAccessToken(authCode);
      }
    }
  }, []);

  return (
    <div className="container">
      {isConnected ? (
        <div>
          <div
            className="name"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {userProfile && (
              <p className="username">{userProfile.display_name}</p>
            )}

            {userProfile && userProfile.images[0] && (
              <img
                className="profilPic"
                src={userProfile.images[0].url}
                alt="Photo de profil"
              />
            )}
          </div>
          <button
            className={`disconnect ${isHovered ? "hovered" : ""}`}
            onClick={handleLogout}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button onClick={handleLogin}>
          <p className="login">Login</p>
          <img
            className="spotifyButton"
            src="/src/assets/images/spotifybtn.png"
            alt="Spotify button"
          />
        </button>
      )}
    </div>
  );
};

export default LoginButton;
