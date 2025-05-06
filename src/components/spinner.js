import { Loader, Loader2 } from "lucide-react";

export default function Spinner({ className }) {
  return (
    <div className={`flex w-full h-full items-center justify-center ${className}`} role="status">
      <Loader className="size-4 animate-spin" />
      <span className="sr-only">Carregando...</span>
    </div>
  );
}
