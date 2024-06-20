// app/components/WorkCard.jsx
import "@styles/WorkCard.scss";
import { ArrowBackIosNew, ArrowForwardIos, Delete, Favorite, FavoriteBorder } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const WorkCard = ({ work, userId, updateWishlist, onDeleteWork }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const { data: session, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const savedIsLiked = localStorage.getItem(`work_${work._id}_liked`);
      if (savedIsLiked) {
        setIsLiked(savedIsLiked === 'true');
      }
    } else {
      setIsLiked(false);
    }
  }, [session, work._id]);

  useEffect(() => {
    if (session?.user?.wishlist) {
      const isInWishlist = !!session.user.wishlist.find((item) => item._id === work._id);
      setIsLiked(isInWishlist);
      localStorage.setItem(`work_${work._id}_liked`, isInWishlist ? 'true' : 'false');
    }
  }, [session, work._id]);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % work.workPhotoPaths.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + work.workPhotoPaths.length) % work.workPhotoPaths.length);
  };

  const handleDelete = async () => {
    const hasConfirmed = confirm("Are you sure you want to delete this work?");
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/work/${work._id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          if (updateWishlist) {
            const updatedWishlist = session.user.wishlist.filter(item => item._id !== work._id);
            updateWishlist(updatedWishlist);
          }
          setIsLiked(false);
          localStorage.setItem(`work_${work._id}_liked`, 'false');
          if (onDeleteWork) {
            onDeleteWork(work._id);
          }
        } else {
          console.error("Failed to delete work:", response.statusText);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const patchWishlist = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`/api/user/${userId}/wishlist/${work._id}`, {
        method: "PATCH",
      });
      if (!response.ok) {
        throw new Error("Failed to update wishlist");
      }
      const data = await response.json();
      update({
        ...session,
        user: {
          ...session.user,
          wishlist: data.wishlist,
        },
      });
      if (updateWishlist) {
        updateWishlist(data.wishlist);
      }

      setIsLiked(data.wishlist.some((item) => item._id === work._id));
      localStorage.setItem(`work_${work._id}_liked`, data.wishlist.some((item) => item._id === work._id) ? 'true' : 'false');
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  };

  return (
    <div
      className="work-card"
      onClick={() => {
        router.push(`/work-details?id=${work._id}&creator=${work.creator._id}`);
      }}
    >
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {work.workPhotoPaths?.map((photo, index) => (
            <div className="slide" key={index}>
              <img src={photo} alt="work" />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info">
        <div>
          <h3>{work.title}</h3>
          {work.creator && (
            <div className="creator">
              {work.creator.profileImagePath && (
                <img src={work.creator.profileImagePath} alt="creator" />
              )}
              <span>{work.creator.username}</span> in <span>{work.category}</span>
            </div>
          )}
        </div>
        <div className="price">${work.price}</div>
      </div>

      {userId === work.creator._id ? (
        <div
          className="icon"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          <Delete
            sx={{
              borderRadius: "50%",
              backgroundColor: "white",
              padding: "5px",
              fontSize: "30px",
            }}
          />
        </div>
      ) : (
        <div
          className="icon"
          onClick={(e) => {
            e.stopPropagation();
            patchWishlist();
          }}
        >
          {isLiked ? (
            <Favorite
              sx={{
                borderRadius: "50%",
                backgroundColor: "white",
                color: "red",
                padding: "5px",
                fontSize: "30px",
              }}
            />
          ) : (
            <FavoriteBorder
              sx={{
                borderRadius: "50%",
                backgroundColor: "white",
                padding: "5px",
                fontSize: "30px",
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default WorkCard;
