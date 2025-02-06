export default function Spinner({ className }) {
  return (
    <div className={`d-flex spinner-border ${className}`} role="status">
      <span className="d-flex visually-hidden">Loading...</span>
    </div>
  );
}
