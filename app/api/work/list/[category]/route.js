// app/api/work/list/[category]/route.js
import { connectToDB } from "@mongodb/database";
import Work from "@models/Work";
import User from "@models/User";

// GET /api/work/list/[category]
export const GET = async (req, { params }) => {
    try {
        // Connect to the database
        console.log("Connecting to database...");
        await connectToDB();
        console.log("Connected to database.");

        // Find all works that match the category
        const { category } = params;
        console.log(`Fetching works for category: ${category}`);

        // Define the workList variable
        let workList;

        // Check if the category is "All"
        if (category !== "All") {
            workList = await Work.find({ category }).populate("creator");
        } else {
            workList = await Work.find().populate("creator");
        }

        // Return the work list
        console.log(`Fetched ${workList.length} works.`);
        return new Response(JSON.stringify(workList), { status: 200 });
    } catch (err) {
        console.log(err);
        // Return an error response
        console.error("Error fetching work list:", err);
        return new Response("Failed to fetch Work List", { status: 500 });
    }
};