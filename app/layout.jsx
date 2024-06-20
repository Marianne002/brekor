// app/layout.jsx
import "@styles/globals.css";
import Provider from "@components/Provider";

export const metadata = {
  title: "BREKOR",
  description: "BREKOR - Faites briller votre créativité !",
}

const layout = ({children}) => {
  return (
    <html lang="fr">
      <body>
        <Provider>
          <main>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default layout;
