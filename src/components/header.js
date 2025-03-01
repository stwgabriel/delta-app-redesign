"use client";

import { useAPIContext } from "@/contexts/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Spinner from "./spinner";
import { ROUTES } from "@/utils/variables";

export default function Header() {
  const router = useRouter();
  const { isTokenLoaded, isLoggedConsultor, isLoggedHospital, isLoggedDoctor, logout, isAdmin } = useAPIContext();

  return (
    <nav className="d-flex container navbar justify-content-start">
      <div className="d-flex flex-fill">
        <Link className="px-2 text-decoration-none" style={{ color: "#243067" }} href={ROUTES.HOME}>
          Início
        </Link>
        <Link className="px-2 text-decoration-none" style={{ color: "#243067" }} href={ROUTES.ABOUT}>
          Sobre Nós
        </Link>
        {/* <Link className="px-2 text-decoration-none" style={{ color: "#243067" }} href={ROUTES.TRATAMENTOS}>
        Tratamentos
      </Link> */}
      </div>
      <div className="d-flex flex-column">
        {!isTokenLoaded ? (
          <Spinner />
        ) : isLoggedConsultor ? (
          <div className="d-flex align-items-center">
            <Link
              className="d-flex material-icons fs-1 text-decoration-none text-body"
              style={{ cursor: "pointer" }}
              href={ROUTES.HOME}
            >
              home
            </Link>
            <Link
              className="d-flex material-icons fs-1 text-decoration-none text-body"
              style={{ cursor: "pointer" }}
              href={ROUTES.CONSULTOR.SCHEDULER_PAGE}
            >
              calendar_month
            </Link>
            {isAdmin && (
              <Link
                className="d-flex material-icons fs-1 text-decoration-none text-body"
                style={{ cursor: "pointer" }}
                href={ROUTES.ADMIN.ADMIN_PAGE}
              >
                admin_panel_settings
              </Link>
            )}
            <Link
              className="d-flex material-icons fs-1 text-decoration-none text-body"
              style={{ cursor: "pointer" }}
              href={ROUTES.USER.SETTINGS_PAGE_USER}
            >
              settings
            </Link>
            <span className="d-flex material-icons fs-1" style={{ cursor: "pointer" }} onClick={logout}>
              logout
            </span>
          </div>
        ) : isLoggedDoctor ? (
          <div className="d-flex align-items-center">
            <Link
              className="d-flex material-icons fs-1 text-decoration-none text-body"
              style={{ cursor: "pointer" }}
              href={ROUTES.HOME}
            >
              home
            </Link>
            <Link
              className="d-flex material-icons fs-1 text-decoration-none text-body"
              style={{ cursor: "pointer" }}
              href={ROUTES.USER.SETTINGS_PAGE_USER}
            >
              settings
            </Link>
            <span className="d-flex material-icons fs-1" style={{ cursor: "pointer" }} onClick={logout}>
              logout
            </span>
          </div>
        ) : isLoggedHospital ? (
          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-primary my-2"
              onClick={() => router.push(ROUTES.HOSPITAL.LOGIN_DOCTOR)}
            >
              Entrar Médico
            </button>
            <span
              className="material-icons fs-1"
              style={{ cursor: "pointer" }}
              onClick={() => router.push(ROUTES.HOSPITAL.SETTINGS_PAGE_HOSPITAL)}
            >
              settings
            </span>
            <span className="d-flex material-icons fs-1" style={{ cursor: "pointer" }} onClick={logout}>
              logout
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
  /* return (
    <nav className="d-flex navbar ps-4 p-2" style={{ background: "rgb(34, 139, 240, 0.5)" }}>
      <div className="d-flex justify-content-center">
        <Link className="d-flex text-dark align-items-center text-decoration-none" href={ROUTES.HOME}>
          <Image
            src={"/delta_stroke_icon.webp"}
            width={80}
            height={80}
            style={{ borderRadius: "10%" }}
            priority={100}
            alt="Logo"
          />
          <span className="d-flex fs-1 ps-2">Delta Stroke</span>
        </Link>
      </div>
      <div className="d-flex flex-column me-5">
        {!isTokenLoaded ? (
          <Spinner />
        ) : isLoggedConsultor ? (
          <div className="d-flex align-items-center">
            <Link
              className="d-flex material-icons fs-1 text-decoration-none text-body"
              style={{ cursor: "pointer" }}
              href={ROUTES.HOME}
            >
              home
            </Link>
            <Link
              className="d-flex material-icons fs-1 text-decoration-none text-body"
              style={{ cursor: "pointer" }}
              href={ROUTES.SCHEDULER_PAGE}
            >
              calendar_month
            </Link>
            {isAdmin && (
              <Link
                className="d-flex material-icons fs-1 text-decoration-none text-body"
                style={{ cursor: "pointer" }}
                href={ROUTES.ADMIN_PAGE}
              >
                admin_panel_settings
              </Link>
            )}
            <Link
              className="d-flex material-icons fs-1 text-decoration-none text-body"
              style={{ cursor: "pointer" }}
              href={ROUTES.SETTINGS_PAGE_USER}
            >
              settings
            </Link>
            <span className="d-flex material-icons fs-1" style={{ cursor: "pointer" }} onClick={logout}>
              logout
            </span>
          </div>
        ) : isLoggedDoctor ? (
          <div className="d-flex align-items-center">
            <Link
              className="d-flex material-icons fs-1 text-decoration-none text-body"
              style={{ cursor: "pointer" }}
              href={ROUTES.HOME}
            >
              home
            </Link>
            <Link
              className="d-flex material-icons fs-1 text-decoration-none text-body"
              style={{ cursor: "pointer" }}
              href={ROUTES.SETTINGS_PAGE_USER}
            >
              settings
            </Link>
            <span className="d-flex material-icons fs-1" style={{ cursor: "pointer" }} onClick={logout}>
              logout
            </span>
          </div>
        ) : isLoggedHospital ? (
          <div className="d-flex align-items-center">
            <button type="button" className="btn btn-primary my-2" onClick={() => router.push(ROUTES.LOGIN_DOCTOR)}>
              Entrar Médico
            </button>
            <span
              className="material-icons fs-1"
              style={{ cursor: "pointer" }}
              onClick={() => router.push(ROUTES.SETTINGS_PAGE_HOSPITAL)}
            >
              settings
            </span>
            <span className="d-flex material-icons fs-1" style={{ cursor: "pointer" }} onClick={logout}>
              logout
            </span>
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <button type="button" className="btn btn-primary my-2" onClick={() => router.push(ROUTES.LOGIN_HOSPITAL)}>
              Entrar Hospital
            </button>
            <button type="button" className="btn btn-primary my-2" onClick={() => router.push(ROUTES.LOGIN_CONSULTOR)}>
              Entrar Consultor
            </button>
          </div>
        )}
      </div>
    </nav>
  ); */
}
