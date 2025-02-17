"use client";
import { useAPIContext } from "@/contexts/api";
import { ROUTES } from "@/utils/variables";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import "./page.css";

export default function Home() {
  const router = useRouter();

  // const { isLoggedConsultor, isLoggedDoctor, isTokenLoaded } = useAPIContext();

  // useEffect(() => {
  //   if (isTokenLoaded) {
  //     if (isLoggedConsultor) {
  //       router.push(ROUTES.LANDING_PAGE_CONSULTOR);
  //     } else if (isLoggedDoctor) {
  //       router.push(ROUTES.LANDING_PAGE_DOCTOR);
  //     }
  //   }
  // }, [isTokenLoaded]);

  // const { notifyConfirm } = useClientNotificationContext();
  //
  // useEffect(async () => {
  //   navigator.serviceWorker.register("service-worker.js").then(async (serviceWorker) => {
  //     let subscription = await serviceWorker.pushManager.getSubscription();
  //     if (!subscription) {
  //       const publicKeyResponse = await fetch("http://localhost:8000/public_key");
  //       const publicKeyData = await publicKeyResponse.json();
  //       subscription = await serviceWorker.pushManager.subscribe({
  //         userVisibleOnly: true,
  //         applicationServerKey: publicKeyData.publicKey,
  //       });
  //     }

  //     await fetch("http://localhost:8000/register", { method: "POST", body: JSON.stringify(subscription) });
  //     console.log(subscription);
  //   });

  //   // window.Notification.requestPermission((permission) => {
  //   //   if (permission === "granted") {
  //   //     new window.Notification("Habis", { body: "teste" });
  //   //   }
  //   // });
  // }, []);

  return (
    <>
      <section className="d-flex justify-content-end">
        <span className="px-3 py-2 default-color clickable" onClick={() => router.push(ROUTES.LANDING_PAGE_CONSULTOR)}>
          Área do colaborador
        </span>
      </section>
      <section
        className="d-flex flex-column flex-fill  flex-grow align-items-center justify-content-center"
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <Image src="/img1.avif" layout="fill" objectFit="cover" style={{ zIndex: -10, opacity: 0.5 }} />
        <h3 className="fs-2 default-color">Instituto Delta</h3>
        <hr style={{ height: "2px", background: "#000", width: "300px" }} />
        <span className="default-color">Uma equipe exclusiva de neurologistas especialistas,</span>
        <span className="default-color">buscando fazer a diferença para o seu tratamento</span>
      </section>
      <section className="d-flex align-items-center justify-content-around ">
        <div className="p-3 landing-page-button align-middle align-items-center">
          <span className="default-color clickable">Área do associado</span>
          <span
            className="material-icons fs-1 ms-2"
            style={{ backgroundColor: "#243067", color: "#FFF", borderRadius: "50%" }}
          >
            chevron_right
          </span>
        </div>
        <Image src={"/Screenshot_203.png"} width={100} height={100} />
        <div className="p-3 landing-page-button align-middle align-items-center">
          <span className="default-color">Área do paciente</span>
          <span
            className="material-icons fs-1 ms-2"
            style={{ backgroundColor: "#243067", color: "#FFF", borderRadius: "50%" }}
          >
            chevron_right
          </span>
        </div>
      </section>
    </>
  );
}
