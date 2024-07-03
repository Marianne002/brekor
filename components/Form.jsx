// components/Form.jsx
import "@styles/Form.scss";
import { categories } from "@data";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";

const Form = ({ type, work, setWork, handleSubmit }) => {
    // Upload photos to Cloudinary
    const handleUploadPhotos = async (e) => {
        try {
            const newPhotos = e.target.files;
            const uploadedPhotoUrls = [];

            // Upload each photo to Cloudinary
            for (const photo of newPhotos) {
                const formData = new FormData();
                formData.append("file", photo);
                formData.append("upload_preset", "bb8bzcem");

                console.log("Uploading photo to Cloudinary...");

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

            // Add the uploaded photo URLs to the work state
            setWork((prevWork) => ({
                ...prevWork,
                photos: [...prevWork.photos, ...uploadedPhotoUrls],
            }));
        } catch (error) {
            console.error("Error uploading photo to Cloudinary:", error);
        }
    };

    // Remove a photo from the work state
    const handleRemovePhoto = (indexToRemove) => {
        setWork((prevWork) => ({
            ...prevWork,
            photos: prevWork.photos.filter((_, index) => index !== indexToRemove),
        }));
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setWork((prevWork) => ({
            ...prevWork,
            [name]: value,
        }));
    };

    return (
        <div className="container form">
            <h1>{type} votre publication</h1>
            <form onSubmit={handleSubmit}>
                <h3>Quelle catégorie décrit le mieux votre oeuvre ?</h3>
                <div className="category-list">
                    {categories.map((item, index) => (
                        <p
                            key={index}
                            className={`${work.category === item ? "selected" : ""}`}
                            onClick={() => setWork({ ...work, category: item })}
                        >
                            {item}
                        </p>
                    ))}
                </div>

                <h3>Ajoutez quelques photos</h3>
                <div className="photos">
                    <input
                        id="image"
                        type="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleUploadPhotos}
                        multiple
                    />
                    <label htmlFor="image" className="alone">
                        <div className="icon">
                            <IoIosImages />
                        </div>
                        <p>Télécharger depuis votre appareil</p>
                    </label>

                    {work.photos.length > 0 && (
                        <div className="photos">
                            {work.photos.map((photo, index) => (
                                <div key={index} className="photo">
                                    <img src={photo} alt="work" />
                                    <button type="button" onClick={() => handleRemovePhoto(index)}>
                                        <BiTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="description">
                    <h4>Titre</h4>
                    <input
                        type="text"
                        placeholder="Titre"
                        onChange={handleChange}
                        name="title"
                        value={work.title}
                        required
                    />
                    <h4>Description </h4>
                    <textarea
                        type="text"
                        placeholder="Description"
                        onChange={handleChange}
                        name="description"
                        value={work.description}
                        required
                    />
                    <h4>Prix</h4>
                    <input
                        type="number"
                        placeholder="Prix"
                        onChange={handleChange}
                        name="price"
                        value={work.price}
                        required
                        className="price"
                    />
                </div>
                <button className="btn-gradient mt-4" type="submit">
                    Publier votre œuvre
                </button>
            </form>
        </div>
    );
};

export default Form;
