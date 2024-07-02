// app/page.jsx
"use client";
import Navbar from "@components/Navbar";
import Feed from "@components/Feed";
import Footer from "@components/Footer";
import { useSession } from "next-auth/react";

const Home = () => {
  // Get session from useSession hook
  const { data: session } = useSession();

  return (
    <>
      <title>Plateforme pour Artistes Amateurs - Brekor</title>
      <meta name="description" content="Rejoignez Brekor, la plateforme pour artistes amateurs. Vendez, achetez et louez des œuvres d'art en ligne.
" />
      <meta name="keywords" content="artiste amateur en ligne" />

      <Navbar />
      <div className="navbar-padding-protection"></div>
      <Feed userId={session?.user?.id} />
      <Footer />
    </>
  );
};

export default Home;
