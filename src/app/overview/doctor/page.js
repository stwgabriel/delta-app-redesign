"use client";

import { useAPIContext } from "@/contexts/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OverviewDoctorPage() {
  const { isTokensLoaded, isLoggedDoctor } = useAPIContext();
  const router = useRouter();

  useEffect(() => {
    if (isTokensLoaded && !isLoggedDoctor) router.push("/");
  }, [isLoggedDoctor]);

  return <span>Overview Doctor Page</span>;
}
