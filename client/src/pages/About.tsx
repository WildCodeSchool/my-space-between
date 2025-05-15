import styles from "./About.module.css";

export const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <section className={styles.section}>
        <h2>ABOUT</h2>
        
        <p>
          Welcome to Le Chineur, a music platform designed for everyone who
          can't go a day without listening to their favorite tunes.
        </p>
      </section>

      <section className={styles.section}>
        <h3>THE IDEA BEHIND LE CHINEUR</h3>
        <p>
          It all started with a simple question: “Why is it sometimes so hard to
          find the right playlist for a specific vibe?” We love Spotify, but
          with millions of tracks and auto-generated playlists that don't always
          hit the mark, we wanted to offer something more personal,
          more human, more cool. So we created Le Chineur, a web app that uses
          the Spotify API to deliver carefully curated playlists. Whether
          you're coding, working out, daydreaming, or crying in the dark (hey,
          it happens), you'll find the perfect sound atmosphere just for you.
        </p>
        <p>
          Le Chineur goes further : we also highlight emerging or little-known artists, 
          giving them greater visibility compared to the big names on the music scene, because they also deserve to be listened to.
        </p>
      </section>

      <section className={styles.section}>
        <h3>WHO ARE WE?</h3>
        <p>We're four friends addicted to music (and coding). Let's introduce the team:</p>
        <p><strong>Jules:</strong> Sound explorer, Salvak fanatic, and always on the lookout for underground gems.</p>
        <p><strong>Adrien:</strong> Passionate headbanger, metal and rock lover who rocks the speakers.</p>
        <p><strong>Jérôme:</strong> Flow addict, rap enthusiast, and hunter of killer beats.</p>
        <p><strong>Damien:</strong> Rock chameleon, from garage to hard rock, he digests it all and spits out good music.</p>
      </section>

      <section className={styles.githubContainer}>
        <p>You can also see our Github links !</p>
        <div className={styles.github}>
          <a
          href="https://github.com/Salvak613"
          target="_blank"
          rel="noopener noreferrer"
          >
          <img 
          src="https://avatars.githubusercontent.com/u/201595920?v=4"
          alt="Avatar of a cat">
          </img>
          </a>
          <a
          href="https://github.com/MeertAdrien"
          target="_blank"
          rel="noopener noreferrer"
          >
          <img 
          src="https://avatars.githubusercontent.com/u/201602435?v=4"
          alt="Avatar of a man">
          </img>
          </a>
          <a
          href="https://github.com/Jerome0510"
          target="_blank"
          rel="noopener noreferrer"
          >
          <img
          src="https://avatars.githubusercontent.com/u/200201178?v=4"
          alt="Avatar of a cement mixer">
          </img>
          </a>
          <a
          href="https://github.com/MrLuffy59"
          target="_blank"
          rel="noopener noreferrer"
          >
          <img 
          src="https://avatars.githubusercontent.com/u/201595777?v=4"
          alt="Avatar of a helmet">
          </img>
          </a> 
          </div>
      </section>

      <section className={styles.section}>
        <p>
          You? Maybe one day you'll join our team or become part of our community!
        </p>
      </section>
    </div>
  );
}
