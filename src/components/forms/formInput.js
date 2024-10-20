"use client";

export default function FormInput({
  type,
  name,
  radioValue,
  myForm,
  listName,
  listItemId,
  itemName,
  ...otherProps
}) {
  const { getFormValue, setFormValue, setFormValueElement, setIDListValue } =
    myForm;

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

  let commonProps = {
    ...otherProps,
    type,
    name,
    value: getFormValue(name),
    onChange: updateFunction,
  };

  return type !== "textarea" ? (
    <input {...commonProps} />
  ) : (
    <textarea {...commonProps} />
  );
}
