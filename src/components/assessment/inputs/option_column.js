import { usePatientContext } from "@/contexts/patient";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

export default function InputOptionCol({ item }) {
  const { name, options, title, description, info } = item;

  const [displayInfo, setDisplayInfo] = useState(false);
  const { setResponse } = usePatientContext();

  return (
    <div className="flex-column">
      <div className="card flex-column" style={{ width: "18rem" }}>
        <span className="card-title text-center p-3">
          {title} <FaInfoCircle onClick={() => setDisplayInfo(!displayInfo)} />
        </span>

        {description && (
          <span className="card-description text-center p-3 text-secondary">
            {description}
          </span>
        )}

        {displayInfo && (
          <span className="card-description text-center p-3 text-danger">
            {info}
          </span>
        )}
        <div className="card-body flex-column">
          {options.map((opt, i) => (
            <div
              key={`opt-${i}`}
              className="btn btn-primary m-1"
              onClick={() => {
                setResponse({
                  value: opt.value,
                  unknown: opt.unknown !== undefined ? opt.unknown : false,
                });
              }}
            >
              {opt.value}
            </div>
          ))}
        </div>
      </div>
      <div className="p-2"></div>
    </div>
  );
}
