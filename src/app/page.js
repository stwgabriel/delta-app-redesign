"use client";
import { useAPIContext } from "@/contexts/api";
import { ROUTES } from "@/utils/variables";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

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
      <section className="d-flex flex-column flex-fill">
        <div className="d-flex justify-content-end">
          <span
            className="px-3 py-2 default-color clickable"
            onClick={() => router.push(ROUTES.CONSULTOR.LANDING_PAGE_CONSULTOR)}
          >
            Área do colaborador
          </span>
        </div>
        <div
          className="d-flex flex-column flex-fill align-items-center justify-content-center"
          style={{ width: "100%", position: "relative", minWidth: "400px" }}
        >
          <Image
            src="/img1.avif"
            className="fading-img"
            layout="fill"
            objectFit="cover"
            alt=""
            style={{ zIndex: -10, opacity: 0.5 }}
          />
          <h3 className="fs-2 default-color">Instituto Delta</h3>
          <hr style={{ height: "2px", background: "#000", width: "300px" }} />
          <span className="default-color">Uma equipe exclusiva de neurologistas especialistas,</span>
          <span className="default-color">buscando fazer a diferença para o seu tratamento</span>
        </div>
        <div className="d-flex align-items-center justify-content-around ">
          <div
            className="d-flex p-3 landing-page-button align-middle align-items-center clickable"
            onClick={() => router.push(ROUTES.DOCTOR.LANDING_PAGE_DOCTOR)}
          >
            <span className="default-color">Área do associado</span>
            <span
              className="material-icons fs-1 ms-2"
              style={{ backgroundColor: "#243067", color: "#FFF", borderRadius: "50%" }}
            >
              chevron_right
            </span>
          </div>
          <Image src={"/Screenshot_203.png"} width={100} height={100} alt="" />
          <div className="d-flex p-3 landing-page-button align-middle align-items-center clickable">
            <span className="default-color">Área do paciente</span>
            <span
              className="material-icons fs-1 ms-2"
              style={{ backgroundColor: "#243067", color: "#FFF", borderRadius: "50%" }}
            >
              chevron_right
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
