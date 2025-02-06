"use client";
import { useCall } from "@/contexts/call";

export default function VideoChatComponent({ chart_id }) {
  const { startCall, attendees, audioOutputElement, videoInputElement, currentMeeting } = useCall(chart_id);

  return (
    <section className="d-flex my-5 flex-column">
      {currentMeeting === null && (
        <button className="btn btn-success" onClick={startCall}>
          Iniciar chamada
        </button>
      )}
      <div className="d-flex">
        <audio className="d-flex" ref={audioOutputElement}></audio>
        <video className="d-flex" ref={videoInputElement}></video>
      </div>

      <div className="d-flex mt-5 flex-column">
        {Object.keys(attendees).map((key) => {
          if (!attendees[key].tileState.localTile) {
            return <video className="d-flex" key={key} ref={attendees[key].ref} />;
          }
        })}
      </div>
    </section>
  );
}
