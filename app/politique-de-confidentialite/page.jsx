// app/politique-de-confidentialite/page.jsx
import React from 'react';
import Footer from '@components/Footer';
import Navbar from '@components/Navbar';

const PolitiqueConfidentialite = () => {
  return (
    <>
        <title>Politique de Confidentialite - Brekor</title>
        <meta name="description" content="Découvrez notre politique de confidentialité." />
        <meta name="keywords" content="politique de confidentialité" />

        <Navbar />
        {/* Section Politique de confidentialité */}
        <section className="container">
            <h1 className="featurette-heading">Politique de confidentialité</h1>

            <p>
                Merci d'utiliser Brekor. La présente politique de confidentialité décrit comment Brekor collecte, utilise et protège vos informations lorsque vous utilisez notre plateforme.
            </p>

            <h2 className="pt-4">Table des matières</h2>
            
            <ol className="table-of-contents">
                <li>
                    <a 
                        href="/politique-de-confidentialite#collecte-des-informations-personnelles"
                        aria-label="Collecte des informations personnelles"
                        aria-controls="collecte-des-informations-personnelles"
                        >
                        Collecte des informations personnelles
                    </a>
                </li>
                <li>
                    <a 
                        href="/politique-de-confidentialite#utilisation-des-informations"
                        aria-label="Utilisation des informations"
                        aria-controls="utilisation-des-informations"
                        >
                        Utilisation des informations
                    </a>
                </li>
                <li>
                    <a 
                        href="/politique-de-confidentialite#protection-des-informations"
                        aria-label="Protection des informations"
                        aria-controls="protection-des-informations"
                        >
                        Protection des informations
                    </a>
                </li>
                <li>
                    <a 
                        href="/politique-de-confidentialite#partage-des-informations"
                        aria-label="Partage des informations"
                        aria-controls="partage-des-informations"
                        >
                        Partage des informations
                    </a>
                </li>
                <li>
                    <a 
                        href="/politique-de-confidentialite#vos-choix-et-droits"
                        aria-label="Vos choix et droits"
                        aria-controls="vos-choix-et-droits"
                        >
                        Vos choix et droits
                    </a>
                </li>
                <li>
                    <a 
                        href="/politique-de-confidentialite#modifications-de-la-politique-de-confidentialite"
                        aria-label="Modifications de la politique de confidentialité"
                        aria-controls="modifications-de-la-politique-de-confidentialite"
                        >
                        Modifications de la politique de confidentialité
                    </a>
                </li>
                <li>
                    <a 
                        href="/politique-de-confidentialite#contact"
                        aria-label="Contact"
                        aria-controls="contact"
                        >
                        Contact
                    </a>
                </li>
            </ol>
            
            {/* Collecte des informations personnelles */}
            <article 
                id="collecte-des-informations-personnelles" 
                aria-labelledby="collecte-des-informations-personnelles-heading"
            >
                <h2 id="collecte-des-informations-personnelles-heading">1. Collecte des informations personnelles</h2>
                <p>Nous collectons les informations suivantes lorsque vous utilisez Brekor :</p>
                <ul>
                    <li>
                        <b>Informations fournies par l'utilisateur :</b> 
                        Lorsque vous créez un compte sur Brekor, nous collectons des informations telles que votre nom, adresse e-mail, numéro de téléphone, et d'autres informations nécessaires à votre inscription et à l'utilisation de nos services.
                    </li>
                    <li>
                        <b>
                            Informations sur les transactions :
                        </b> 
                        Si vous effectuez des transactions sur Brekor, telles que l'achat ou la location d'œuvres d'art, nous collectons les informations nécessaires au traitement de ces transactions, y compris les détails de paiement.
                    </li>
                    <li>
                        <b>
                            Informations techniques :
                        </b> 
                        Nous collectons des informations techniques lorsque vous utilisez notre site web, y compris votre adresse IP, le type de navigateur que vous utilisez, vos données de connexion, et des informations sur votre appareil et votre logiciel.
                    </li>
                </ul>
            </article>
            {/* End Collecte des informations personnelles */}

            {/* Utilisation des informations */}
            <article 
                id="utilisation-des-informations" 
                aria-labelledby="utilisation-des-informations-heading"
            >
                <h2 id="utilisation-des-informations-heading">2. Utilisation des informations</h2>
                <p>
                    Les informations collectées par Brekor sont utilisées aux fins suivantes :
                </p>
                <ul>
                    <li>
                        Pour fournir et gérer nos services, y compris pour vous permettre de créer et de gérer votre profil, de publier et de gérer vos œuvres d'art, et de faciliter les transactions.
                    </li>
                    <li>
                        Pour personnaliser et améliorer votre expérience sur Brekor, y compris en vous recommandant des œuvres d'art et des artistes qui pourraient vous intéresser.
                    </li>
                    <li>
                        Pour communiquer avec vous, notamment pour vous envoyer des notifications importantes relatives à votre compte et à nos services, ainsi que pour répondre à vos demandes de support.
                    </li>
                </ul>
            </article>
            {/* End Utilisation des informations */}

            {/* Protection des informations */}
            <article 
                id="protection-des-informations" 
                aria-labelledby="protection-des-informations-heading"
            >
                <h2 id="protection-des-informations-heading">3. Protection des informations</h2>
                <p>
                    Nous prenons des mesures techniques et organisationnelles appropriées pour protéger vos informations contre la perte, l'utilisation abusive, l'accès non autorisé, la divulgation, l'altération ou la destruction non autorisée.
                </p>
            </article>
            {/* End Protection des informations */}

            {/* Partage des informations */}
            <article 
                id="partage-des-informations" 
                aria-labelledby="partage-des-informations-heading"
            >
                <h2 id="partage-des-informations-heading">4. Partage des informations</h2>
                <p>
                    Brekor peut partager vos informations personnelles dans les cas suivants :
                </p>
                <ul>
                    <li>
                        Avec des tiers lorsque cela est nécessaire pour fournir nos services, comme avec des processeurs de paiement pour traiter les transactions.
                    </li>
                    <li>
                        Avec des tiers pour vous fournir des services additionnels que vous avez demandés, comme des services de livraison d'œuvres d'art.
                    </li>
                    <li>
                        Lorsque cela est exigé par la loi ou dans le cadre d'une procédure judiciaire.
                    </li>
                </ul>
            </article>
            {/* End Partage des informations */}

            {/* Vos choix et droits */}
            <article 
                id="vos-choix-et-droits" 
                aria-labelledby="vos-choix-et-droits-heading"
            >
                <h2 id="vos-choix-et-droits-heading">5. Vos choix et droits</h2>
                <p>
                    Vous pouvez accéder à vos informations personnelles, les mettre à jour, ou demander leur suppression en nous contactant à <strong>agence.lavender@gmail.com</strong>.
                    <br/>
                    Vous pouvez également choisir de recevoir ou de ne pas recevoir certaines communications promotionnelles de notre part en ajustant vos préférences de notification dans votre compte Brekor.
                </p>
            </article>
            {/* End Vos choix et droits */}

            {/* Modifications de la politique de confidentialité */}
            <article 
                id="modifications-de-la-politique-de-confidentialite" 
                aria-labelledby="modifications-de-la-politique-de-confidentialite-heading"
            >
                <h2 id="modifications-de-la-politique-de-confidentialite-heading">6. Modifications de la politique de confidentialité</h2>
                <p>
                    Brekor peut modifier cette politique de confidentialité de temps à autre.
                    <br/>
                    Les modifications seront publiées sur cette page avec une date de mise à jour indiquée. Nous vous encourageons à consulter cette politique régulièrement pour rester informé de nos pratiques de confidentialité.
                </p>
            </article>
            {/* End Modifications de la politique de confidentialité */}

            {/* Contact */}
            <article 
                id="contact" 
                aria-labelledby="contact-heading"
            >
                <h2 id="contact-heading">7. Contact</h2>
                <p>
                    Si vous avez des questions concernant cette politique de confidentialité ou les pratiques de Brekor en matière de confidentialité, veuillez nous contacter à <strong>agence.lavender@gmail.com</strong>.
                </p>
            </article>
            {/* End Contact */}
        </section>
        {/* End Section Politique de confidentialité */}
        <Footer />
    </>
  );
}

export default PolitiqueConfidentialite;