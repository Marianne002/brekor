// app/work-details/page.jsx
"use client";
import "@styles/WorkDetails.scss";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@components/Footer";
import Loader from "@components/Loader";
import Navbar from "@components/Navbar";
import {
    ArrowForwardIos,
    Edit,
    FavoriteBorder,
    ArrowBackIosNew,
    ShoppingCart,
} from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const WorkDetailsContent = () => {
    // State to store the loading status of the page
    const [loading, setLoading] = useState(true);
    const [work, setWork] = useState({});
    const [userId, setUserId] = useState(null);

    // Get the work ID from the URL query parameters
    const searchParams = useSearchParams();
    const workId = searchParams.get("id");

    // Get the session details
    const { data: session, status } = useSession();

    // Set the user ID from the session
    useEffect(() => {
        if (session?.user?.id) {
            setUserId(session.user.id);
            console.log("Session user ID:", session.user.id);
        } else {
            console.log("Session is not defined or user ID is missing:", session);
        }
    }, [session]);

    // Fetch the work details from the server
    useEffect(() => {
        const getWorkDetails = async () => {
            try {
                const response = await fetch(`/api/work/${workId}`, {
                    method: "GET",
                });
                if (response.ok) {
                    const data = await response.json();
                    setWork(data);
                } else {
                    console.error("Failed to fetch work details:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching work details:", error.message);
            } finally {
                setLoading(false);
            }
        };

        if (workId) {
            getWorkDetails();
        }
    }, [workId]);

    // State to store the current index of the slider
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to move to the next slide
    const goToNextSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex + 1) % (work.workPhotoPaths?.length || 1)
        );
    };

    // Function to move to the previous slide
    const goToPrevSlide = () => {
        setCurrentIndex(
            (prevIndex) =>
                (prevIndex - 1 + (work.workPhotoPaths?.length || 1)) %
                (work.workPhotoPaths?.length || 1)
        );
    };

    /* SHOW MORE PHOTOS */
    const [visiblePhotos, setVisiblePhotos] = useState(5);

    const loadMorePhotos = () => {
        setVisiblePhotos(work.workPhotoPaths.length);
    };

    /* SELECT PHOTO TO SHOW */
    const [selectedPhoto, setSelectedPhoto] = useState(0);

    const handleSelectedPhoto = (index) => {
        setSelectedPhoto(index);
        setCurrentIndex(index);
    };

    // Update selectedPhoto when currentIndex changes
    useEffect(() => {
        setSelectedPhoto(currentIndex);
    }, [currentIndex]);

    // Get the router object
    const router = useRouter();

    // Log the details to the console
    console.log("workId:", workId);
    console.log("work.creator._id:", work?.creator?._id);
    console.log("userId:", userId);
    console.log("Session status:", status);

    // Show a loader while the page is loading
    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <title>{work.title}</title>
            <meta name="description" content={work.description} />
            <meta name="keywords" content="art" />

            <Navbar />
            <div className="navbar-padding-protection"></div>
            <div className="work-details">
                <div className="title">
                    <h1>{work.title}</h1>
                    {work?.creator?._id === userId ? (
                        <div
                            className="save"
                            onClick={() => {
                                router.push(`/update-work?id=${workId}`);
                            }}
                        >
                            <Edit />
                            <p>Edit</p>
                        </div>
                    ) : (
                        <div className="save">
                            <FavoriteBorder />
                            <p>Save</p>
                        </div>
                    )}
                </div>

                <div className="slider-work d-flex align-items-center justify-content-center">
                    {work.workPhotoPaths?.length > 1 && (
                        <div className="prev-button" onClick={goToPrevSlide}>
                            <ArrowBackIosNew sx={{ fontSize: "15px" }} />
                        </div>
                    )}
                    <div className="slider-container">
                        <div
                            className="slider"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {work.workPhotoPaths?.map((photo, index) => (
                                <div className="slide" key={index}>
                                    <img src={photo} alt={`work-${index}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {work.workPhotoPaths?.length > 1 && (
                        <div className="next-button" onClick={goToNextSlide}>
                            <ArrowForwardIos sx={{ fontSize: "15px" }} />
                        </div>
                    )}
                </div>

                <div className="photos">
                    {work.workPhotoPaths?.slice(0, visiblePhotos).map((photo, index) => (
                        <img
                            src={photo}
                            alt="work-demo"
                            key={index}
                            onClick={() => handleSelectedPhoto(index)}
                            className={selectedPhoto === index ? "selected" : ""}
                        />
                    ))}

                    {visiblePhotos < work.workPhotoPaths.length && (
                        <div className="show-more" onClick={loadMorePhotos}>
                            <ArrowForwardIos sx={{ fontSize: "40px" }} />
                            Show More
                        </div>
                    )}
                </div>

                <div>
                    <button className="btn btn-gradient">Acheter</button>
                    <button className="btn">Louer</button>
                </div>

                <div className="profile mt-5">
                    <div className="d-flex gap-3">
                        <img
                            src={work.creator.profileImagePath}
                            alt="profile"
                        />
                        <div>
                            <h5>{work.creator.username}</h5>
                            <p>Peintre, paris (France)</p>
                        </div>
                    </div>
                    <button 
                        className="btn btn-pink"
                        onClick={() => router.push(`/shop?id=${work.creator._id}`)}>
                            <ArrowForwardIos sx={{ fontSize: "15px" }} />
                    </button>
                </div>

                <div className="info mt-5">
                    <div>
                        <p>Date</p>
                        <p>2020</p>
                    </div>
                    <hr />

                    <div>
                        <p>Technique</p>
                        <p>Huile sur toile</p>
                    </div>
                    <hr />

                    <div>
                        <p>Dimensions</p>
                        <p>120 cm x 90 cm</p>
                    </div>
                    <hr />

                    <div>
                        <p>Langue</p>
                        <p>France</p>
                    </div>

                    <div className="mt-5">
                        <p><b>Description</b></p>
                        <p>{work.description}</p>
                    </div>
                </div>

                <div className="recommendations mt-5">
                    <h5>
                        Recommendations
                    </h5>
                </div>
            </div>
            <Footer />
        </>
    );
};

const WorkDetails = () => (
    <Suspense fallback={<Loader />}>
        <WorkDetailsContent />
    </Suspense>
);

export default WorkDetails;