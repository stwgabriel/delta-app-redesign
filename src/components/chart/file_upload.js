"use client";

import { humanFileSize } from "@/utils/funcs";
import { ProgressBar } from "react-bootstrap";

export default function FileUploadComponent({ obj }) {
  return (
    <div key={`${obj.local_id}`} className="d-flex flex-column border rounded my-1 p-2">
      <div className="d-flex align-items-center">
        <span className="d-flex material-icons fs-1">publish</span>
        <div className="d-flex flex-column align-items-center ps-3">
          <span className="d-flex">{obj.fname}</span>
          <span className="d-flex">{obj.ftype}</span>
        </div>
        <div className="d-flex flex-column align-items-end flex-fill pe-2">
          <span className="d-flex py-1">{parseInt(obj.progress.toFixed(2) * 100)}%</span>
          <span className="d-flex">
            {humanFileSize(obj.loaded)} / {humanFileSize(obj.total)}
          </span>
        </div>
      </div>

      <div className="d-flex flex-column mt-1">
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
