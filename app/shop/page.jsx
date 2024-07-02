// app/shop/page.jsx
"use client";
import "@styles/Shop.scss";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@components/Loader";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import WorkList from "@components/WorkList";
import { useSession } from "next-auth/react";

const ShopContent = () => {
    // Initialize state variables
    const [loading, setLoading] = useState(true);
    const [workList, setWorkList] = useState([]);
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState(null);

    // Get profile ID from search params
    const searchParams = useSearchParams();
    const profileId = searchParams.get("id");

    // Get session from useSession hook
    const { data: session, status } = useSession();

    // Set userId from session
    useEffect(() => {
        if (session?.user?.id) {
            setUserId(session.user.id);
        }
    }, [session]);

    // Fetch work list on component mount
    useEffect(() => {
        const getWorkList = async () => {
            try {
                const response = await fetch(`/api/user/${profileId}/shop`);
                if (response.ok) {
                    const data = await response.json();
                    setWorkList(data.workList);
                    setUser(data.user);
                } else {
                    console.error("Failed to fetch work list:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching work list:", error.message);
            } finally {
                setLoading(false);
            }
        };

        if (profileId) {
            getWorkList();
        }
    }, [profileId]);

    // Function to handle work delete
    const handleWorkDelete = (workId) => {
        setWorkList((prevWorkList) => prevWorkList.filter(work => work._id !== workId));
    };

    // Show loader while fetching data
    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <title>Shop - Brekor</title>
            <meta name="description" content="Découvrez et achetez des œuvres d'art uniques sur Brekor. Explorez la boutique d'artistes talentueux et trouvez l'inspiration." />
            <meta name="keywords" content="acheter art, boutique d'art en ligne, Brekor, œuvres d'art uniques" />

            <Navbar />
            <div className="navbar-padding-protection"></div>
            {profileId && (
                <h1 className="title-list">
                    {userId === profileId ? "Your Works" : `${user.username}'s Works`}
                </h1>
            )}
            <WorkList data={workList} userId={userId} onDeleteWork={handleWorkDelete} />
            <Footer />
        </>
    );
};

const Shop = () => (
    <Suspense fallback={<Loader />}>
        <ShopContent />
    </Suspense>
);

export default Shop;
