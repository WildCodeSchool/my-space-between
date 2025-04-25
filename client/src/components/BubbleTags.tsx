import { useState, useEffect } from "react";
import styles from "./BubbleTags.module.css";
import { useMusicDataContext } from "../context/MusicContext";
import DiscoverButton from "./DiscoverButton";

function BubbleTags() {
  const { tags } = useMusicDataContext();

  const { bubbleTags, setBubbleTags } = useMusicDataContext();
  const [cloudTags, setCloudTags] = useState<string[]>([]);

  useEffect(() => {
    if (cloudTags.length === 0) {
      const newCloudTags: string[] = [];
      for (let i = 0; i < 10; i++) {
        const randomTag = tags[Math.floor(Math.random() * tags.length)];
        if (
          newCloudTags.includes(randomTag) ||
          bubbleTags.includes(randomTag)
        ) {
          i--;
          continue;
        }
        newCloudTags.push(randomTag);
      }
      setCloudTags(newCloudTags);
    }
  }, [tags, bubbleTags, cloudTags]);

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
        let randomTag: string = "";

        while (
          randomTag === "" ||
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

  const handleRemoveTag = (tag: string) => {
    const newBubbleTags = [...bubbleTags];
    newBubbleTags.splice(newBubbleTags.indexOf(tag), 1);
    setBubbleTags(newBubbleTags);
  };

  return (
    <>
      <div className={styles.bubbleTagsContainer}>
        <ul className={styles.topCloudTagList}>
          {cloudTags.slice(0, 5).map((tag, index) => (
            <li key={index}>
              <button
                onClick={() => handleClick(tag)}
                className={styles[`tag${index + 1}`]}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", tag);
                  e.currentTarget.classList.add(styles.dragging);
                }}
                onDragEnd={(e) => {
                  e.currentTarget.classList.remove(styles.dragging);
                }}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>

        <div className="bubbleWrapper">
          <div className={styles.bubbleContainer}>
            <img
              src="/src/assets/images/bubble2.png"
              alt="bubble"
              className={styles.imgBubble}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const draggedTag = e.dataTransfer.getData("text/plain");
                handleClick(draggedTag);
              }}
            />
            <ul>
              {bubbleTags.map((tag, index) => {
                const classname = `bubbleTag${index + 1}`;
                return (
                  <li
                    key={index + 1}
                    onClick={() => handleRemoveTag(bubbleTags[index])}
                    className={styles[classname]}
                  >
                    <button>{tag}</button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <ul className={styles.botCloudTagList}>
          {cloudTags.slice(5, 10).map((tag, index) => (
            <li key={index + 5}>
              <button
                onClick={() => handleClick(tag)}
                className={styles[`tag${index + 6}`]}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", tag);
                  e.currentTarget.classList.add(styles.dragging);
                }}
                onDragEnd={(e) => {
                  e.currentTarget.classList.remove(styles.dragging);
                }}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <DiscoverButton bubbleTags={bubbleTags} />
    </>
  );
}

export default BubbleTags;
