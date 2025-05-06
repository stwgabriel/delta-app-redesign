"use client";
import { usePathname, useRouter } from "next/navigation";
import { useAPIContext } from "@/contexts/api";
import React, { Suspense, useEffect, useState } from "react";
import { ROUTES } from "@/utils/variables";
import LoadingPage from "@/components/loadingPage";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Spinner from "@/components/spinner";

export default function UserLoggedAreaLayout({ children }) {
  const {
    isLoggedDoctor,
    isTokenLoaded,
    isLoggedHospital,
    isLoggedConsultor,
    _token,
  } = useAPIContext();

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isTokenLoaded) {
      setIsUserAuthenticated(isLoggedDoctor || isLoggedConsultor);

      if (Object.values(ROUTES.CONSULTOR).includes(pathname.toLowerCase())) {
        // Consultor routes
        if (!isLoggedConsultor) {
          router.push(ROUTES.LOGIN_CONSULTOR);
          return;
        }
      } else if (
        Object.values(ROUTES.DOCTOR).includes(pathname.toLowerCase())
      ) {
        // Doctor routes
        if (!isLoggedDoctor) {
          router.push(ROUTES.HOSPITAL.LOGIN_DOCTOR);
          return;
        }
      } else if (Object.values(ROUTES.USER).includes(pathname.toLowerCase())) {
        // User routes
        if (!isLoggedDoctor && !isLoggedConsultor) {
          router.push(ROUTES.HOME);
          return;
        }
      } else if (
        Object.values(ROUTES.HOSPITAL).includes(pathname.toLowerCase())
      ) {
        // Hospital routes
        if (!isLoggedHospital) {
          router.push(ROUTES.LOGIN_HOSPITAL);
          return;
        }
      } else if (Object.values(ROUTES.ADMIN).includes(pathname.toLowerCase())) {
        // Admin routes
        if (!isLoggedConsultor) {
          router.push(ROUTES.LOGIN_CONSULTOR);
          return;
        }
      }
    }
  }, [isTokenLoaded, _token]);

  if (isUserAuthenticated) {
    return (
      <SidebarProvider className="w-full">
        <Suspense fallback={<Spinner />}>
          <AppSidebar />
        </Suspense>

        <main className="w-full py-6 px-4">{children}</main>
      </SidebarProvider>
    );
  } else {
    return (
      <React.Fragment>
        <LoadingPage />
      </React.Fragment>
    );
  }
}
