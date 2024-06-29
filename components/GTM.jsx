// components/GTM.jsx
"use client";
import { useEffect } from "react";

const GTM = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-QYCV4E18Z6";
    document.head.appendChild(script);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-QYCV4E18Z6');
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(script2);
    };
  }, []);

  return null;
};

export default GTM;
