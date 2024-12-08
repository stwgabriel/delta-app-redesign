"use client";

import { useAPIContext } from "@/contexts/api";
import { useEffect, useState } from "react";
import Spinner from "../spinner";
import AvailableFilesItem from "./available_files_item";
import { useStateContext } from "@/contexts/state";

export default function AvailableFiles({ chart_id, countCompleted }) {
  const [files, setFiles] = useState(null);
  const { isAuthenticated } = useStateContext();
  const { list_chart_files } = useAPIContext();

  useEffect(() => {
    if (!isAuthenticated) return;
    list_chart_files(chart_id).then(setFiles).catch(console.error);
  }, [isAuthenticated, countCompleted]);

  return (
    <div className="flex-column">
      {files === null ? (
        <Spinner />
      ) : (
        files.map((file) => <AvailableFilesItem key={file.id} obj={file} />)
      )}
    </div>
  );
}
