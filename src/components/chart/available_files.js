"use client";

import { useAPIContext } from "@/contexts/api";
import { useEffect, useState } from "react";
import Spinner from "../spinner";
import AvailableFilesItem from "./available_files_item";

export default function AvailableFiles({ chart_id, countCompleted }) {
  const [files, setFiles] = useState(null);
  const { list_chart_files } = useAPIContext();

  useEffect(() => {
    list_chart_files(chart_id).then(setFiles).catch(console.error);
  }, [countCompleted]);

  return (
    <div className="d-flex flex-column">
      {files === null ? <Spinner /> : files.map((file) => <AvailableFilesItem key={file.id} obj={file} />)}
    </div>
  );
}
