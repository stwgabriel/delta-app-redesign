"use client";

import Dropzone from "react-dropzone";
import axios from "axios";
import crypto from "crypto";

const presignedurl =
  "https://deltastroke.s3.amazonaws.com/upload/teste.png?AWSAccessKeyId=AKIAZI2LJDIUGPQOCMO4&Signature=wHZ9xKaFV2Nb5V2N23rbXTtntkk%3D&Expires=1730567500";

export default function UploadPage() {
  async function run(filelist) {
    console.log(filelist);

    const file = filelist[0];

    const form = new FormData();
    form.append("file", file);

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Generate MD5 hash for the file
    const hash = crypto.createHash("md5").update(fileBuffer).digest("base64");

    axios.post(presignedurl, form, {
      onUploadProgress: console.log,
      headers: {
        "Content-MD5": hash,
        // "Content-Type": "application/octet-stream",
      },
    });
  }
  return (
    <div>
      {/* <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section className="border">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone> */}

      <input type="file" multiple onChange={(x) => run(x.target.files)} />
    </div>
  );
}
