// app/conditions-generales-utilisation/page.jsx
import "@styles/StaticPage.scss";
import React from 'react';
import Footer from '@components/Footer';
import Navbar from '@components/Navbar';

const CGU = () => {
  return (
    <>
        <title>Conditions Générales d'Utilisation - Brekor</title>
        <meta name="description" content="Consultez nos conditions générales d'utilisation." />
        <meta name="keywords" content="cgu, conditions générales d'utilisation" />

        <Navbar />
        <div className="navbar-padding-protection"></div>
        {/* Section Conditions generales d'utilisation */}
        <section className="container" aria-label="Conditions générales d'utilisation">
            <h1>Conditions générales d'utilisation</h1>

            <p>
                Les présentes Conditions Générales d'Utilisation (ci-après "CGU") régissent l'utilisation de la plateforme Brekor (ci-après "la Plateforme"), propriété de Agence Lavender. En accédant à la Plateforme ou en l'utilisant de quelque manière que ce soit, vous acceptez d'être lié par ces CGU.
                <br/>
                Si vous n'acceptez pas ces CGU, veuillez ne pas accéder à la Plateforme ni l'utiliser.
            </p>

            <h2 className="pt-4">Table des matières</h2>
            
            <ol className="table-of-contents">
                <li>
                    <a 
                        href="/conditions-generales-utilisation#definition"
                        aria-label="Définitions"
                        aria-controls="definition"
                        >
                        Définitions
                    </a>
                </li>
                <li>
                    <a 
                        href="/conditions-generales-utilisation#utilisation-de-la-plateforme"
                        aria-label="Utilisation de la plateforme"
                        aria-controls="utilisation-de-la-plateforme"
                    >
                        Utilisation de la plateforme
                    </a>
                </li>
                <li>
                    <a 
                        href="/conditions-generales-utilisation#propriete-intellectuelle"
                        aria-label="Propriété intellectuelle"
                        aria-controls="propriete-intellectuelle"
                    >
                        Propriété intellectuelle
                    </a>
                </li>
                <li>
                    <a 
                        href="/conditions-generales-utilisation#limitation-de-responsabilite"
                        aria-label="Limitation de responsabilité"
                        aria-controls="limitation-de-responsabilite"
                    >
                        Limitation de responsabilité
                    </a>
                </li>
                <li>
                    <a 
                        href="/conditions-generales-utilisation#modifications-des-cgu"
                        aria-label="Modifications des CGU"
                        aria-controls="modifications-des-cgu"
                    >
                        Modifications des CGU
                    </a>
                </li>
                <li>
                    <a 
                        href="/conditions-generales-utilisation#dispositions-generales"
                        aria-label="Dispositions générales"
                        aria-controls="dispositions-generales"
                    >
                        Dispositions générales
                    </a>
                </li>
            </ol>
            
            {/* Definitions  */}
            <article id="definition" aria-labelledby="definition-heading">
                <h2 id="definition-heading">1. Définitions</h2>
                <ul>
                    <li><b>Utilisateur :</b> Toute personne physique ayant accès aux services et/ou fonctionnalités de la plateforme.</li>
                    <li><b>Artiste :</b> Individu utilisant la Plateforme pour exposer, vendre, louer ou promouvoir ses œuvres d'art.</li>
                    <li><b>Œuvre(s) d'art :</b> Créations artistiques mises en ligne sur la Plateforme par les Utilisateurs.</li>
                    <li><b>Plateforme :</b> Désigne la plateforme ainsi que toutes ses fonctionnalités et services associés.</li>
                </ul>
            </article>
            {/* End Definitions  */}

            {/* Utilsation de la plateforme  */}
            <article id="utilisation-de-la-plateforme" aria-labelledby="utilisation-de-la-plateforme-heading">
                <h2 id="utilisation-de-la-plateforme-heading">
                    2. Utilisation de la plateforme
                </h2>
                <h4>
                    2.1 Inscription et Compte Utilisateur
                </h4>
                <p>
                    Pour accéder à certaines fonctionnalités de la Plateforme, vous devez créer un compte utilisateur.
                    <br/>
                    Vous êtes responsable de maintenir la confidentialité de vos identifiants de connexion et de toutes les activités se déroulant sous votre compte.
                </p>

                <h4>
                    2.2 Contenu Utilisateur
                </h4>
                <p>
                    Vous êtes seul responsable du contenu que vous publiez sur la Plateforme, y compris les œuvres d'art et les informations de votre profil. Vous garantissez que tout contenu que vous publiez respecte les droits de propriété intellectuelle et ne viole aucune loi ou régulation applicable.
                </p>

                <h4>
                    2.3 Transactions et Paiements
                </h4>
                <p>
                    Les transactions effectuées via la Plateforme, telles que l'achat ou la location d'œuvres d'art, sont régies par des conditions spécifiques définies par Brekor. Les paiements sont traités par des services tiers et sont soumis à leurs conditions générales.
                </p>

                <h4>
                    2.4 Comportement et Responsabilités
                </h4>
                <p>
                    En utilisant la Plateforme, vous vous engagez à respecter les droits des autres Utilisateurs et à ne pas publier de contenu offensant, diffamatoire ou contraire à la loi. Brekor se réserve le droit de supprimer tout contenu jugé inapproprié.
                </p>
            </article>
            {/* End Utilisation de la plateforme  */}

            {/* Propriete intellectuelle  */}
            <article id="propriete-intellectuelle" aria-labelledby="propriete-intellectuelle-heading">
                <h2 id="propriete-intellectuelle-heading">
                    3. Propriété intellectuelle
                </h2>
                <h4>
                    3.1 Droits d'auteur
                </h4>
                <p>
                    Les œuvres d'art publiées sur la Plateforme sont protégées par les lois sur le droit d'auteur.
                    <br/>
                    Vous conservez tous les droits sur vos œuvres, mais vous accordez à Brekor une licence non exclusive pour utiliser, reproduire et afficher ces œuvres dans le cadre de la promotion et de la gestion de la Plateforme.
                </p>

                <h4>
                    3.2 Marques de Commerce
                </h4>
                <p>
                    Les marques et logos de Brekor sont la propriété de <strong>Agence Lavender</strong>.
                    <br/>
                    Vous vous engagez à ne pas utiliser ces marques sans autorisation préalable écrite de Brekor.
                </p>
            </article>
            {/* End Propriete intellectuelle  */}
            
            {/* Limitation de responsabilite  */}
            <article id="limitation-de-responsabilite" aria-labelledby="limitation-de-responsabilite-heading">
                <h2 id="limitation-de-responsabilite-heading">
                    4. Limitation de responsabilité
                </h2>
                <p>
                    Brekor s'efforce de maintenir la Plateforme accessible et sécurisée.
                    <br/>
                    Cependant, nous ne pouvons garantir l'absence d'interruptions ou d'erreurs.
                    <br/>
                    En aucun cas, Brekor ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation de la Plateforme.
                </p>
            </article>
            {/* End Limitation de responsabilite  */}

            {/* Modifications des CGU  */}
            <article id="modifications-des-cgu" aria-labelledby="modifications-des-cgu-heading">
                <h2 id="modifications-des-cgu-heading">
                    5. Modifications des CGU
                </h2>
                <p>
                    Brekor se réserve le droit de modifier ces CGU à tout moment. Les modifications prendront effet dès leur publication sur la Plateforme.
                    <br/>
                    Il est de votre responsabilité de consulter régulièrement ces CGU pour prendre connaissance des éventuelles mises à jour.
                </p>
            </article>
            {/* End Modifications des CGU  */}

            {/* Dispositions generales  */}
            <article id="dispositions-generales" aria-labelledby="dispositions-generales-heading">
                <h2 id="dispositions-generales-heading">
                    6. Dispositions générales
                </h2>
                <p>
                    Si l'une des dispositions des présentes CGU est jugée invalide ou inapplicable, cela n'affectera pas la validité des autres dispositions.
                </p>
                <p>
                    Les présentes CGU sont régies par le droit français.
                </p>
                <p>
                    Pour toute question concernant ces CGU, veuillez nous contacter à <strong>agence.lavender@gmail.com</strong>.
                </p>
                <p>
                    <b>Dernière mise à jour :</b> 28 juin 2024
                </p>
            </article>
        </section>
        {/* End Section Conditions generales d'utilisation */}
        <Footer />
    </>
  )
}

export default CGU;