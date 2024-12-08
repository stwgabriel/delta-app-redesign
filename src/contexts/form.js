import { useEffect, useState } from "react";

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  const getFormValue = (field, _default = "") => {
    return field in values ? values[field] : _default;
  };

  const popFormValue = (field) => {
    setValues((old) => {
      if (Object.hasOwn(old, field)) {
        const newVals = { ...old };
        delete newVals[field];
        return newVals;
      }
      return old;
    });
  };

  useEffect(() => {
    console.log(values);
    console.log(JSON.stringify(values));
  }, [values]);

  const setFormValueElement = (e) => {
    setValues((old) => {
      const eTargetType = e.target.type;
      let newVal = undefined;
      if (eTargetType === "checkbox") {
        newVal = e.target.checked;
      } else {
        newVal = e.target.value;
      }
      return {
        ...old,
        [e.target.name]: newVal,
      };
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
    setValues((oldValues) => {
      return {
        ...oldValues,
        [name]: value,
      };
    });
  };

  const setMultipleFormValue = (dict) => {
    setValues((old) => {
      return {
        ...old,
        ...dict,
      };
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
    popFormValue,
  };
}
