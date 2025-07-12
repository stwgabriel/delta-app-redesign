"use client";

import Spinner from "@/components/spinner";
import { useAPIContext } from "@/contexts/api";
import { ROUTES } from "@/utils/variables";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useClientNotificationContext } from "@/contexts/client_notification";
import SearchChartsComponent from "@/components/search/search_charts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const getStatusStyle = (status) => {
  switch (status) {
    case "INICIADO":
      return "bg-gray-300 text-gray-800";
    case "EM_ATENDIMENTO":
      return "bg-blue-300 text-blue-800";
    case "URGENCIA":
      return "bg-red-200 text-red-900";
    case "ENFERMARIA":
      return "bg-yellow-200 text-yellow-900";
    default:
      return "bg-gray-300 text-gray-800";
  }
};

const formatStatus = (status) => {

  if (!status) return ""
  return `${status}`
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export default function OverviewDoctorPage() {
  const { notifyError } = useClientNotificationContext();
  const { get_my_charts, create_chart } = useAPIContext();
  const router = useRouter();

  const [myCharts, setMyCharts] = useState(null);

  useEffect(() => {
    get_my_charts("INICIADO,EM_ATENDIMENTO")
      .then(setMyCharts)
      .catch((e) => notifyError(e.message));
  }, []);



  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-start sticky top-0 bg-white z-10">
        <SearchChartsComponent />

        <section className="w-full flex justify-end">
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button className="rounded-lg">
                <Plus className="size-4" />
                <span className="">Iniciar novo</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="flex flex-col gap-1">
              <DropdownMenuItem
                className="!bg-purple-100 hover:!bg-purple-200"
                onClick={() => {
                  create_chart("PROTOCOLO_AVC")
                    .then((r) => {
                      router.push(
                        `${ROUTES.DOCTOR.PRONTUARIO_PAG1}?chart_id=${r.id}`
                      );
                    })
                    .catch((e) => notifyError(e.message));
                }}>

                Novo protocolo de AVC

              </DropdownMenuItem>

              <DropdownMenuItem
                className="!bg-red-100 hover:!bg-red-200"
                onClick={() => {
                  create_chart("PARECER", "URGENCIA")
                    .then((r) => {
                      router.push(
                        `${ROUTES.DOCTOR.PARECER}?chart_id=${r.id}`
                      );
                    })
                    .catch((e) => notifyError(e.message));
                }}>
                Parecer de neurologia geral (Urgência)
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => {
                create_chart("PARECER", "ENFERMARIA")
                  .then((r) => {
                    router.push(
                      `${ROUTES.DOCTOR.PARECER}?chart_id=${r.id}`
                    );
                  })
                  .catch((e) => notifyError(e.message));
              }}>
                Parecer de neurologia geral (Enfermaria)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </div>

      <h3 className="text-lg font-semibold">Meus prontuários</h3>

      <ul className="flex flex-col">
        {myCharts === null ? (
          <Spinner />
        ) : (
          myCharts.map((chart) => (
            <li
              key={chart.id}
              role="button"
              className="border-b border-gray-200 justify-between p-4 flex"
              onClick={() =>
                router.push(
                  `${ROUTES.DOCTOR.PRONTUARIO_PAG1}?chart_id=${chart.id}`
                )
              }
            >
              <div className="gap-2 flex flex-col">

                <span className="flex">Paciente: {chart.name?.value || "Não identificado"}</span>
                {chart.open_reason?.value && (
                  <blockquote className="text-sm border-l-2 border-gray-300 pl-2">
                    {chart.open_reason.value}.
                  </blockquote>
                )}
                <span className="text-xs">
                  Criado em: {new Date(chart.logged_at).toLocaleString()}
                </span>

                <div className="flex gap-1">
                  <span className={cn("flex badge bg-primary px-2 font-semibold", getStatusStyle(chart.status?.value))}>
                    {formatStatus(chart.status?.value)}
                  </span>
                  {chart.subtype?.value && (
                    <span className={cn("flex badge bg-primary px-2 font-semibold", getStatusStyle(chart.subtype?.value))}>
                      {formatStatus(chart.subtype?.value)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end relative">



                <ChevronRight className="size-4" />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );

}
