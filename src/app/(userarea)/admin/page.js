"use client";

import React from "react";
import SearchUsersComponent from "@/components/search/search_users";
import SearchHospitalComponent from "@/components/search/search_hospitals";

export default function AdminOverviewPage() {
  return (
    <React.Fragment>
      <div className="mt-5">
        <SearchHospitalComponent />
      </div>
      <div className="mt-5">
        <SearchUsersComponent />
      </div>
    </React.Fragment>
  );
}
