// app/page.jsx
"use client";
import Navbar from "@components/Navbar";
import Feed from "@components/Feed";
import Footer from "@components/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Home = () => {
  // Get session from useSession hook
  const { data: session } = useSession();

  // Get the router object
  const router = useRouter();

  return (
    <>
      <title>Plateforme pour Artistes Amateurs - Brekor</title>
      <meta name="description" content="Rejoignez Brekor, la plateforme pour artistes amateurs. Vendez, achetez et louez des œuvres d'art en ligne.
" />
      <meta name="keywords" content="artiste amateur en ligne" />

      <Navbar />
      <div className="navbar-padding-protection"></div>
      <section className="container hero-section text-white">
        <div className="hero-text">
          <h1 className="hero-title">
            Connectez, <span className="gradient-color">Créez</span>, et
            <br />
            Vendez : <span className="gradient-color">Propulsez</span>
            <br />
            Votre Art au Sommet
            <br />
            avec Brekor
          </h1>
          <p className="lead">
            Faciliter la mise en relation entre artistes et clients pour maximiser la visibilité, les ventes et les opportunités de collaboration.
          </p>

          <div className="hero-buttons">
            <button 
              className="btn-gradient text-white"
              onClick={() => {
                router.push(`/register`);
              }}
              >
              <b>
                S'incrire
              </b>
            </button>
          </div>
        </div>
      </section>

      <section className="container hero-numbers">
        <div className="row">
          <div className="col d-flex flex-column justify-content-center align-items-center">
            <h2>23
              <span className="text-primary">K</span>
            </h2>
            <h3>Artistes</h3>
          </div>
          <div className="col d-flex flex-column justify-content-center align-items-center">
            <h2>56
              <span className="text-primary">K</span>
            </h2>
            <h3>Œuvres</h3>
          </div>
          <div className="col d-flex flex-column justify-content-center align-items-center">
            <h2>51
              <span className="text-primary">K</span>
            </h2>
            <h3>Ventes</h3>
          </div>
        </div>
      </section>
      <Feed userId={session?.user?.id} />
      <Footer />
    </>
  );
};

export default Home;
