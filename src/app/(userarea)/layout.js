"use client";
import { useRouter } from "next/navigation";
import { useAPIContext } from "@/contexts/api";
import { useStateContext } from "@/contexts/state";
import React, { useEffect } from "react";
import { ROUTES } from "@/utils/variables";

export default function UserLoggedAreaLayout({ children }) {
  const { isLoggedDoctor, isTokenLoaded, isLoggedHospital, isLoggedConsultor } =
    useAPIContext();
  const { setIsAuthenticated } = useStateContext();
  const router = useRouter();
  useEffect(() => {
    if (isTokenLoaded) {
      if (isLoggedDoctor || isLoggedConsultor) {
        setIsAuthenticated(true);
      } else {
        if (isLoggedHospital) {
          console.log("Sending back to doctor login page");
          router.push(ROUTES.LOGIN_DOCTOR);
        } else {
          console.log("Sending back to home page");
          router.push(ROUTES.HOME);
        }
        setIsAuthenticated(false);
      }
    }
  }, [isTokenLoaded]);

  return <React.Fragment>{children}</React.Fragment>;
}
