// app/api/work/[id]/route.js
import Work from "@models/Work";
import { connectToDB } from "@mongodb/database";

// GET /api/work/[id]
export const GET = async (req, { params }) => {
    try {
        // Connect to the database
        await connectToDB();
        
        // Find the work by ID and populate the creator field
        const work = await Work.findById(params.id).populate("creator");
    
        // If the work is not found, return an error response
        if (!work) return new Response("The Work Not Found", { status: 404 });

        // Return the work
        return new Response(JSON.stringify(work), { status: 200 });
    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
};


// PATCH /api/work/[id]
export const PATCH = async (req, { params }) => {
    try {
        // Connect to the database
        await connectToDB();
        
        // Parse the form data
        const data = await req.formData();
        console.log("Form data received");

        // Extract fields from the form data
        const creator = data.get("creator");
        const category = data.get("category");
        const title = data.get("title");
        const description = data.get("description");
        const price = data.get("price");
        
        console.log("Received fields:", { creator, category, title, description, price });

        // Upload photos to Cloudinary
        const uploadedPhotoUrls = [];
        const photos = data.getAll("photos");

        // Upload each photo to Cloudinary
        for (const photo of photos) {
            if (photo instanceof Object) {
                const formData = new FormData();
                formData.append("file", photo);
                formData.append("upload_preset", "bb8bzcem");

                console.log("Uploading photo to Cloudinary...");

                // Cloudinary API call
                const response = await fetch("https://api.cloudinary.com/v1_1/dgzdz1jf0/image/upload", {
                    method: "POST",
                    body: formData
                });

                if (response.ok) {
                    const data = await response.json();
                    uploadedPhotoUrls.push(data.secure_url);
                    console.log("Photo uploaded successfully:", data.secure_url);
                } else {
                    console.error("Failed to upload photo to Cloudinary:", response.statusText);
                }
            } else {
                // If the photo is already uploaded
                uploadedPhotoUrls.push(photo);
            }
        }

        // Find the existing work
        const existingWork = await Work.findById(params.id);
        if (!existingWork) {
            return new Response("The Work Not Found", { status: 404 });
        }

        // Update the work with the new data
        existingWork.category = category;
        existingWork.title = title;
        existingWork.description = description;
        existingWork.price = price;
        existingWork.workPhotoPaths = uploadedPhotoUrls;

        // Save the updated work
        await existingWork.save();

        return new Response("Successfully updated the Work", { status: 200 });
    } catch (err) {
        console.log(err)
        return new Response("Error updating the Work", { status: 500 });
    }
};

// DELETE /api/work/[id]
export const DELETE = async (req, { params }) => {
    try {
        // Connect to the database
        await connectToDB();
        // Delete the work
        await Work.findByIdAndDelete(params.id);
    
        // Return a success response
        return new Response("Successfully deleted the Work", { status: 200 });
    } catch (err) {
        console.log(err);
        // Return an error response
        return new Response("Error deleting the Work", { status: 500 });
    }
};
