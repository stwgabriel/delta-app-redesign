import "./clock.css";

export default function ClockPage() {
  return (
    <div className="timeline">
      <div className="item">
        <span className="item-label">15 min</span>
        <div className="item-content">
          <span>Paciente chega ao Pronto-Socorro do Hospital</span>
        </div>
        <div className="item-content"></div>
      </div>
      <div className="item">
        <span className="item-label">30 min</span>
        <span>Item2</span>
      </div>
      <div className="item">
        <span className="item-label">45 min</span>
        <span>Item3</span>
      </div>
      <div className="item">
        <span className="item-label">60 min</span>
        <span>Item4</span>
      </div>
    </div>
  );
}
