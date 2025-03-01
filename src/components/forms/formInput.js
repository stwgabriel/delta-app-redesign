"use client";

export default function FormInput({
  type,
  name,
  radioValue,
  myForm,
  listName,
  listItemId,
  itemName,
  onChange,
  ...otherProps
}) {
  const { getFormValue, setFormValue, setFormValueElement, setIDListValue } = myForm;

  let updateFunction = undefined;

  if (type === "radio") {
    if (listName === undefined) {
      updateFunction = () => setFormValue(name, radioValue);
    } else {
      const itmId = listItemId || name;
      updateFunction = () =>
        setIDListValue(listName, itmId, {
          id: itmId,
          [itemName]: radioValue,
        });
    }
  } else {
    updateFunction = (e) => setFormValueElement(e);
  }

  let newOnChange = undefined;
  if (onChange) {
    newOnChange = function () {
      onChange(...arguments);
      updateFunction(...arguments);
    };
  } else {
    newOnChange = updateFunction;
  }

  let commonProps = {
    ...otherProps,
    type,
    name,
    value: getFormValue(name),
    onChange: newOnChange,
  };

  return type !== "textarea" ? <input {...commonProps} /> : <textarea {...commonProps} />;
}
