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
    if (!formDataStep1.email || !formDataStep1.password || !formDataStep1.confirmPassword) {
      setError("Merci de remplir tous les champs.");
      return;
    }
    if (formDataStep1.password !== formDataStep1.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
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
              <h1 className="gradient-color">Créez votre compte</h1>
              <form className="register_content_form" onSubmit={handleSubmitStep1}>
                <label htmlFor="email">Adresse mail</label>
                <input
                  type="email"
                  name="email"
                  value={formDataStep1.email}
                  onChange={handleChangeStep1}
                  required
                />
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  value={formDataStep1.password}
                  onChange={handleChangeStep1}
                  required
                />
                <label htmlFor="confirmPassword">Confirmez votre mot de passe</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formDataStep1.confirmPassword}
                  onChange={handleChangeStep1}
                  required
                />
                <div className="d-flex">
                  <div
                    className="register_content_checkbox"
                  >
                    <input type="checkbox" name="checkbox" />
                  </div>
                  <label htmlFor="rememberMe">Se souvenir de moi</label>
                </div>
                <button className="btn" type="button" onClick={moveToStep2}>
                  Suivant
                </button>
                {error && <p className="register_content_error">{error}</p>}
              </form>
              <div className="d-flex flex-column">
                <div>
                  <p>Ou continuez avec</p>
                </div>
                <div className="d-flex align-items-center justify-content-between column-gap-3">
                  <button className="rs">
                    <img src="/assets/icon-google.svg" alt="Icon Google" />
                  </button>
                  <button className="rs">
                    <img src="/assets/icon-facebook.svg" alt="Icon Facebook" />
                  </button>
                </div>
              </div>
              <a href="/login">Vous avez déjà un compte ? Se connecter</a>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="gradient-color">Profil</h1>
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
                <label htmlFor="username">Pseudo</label>
                <input
                  name="username"
                  value={formDataStep2.username}
                  onChange={handleChangeStep2}
                  required
                />
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={formDataStep2.description}
                  onChange={handleChangeStep2}
                  required
                ></textarea>
                
                <button className="btn" type="submit">Finaliser</button>
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
