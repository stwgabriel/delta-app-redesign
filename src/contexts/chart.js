import { useEffect, useState } from "react";
import { useAPIContext } from "./api";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/utils/variables";
import { useClientNotificationContext } from "./client_notification";

export function useChart(chart_id, redirectToFormSequencePageFlag = false) {
  const { notifyInfo, notifyError } = useClientNotificationContext();
  const pathname = usePathname();
  const router = useRouter();
  const { get_chart, isLoggedConsultor, isLoggedDoctor } = useAPIContext();
  const [chart, setChart] = useState(null);

  useEffect(() => {
    refreshChart(false);
  }, []);

  useEffect(() => {
    console.log("Chart changed", chart);
    if (chart) {
      console.log("Chart ready");
      onLoad();
    }
  }, [chart]);

  function onLoad() {
    if (redirectToFormSequencePageFlag) {
      if (chart.type.value === "AVC") {
        let newUrl = null;
        if (chart.avc_page1_complete?.value !== true) {
          newUrl = ROUTES.DOCTOR.PRONTUARIO_PAG1;
        } else if (chart.avc_page2_complete?.value !== true) {
          newUrl = ROUTES.DOCTOR.PRONTUARIO_PAG2;
        } else if (chart.avc_page3_complete?.value !== true) {
          newUrl = ROUTES.DOCTOR.PRONTUARIO_PAG3;
        } else {
          newUrl = ROUTES.USER.PRONTUARIO;
        }
        if (newUrl && newUrl !== pathname) {
          newUrl = `${newUrl}?chart_id=${chart_id}`;
          console.log("Redirecting to", newUrl);
          router.push(newUrl);
        }
      } else if (chart.type.value === "PARECER") {
        let newUrl = null;
        if (chart.opinion_page1_complete?.value !== true) {
          newUrl = ROUTES.DOCTOR.PARECER;
        } else {
          newUrl = ROUTES.USER.PRONTUARIO;
        }

        if (newUrl && newUrl !== pathname) {
          newUrl = `${newUrl}?chart_id=${chart_id}`;
          console.log("Redirecting to", newUrl);
          router.push(newUrl);
        }
      } else {
        console.warn("Chart type unknown", chart);
      }
    }
  }

  function refreshChart(notify = true) {
    get_chart(chart_id)
      .then((c) => {
        setChart(c);
        if (notify) {
          notifyInfo("Prontuário atualizado");
        }
      })
      .catch((e) => {
        notifyError(e.message);
        if (e?.error_class === "ChartNotFoundError") {
          if (isLoggedConsultor) {
            router.push(ROUTES.CONSULTOR.LANDING_PAGE_CONSULTOR);
          } else if (isLoggedDoctor) {
            router.push(ROUTES.DOCTOR.LANDING_PAGE_DOCTOR);
          } else {
            router.push(ROUTES.HOME);
          }
        }
      });
  }

  return {
    chart,
    refreshChart,
  };
}
