// app/page.jsx
"use client";
import Navbar from "@components/Navbar";
import Feed from "@components/Feed";
import { useSession } from "next-auth/react";

const Home = () => {
  // Get session from useSession hook
  const { data: session } = useSession();

  return (
    <>
      <Navbar />
      <Feed userId={session?.user?.id} />
    </>
  );
};

export default Home;
