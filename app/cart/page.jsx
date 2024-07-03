// app/cart/page.jsx
"use client";
import "@styles/Wishlist.scss";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";

const Cart = () => (
    <>
        <title>Panier - Brekor</title>
        <meta name="description" content="Découvrez et achetez des œuvres d'art uniques sur Brekor." />
        <meta name="keywords" content="acheter art, panier, commandes" />

        <Navbar />
        <div className="navbar-padding-protection"></div>
        <h1 className="title-list">Votre panier</h1>
        <div className="container d-flex flex-column text-white">
          <p>Votre panier est vide.</p>
          <p>Commencez à explorer notre sélection et ajoutez vos œuvres d'art favorites !</p>
        </div>
        <Footer />
    </>
);

export default Cart;
