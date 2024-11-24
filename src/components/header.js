"use client";

import { useAPIContext } from "@/contexts/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Spinner from "./spinner";
import { ROUTES } from "@/utils/variables";

export default function Header() {
  const router = useRouter();
  const {
    isTokenLoaded,
    isLoggedConsultor,
    isLoggedHospital,
    isLoggedDoctor,
    logout,
  } = useAPIContext();

  return (
    <nav className="navbar bg-secondary p-3">
      <div>
        <Link className="text-dark" href={ROUTES.HOME}>
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
        {!isTokenLoaded ? (
          <Spinner />
        ) : isLoggedConsultor ? (
          <div>
            <button
              type="button"
              className="btn btn-primary my-2"
              onClick={logout}
            >
              Sair Consultor
            </button>
          </div>
        ) : isLoggedDoctor ? (
          <div>
            <button
              type="button"
              className="btn btn-primary my-2"
              onClick={logout}
            >
              Sair Doctor
            </button>
          </div>
        ) : isLoggedHospital ? (
          <div>
            <button
              type="button"
              className="btn btn-primary my-2"
              onClick={logout}
            >
              Sair Hospital
            </button>{" "}
            <button
              type="button"
              className="btn btn-primary my-2"
              onClick={() => router.push(ROUTES.LOGIN_DOCTOR)}
            >
              Entrar Doctor
            </button>
          </div>
        ) : (
          <div>
            <button
              type="button"
              className="btn btn-primary my-2"
              onClick={() => router.push(ROUTES.LOGIN_HOSPITAL)}
            >
              Entrar Hospital
            </button>{" "}
            <button
              type="button"
              className="btn btn-primary my-2"
              onClick={() => router.push(ROUTES.LOGIN_CONSULTOR)}
            >
              Entrar Consultor
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
