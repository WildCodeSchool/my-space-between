import React from 'react';
import styles from '../components/BubbleTags.module.css';
import { useMusicContext } from '../context/MusicContext'






function BubbleTags() {

const { tags } = useMusicContext();

const selectedTags = []

for (let i=0; i<=10; i++) {
    const randomTag = tags[Math.floor(Math.random() * tags.length)];
    selectedTags.push(randomTag);
}




    return (
        <>
        <div className={styles.cloudTags}>
            <ul>
                <li className={styles.tag1}>{selectedTags[0]}</li>
                <li className={styles.tag2}>{selectedTags[1]}</li>
                <li className={styles.tag3}>{selectedTags[2]}</li>
                <li className={styles.tag4}>{selectedTags[3]}</li>
                <li className={styles.tag5}>{selectedTags[4]}</li>
                <li className={styles.tag6}>{selectedTags[5]}</li>
                <li className={styles.tag7}>{selectedTags[6]}</li>
                <li className={styles.tag8}>{selectedTags[7]}</li>
                <li className={styles.tag9}>{selectedTags[8]}</li>
                <li className={styles.tag10}>{selectedTags[9]}</li>
            </ul>
        </div>
        <div className={styles.bubbleContainer}></div>
            </>
        );
    }
    export default BubbleTags;


