// app/api/register/route.js
import { connectToDB } from "@mongodb/database";
import User from "@models/User";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
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
        await connectToDB();
        console.log("Connected to MongoDB");

        // Get the form data from the request
        const data = await req.formData();
        console.log("Form data received");

        // Get the username, email, password, and profile image from the form data
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
        const file = data.get("profileImage");

        // Check if any of the fields are missing
        if (!username || !email || !password || !file) {
            console.log("Validation error: Missing fields");
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Check if the user already exists in the database
        const hashedPassword = await hash(password, 10);
        console.log("Password hashed");

        // Upload the profile image to Cloudinary
        const buffer = Buffer.from(await file.arrayBuffer());
        const stream = Readable.from(buffer);

        // Upload the file to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.v2.uploader.upload_stream(
                { folder: "user_profiles" },
                (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }
            );
            stream.pipe(uploadStream);
        });
        console.log("File uploaded to Cloudinary");

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profileImagePath: uploadResult.secure_url,
        });

        // Save the user to the database
        await newUser.save();
        console.log("New user saved to database");

        // Return a success response
        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    } catch (error) {
        console.log("Error registering user: ", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
