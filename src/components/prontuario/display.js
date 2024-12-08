export default function FormDisplay({
  name,
  text,
  column = true,
  align_label_center = true,
  align_value_center = true,
  labelClasses = [],
  valueClasses = [],
}) {
  if (align_label_center) {
    labelClasses.push("align-self-center");
  }

  if (align_value_center) {
    valueClasses.push("align-self-center");
  }
  return (
    <div className={`d-flex ${column ? "flex-column" : ""} `}>
      <span className={`p-1 fw-bold text-secondary ${labelClasses.join(" ")}`}>
        {name}
      </span>
      <span className={`p-1 ${valueClasses.join(" ")}`}>{text}</span>
    </div>
  );
}
