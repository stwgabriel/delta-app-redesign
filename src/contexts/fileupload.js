import { useState } from "react";
import { useAPIContext } from "./api";
import { uuidv4 } from "@/utils/funcs";
import axios from "axios";

export function useFileUpload(chart_id) {
  const { create_chart_file, complete_file } = useAPIContext();
  const [uploadingFiles, _setUploadingFiles] = useState({});
  const [countCompleted, setCountCompleted] = useState(0);

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

    create_chart_file(chart_id, file.name, file.type).then(
      (presignedUrlResponse) => {
        setUploadingFiles(local_id, { presignedUrlResponse });

        const formData = new FormData();
        for (const [key, value] of Object.entries(
          presignedUrlResponse.presigned_data.fields
        )) {
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
              setCountCompleted((old) => old + 1);
            });
          });
      }
    );
  }

  return {
    uploadingFiles,
    setUploadingFiles,
    upload_file,
    countCompleted,
  };
}
