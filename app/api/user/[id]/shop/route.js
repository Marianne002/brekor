// app/api/user/[id]/shop/route.js
import Work from "@models/Work";
import User from "@models/User";

import { connectToDB } from "@mongodb/database";

export const GET = async (req, { params }) => {
    try {
        // Connect to the database
        await connectToDB();
    
        // Fetch the user details
        const user = await User.findById(params.id);
        const workList = await Work.find({ creator: params.id }).populate("creator");
    
        // Update the user's work list
        user.works = workList;
        await user.save();
    
        // Return the user and work list
        return new Response(JSON.stringify({ user: user, workList: workList }), { status: 200 });
    } catch (err) {
        return new Response("Failed to fetch work list by user", { status: 500 })
    }
};