// app/update-work/page.jsx
"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@components/Loader";
import Form from "@components/Form";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const UpdateWorkContent = () => {
    // Get the session
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const workId = searchParams.get("id");
    const router = useRouter();

    // State to store the loading status
    const [loading, setLoading] = useState(true);
    const [work, setWork] = useState({
        category: "",
        title: "",
        description: "",
        price: "",
        photos: [],
    });

    // Fetch the work details
    useEffect(() => {
        const getWorkDetails = async () => {
            const response = await fetch(`/api/work/${workId}`);
            const data = await response.json();
            setWork({
                category: data.category,
                title: data.title,
                description: data.description,
                price: data.price,
                photos: data.workPhotoPaths,
            });
            setLoading(false);
        };

        if (workId) {
            getWorkDetails();
        }
    }, [workId]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Soumission des données du formulaire:", work);
    
            // Download photos to Cloudinary
            const uploadedPhotoUrls = [];
            for (const photo of work.photos) {
                if (typeof photo === "string" && photo.startsWith("http")) {
                    uploadedPhotoUrls.push(photo);
                } else {
                    const formData = new FormData();
                    formData.append("file", photo);
                    formData.append("upload_preset", "bb8bzcem");
    
                    const response = await fetch("https://api.cloudinary.com/v1_1/dgzdz1jf0/image/upload", {
                        method: "POST",
                        body: formData,
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        uploadedPhotoUrls.push(data.secure_url);
                    } else {
                        const errorMessage = await response.text();
                        console.error("Échec du téléchargement des photos sur Cloudinary:", errorMessage);
                        return;
                    }
                }
            }
    
            const updatedWork = {
                ...work,
                photos: uploadedPhotoUrls,
            };
    
            console.log("Soumission des données de travail mises à jour au serveur:", updatedWork);
    
            // Create a FormData object to send the updated work data
            const formData = new FormData();
            formData.append("creator", updatedWork.creator);
            formData.append("category", updatedWork.category);
            formData.append("title", updatedWork.title);
            formData.append("description", updatedWork.description);
            formData.append("price", updatedWork.price);
            for (const photo of updatedWork.photos) {
                formData.append("photos", photo);
            }
    
            const updateWorkResponse = await fetch(`/api/work/${workId}`, {
                method: "PATCH",
                body: formData,
            });
    
            if (updateWorkResponse.ok) {
                console.log("Work updated successfully");
                router.push(`/shop?id=${session.user.id}`);
            } else {
                const errorText = await updateWorkResponse.text();
                console.error("Update error : ", errorText);
            }
        } catch (err) {
            console.error("Update Work failed", err.message);
        }
    };
    

    return loading ? <Loader /> : (
        <>
            <title>Modifier le travail - Brekor</title>
            <meta name="description" content="Modifiez les détails d'une œuvre d'art sur Brekor. Mettez à jour la catégorie, le titre, la description, le prix et les photos pour offrir une expérience artistique enrichissante." />
            <meta name="keywords" content="modifier œuvre d'art, mise à jour œuvre, éditer catégorie œuvre, modifier titre, actualiser description œuvre, modifier prix art, télécharger photos art" />
            
            <Navbar />
            <div className="navbar-padding-protection"></div>
            <Form
                type="Modifier"
                work={work}
                setWork={setWork}
                handleSubmit={handleSubmit}
            />
            <Footer />
        </>
    );
};

const UpdateWork = () => (
    <Suspense fallback={<Loader />}>
        <UpdateWorkContent />
    </Suspense>
);

export default UpdateWork;
