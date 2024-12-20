"use client";
import { useCall } from "@/contexts/call";

export default function VideoChatComponent({ chart_id }) {
  const {
    startCall,
    attendees,
    audioOutputElement,
    videoInputElement,
    currentMeeting,
  } = useCall(chart_id);

  return (
    <section className="my-5 flex-column">
      {currentMeeting === null && (
        <button className="btn btn-success" onClick={startCall}>
          Iniciar chamada
        </button>
      )}
      <div>
        <audio ref={audioOutputElement}></audio>
        <video ref={videoInputElement}></video>
      </div>

      <div className="mt-5 flex-column">
        {Object.keys(attendees).map((key) => {
          if (!attendees[key].tileState.localTile) {
            return <video key={key} ref={attendees[key].ref} />;
          }
        })}
      </div>
    </section>
  );
}
