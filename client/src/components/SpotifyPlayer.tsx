const SpotifyPlayer = ({ uri }: { uri: string }) => {
  const currentTrack = uri.split("/");
  const urlChunk = currentTrack[currentTrack.length - 1];
  const embedUrl = `https://open.spotify.com/embed/track/${urlChunk}`;

  return (
    <iframe
      src={embedUrl}
      width="300"
      height="380"
      allowTransparency
      allow="encrypted-media"
      title="Spotify Player"
    ></iframe>
  );
};

export default SpotifyPlayer;
