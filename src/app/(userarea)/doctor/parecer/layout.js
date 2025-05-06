'use client'


import { ROUTES } from "@/utils/variables";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function RootLayout({ children }) {
  const router = useRouter();

  useLayoutEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    link.id = 'bootstrap-css';
    document.head.appendChild(link);

    return () => {
      const existingLink = document.getElementById('bootstrap-css');
      if (existingLink) {
        existingLink.remove();
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <button
            onClick={() => router.push(ROUTES.DOCTOR.LANDING_PAGE_DOCTOR)}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            ← Voltar
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
