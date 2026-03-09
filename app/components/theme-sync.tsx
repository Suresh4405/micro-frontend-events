"use client";

import { useEffect, useState } from "react";

export default function ThemeSync({ children }: any) {

  const [dark, setDark] = useState(false);

  useEffect(() => {

    const handler = (event: any) => {

      if (event.data?.type === "theme") {
        setDark(event.data.darkMode);
      }

    };

    window.addEventListener("message", handler);

    return () => window.removeEventListener("message", handler);

  }, []);

  return (
    <div className={dark ? "dark-theme" : "light-theme"}>
      {children}
    </div>
  );
}