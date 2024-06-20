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
        <div className="form">
            <h1>{type} Your Work</h1>
            <form onSubmit={handleSubmit}>
                <h3>Which of these categories best describes your work?</h3>
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

                <h3>Add some photos of your work</h3>
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
                        <p>Upload from your device</p>
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

                <h3>What makes your Work attractive?</h3>
                <div className="description">
                    <p>Title</p>
                    <input
                        type="text"
                        placeholder="Title"
                        onChange={handleChange}
                        name="title"
                        value={work.title}
                        required
                    />
                    <p>Description</p>
                    <textarea
                        type="text"
                        placeholder="Description"
                        onChange={handleChange}
                        name="description"
                        value={work.description}
                        required
                    />
                    <p>Now, set your PRICE</p>
                    <span>$</span>
                    <input
                        type="number"
                        placeholder="Price"
                        onChange={handleChange}
                        name="price"
                        value={work.price}
                        required
                        className="price"
                    />
                </div>
                <button className="submit_btn" type="submit">
                    PUBLISH YOUR WORK
                </button>
            </form>
        </div>
    );
};

export default Form;
