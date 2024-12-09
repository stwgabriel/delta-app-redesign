import { useEffect, useState } from "react";
import { useStateContext } from "./state";
import { useAPIContext } from "./api";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/utils/variables";

export function useChart(chart_id, redirectToFormSequencePageFlag = false) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useStateContext();
  const { get_chart } = useAPIContext();
  const [chart, setChart] = useState(null);

  useEffect(() => {
    console.log("Checking auth:", isAuthenticated);
    if (isAuthenticated) {
      console.log("Authorized");
      refreshChart();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("Chart changed", chart);
    if (chart) {
      console.log("Chart ready");
      onLoad();
    }
  }, [chart]);

  function onLoad() {
    if (redirectToFormSequencePageFlag) {
      let newUrl = null;
      if (chart.page1_status?.value !== "COMPLETO") {
        newUrl = ROUTES.PRONTUARIO_PAG1;
      } else if (chart.page2_status?.value !== "COMPLETO") {
        newUrl = ROUTES.PRONTUARIO_PAG2;
      } else if (chart.page3_status?.value !== "COMPLETO") {
        newUrl = ROUTES.PRONTUARIO_PAG3;
      } else {
        newUrl = ROUTES.PRONTUARIO;
      }
      if (newUrl && newUrl !== pathname) {
        newUrl = `${newUrl}?chart_id=${chart_id}`;
        console.log("Redirecting to", newUrl);
        router.push(newUrl);
      }
    }
  }

  function refreshChart() {
    get_chart(chart_id).then(setChart).catch(console.error);
  }

  return {
    chart,
    refreshChart,
  };
}
