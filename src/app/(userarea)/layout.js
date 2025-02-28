"use client";
import { usePathname, useRouter } from "next/navigation";
import { useAPIContext } from "@/contexts/api";
import React, { useEffect, useState } from "react";
import { ROUTES } from "@/utils/variables";
import LoadingPage from "@/components/loadingPage";

export default function UserLoggedAreaLayout({ children }) {
  const { isLoggedDoctor, isTokenLoaded, isLoggedHospital, isLoggedConsultor, _token } = useAPIContext();

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isTokenLoaded) {
      setIsAuthenticated(isLoggedDoctor || isLoggedConsultor);

      if (isLoggedDoctor || isLoggedConsultor) {
        setIsAuthenticated(true);
      }

      // else {

      //   [].includes(pathname.toLowerCase())

      //   if (isLoggedHospital) {
      //     if (pathname.toLowerCase() !== ROUTES.HOSPITAL.SETTINGS_PAGE_HOSPITAL.toLowerCase()) {
      //       console.log("Sending back to doctor login page");
      //       router.push(ROUTES.LOGIN_DOCTOR);
      //       setIsAuthenticated(false);
      //     } else {
      //       setIsAuthenticated(true);
      //     }
      //   } else {
      //     console.log("Sending back to home page");
      //     router.push(ROUTES.HOME);
      //     setIsAuthenticated(false);
      //   }

      // }
    }
  }, [isTokenLoaded, _token]);

  if (isAuthenticated) {
    return <React.Fragment>{children}</React.Fragment>;
  } else {
    return (
      <React.Fragment>
        <LoadingPage />
      </React.Fragment>
    );
  }
}
