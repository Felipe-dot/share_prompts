"use client";

import { useState, useEffect } from "react";
import Fuse from "fuse.js";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);

  const options = {
    keys: ["prompt", "tag"],
    minMatchCharLength: 2,
    includeScore: true,
    useExtendedSearch: true,
    threshold: 0.2,
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchText.length > 0) {
      const fuse = new Fuse(posts, options);
      const results = fuse.search(searchText);
      var filteredPosts = results.map((e) => e.item);
      setSearchResults(filteredPosts);
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative  w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText.length === 0 ? (
        <PromptCardList data={posts} handleTagClick={() => {}} />
      ) : (
        <PromptCardList data={searchResults} handleTagClick={() => {}} />
      )}
    </section>
  );
};

export default Feed;
