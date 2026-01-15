
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Bell } from 'lucide-react';

const Timer: React.FC = () => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // In seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize alarm sound
  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = useCallback(() => {
    if (timeLeft <= 0) return;
    setIsRunning(true);
    setIsFinished(false);
  }, [timeLeft]);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(minutes * 60 + seconds);
    setIsFinished(false);
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
  }, [minutes, seconds]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsFinished(true);
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log('Audio play blocked', e));
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  // Sync timeLeft when inputs change and not running
  useEffect(() => {
    if (!isRunning) {
        setTimeLeft(minutes * 60 + seconds);
    }
  }, [minutes, seconds, isRunning]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const percentage = (timeLeft / (minutes * 60 + seconds)) * 100;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-orange-600">타이머</h2>

      <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
        {/* Progress Ring */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-gray-100"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={754}
            strokeDashoffset={754 - (754 * percentage) / 100}
            className={`${isFinished ? 'text-red-500 animate-pulse' : 'text-orange-500'} transition-all duration-1000 ease-linear`}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={`text-6xl font-black ${isFinished ? 'text-red-600 animate-bounce' : 'text-gray-800'}`}>
            {formatTime(timeLeft)}
          </span>
          {isFinished && <Bell className="text-red-500 mt-2 animate-bounce" />}
        </div>
      </div>

      <div className="w-full max-w-sm grid grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">분 (Minutes)</label>
          <input
            type="number"
            min="1"
            max="60"
            disabled={isRunning}
            value={minutes}
            onChange={(e) => setMinutes(Math.min(60, Math.max(1, parseInt(e.target.value) || 0)))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xl font-bold text-center focus:ring-2 focus:ring-orange-400 outline-none disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">초 (Seconds)</label>
          <input
            type="number"
            min="0"
            max="59"
            disabled={isRunning}
            value={seconds}
            onChange={(e) => setSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xl font-bold text-center focus:ring-2 focus:ring-orange-400 outline-none disabled:opacity-50"
          />
        </div>
      </div>

      <div className="flex gap-4 w-full max-w-sm">
        <button
          onClick={isRunning ? pauseTimer : startTimer}
          className={`flex-grow flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-xl shadow-lg transition-all ${
            isRunning 
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          {isRunning ? (
            <>
              <Pause fill="currentColor" size={24} /> 일시정지
            </>
          ) : (
            <>
              <Play fill="currentColor" size={24} /> 시작하기
            </>
          )}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-100 text-gray-500 p-4 rounded-2xl hover:bg-gray-200 shadow transition-all"
        >
          <RotateCcw size={28} />
        </button>
      </div>
      
      <div className="mt-8 flex gap-2">
        {[1, 5, 10, 30].map(m => (
          <button
            key={m}
            onClick={() => {
              setMinutes(m);
              setSeconds(0);
            }}
            disabled={isRunning}
            className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg font-semibold text-sm hover:bg-orange-100 disabled:opacity-50"
          >
            {m}분
          </button>
        ))}
      </div>
    </div>
  );
};

export default Timer;
