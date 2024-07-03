// app/order/page.jsx
"use client";
import "@styles/Wishlist.scss";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";

const Order = () => (
  <>
    <title>Panier - Brekor</title>
    <meta name="description" content="Consultez et gérez vos commandes passées et en cours sur Brekor." />
    <meta name="keywords" content="vendre art, louer art, commandes" />

    <Navbar />
    <div className="navbar-padding-protection"></div>
    <h1 className="title-list">Vos commandes</h1>
    <div className="container d-flex flex-column text-white">
      <p>Vous n'avez aucune commande en cours.</p>
      <p>Parcourez nos collections pour trouver des œuvres qui vous inspirent !</p>
    </div>
    <Footer />
  </>
);

export default Order;
