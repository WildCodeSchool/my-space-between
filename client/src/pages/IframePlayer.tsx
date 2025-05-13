const IframePlayer = () => {
  const musicUrl = "https://open.spotify.com/embed/track/{item.id}";
  // retrouver le track actuel via le context
  return (
    <div>
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
