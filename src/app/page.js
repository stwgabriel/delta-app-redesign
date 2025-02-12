"use client";
import { useAPIContext } from "@/contexts/api";
import { useClientNotificationContext } from "@/contexts/client_notification";
import { ROUTES } from "@/utils/variables";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isLoggedConsultor, isLoggedDoctor, isTokenLoaded } = useAPIContext();
  useEffect(() => {
    if (isTokenLoaded) {
      if (isLoggedConsultor) {
        router.push(ROUTES.LANDING_PAGE_CONSULTOR);
      } else if (isLoggedDoctor) {
        router.push(ROUTES.LANDING_PAGE_DOCTOR);
      }
    }
  }, [isTokenLoaded]);

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
      <section className="d-flex flex-column mt-5">
        <span className="d-flex fs-3 mb-2">Sobre nós</span>
        <span className="d-flex text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet elit purus. Donec mauris ante,
          consequat a aliquet et, vehicula malesuada libero. Vivamus eget magna id quam semper auctor vel vitae nisi.
          Nunc tempor, ligula quis egestas vestibulum, augue lorem vulputate justo, vitae posuere massa nisl vel dui.
          Integer non nulla aliquet, laoreet ipsum vel, molestie quam. Mauris vitae leo vehicula, finibus sem vitae,
          laoreet metus. Mauris sollicitudin vehicula leo ac aliquam. Suspendisse et molestie libero. In hac habitasse
          platea dictumst. Nam quis nulla ipsum. Nam nunc velit, iaculis et odio sed, ultricies consectetur enim.
          Phasellus vel nunc et eros auctor ullamcorper. Quisque eleifend finibus placerat. Integer scelerisque ipsum
          dignissim ex lobortis, sed interdum sem ultricies. Aliquam iaculis tincidunt pharetra. Donec fermentum orci et
          libero malesuada malesuada. Vivamus tristique nec massa nec facilisis. Pellentesque elit urna, scelerisque vel
          dolor et, ultricies condimentum risus.
        </span>
      </section>
    </>
  );
}
