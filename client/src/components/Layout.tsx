import React, { useState } from "react";
import Header from "./Header";
import SpotifyLoginButton from "./SpotifyLoginButton";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isConnected, setIsConnected] = useState(false);

    const handleSpotifyLogin = () => {
        console.log("Connexion à Spotify");
        setIsConnected(true);
    };

    return (
        <div>
            <Header>
                {!isConnected && (
                    <SpotifyLoginButton onClick={handleSpotifyLogin} />
                )}
            </Header>
            <main>{children}</main>
        </div>
    );
};

export default Layout;