"use client";
// import "./clock.css";
import React, { useRef, useEffect } from "react";

export default function SeilaPage(props) {
  const canvasRef = useRef(null);

  // const draw = (ctx, frameCount) => {
  //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //   ctx.fillStyle = "#000000";
  //   ctx.beginPath();
  //   ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
  //   ctx.fill();
  // };

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");
  //   let frameCount = 0;
  //   draw(context, frameCount);

  //   const interval = setInterval(() => {
  //     draw(context, frameCount);
  //     frameCount++;
  //   }, 100);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return <div ref={canvasRef} {...props} width={400} height={400} />;
}
