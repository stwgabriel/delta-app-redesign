"use client";

export default function ChatMessage({ msg, isCurrentUser }) {
  //   console.log(isCurrentUser);
  return (
    <div>
      {isCurrentUser && <div className="flex-fill"></div>}
      <div
        className={`d-flex p-1 mb-1 rounded flex-column ${
          isCurrentUser ? "bg-success" : "bg-warning"
        } 
      `}
      >
        {!isCurrentUser && <span className="fs-6 fw-bold">Alex</span>}
        <span>{msg.message}</span>
      </div>
      {!isCurrentUser && <div className="flex-fill"></div>}
    </div>
  );
}
