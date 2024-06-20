// components/Feed.jsx
"use client";
import "@styles/Categories.scss";
import { categories } from "@data";
import WorkList from "@components/WorkList";
import { useEffect, useState } from "react";
import Loader from "@components/Loader";

const Feed = ({ userId }) => {
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [workList, setWorkList] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch work list
  const getWorkList = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/work/list/${selectedCategory}`);
      if (!response.ok) {
        throw new Error("Failed to fetch work list");
      }
      const data = await response.json();
      setWorkList(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching work list:", error);
      setError(error.message || "Failed to fetch work list");
    } finally {
      setLoading(false);
    }
  };

  // Fetch work list on component mount
  useEffect(() => {
    getWorkList();
  }, [selectedCategory]);

  // Function to handle work delete
  const handleWorkDelete = (workId) => {
    setWorkList((prevWorkList) => prevWorkList.filter(work => work._id !== workId));
  };

  return (
    <>
      <div className="categories">
        {categories.map((item, index) => (
          <p
            onClick={() => setSelectedCategory(item)}
            className={item === selectedCategory ? "selected" : ""}
            key={index}
          >
            {item}
          </p>
        ))}
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <WorkList data={workList} userId={userId} onDeleteWork={handleWorkDelete} />
      )}
    </>
  );
};

export default Feed;
