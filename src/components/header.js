"use client";

import { useAPIContext } from "@/contexts/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Spinner from "./spinner";

export default function Header() {
  const router = useRouter();
  const {
    isTokensLoaded,
    isLoggedConsultor,
    isLoggedHospital,
    isLoggedDoctor,
    logout_consultor,
    logout_hospital,
    logout_doctor,
  } = useAPIContext();

  return (
    <nav className="navbar bg-secondary p-3">
      <div>
        <Link className="text-dark" href={"/"}>
          <Image
            src={"/delta_stroke_icon.webp"}
            width={80}
            height={80}
            style={{ borderRadius: "10%" }}
            priority={100}
            alt="Logo"
          />
        </Link>
      </div>
      <div className="flex-column me-5">
        {!isTokensLoaded ? (
          <Spinner />
        ) : isLoggedConsultor ? (
          <div>
            <button
              type="button"
              className="btn btn-primary my-2"
              onClick={logout_consultor}
            >
              Sair Consultor
            </button>
          </div>
        ) : isLoggedDoctor ? (
          <div>
            <button
              type="button"
              className="btn btn-primary my-2"
              onClick={logout_doctor}
            >
              Sair Doctor
            </button>
          </div>
        ) : isLoggedHospital ? (
          <div>
            <button
              type="button"
              className="btn btn-primary my-2"
              onClick={logout_hospital}
            >
              Sair Hospital
            </button>{" "}
            <button
              type="button"
              className="btn btn-primary my-2"
              onClick={() => router.push("/login/doctor")}
            >
              Entrar Doctor
            </button>
          </div>
        ) : (
          <div>
            <button
              type="button"
              className="btn btn-primary my-2"
              onClick={() => router.push("/login/hospital")}
            >
              Entrar Hospital
            </button>{" "}
            <button
              type="button"
              className="btn btn-primary my-2"
              onClick={() => router.push("/login/consultor")}
            >
              Entrar Consultor
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
