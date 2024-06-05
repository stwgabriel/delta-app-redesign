export default function InputOptionRow({ item }) {
  const { name, options, title, description, info } = item;
  return (
    <div className="flex-column">
      <div className="card flex-column" style={{ width: "18rem" }}>
        <span className="card-title text-center p-3">{title}</span>
        {description && (
          <span className="card-description text-center p-3 text-secondary">
            {description}
          </span>
        )}
        <div className="card-body">
          {options.map((opt, i) => (
            <div className="btn btn-primary m-1">{opt.value}</div>
          ))}
        </div>
      </div>
      <div className="p-2"></div>
    </div>
  );
}
