"use client";

import AdminUserComponent from "@/components/admin/adm_user";
import AdminHospitaisComponent from "@/components/admin/adm_hospital";
import React from "react";

export default function AdminOverviewPage() {
  return (
    <React.Fragment>
      <AdminHospitaisComponent />
      <AdminUserComponent />
    </React.Fragment>
  );
}
