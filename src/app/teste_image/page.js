"use client";
// pages/DicomViewer.js

import { useEffect, useRef } from "react";
import cornerstone from "cornerstone-core";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";

export default function DicomViewer() {
  const cornerstoneElementRef = useRef(null);

  useEffect(() => {
    // Initialize Cornerstone WADO Image Loader
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
    cornerstoneWADOImageLoader.configure({
      beforeSend: (xhr) => {
        // Configure any necessary request headers here
        // xhr.setRequestHeader("Accept", "application/dicom");
      },
    });

    // Enable the Cornerstone element
    const element = cornerstoneElementRef.current;
    cornerstone.enable(element);

    // Load and display a DICOM image
    const imageId =
      "wadouri:https://deltastroke.s3.us-east-1.amazonaws.com/IM-0002-0133.dcm?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLWVhc3QtMSJHMEUCIFhTrAtvupPITv%2BKxI3Cid9gVZt2nOiDfsA6neQE0FP4AiEAo5o5mf1eoAEzpe499mBXC%2Fnvn03YKap41Ll3oMEuXv4q1AMIwP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw5ODQwMDc5MzQwODYiDAm0trhmy5Cps3EJXSqoA0wiKQC7GxYG%2BM%2BFk9LsEkO6zG%2FbPTA%2F%2F99if05eQeAaYtCDRjgx9VHcdYiHJqUbt%2B4q%2FAX5sgXwGXWJ%2BfeVQ09zkhmJDj5kPTkYvOZKsdaP6TFq5zUhwQM9QBsNZErclztoZvjkkwiUipZNbZ3%2BMC2G1mmG%2FrSAl71lKFN28yZFMee%2BQlURNNjmrR45dUAIkuf7ODwT8Rt7FXsruv3GZM2vGLjHzbr%2F2%2BA8bwvy7rr6aq3zONVQA0dQBZXJ%2BrXGoNsgKEmOyEZTTLlOcSrLpAyOvnjXVIf73GpOrsjtzRCWwye0msxzQuvxNCQ7jseIHegfi5ucwx%2B2RdrKI%2BfiGY7mGerNho1wdzbsXyy3RdGIwhBU910uOAbHtf2Exm64CM0%2FB1YzRS%2FmfWST8CJ8QDng56XOtvBGUEvaB41E7Z4mp5iNBKpVb3lSgyvL2X3pts1Klv64k5VJAs3gBV2RFS2B8vvMsJPJN%2FP3wpsnhNeUErJ%2FY9l6Fx04bhhFJs4P%2FuKunlRFXGffotOAJp9elTavR6SYECjXMVEa5UDCm2fzOBR898MBznMw3eeYuQY65AJZyr4A2rZswZ8jvDbDy1szOHAxxxEmQKvPRQ85CgF%2BJ8k63YDWPq0gnKSieFumdUTfvEzt6WrNUdUOxQJFvnt8QSYNPJsLsffm80xj%2BeMPtAom2okrjzHWCHGp%2Fln%2Fl9u5jb6yir6mxkUJ3ZUsEk11yxSI%2B3hE58RxP3bxYLlZp8DJmCQo6l%2B3zU8h%2BcKXSwvEHPM09ws%2BBvAav1MAxIfWozAqO%2Fp%2FtcS9p4lye%2FkIixn0dpBcMQFGi0mBLFEDJpT%2Fo5x45WsYWtgO1kMwc3nS%2F5TtIl36PTwmwl%2FchZcIJK6oXF4PlPQ%2FFlkgzr4BSUpP7OdgRjNdn9XT1sX561AL75gTGA59NkqTQEpeoIdq%2F0gwcRkbii9sGMd%2F1UrE%2BEXtrY3iaU7mG56IyNLhPloQTkQ3%2BfezL%2F8c8CWjFxKjeaR3Px1eadqdfvY3JLX%2ByhA2O%2FQtiFdWejJXY7AinGX6Wdtd5A%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA6KG3RQCDA533PE4A%2F20241102%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241102T150700Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6675555c13665c7481ed7b7e7969dacd5d4a097336283840ab7dca73487df7dd"; // Replace with your DICOM file URL
    cornerstone.loadAndCacheImage(imageId).then((image) => {
      cornerstone.displayImage(element, image);
    });

    return () => {
      cornerstone.disable(element); // Clean up on unmount
    };
  }, []);

  return (
    <div>
      <h1>DICOM Viewer</h1>
      <div
        ref={cornerstoneElementRef}
        style={{
          width: "512px",
          height: "512px",
          backgroundColor: "black",
        }}
      />
    </div>
  );
}
