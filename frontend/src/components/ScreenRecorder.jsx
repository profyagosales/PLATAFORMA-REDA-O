import React, { useRef, useState } from 'react';

const ScreenRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const [screenTrack] = screenStream.getVideoTracks();
      const audioTrack = audioStream.getAudioTracks()[0];

      const stream = new MediaStream([screenTrack, audioTrack]);
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = uploadVideo;
      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error('Error starting screen recording', err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const uploadVideo = async () => {
    const blob = new Blob(chunksRef.current, { type: 'video/webm' });
    chunksRef.current = [];

    const formData = new FormData();
    formData.append('video', blob, 'recording.webm');

    try {
      const response = await fetch('/teacher/feedback', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setVideoUrl(data.url);
    } catch (err) {
      console.error('Upload failed', err);
    }
  };

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {videoUrl && (
        <video controls src={videoUrl} style={{ width: '400px', marginTop: '1rem' }} />
      )}
    </div>
  );
};

export default ScreenRecorder;
