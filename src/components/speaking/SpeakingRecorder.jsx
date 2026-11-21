import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, RotateCcw, Volume2, Sparkles, AlertCircle, Info } from 'lucide-react';
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
  const [livePreview, setLivePreview] = useState('');
  const [isLowVolume, setIsLowVolume] = useState(false);

  // Sync state if question or initialData changes
  useEffect(() => {
    if (!isRecording) {
      setAudioBlob(initialData?.blob || null);
      setAudioUrl(initialData?.url || null);
      setDuration(initialData?.durationSeconds || 0);
      setIsPlaying(false);
      setErrorMsg('');
      setLivePreview('');
      setIsLowVolume(false);
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
  const recognitionRef = useRef(null);
  const liveTranscriptRef = useRef('');
  const lowVolumeCountRef = useRef(0);

  // Clean up on unmount: dừng timer, visualizer và speech recognition
  useEffect(() => {
    return () => {
      clearInterval(timerIntervalRef.current);
      cancelAnimationFrame(animFrameRef.current);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

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
        const normalized = Math.min(100, Math.round((avg / 128) * 100));
        setAudioLevel(normalized);

        // Phát hiện âm lượng quá nhỏ trên điện thoại (>2.5s liên tục)
        if (normalized < 6) {
          lowVolumeCountRef.current += 1;
          if (lowVolumeCountRef.current > 35) {
            setIsLowVolume(true);
          }
        } else {
          lowVolumeCountRef.current = 0;
          setIsLowVolume(false);
        }

        animFrameRef.current = requestAnimationFrame(updateVisualizer);
      };
      updateVisualizer();
    } catch (e) {
      console.warn('Visualizer init warning:', e);
    }
  };

  /**
   * Chọn định dạng MIME tối ưu và tương thích tốt nhất trên thiết bị hiện tại
   */
  const getOptimalMimeType = () => {
    if (typeof MediaRecorder === 'undefined') return '';
    const candidates = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4;codecs=mp4a.40.2',
      'audio/mp4',
      'audio/aac'
    ];
    for (const type of candidates) {
      if (MediaRecorder.isTypeSupported(type)) return type;
    }
    return '';
  };

  const handleStartRecording = async () => {
    setErrorMsg('');
    setAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setDuration(0);
    setLivePreview('');
    setIsLowVolume(false);
    audioChunksRef.current = [];
    liveTranscriptRef.current = '';
    lowVolumeCountRef.current = 0;

    try {
      // Tối ưu hóa Microphone đặc biệt cho thiết bị di động (Smartphones):
      // - echoCancellation: false giúp tránh bộ lọc khử vọng của điện thoại làm mờ âm gió (/s/, /t/, /ed/)
      // - noiseSuppression & autoGainControl: giúp ổn định âm thanh trong môi trường thực tế
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: { ideal: 1 },
          sampleRate: { ideal: 16000 },
          echoCancellation: false,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      startVisualizer(stream);

      // 1. Khởi động Web Speech API chạy song song để nhận diện transcript trực tiếp (Siêu tốc trên Mobile)
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = 'en-US';
          recognition.maxAlternatives = 1;

          let accumulatedFinal = '';
          recognition.onresult = (event) => {
            let interim = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
              const text = event.results[i][0]?.transcript || '';
              if (event.results[i].isFinal) {
                accumulatedFinal += (accumulatedFinal ? ' ' : '') + text.trim();
              } else {
                interim += text;
              }
            }
            const fullText = (accumulatedFinal + ' ' + interim).trim();
            liveTranscriptRef.current = fullText;
            setLivePreview(fullText);
          };

          recognition.onerror = (e) => {
            if (e.error !== 'no-speech') {
              console.warn('SpeechRecognition info:', e.error);
            }
          };

          recognition.start();
          recognitionRef.current = recognition;
        } catch (recErr) {
          console.warn('SpeechRecognition launch skipped:', recErr);
        }
      }

      // 2. Cấu hình MediaRecorder
      const mimeType = getOptimalMimeType();
      const recorderOptions = {};
      if (mimeType) {
        recorderOptions.mimeType = mimeType;
      }
      // Cố định bitrate 48kbps để file siêu nhẹ (tiết kiệm băng thông 4G trên điện thoại)
      recorderOptions.audioBitsPerSecond = 48000;

      const recorder = new MediaRecorder(stream, recorderOptions);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        // Dừng tracks và visualizer
        stream.getTracks().forEach((track) => track.stop());
        cancelAnimationFrame(animFrameRef.current);
        setAudioLevel(0);
        setIsLowVolume(false);

        // Dừng recognition nếu còn đang chạy
        if (recognitionRef.current) {
          try { recognitionRef.current.stop(); } catch (e) {}
          recognitionRef.current = null;
        }

        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close().catch(() => {});
        }

        const actualType = mimeType || (MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : 'audio/webm');
        const blob = new Blob(audioChunksRef.current, { type: actualType });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);

        const finalSecs = Math.max(1, Math.round((Date.now() - (startTimeRef.current || Date.now())) / 1000));
        setDuration(finalSecs);

        const base64 = await blobToBase64(blob);

        if (onRecordingComplete) {
          onRecordingComplete({
            blob,
            url,
            base64,
            mimeType: actualType,
            durationSeconds: finalSecs,
            liveTranscript: liveTranscriptRef.current.trim()
          });
        }
      };

      // QUAN TRỌNG: Gọi recorder.start() KHÔNG truyền timeslice (250) để Safari iOS ghi file MP4 hoàn chỉnh (tránh lỗi broken moov atom)
      recorder.start();
      setIsRecording(true);

      const startTime = Date.now();
      startTimeRef.current = startTime;
      timerIntervalRef.current = setInterval(() => {
        setDuration(Math.max(1, Math.round((Date.now() - startTime) / 1000)));
      }, 500);
    } catch (err) {
      console.error('Mic access error:', err);
      setErrorMsg('Không thể mở micro. Vui lòng cho phép trình duyệt truy cập micro để làm bài thi nói.');
      setIsRecording(false);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      clearInterval(timerIntervalRef.current);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
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
    <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-xs transition-all">
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

        {/* Right: Action Buttons (Touch-friendly for Mobile) */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {!isRecording && !audioBlob && (
            <button
              onClick={handleStartRecording}
              disabled={disabled}
              className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white rounded-xl font-bold text-sm sm:text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95 touch-manipulation"
            >
              <Mic size={16} />
              <span>Bắt đầu ghi âm</span>
            </button>
          )}

          {isRecording && (
            <button
              onClick={handleStopRecording}
              className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-sm sm:text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95 touch-manipulation"
            >
              <Square size={14} className="fill-current" />
              <span>Dừng ghi âm</span>
            </button>
          )}

          {audioBlob && !isRecording && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleTogglePlay}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95 touch-manipulation"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{isPlaying ? 'Tạm dừng' : 'Nghe lại'}</span>
              </button>

              <button
                onClick={handleStartRecording}
                disabled={disabled}
                className="px-3.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95 touch-manipulation"
                title="Ghi âm lại"
              >
                <RotateCcw size={13} />
                <span className="hidden sm:inline">Nói lại</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Live Transcript Preview (Realtime Speech Feedback on Phone) */}
      {isRecording && livePreview && (
        <div className="mt-3 p-3 bg-blue-50/70 border border-blue-150 rounded-xl text-left transition-all">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            <span>Đang nghe trực tiếp:</span>
          </div>
          <p className="text-xs text-gray-800 italic leading-relaxed line-clamp-2">
            "{livePreview}"
          </p>
        </div>
      )}

      {/* Low Volume Alert Hint for Phone Users */}
      {isRecording && isLowVolume && (
        <div className="mt-2.5 p-2.5 bg-amber-50 border border-amber-200/80 rounded-xl text-left flex items-center gap-2 text-amber-800 text-[11px] animate-fadeIn">
          <Info size={14} className="shrink-0 text-amber-600" />
          <span>💡 Âm thanh hơi nhỏ. Bạn hãy cầm điện thoại gần miệng hơn (15-20cm) và nói to rõ nhé.</span>
        </div>
      )}

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