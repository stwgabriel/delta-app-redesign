"use client";

import { useAuthContext } from "@/contexts/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";

export default function Header() {
  const { authData } = useAuthContext();
  return (
    <nav className="navbar bg-secondary p-3">
      <div>
        <Link className="text-dark" href={"/"}>
          <FaHome className="fs-1" />
        </Link>
      </div>
      <div className="flex-column me-5">
        <span>{authData?.hospitalName}</span>
        <span>{authData?.doctorName}</span>
        <span>{authData?.doctorCRM}</span>
      </div>
    </nav>
  );
}
