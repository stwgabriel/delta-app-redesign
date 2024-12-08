"use client";

import { useAPIContext } from "@/contexts/api";
import { humanFileSize } from "@/utils/funcs";
import { ProgressBar } from "react-bootstrap";

export default function FileUploadComponent({ obj }) {
  return (
    <div
      key={`${obj.local_id}`}
      className="flex-column border rounded my-1 p-2"
    >
      <div className="align-items-center">
        <span className="material-icons fs-1">publish</span>
        <div className="flex-column align-items-center ps-3">
          <span>{obj.fname}</span>
          <span>{obj.ftype}</span>
        </div>
        <div className="flex-column align-items-end flex-fill pe-2">
          <span className="py-1">
            {parseInt(obj.progress.toFixed(2) * 100)}%
          </span>
          <span>
            {humanFileSize(obj.loaded)} / {humanFileSize(obj.total)}
          </span>
        </div>
      </div>

      <div className="flex-column mt-1">
        <ProgressBar
          className="mt-1"
          now={obj.progress}
          variant={obj.completed ? "success" : null}
          animated={!obj.completed}
          label={`${parseInt(obj.progress.toFixed(2) * 100)}%`}
          max={1}
        />
      </div>
    </div>
  );
}
