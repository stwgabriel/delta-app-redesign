"use client";
import { useRouter } from "next/navigation";
import { useAPIContext } from "@/contexts/api";
import { useStateContext } from "@/contexts/state";
import React, { useEffect } from "react";
import { ROUTES } from "@/utils/variables";

export default function DoctorLayout({ children }) {
  const { isLoggedDoctor, isTokenLoaded } = useAPIContext();
  const { setIsAuthenticated } = useStateContext();
  const router = useRouter();
  useEffect(() => {
    if (isTokenLoaded) {
      if (isLoggedDoctor) {
        setIsAuthenticated(true);
      } else {
        console.log("Sending back to doctor login page");
        setIsAuthenticated(false);
        router.push(ROUTES.LOGIN_DOCTOR);
      }
    }
  }, [isTokenLoaded]);

  return <React.Fragment>{children}</React.Fragment>;
}
