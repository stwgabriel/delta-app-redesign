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
      <section className="d-flex flex-column align-items-center mt-5">
        {/* <Link className="text-dark align-items-center text-decoration-none" href={ROUTES.SIGNUP_HOSPITAL}>
          Cadastrar hospital
        </Link> */}
      </section>

      {/* <ol className="progress" data-steps="4">
        <li className="done">
          <span className="d-flex name">Foo</span>
          <span className="d-flex step">
            <span className="d-flex">1</span>
          </span>
        </li>
        <li className="done">
          <span className="d-flex name">Bar</span>
          <span className="d-flex step">
            <span className="d-flex">2</span>
          </span>
        </li>
        <li className="active">
          <span className="d-flex name">Baz</span>
          <span className="d-flex step">
            <span className="d-flex">3</span>
          </span>
        </li>
        <li>
          <span className="d-flex name">Quux</span>
          <span className="d-flex step">
            <span className="d-flex">4</span>
          </span>
        </li>
      </ol> */}

      {/* <section style={{ width: "500px", height: "950px" }}>
        <ProgressChart />
      </section> */}

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
