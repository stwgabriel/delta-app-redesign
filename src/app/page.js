"use client";
import { useAPIContext } from "@/contexts/api";
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

  return (
    <>
      <section className="flex-column align-items-center mt-5"></section>
      <section className="flex-column mt-5">
        <span className="fs-3 mb-2">Sobre nós: {process.env.NEXT_PUBLIC_TESTE}</span>
        <span className="text-justify">
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
