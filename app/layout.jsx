// app/layout.jsx
import "@styles/globals.css";
import Provider from "@components/Provider";
import GTM from "@components/GTM";

const layout = ({ children }) => {
  return (
    <html lang="fr">
      <head>
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" 
          crossOrigin="anonymous"
        />
        <GTM />
      </head>
      <body>
        <Provider>
          <main className="bg-darker">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default layout;
