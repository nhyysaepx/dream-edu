import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Gauge } from 'lucide-react';

export default function AudioPlayer({ src, title = 'Audio Track', autoPlay = false, className = '' }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsLoaded(true);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error('Audio play error:', err);
      });
    }
  };

  const seekRelative = (seconds) => {
    if (!audioRef.current) return;
    const newTime = Math.min(Math.max(audioRef.current.currentTime + seconds, 0), duration);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSliderChange = (e) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 0.8];
    const nextIndex = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const nextRate = speeds[nextIndex];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (timeInSec) => {
    if (isNaN(timeInSec)) return '00:00';
    const m = Math.floor(timeInSec / 60);
    const s = Math.floor(timeInSec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`bg-gradient-to-r from-blue-900/90 via-slate-800 to-indigo-950 text-white rounded-xl p-3 sm:p-4 shadow-md border border-blue-500/20 ${className}`}>
      <audio ref={audioRef} src={src} preload="metadata" />
      
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-blue-100 truncate">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Speed Toggle */}
          <button
            type="button"
            onClick={cycleSpeed}
            title="Tốc độ phát"
            className="text-[11px] font-bold bg-white/10 hover:bg-white/20 text-blue-200 px-2 py-0.5 rounded transition cursor-pointer flex items-center gap-1"
          >
            <Gauge size={12} />
            {playbackRate}x
          </button>

          {/* Mute toggle */}
          <button
            type="button"
            onClick={toggleMute}
            className="text-gray-300 hover:text-white p-1 rounded transition cursor-pointer"
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Play / Pause button */}
        <button
          type="button"
          onClick={togglePlay}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-500 hover:bg-blue-400 text-white flex items-center justify-center shadow-lg transition active:scale-95 shrink-0 cursor-pointer"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="translate-x-0.5" />}
        </button>

        {/* Rewind 10s */}
        <button
          type="button"
          onClick={() => seekRelative(-10)}
          title="Lùi 10s"
          className="text-gray-300 hover:text-white p-1.5 rounded transition cursor-pointer shrink-0"
        >
          <RotateCcw size={16} />
        </button>

        {/* Forward 10s */}
        <button
          type="button"
          onClick={() => seekRelative(10)}
          title="Tua 10s"
          className="text-gray-300 hover:text-white p-1.5 rounded transition cursor-pointer shrink-0"
        >
          <RotateCw size={16} />
        </button>

        {/* Progress bar */}
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <span className="text-[11px] font-mono text-gray-300 tabular-nums shrink-0">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            step="0.1"
            value={currentTime}
            onChange={handleSliderChange}
            className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-400"
          />
          <span className="text-[11px] font-mono text-gray-400 tabular-nums shrink-0">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
