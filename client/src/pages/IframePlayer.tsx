const IframePlayer = () => {
  const musicUrl = "https://open.spotify.com/embed/track/ID_TRACK";

  return (
    <div style={{ margin: "auto", maxWidth: 600 }}>
      <iframe
        src={musicUrl}
        width="100%"
        height="80"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default IframePlayer;
