// app/api/work/new/route.js
import { connectToDB } from "@mongodb/database";
import Work from "@models/Work";
import cloudinary from "cloudinary";
import { Readable } from "stream";

// Connect to Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        // Connect to the database
        console.log("Connecting to DB...");
        await connectToDB();
        console.log("Connected to DB");

        console.log("Receiving form data...");
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
        }

        // Create a new work in the database
        const newWork = new Work({
            creator,
            category,
            title,
            description,
            price,
            workPhotoPaths: uploadedPhotoUrls // Utilisez le champ correct pour les photos
        });

        // Save the new work to the database
        console.log("Saving new work to DB...");
        await newWork.save();
        console.log("New work saved");

        return new Response(JSON.stringify(newWork), { status: 200 });
    } catch (err) {
        console.error("Error occurred:", err);
        return new Response("Failed to create a new Work", { status: 500 });
    }
}
