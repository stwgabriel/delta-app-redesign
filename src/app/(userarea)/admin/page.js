"use client";

import React from "react";
import SearchUsersComponent from "@/components/search/search_users";
import SearchHospitalComponent from "@/components/search/search_hospitals";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/variables";
export default function AdminOverviewPage() {
  const router = useRouter();

  return (
    <React.Fragment>
      <button className="btn btn-primary" onClick={() => router.push(ROUTES.ADMIN.SIGNUP_HOSPITAL)}>
        Cadastrar hospital
      </button>

      <div className="mt-5">
        <SearchHospitalComponent />
      </div>
      <div className="mt-5">
        <SearchUsersComponent />
      </div>
    </React.Fragment>
  );
}
