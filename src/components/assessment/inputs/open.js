import { usePatientContext } from "@/contexts/patient";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function InputOpen({ item }) {
  const { name, inputs, title, description, info } = item;

  const { setResponse } = usePatientContext();

  const [vars, setVars] = useState({});
  const [varsValidations, setVarsValidations] = useState({});

  function _setVars(varName, varValue, varMask) {
    const nvars = JSON.parse(JSON.stringify(vars));
    const nvarsValidations = JSON.parse(JSON.stringify(varsValidations));

    const re = new RegExp(varMask);
    if (varValue.match(re)) {
      console.log("validated");
      nvars[varName] = varValue;
      setVars(nvars);
      nvarsValidations[varName] = true;
      setVarsValidations(nvarsValidations);
    } else {
      nvarsValidations[varName] = false;
      setVarsValidations(nvarsValidations);
      console.log("not valid");
    }
  }

  useEffect(() => {
    console.log(vars);
  }, [vars]);

  return (
    <div className="flex-column">
      <div className="card flex-column" style={{ width: "18rem" }}>
        <span className="card-title text-center p-3">{title}</span>
        {description && (
          <span className="card-description text-center p-3 text-secondary">
            {description}
          </span>
        )}
        <div className="card-body flex-column">
          {inputs.map((inp, i) => (
            <div key={`inp-${i}`} className="flex-column my-2">
              <span>{inp.label}</span>
              <div className="align-items-center">
                <input
                  type="text"
                  onChange={(x) => _setVars(inp.name, x.target.value, inp.mask)}
                />
                {varsValidations[inp.name] === true ? (
                  <FaCheckCircle
                    className="ms-1"
                    style={{ color: "#28a745" }}
                  />
                ) : varsValidations[inp.name] === false ? (
                  <FaCircleXmark
                    className="ms-1"
                    style={{ color: "#dc3545" }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-2"></div>
    </div>
  );
}
