// app/api/user/[id]/wishlist/route.js
import User from "@models/User";
import { connectToDB } from "@mongodb/database";

export const GET = async (req, { params }) => {
  try {
    // Connect to the database
    await connectToDB();
    // Get the user ID from the request parameters
    const userId = params.id;
    console.log("User ID in GET:", userId);
    // Find the user by ID and populate the wishlist and the creator field
    const user = await User.findById(userId).populate({
      path: 'wishlist',
      populate: {
        path: 'creator',
        model: 'User'
      }
    });
    // If the user is not found, return an error response
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    // Return the wishlist of the user
    return new Response(JSON.stringify({ wishlist: user.wishlist }), { status: 200 });
  } catch (err) {
    console.error("Error fetching wishlist:", err.message);
    return new Response(JSON.stringify({ error: "Failed to fetch wishlist" }), { status: 500 });
  }
};
