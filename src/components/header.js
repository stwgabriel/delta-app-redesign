"use client";

import { useAuthContext } from "@/contexts/auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";

export default function Header() {
  const { authInstituicao, authUsuario } = useAuthContext();
  return (
    <nav className="navbar bg-secondary p-3">
      <div>
        <Link className="text-dark" href={"/"}>
          <Image
            src={"/logo.png"}
            width={80}
            height={80}
            style={{ borderRadius: "50%" }}
            priority={100}
            alt="Logo"
          />
        </Link>
      </div>
      <div className="flex-column me-5">
        <span>Instituição:{authInstituicao?.username}</span>
        <span>CPF: {authUsuario?.cpf}</span>
        <span>
          CRM: {authUsuario?.crm_uf}/{authUsuario?.crm_number}
        </span>
      </div>
    </nav>
  );
}
