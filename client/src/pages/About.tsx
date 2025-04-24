import styles from "../styles/About.module.scss";

export const About = () => {
  return (
    <div className={styles.aboutContainer}>
        <h2>ABOUT</h2>
        <div className={styles.underline}></div>
      <p>
      Welcome to Le Chineur , a music platform designed for everyone who can't go a day without listening to their favorite tunes .
</p>

<h4>THE IDEA BEHIND LE CHINEUR</h4>
<p>
It all started with a simple question :
“Why is it sometimes so hard to find the right playlist for a specific vibe ?”
We love Spotify , but with millions of tracks and auto-generated playlists that don't always hit the mark , we wanted to offer something more personal , more human , more cool .
So we created Le Chineur , a web app that uses the Spotify API to deliver carefully curated playlists .
Whether you're coding , working out , daydreaming , or crying in the dark (hey, it happens), you'll find the perfect sound atmosphere just for you .
</p>

<h4>WHO ARE WE ?</h4>
<p>
We're a small team of web development students , passionate about music , technology , and user experience .
This project was born in an educational setting , but we've poured our energy , creativity , and love for great sound into it .
</p>

      <p>
      You ? Maybe one day you'll join our team or become part of our community!
      </p>
    </div>
  );
};
