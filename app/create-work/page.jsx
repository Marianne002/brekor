// app/create-work/page.jsx
"use client";
import React, { useState } from 'react';
import Form from '@components/Form';
import Footer from '@components/Footer';
import Navbar from '@components/Navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const CreateWork = () => {
    // Get the session
    const { data: session } = useSession();
    // Get the router object
    const router = useRouter();

    // Initialize the work state
    const [work, setWork] = useState({
        creator: session?.user?.id || "",
        category: "",
        title: "",
        description: "",
        price: "",
        photos: []
    });

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if the form is valid
        try {
            console.log("Submitting form data:", work);
    
            // Create a new FormData object
            const formData = new FormData();
            formData.append("creator", work.creator);
            formData.append("category", work.category);
            formData.append("title", work.title);
            formData.append("description", work.description);
            formData.append("price", work.price);
            
            // Append each photo to the formData
            for (const photo of work.photos) {
                formData.append("photos", photo);
            }
    
            console.log("Uploading photo(s) to Cloudinary...");
    
            // Upload the photos to Cloudinary
            const response = await fetch("https://api.cloudinary.com/v1_1/dgzdz1jf0/image/upload", {
                method: "POST",
                body: formData
            });
    
            // Check if the photo upload was successful
            if (!response.ok) {
                const errorMessage = await response.text(); // Get the error message from the response
                console.error("Failed to upload photo(s) to Cloudinary:", errorMessage);
                // Ignore Cloudinary upload errors and proceed to save the data in MongoDB
            }
    
            console.log("Submitting form data to server:", formData);
    
            // Submit the form data to the server
            const newWorkResponse = await fetch("/api/work/new", {
                method: "POST",
                body: formData
            });
    
            // Check if the work was published successfully
            if (newWorkResponse.ok) {
                console.log("Work published successfully", await newWorkResponse.json());
                router.push(`/shop?id=${session.user.id}`);
            } else {
                const errorData = await newWorkResponse.text();
                console.error("Error:", errorData);
            }
        } catch (err) {
            console.error("Publish Work failed", err.message);
        }
    };
    
    
    return (
        <>
            <title>Poster une oeuvre - Brekor</title>
            <meta name="description" content="Publiez vos œuvres uniques en ligne et partagez-les avec le monde entier." />
            <meta name="keywords" content="poster oeuvre, vendre art, artistes amateurs, plateforme d'art en ligne" />
            
            <Navbar />
            <div className="navbar-padding-protection"></div>
            <Form 
                type="Créer"
                work={work}
                setWork={setWork}
                handleSubmit={handleSubmit}
            />
            <Footer />
        </>
    );
}

export default CreateWork;
