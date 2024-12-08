"use client";

import { useAPIContext } from "@/contexts/api";
import { humanFileSize } from "@/utils/funcs";
import axios from "axios";
import { useState } from "react";
import { ProgressBar } from "react-bootstrap";

export default function AvailableFilesItem({ obj }) {
  const { get_file } = useAPIContext();
  const [downloadData, setDownloadData] = useState(null);

  function download_file() {
    get_file(obj.id).then((downloadData) => {
      console.log(downloadData);
      const { download_url } = downloadData;
      axios
        .get(download_url, {
          onDownloadProgress: setDownloadData,
          responseType: "blob",
        })
        .then((response) => {
          const href = URL.createObjectURL(response.data);
          const link = document.createElement("a");
          link.href = href;
          link.setAttribute("download", obj.fname);
          link.click();
        })
        .catch(console.error);
    });
  }

  return (
    <div
      className="flex-column border rounded my-1 p-2"
      style={{ cursor: "pointer" }}
      onClick={download_file}
    >
      <div className="align-items-center">
        <span className="material-icons fs-1">description</span>
        <div className="flex-column ps-3">
          <span>{obj.fname.substring(0, 30)}</span>
          <span>{obj.ftype}</span>
        </div>
        {downloadData && (
          <div className="flex-column align-items-end flex-fill pe-2">
            <span className="py-1">
              {parseInt(downloadData.progress.toFixed(2) * 100)}%
            </span>
            <span>
              {humanFileSize(downloadData.loaded)} /{" "}
              {humanFileSize(downloadData.total)}
            </span>
          </div>
        )}
      </div>
      {downloadData && (
        <div className="flex-column mt-1">
          <ProgressBar
            className="mt-1"
            now={downloadData.progress}
            variant={downloadData.progress === 1 ? "success" : null}
            animated={downloadData.progress !== 1}
            label={`${parseInt(downloadData.progress.toFixed(2) * 100)}%`}
            max={1}
          />
        </div>
      )}
    </div>
  );
}
