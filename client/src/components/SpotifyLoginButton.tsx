import { FaSpotify } from "react-icons/fa";

type Props = {
    onClick: () => void;
};

const SpotifyLoginButton = ({ onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            className="loginButton"
            title="login in Spotify"
        >
            <FaSpotify />
        </button>
    );
};

export default SpotifyLoginButton;