import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, RotateCcw, Volume2, Sparkles, AlertCircle } from 'lucide-react';
import { blobToBase64 } from '../../services/speechAssessmentService';

export default function SpeakingRecorder({
  recommendedDuration = 30,
  onRecordingComplete,
  disabled = false,
  questionPrompt = '',
  initialData = null
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(initialData?.durationSeconds || 0);
  const [audioBlob, setAudioBlob] = useState(initialData?.blob || null);
  const [audioUrl, setAudioUrl] = useState(initialData?.url || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync state if question or initialData changes
  useEffect(() => {
    if (!isRecording) {
      setAudioBlob(initialData?.blob || null);
      setAudioUrl(initialData?.url || null);
      setDuration(initialData?.durationSeconds || 0);
      setIsPlaying(false);
      setErrorMsg('');
    }
  }, [initialData, questionPrompt]);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const audioPlayerRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearInterval(timerIntervalRef.current);
      cancelAnimationFrame(animFrameRef.current);
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [audioUrl]);

  const startVisualizer = (stream) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateVisualizer = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
        animFrameRef.current = requestAnimationFrame(updateVisualizer);
      };
      updateVisualizer();
    } catch (e) {
      console.warn('Visualizer init warning:', e);
    }
  };

  const handleStartRecording = async () => {
    setErrorMsg('');
    setAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setDuration(0);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      startVisualizer(stream);

      // Support mimeType fallback
      let mimeType = 'audio/webm;codecs=opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        if (MediaRecorder.isTypeSupported('audio/webm')) {
          mimeType = 'audio/webm';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        } else {
          mimeType = '';
        }
      }

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        // Stop all audio tracks
        stream.getTracks().forEach((track) => track.stop());
        cancelAnimationFrame(animFrameRef.current);
        setAudioLevel(0);

        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close().catch(() => {});
        }

        const actualType = mimeType || 'audio/webm';
        const blob = new Blob(audioChunksRef.current, { type: actualType });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);

        // Compute actual recorded duration accurately from timestamp
        const finalSecs = Math.max(1, Math.round((Date.now() - (startTimeRef.current || Date.now())) / 1000));
        setDuration(finalSecs);

        const base64 = await blobToBase64(blob);

        if (onRecordingComplete) {
          onRecordingComplete({
            blob,
            url,
            base64,
            mimeType: actualType,
            durationSeconds: finalSecs
          });
        }
      };

      recorder.start(250); // collect chunks every 250ms
      setIsRecording(true);

      const startTime = Date.now();
      startTimeRef.current = startTime;
      timerIntervalRef.current = setInterval(() => {
        setDuration(Math.max(1, Math.round((Date.now() - startTime) / 1000)));
      }, 500);
    } catch (err) {
      console.error('Mic access error:', err);
      setErrorMsg('Không thể mở micro. Vui lòng cho phép trình duyệt truy cập micro để ghi âm.');
      setIsRecording(false);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      clearInterval(timerIntervalRef.current);
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleTogglePlay = () => {
    if (!audioPlayerRef.current) return;
    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-xs transition-all">
      {errorMsg && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
          <AlertCircle size={15} className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Recording State Card */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Timer & Audio wave */}
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all flex-shrink-0 ${
              isRecording
                ? 'bg-red-500 text-white shadow-md shadow-red-200 animate-pulse'
                : audioBlob
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-primary/10 text-primary'
            }`}
          >
            {isRecording ? <Mic size={22} className="animate-bounce" /> : <Volume2 size={22} />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-gray-900 tracking-tight">
                {formatTime(duration)}
              </span>
              <span className="text-xs text-gray-400 font-medium">
                / {formatTime(recommendedDuration)} đề xuất
              </span>
            </div>

            <div className="flex items-center gap-1.5 mt-0.5">
              {isRecording ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-[11px] font-bold text-red-600">Đang thu âm trực tiếp...</span>
                </>
              ) : audioBlob ? (
                <span className="text-[11px] font-bold text-emerald-600">✅ Đã thu âm xong</span>
              ) : (
                <span className="text-[11px] text-gray-500">Bấm nút để bắt đầu nói</span>
              )}
            </div>
          </div>
        </div>

        {/* Center: Realtime Audio Visualizer Bars */}
        {isRecording && (
          <div className="flex items-center gap-1 h-8 px-3 bg-gray-50 rounded-xl border border-gray-150">
            {Array.from({ length: 12 }).map((_, i) => {
              const height = Math.max(4, Math.min(28, (audioLevel * ((i % 4) + 1)) / 4));
              return (
                <span
                  key={i}
                  style={{ height: `${height}px` }}
                  className="w-1 bg-gradient-to-t from-red-500 to-amber-400 rounded-full transition-all duration-75"
                />
              );
            })}
          </div>
        )}

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {!isRecording && !audioBlob && (
            <button
              onClick={handleStartRecording}
              disabled={disabled}
              className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Mic size={15} />
              <span>Bắt đầu ghi âm</span>
            </button>
          )}

          {isRecording && (
            <button
              onClick={handleStopRecording}
              className="w-full sm:w-auto px-5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Square size={14} className="fill-current" />
              <span>Dừng ghi âm</span>
            </button>
          )}

          {audioBlob && !isRecording && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleTogglePlay}
                className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{isPlaying ? 'Tạm dừng' : 'Nghe lại'}</span>
              </button>

              <button
                onClick={handleStartRecording}
                disabled={disabled}
                className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Ghi âm lại"
              >
                <RotateCcw size={13} />
                <span className="hidden sm:inline">Nói lại</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hidden audio element for preview */}
      {audioUrl && (
        <audio
          ref={audioPlayerRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      )}
    </div>
  );
}
