import React from 'react';
import styles from "../components/DiscoverButton.module.css";
import { useFetchDataContext } from '../context/FetchDataContext';
import { useNavigate } from 'react-router-dom';

export const getAccessToken = async () => {
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID as string;
  const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET as string;

  const AUTH_URL = "https://accounts.spotify.com/api/token";

  const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  try {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      throw new Error(`Erreur d'authentification : ${response.status}`);
    }

    const data = await response.json();

    return data.access_token;
  } catch (error) {
    console.error("Erreur lors de la récupération du token :", error);
    throw error;
  }
};

interface DiscoverButtonProps {
  bubbleTags: string[]; 
}

const DiscoverButton: React.FC<DiscoverButtonProps> = ({ bubbleTags }) => {
  const { fetchMusicData } = useFetchDataContext();
  const navigate = useNavigate();

  const handleDiscover = () => {
    fetchMusicData(bubbleTags);
    navigate('/player'); 
  };

  return (
    <div>
      <button className={styles.discoverButton} onClick={handleDiscover}>Go Discover</button>

    </div>
  );
};

export default DiscoverButton;