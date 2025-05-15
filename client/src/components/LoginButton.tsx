import { useState, useEffect } from "react";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const SCOPE = import.meta.env.VITE_SCOPE;
const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT;
const TOKEN_ENDPOINT = import.meta.env.VITE_TOKEN_ENDPOINT;
import styles from "./LoginButton.module.css";

const LoginButton = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const getAuthCodeFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("code");
  };

  interface AccessTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
    scope?: string;
  }

  const fetchAccessToken = async (authCode: string): Promise<void> => {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code: authCode,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to fetch access token", errorText);
      return;
    }

    try {
      const data: AccessTokenResponse = await response.json();
      if (data.access_token) {
        localStorage.setItem("spotifyAccessToken", data.access_token);
        fetchUserProfile(data.access_token);
        window.history.replaceState(null, "", window.location.pathname);
      }
    } catch (error) {
      console.error("Failed to parse access token response as JSON", error);
    }
  };

  interface UserProfile {
    display_name: string;
    images: { url: string }[];
  }

  const fetchUserProfile = async (token: string): Promise<void> => {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to fetch user profile", errorText);
      return;
    }

    try {
      const data: UserProfile = await response.json();
      localStorage.setItem("spotifyUserProfile", JSON.stringify(data));

      setUserProfile(data);
      setIsConnected(true);
    } catch (error) {
      console.error("Failed to parse user profile response as JSON", error);
    }
  };
  useEffect(() => {
    const savedToken = localStorage.getItem("spotifyAccessToken");
    const savedProfile = localStorage.getItem("spotifyUserProfile");

    if (savedToken && savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
      setIsConnected(true);

      window.history.replaceState(null, "", window.location.pathname);
      return;
    }

    if (savedToken) {
      fetchUserProfile(savedToken);

      window.history.replaceState(null, "", window.location.pathname);
      return;
    }

    const authCode = getAuthCodeFromUrl();

    if (authCode) {
      fetchAccessToken(authCode)
        .then(() => {
          window.history.replaceState(null, "", window.location.pathname);
        })
        .catch((error) => {
          console.error("Error fetching access token:", error);
        });
    }
  }, []);

  const handleLogin = () => {
    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&response_type=code&scope=${encodeURIComponent(SCOPE)}`;

    window.location.href = authUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem("spotifyAccessToken");
    localStorage.removeItem("spotifyUserProfile");
    setUserProfile(null);
    setIsConnected(false);

    const newUrl = window.location.origin + window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  };

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className={styles.container}>
      {isConnected ? (
        <div>
          <div
            className={styles.name}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
          >
            {userProfile && (
              <p className={styles.username}>{userProfile.display_name}</p>
            )}

            {userProfile &&
              userProfile.images &&
              userProfile.images.length > 0 && (
                <img
                  className={styles.profilPic}
                  src={userProfile.images[0]?.url || ""}
                  alt="Photo de profil"
                />
              )}
          </div>
          <button
            className={`${styles.disconnect} ${
              isHovered ? styles.hovered : ""
            }`}
            onClick={handleLogout}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button onClick={handleLogin}>
          <p className={styles.login}>Login </p>
          <img
            className={styles.spotifyButton}
            src="/src/assets/images/spotifybtn.png"
          />
        </button>
      )}
    </div>
  );
};

export default LoginButton;
