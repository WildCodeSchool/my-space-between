import React from "react";
import BubbleTags from "../components/BubbleTags";
import SearchBar from "../components/S01-Us02-SearchBar";
import { Tags } from "../data/Tags";

const Home = () => {
  return (
    <>
    <div>
      <SearchBar tags = {Tags}/>
    </div>
    <div>
      <BubbleTags />
    </div>
    </>
  );
};

export default Home;
