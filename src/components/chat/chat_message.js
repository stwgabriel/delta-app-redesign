"use client";

export default function ChatMessage({ msg, isCurrentUser }) {
  //   console.log(isCurrentUser);
  return (
    <div className="d-flex">
      {isCurrentUser && <div className="d-flex flex-fill"></div>}
      <div
        className={`d-flex p-1 mb-1 rounded flex-column ${isCurrentUser ? "bg-success" : "bg-warning"} 
      `}
      >
        {!isCurrentUser && <span className="d-flex fs-6 fw-bold">Alex</span>}
        <span className="d-flex">{msg.message}</span>
      </div>
      {!isCurrentUser && <div className="d-flex flex-fill"></div>}
    </div>
  );
}
