import { useEffect, useState } from "react";

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  const getFormValue = (field, _default = "") => {
    return field in values ? values[field] : _default;
  };

  useEffect(() => {
    console.log(values);

    console.log(JSON.stringify(values));
  }, [values]);

  const setFormValueElement = (e) => {
    const eTargetType = e.target.type;
    let newVal = undefined;
    if (eTargetType === "checkbox") {
      newVal = e.target.checked;
    } else {
      newVal = e.target.value;
    }

    setValues({
      ...values,
      [e.target.name]: newVal,
    });
  };

  const setIDListValue = (listName, itemId, val) => {
    setValues((oldVals) => {
      let list = oldVals[listName] || [];

      let oldVal = {};

      for (let i = list.length - 1; i >= 0; i--) {
        if (list[i]["id"] === itemId) {
          oldVal = list.splice(i, 1)[0];
        }
      }

      list.push({ ...oldVal, ...val });
      return {
        ...oldVals,
        [listName]: list,
      };
    });
  };

  const getIDListValue = (listName, itemId) => {
    const list = values[listName] || [];

    for (let i = 0; i < list.length; i++) {
      if (list[i]["id"] === itemId) {
        return list[i];
      }
    }
    return null;
  };

  const setFormValue = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const setMultipleFormValue = (dict) => {
    setValues({
      ...values,
      ...dict,
    });
  };

  return {
    values,
    setFormValueElement,
    setFormValue,
    getFormValue,
    setIDListValue,
    getIDListValue,
    setMultipleFormValue,
  };
}
