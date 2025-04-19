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

const handleClick2 = (tag: string) => {
    const newBubbleTags = [...bubbleTags];
    newBubbleTags.splice(newBubbleTags.indexOf(tag),  1);
    setBubbleTags(newBubbleTags);
}




    return (
        <>
        <div className={styles.bubbleTagsContainer}>
        <ul className={styles.topCloudTagList}>
            {cloudTags.slice(0, 5).map((tag, index) => (
                <li key={index} onClick={() => handleClick(tag)} className={styles[`tag${index + 1}`]}>
                    {tag}
                </li>
            ))}
        </ul>
        
        <div className="bubbleWrapper">
            <div className={styles.bubbleContainer}>
                <img src="/src/assets/images/bubble2.png" alt="bubble" className={styles.imgBubble} />
                
                <ul>
                    <li onClick={() => handleClick2(bubbleTags[0])} className={styles.bubbleTag1}>{bubbleTags[0]}</li>
                    <li onClick={() => handleClick2(bubbleTags[1])} className={styles.bubbleTag2}>{bubbleTags[1]}</li>
                    <li onClick={() => handleClick2(bubbleTags[2])} className={styles.bubbleTag3}>{bubbleTags[2]}</li>
                    <li onClick={() => handleClick2(bubbleTags[3])} className={styles.bubbleTag4}>{bubbleTags[3]}</li>
                    <li onClick={() => handleClick2(bubbleTags[4])} className={styles.bubbleTag5}>{bubbleTags[4]}</li>
                </ul>
                
            </div>
        </div>

        <ul className={styles.botCloudTagList}>
                {cloudTags.slice(5, 10).map((tag, index) => (
                    <li key={index + 5} onClick={() => handleClick(tag)} className={styles[`tag${index + 6}`]}>
                        {tag}
                    </li>
                ))}
        </ul>
        </div>
        
            </>
        );
    }
    
    export default BubbleTags;


