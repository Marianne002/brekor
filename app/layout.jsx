// app/layout.jsx
import "@styles/globals.css";
import Provider from "@components/Provider";
import GTM from "@components/GTM";

const layout = ({ children }) => {
  return (
    <html lang="fr">
      <head>
        <GTM />
      </head>
      <body>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default layout;
