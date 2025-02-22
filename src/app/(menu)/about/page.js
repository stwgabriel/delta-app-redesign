"use client";
import { useAPIContext } from "@/contexts/api";
import { ROUTES } from "@/utils/variables";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

export default function AboutPage() {
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
        <div
          className="d-flex flex-column flex-fill align-items-center justify-content-center"
          style={{ width: "100%", position: "relative", minWidth: "520px" }}
        >
          <Image
            src="/mesa.jpeg"
            className="fading-img"
            layout="fill"
            objectFit="cover"
            alt=""
            style={{ zIndex: -10, opacity: 0.2 }}
          />
          <h3 className="fs-2 default-color mt-5">NOSSA MISSÃO</h3>
          <hr style={{ height: "2px", background: "#000", width: "300px" }} />
          <span className="default-color text-center">
            Levar o melhor tratamento disponível aos pacientes que sofrem de AVC
          </span>
          <div className="row w-100 text-center mt-5 default-color">
            <div className="col fs-2">Agilizar o atendimento</div>
            <div className="col fs-2">Suporte com Neurologista</div>
            <div className="col fs-2">Atendimento TeleStroke 24 horas / dia</div>
          </div>
          <div className="row w-100 text-center my-2 default-color">
            <div className="col">Levar atendimento especializado a todos os locais</div>
            <div className="col"></div>
            <div className="col"></div>
          </div>
          <div className="row w-100 text-center my-2 default-color">
            <div className="col">Consultoria em tempo real com especialista na emergência</div>
            <div className="col">
              Avaliação conjunta de indicações e contraindicações a terapias de reperfusão cerebral
            </div>
            <div className="col">Educação continuada para médico generealista em emergência</div>
          </div>
        </div>
      </section>
    </>
  );
}
