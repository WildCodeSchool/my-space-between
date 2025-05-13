import { useState } from "react";
import styles from "./Tutorial.module.css";

function Tutorial() {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [isClosed, setIsClosed] = useState(false); // New state to track if .introduction is closed

  const tutorialSteps = [
    "You can use our app without logging in, but to unlock all features, we recommend connecting your Spotify account by clicking the Spotify logo. A premium subscription is required for full playback.",
    "The Idea Bubble at the center of the screen is the heart of the app — it helps you find music based on what you're looking for. You can add up to 5 tags inside to guide your discovery.",
    "There are two ways to add tags: search for one using the bar above, or simply click or drag one of the floating suggestions around the bubble into it. You can also remove tags by clicking them.",
    "Looking for hidden gems or just curious to explore? Filter your search by popularity — pick Unknown, Low, or Medium to adjust how known the tracks are, or choose Any for a fully open search.",
    "Ready to dive in? Just hit Discover to start listening! Use the player to skip, explore, and save your hidden gems to your Spotify favorites. Or you can let the music play on loop, no need to lift a finger. :)",
  ];

  function handleSeeTheTutorial() {
    setCurrentStep(0);
  }

  function handleOk() {
    if (currentStep !== null && currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsClosed(true);
      setCurrentStep(null);
    }
  }

  function handleSkip() {
    setIsClosed(true);
    setCurrentStep(null);
  }

  return (
    <>
      {currentStep !== null && <div className={styles.overlay}></div>}
      <div
        className={`${styles.introduction} ${isClosed ? styles.closed : ""}`}
      >
        {currentStep === null ? (
          <>
            <h2>Welcome to Le Chineur</h2>
            <p>
              Dig through artists and hidden gems with our app, powered by
              Spotify.
              <br />
              Discover the unheard. :)
            </p>
            <div className={styles.buttonContainer}>
              <button
                className={styles.seeButton}
                onClick={handleSeeTheTutorial}
              >
                See the tutorial
              </button>
              <button className={styles.skipButton} onClick={handleSkip}>
                Skip the tutorial
              </button>
            </div>
          </>
        ) : (
          <div className={styles.tutorialStep}>
            <h2>{`Step ${currentStep + 1}`}</h2>
            <p>{tutorialSteps[currentStep]}</p>
            <div className={styles.buttonContainer}>
              <button className={styles.okButton} onClick={handleOk}>
                Ok
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Tutorial;
