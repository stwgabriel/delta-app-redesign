"use client";
import "react-circular-progressbar/dist/styles.css";

import Dropzone from "react-dropzone";
import axios from "axios";
import { useEffect, useState } from "react";
import { humanFileSize, uuidv4 } from "@/utils/funcs";
import { useAPIContext } from "@/contexts/api";
import { ProgressBar } from "react-bootstrap";
import { CircularProgressbar, CircularProgressbarWithChildren } from "react-circular-progressbar";

const presignedPostData = {
  url: "https://deltastroke.s3.amazonaws.com/",
  fields: {
    key: "upload/teste.png",
    AWSAccessKeyId: "AKIA6KG3RQCDGEI2MM6L",
    policy:
      "eyJleHBpcmF0aW9uIjogIjIwMjQtMTItMDdUMTY6MDg6MDlaIiwgImNvbmRpdGlvbnMiOiBbeyJidWNrZXQiOiAiZGVsdGFzdHJva2UifSwgeyJrZXkiOiAidXBsb2FkL3Rlc3RlLnBuZyJ9XX0=",
    signature: "B1Ul2feB9cttr1RX3MZ1OGcUnZE=",
  },
};

const chart_id = "4a3ba57b-86c1-4f95-8cfb-f32444873ec0";

export default function UploadPage() {
  const { generate_chart_generate_presigned_url, complete_file } = useAPIContext();

  const [uploadingFiles, _setUploadingFiles] = useState({});

  useEffect(() => {
    console.log(uploadingFiles);
  }, [uploadingFiles]);

  function setUploadingFiles(local_file_id, fileUpdate) {
    _setUploadingFiles((old) => {
      return {
        ...old,
        [local_file_id]: { ...(old[local_file_id] || {}), ...fileUpdate },
      };
    });
  }

  async function upload_file(file) {
    const local_id = uuidv4();

    setUploadingFiles(local_id, {
      local_id,
      fname: file.name,
      ftype: file.type,
      progress: 0,
    });

    generate_chart_generate_presigned_url(chart_id).then((presignedUrlResponse) => {
      setUploadingFiles(local_id, { presignedUrlResponse });

      const formData = new FormData();

      // Append all fields from the presigned POST
      for (const [key, value] of Object.entries(presignedUrlResponse.presigned_data.fields)) {
        formData.append(key, value);
      }

      formData.append("file", file);

      const controller = new AbortController();
      setUploadingFiles(local_id, {
        controller,
      });

      axios
        .post(presignedUrlResponse.presigned_data.url, formData, {
          onUploadProgress: (status) => {
            setUploadingFiles(local_id, {
              progress: status.progress,
              total: status.total,
              loaded: status.loaded,
            });
          },
          signal: controller.signal,
        })
        .then(() => {
          complete_file(presignedUrlResponse.file_id).then(() => {
            setUploadingFiles(local_id, { completed: true });
          });
        });
    });
  }

  async function run_upload_files(target) {
    for (const file of target.files) {
      upload_file(file);
    }

    target.value = null;
  }

  return (
    <div className="d-flex flex-column">
      <div className="d-flex">
        {/* <Dropzone onDrop={(acceptedFiles) => run_upload_files(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section className="d-flex border">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p className="d-flex">Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone> */}
        <input type="file" multiple onChange={(x) => run_upload_files(x.target)} />
      </div>

      <div className="d-flex mt-5 flex-column">
        <span className="d-flex">Uploading files</span>

        <div className="d-flex flex-column mt-2">
          {Object.values(uploadingFiles).map((obj) => (
            <div key={`${obj.local_id}`} className="d-flex flex-column border rounded my-1 p-2">
              <div className="d-flex align-items-center justify-content-around">
                <span className="d-flex material-icons fs-1">description</span>
                <span className="d-flex">{obj.fname}</span>
                <span className="d-flex">{obj.ftype}</span>
                <div className="d-flex flex-column align-items-center">
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
          ))}
        </div>
      </div>
    </div>
  );
}
