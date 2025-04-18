import { useState, useEffect } from 'react';
import styles from '../components/BubbleTags.module.css';
import { useMusicContext } from '../context/MusicContext'






function BubbleTags() {

const { tags } = useMusicContext();



const [bubbleTags, setBubbleTags] = useState<string[]>([]);
const [cloudTags, setCloudTags] = useState<string[]>([]);

useEffect(() => {
    if (cloudTags.length === 0) {
        const newCloudTags: string[] = [];
        for (let i = 0; i < 10; i++) {
            const randomTag = tags[Math.floor(Math.random() * tags.length)];
            if (newCloudTags.includes(randomTag) || bubbleTags.includes(randomTag)) {
                i--;
                continue;
            }
            newCloudTags.push(randomTag);
        }
        setCloudTags(newCloudTags);
    }
}, [tags]); 


const handleClick = (tag: string) => {

    if (bubbleTags.length < 5) {

    const index = cloudTags.indexOf(tag);
    if (index !== -1) {

        const newBubbleTags = [...bubbleTags];
        if (!newBubbleTags.includes(tag)) {
            newBubbleTags.push(tag);
            setBubbleTags(newBubbleTags);
        }


        const newCloudTags = [...cloudTags];
        let randomTag: string = '';


        while (
            randomTag === '' ||
            newCloudTags.includes(randomTag) ||
            newBubbleTags.includes(randomTag)
        ) {
            randomTag = tags[Math.floor(Math.random() * tags.length)];
        }


        newCloudTags[index] = randomTag;


        setCloudTags(newCloudTags);
    }
    }
};




    return (
        <>
        <div className={styles.cloudTags}>
            <ul>
                <li onClick={() => handleClick(cloudTags[0])} className={styles.tag1}>{cloudTags[0]}</li>
                <li onClick={() => handleClick(cloudTags[1])} className={styles.tag2}>{cloudTags[1]}</li>
                <li onClick={() => handleClick(cloudTags[2])} className={styles.tag3}>{cloudTags[2]}</li>
                <li onClick={() => handleClick(cloudTags[3])} className={styles.tag4}>{cloudTags[3]}</li>
                <li onClick={() => handleClick(cloudTags[4])} className={styles.tag5}>{cloudTags[4]}</li>
                <li onClick={() => handleClick(cloudTags[5])} className={styles.tag6}>{cloudTags[5]}</li>
                <li onClick={() => handleClick(cloudTags[6])} className={styles.tag7}>{cloudTags[6]}</li>
                <li onClick={() => handleClick(cloudTags[7])} className={styles.tag8}>{cloudTags[7]}</li>
                <li onClick={() => handleClick(cloudTags[8])} className={styles.tag9}>{cloudTags[8]}</li>
                <li onClick={() => handleClick(cloudTags[9])} className={styles.tag10}>{cloudTags[9]}</li>
            </ul>
        </div>
        <div className={styles.bubbleContainer}>
        <li  className={styles.bubbleTag1}>{bubbleTags[0]}</li>
        <li  className={styles.bubbleTag2}>{bubbleTags[1]}</li>
        <li  className={styles.bubbleTag3}>{bubbleTags[2]}</li>
        <li  className={styles.bubbleTag4}>{bubbleTags[3]}</li>
        <li  className={styles.bubbleTag5}>{bubbleTags[4]}</li>
        </div>
            </>
        );
    }
    
    export default BubbleTags;


