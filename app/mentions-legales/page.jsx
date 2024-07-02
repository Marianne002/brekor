// app/mentions-legales/page.jsx
import "@styles/StaticPage.scss";
import React from 'react';
import Footer from '@components/Footer';
import Navbar from '@components/Navbar';

const MentionsLegales = () => {
  return (
    <>
        <title>Mentions Légales - Brekor</title>
        <meta name="description" content="Mentions légales du site Brekor." />
        <meta name="keywords" content="mentions légales" />

        <Navbar />
        <div className="navbar-padding-protection"></div>
        {/* Section Mentions Legales--> */}
        <section className="container">
            <h1 className="featurette-heading">Mentions légales</h1>
            <p>
                En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs brekor.fr les informations suivantes :
            </p>

            {/* Editeur */}
            <h2 className="pt-4">Éditeur du site</h2>
            <p>
                <strong>Adresse :</strong>
                <br/>
                Digital Campus
                <br/>
                8 bis Rue de la Fontaine au Roi
                <br/>
                75011 Paris
            </p>
            <p>
                <strong>Téléphone :</strong> 01 02 03 04 05
            </p>
            <p>
                <strong>Mail :</strong> agence.lavender@gmail.com
            </p>
            {/* End Editeur */}

            {/* Responsable publication */}
            <h2 className="pt-4">Responsable publication</h2>
            <p>
                <strong>Agence Lavender</strong>
            </p>
            {/* End Responsable publication */}

            {/* Hebergeur */}
            <h2 className="pt-4">Hébergeur</h2>
            <p>
                La plateforme est hébergée sur l'infrastructure cloud de <strong>Vercel Inc</strong>. Vercel, anciennement ZEIT, est une société américaine de Platform as a Service (PaaS) dont le siège social se situe San Francisco, États-Unis - https://vercel.com/.
            </p>
            {/* End Hebergeur */}
        </section>
        {/* End Section Mentions Legales--> */}
        <Footer />
    </>
  )
}

export default MentionsLegales;