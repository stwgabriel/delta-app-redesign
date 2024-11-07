"use client";

import React, { useEffect, useState } from "react";
import { MeetingSessionConfiguration } from "amazon-chime-sdk-js";
import { AudioVideoFacade } from "amazon-chime-sdk-js";
import { DefaultMeetingSession } from "amazon-chime-sdk-js";

export default function UploadPage() {
  const [meetingId, setMeetingId] = useState(null);
  const [attendeeId, setAttendeeId] = useState(null);
  const [meetingSession, setMeetingSession] = useState(null);
  const [audioVideo, setAudioVideo] = useState(null);

  const createMeeting = async () => {
    const response_meeting = await fetch(
      "http://localhost:8000/v1/meeting/create"
    );
    const meetingInfo = await response_meeting.json();

    console.log(meetingInfo);
    const meeting_id = meetingInfo.Meeting.MeetingId;

    const response_attendee = await fetch(
      `http://localhost:8000/v1/meeting/add_attendee?meeting_id=${meeting_id}`
    );
    const meetingAttendeeInfo = await response_attendee.json();
    console.log(meetingAttendeeInfo);

    setMeetingId(meeting_id);
    setAttendeeId(meetingInfo.AttendeeId);

    // Create meeting session
    const meetingSessionConfig = new MeetingSessionConfiguration(
      meetingInfo.Meeting,
      meetingAttendeeInfo.Attendee
    );
    const session = new DefaultMeetingSession(meetingSessionConfig);
    setMeetingSession(session);
    setAudioVideo(session.audioVideo);
  };

  const startMeeting = () => {
    if (audioVideo) {
      audioVideo.start();
    }
  };

  const stopMeeting = () => {
    if (audioVideo) {
      audioVideo.stop();
    }
  };

  return (
    <div>
      <h1>Chime Meeting</h1>
      {meetingId && <p>Meeting ID: {meetingId}</p>}
      {attendeeId && <p>Attendee ID: {attendeeId}</p>}
      <button onClick={createMeeting}>Create Meeting</button>
      <button onClick={startMeeting}>Start Meeting</button>
      <button onClick={stopMeeting}>Stop Meeting</button>
    </div>
  );
}
