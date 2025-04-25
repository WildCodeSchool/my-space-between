import { FaSpotify } from "react-icons/fa";

type Props = {
    onClick: () => void;
};

const SCOPE = import.meta.env.VITE_SCOPE;
const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

const SpotifyLoginButton = ({ onClick }: Props) => {
    const spotifyLogin = () => {
        const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
            REDIRECT_URI
        )}&response_type=code&scope=${encodeURIComponent(SCOPE)}`;

        console.log("URL de redirection Spotify :", authUrl);
        window.location.href = authUrl;
    };
    return (
        <button
            onClick={spotifyLogin}
            className="loginButton"
            title="login in Spotify"
        >
            <FaSpotify />
        </button>
    );
};

export default SpotifyLoginButton;