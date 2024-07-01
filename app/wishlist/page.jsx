// app/wishlist/page.jsx
"use client";
import "@styles/Wishlist.scss";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import Loader from "@components/Loader";
import WorkList from "@components/WorkList";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Wishlist = () => {
  // Initialize session and router
  const { data: session, update } = useSession();
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  // Initialize user ID
  useEffect(() => {
    const initializeUserId = async () => {
      const routerId = router.query?.id;
      const sessionId = session?.user?.id;

      if (routerId) {
        setUserId(routerId);
      } else if (sessionId) {
        setUserId(sessionId);
      }
    };

    initializeUserId();
  }, [router.query, session]);

  // Fetch wishlist on component mount
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userId) return;
      // Fetch wishlist for the user
      try {
        const response = await fetch(`/api/user/${userId}/wishlist`);
        if (response.ok) {
          const data = await response.json();
          setWishlist(data.wishlist);
        } else {
          console.error("Failed to fetch wishlist:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error.message);
      }
    };

    fetchWishlist();
  }, [userId]);

  // If session is not loaded, show loader
  if (!session) {
    return <Loader />;
  }

  // Function to update wishlist locally
  const updateWishlistLocally = (updatedWishlist) => {
    setWishlist(updatedWishlist);
  };

  console.log("Wishlist:", wishlist);
  console.log("User ID:", userId);
  console.log("creator work img", wishlist[0]?.creator?.profileImage);
  console.log("creator work name", wishlist[0]?.creator?.name);
  return (
    <>
      <title>Liste de souhait - Brekor</title>
      <meta name="description" content="Découvrez et organisez vos œuvres d'art préférées en ligne." />
      <meta name="keywords" content="liste de souhait" />

      <Navbar />
      <h1 className="title-list">Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <WorkList data={wishlist} userId={userId} updateWishlist={updateWishlistLocally} />
      ) : (
        <p>Your wishlist is empty.</p>
      )}
      <Footer />
    </>
  );
};

export default Wishlist;