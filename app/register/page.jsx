"use client";
import "@styles/Register.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();

  // Step 1 State
  const [step, setStep] = useState(1); // Step 1 or Step 2
  const [formDataStep1, setFormDataStep1] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  // Step 2 State
  const [formDataStep2, setFormDataStep2] = useState({
    username: "",
    description: "",
    profileImage: null,
  });

  // Error State
  const [error, setError] = useState("");

  // Move to Step 2
  const moveToStep2 = () => {
    if (formDataStep1.password !== formDataStep1.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setStep(2);
  };

  // Handle form input changes for Step 1
  const handleChangeStep1 = (e) => {
    const { name, value, type, checked } = e.target;
    setFormDataStep1((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form input changes for Step 2
  const handleChangeStep2 = (e) => {
    const { name, value, files } = e.target;
    setFormDataStep2((prevData) => ({
      ...prevData,
      [name]: name === "profileImage" ? files[0] : value,
    }));
  };

  // Handle submission of Step 1
  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    // Validate Step 1 fields here if necessary
    moveToStep2();
  };

  // Handle final submission of Step 2
  const handleSubmitStep2 = async (e) => {
    e.preventDefault();

    try {
      const registerForm = new FormData();

      for (let key in formDataStep1) {
        registerForm.append(key, formDataStep1[key]);
      }
      for (let key in formDataStep2) {
        registerForm.append(key, formDataStep2[key]);
      }

      const response = await fetch("/api/register", {
        method: "POST",
        body: registerForm,
      });

      if (response.ok) {
        router.push("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Registration failed");
      }
    } catch (error) {
      setError("Registration failed: " + error.message);
    }
  };

  return (
    <>
      <title>Inscription - Brekor</title>
      <meta
        name="description"
        content="Créez votre compte pour vendre, acheter ou louer des œuvres d'art en ligne."
      />
      <meta
        name="keywords"
        content="inscription, compte,  plateforme d'art en ligne, rejoindre Brekor, créer un compte Brekor, artistes amateurs"
      />

      <div className="register">
        <div className="register_content">
          {step === 1 && (
            <>
              <h1>Créez votre compte</h1>
              <form className="register_content_form" onSubmit={handleSubmitStep1}>
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={formDataStep1.email}
                  onChange={handleChangeStep1}
                  required
                />
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={formDataStep1.password}
                  onChange={handleChangeStep1}
                  required
                />
                <input
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formDataStep1.confirmPassword}
                  onChange={handleChangeStep1}
                  required
                />
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formDataStep1.rememberMe}
                  onChange={handleChangeStep1}
                />
                <label htmlFor="rememberMe">Remember me</label>
                <button type="button" onClick={moveToStep2}>
                  Next
                </button>
                {error && <p className="error">{error}</p>}
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h1>Profil</h1>
              <form className="register_content_form" onSubmit={handleSubmitStep2}>
              <input
                id="image"
                type="file"
                name="profileImage"
                onChange={handleChangeStep2}
                accept="image/*"
                required
              />
              {formDataStep2.profileImage && (
                <img
                  src={URL.createObjectURL(formDataStep2.profileImage)}
                  alt="Profile"
                  style={{ maxWidth: "80px", maxHeight: "100px" }}
                />
              )}
              <input
                placeholder="Username"
                name="username"
                value={formDataStep2.username}
                onChange={handleChangeStep2}
                required
              />
              <input
                placeholder="Description"
                name="description"
                value={formDataStep2.description}
                onChange={handleChangeStep2}
                required
              />
              
              <button type="submit">Register</button>
              {error && <p className="error">{error}</p>}
            </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
