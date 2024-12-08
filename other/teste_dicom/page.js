"use client";
import React, { useEffect, useRef, useState } from "react";
import cornerstone from "cornerstone-core";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

const DicomViewer = () => {
  const elementRef = useRef(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!file) return;

    // Configura o carregador para arquivos locais
    cornerstoneWADOImageLoader.configure({
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Accept", "application/dicom");
      },
    });

    const element = elementRef.current;

    // Ativa o elemento
    cornerstone.enable(element);

    // Adiciona o arquivo ao File Manager e gera o imageId
    const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);

    // Carrega e exibe a imagem
    cornerstone
      .loadImage(imageId)
      .then((image) => {
        cornerstone.displayImage(element, image);
      })
      .catch((err) => {
        console.error("Erro ao carregar a imagem DICOM:", err);
      });

    return () => {
      cornerstone.disable(element); // Limpeza ao desmontar
    };
  }, [file]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Atualiza o arquivo selecionado
  };

  return (
    <div>
      <h1>Visualizador DICOM</h1>
      <input type="file" accept=".dcm" onChange={handleFileChange} />
      <div
        ref={elementRef}
        style={{
          width: "512px",
          height: "512px",
          border: "1px solid black",
          marginTop: "10px",
        }}
      />
    </div>
  );
};

export default DicomViewer;
