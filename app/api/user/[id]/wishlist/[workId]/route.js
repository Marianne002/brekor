// app/api/user/[id]/wishlist/[workId]/route.js
import Work from "@models/Work";
import User from "@models/User";
import { connectToDB } from "@mongodb/database";

export const PATCH = async (req, { params }) => {
  try {
    // Connect to the database
    await connectToDB();
    // Get the user ID and work ID from the request parameters
    const userId = params.id;
    const workId = params.workId;

    console.log("PATCH request for user:", userId);
    console.log("Work ID:", workId);

    // Find the user and work by ID
    const user = await User.findById(userId);
    const work = await Work.findById(workId).populate("creator");

    // If the user or work is not found, return an error response
    if (!user || !work) {
      console.log("User or work not found");
      return new Response(JSON.stringify({ error: "User or work not found" }), { status: 404 });
    }

    // Check if the work is already in the user's wishlist
    const favoriteWork = user.wishlist.find((item) => item._id.toString() === workId);
    // If the work is in the wishlist, remove it; otherwise, add it
    if (favoriteWork) {
      user.wishlist = user.wishlist.filter((item) => item._id.toString() !== workId);
      await user.save();
      return new Response(JSON.stringify({ message: "Work removed from wishlist", wishlist: user.wishlist }), { status: 200 });
    } else {
      user.wishlist.push(work);
      await user.save();
      return new Response(JSON.stringify({ message: "Work added to wishlist", wishlist: user.wishlist }), { status: 200 });
    }
  } catch (err) {
    console.error("Error patching work to wishlist:", err.message);
    return new Response(JSON.stringify({ error: "Failed to patch work to wishlist" }), { status: 500 });
  }
};
