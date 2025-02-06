"use client";

import "./progress.css";

export default function ProgressChart({}) {
  return (
    <ol className="progresssa" data-steps="4">
      <li className="done">
        <span className="d-flex name">Foo</span>
        <span className="d-flex step">
          <span className="d-flex">1</span>
        </span>
      </li>
      <li className="done">
        <span className="d-flex name">Bar</span>
        <span className="d-flex step">
          <span className="d-flex">2</span>
        </span>
      </li>
      <li className="active">
        <span className="d-flex name">Baz</span>
        <span className="d-flex step">
          <span className="d-flex">3</span>
        </span>
      </li>
      <li>
        <span className="d-flex name">Quux</span>
        <span className="d-flex step">
          <span className="d-flex">4</span>
        </span>
      </li>
    </ol>
    // <div className="d-flex flex-row">
    //   <div className="d-flex flex-column">
    //     <div className="d-flex">Text acima</div>
    //     <div className="d-block" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
    //       <span
    //         className="d-flex ms-auto"
    //         style={{ width: "50%", height: "2px", background: "rgba(255,0,0,1)" }}
    //       ></span>
    //       <span
    //         className="d-flex align-self-end position-absolute"
    //         style={{
    //           width: "16px",
    //           height: "16px",
    //           background: "rgba(255,0,0,1)",
    //           borderRadius: "50%",
    //           marginLeft: "calc(50% + 8px)",
    //           marginBottom: "-7px",
    //         }}
    //       ></span>
    //       <span
    //         className="d-flex ms-auto"
    //         style={{ width: "50%", height: "2px", background: "rgba(255,0,0,1)" }}
    //       ></span>
    //     </div>
    //     <div className="d-flex">Abaixo</div>
    //   </div>
    //   <div className="d-flex flex-column">
    //     <div className="d-flex">Text acima</div>
    //     <div className="d-flex">meio</div>
    //     <div className="d-flex">Abaixo</div>
    //   </div>
    // </div>
  );
}
