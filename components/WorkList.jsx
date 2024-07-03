// components/WorkList.jsx
import "@styles/WorkList.scss";
import WorkCard from "./WorkCard";

const WorkList = ({ data, userId, updateWishlist, onDeleteWork }) => {
  return (
    <div className="container work-list">
      {data.map((work) => (
        <WorkCard
          key={work._id}
          work={work}
          userId={userId}
          updateWishlist={updateWishlist}
          onDeleteWork={onDeleteWork}
        />
      ))}
    </div>
  );
};

export default WorkList;
