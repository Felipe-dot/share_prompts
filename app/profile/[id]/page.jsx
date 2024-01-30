"use client";

import { useState, useEffect } from "react";

import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  let userName = searchParams.get("name");

  userName = `${userName.charAt(0).toUpperCase() + userName.slice(1)}`;
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    console.log(params?.id);
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      console.log(response);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={`${userName}'s`}
      desc={`Welcome to ${userName}'s profile page. Explore ${userName}'s exceptional prompts and be inspired`}
      data={userPosts}
    />
  );
};

export default UserProfile;
