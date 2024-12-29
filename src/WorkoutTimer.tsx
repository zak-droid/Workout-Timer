import React, { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";

const CIRCLE_SIZE = 384; // SVG size
const CIRCLE_RADIUS = 186; // Circle radius
const STROKE_WIDTH = 8; // Stroke width
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS; // Circle circumference

const WorkoutTimer = () => {
  const [workTime, setWorkTime] = useState(40);
  const [restTime, setRestTime] = useState(20);
  const [currentTime, setCurrentTime] = useState(40);
  const [isWork, setIsWork] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [prepTime, setPrepTime] = useState(3);
  const [sessionTime, setSessionTime] = useState(0);

  const toggleTimer = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setCurrentTime(workTime);
    setIsWork(true);
    setSessionTime(0);
  }, [workTime]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev === 1) {
            setIsWork((prevIsWork) => !prevIsWork);
            return isWork ? restTime : workTime;
          }
          return prev - 1;
        });
        setSessionTime((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isActive, isWork, workTime, restTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const calculateProgress = (current, max) => {
    return ((max - current) / max) * 100;
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-black text-white"
    >
      {/* Session Timer */}
      <div className="absolute top-4 text-2xl font-mono">
        {formatTime(sessionTime)} / {formatTime(workTime + restTime)}
      </div>

      {/* Timer Display with Circular Progress */}
      <div className="relative w-96 h-96">
        {/* Circular Background */}
        <div
          className="absolute inset-0 rounded-full border-8"
          style={{ borderColor: isWork ? "#00FF00" : "#FF0000" }}
        ></div>
        {/* Circular Progress Bar */}
        <svg
          className="absolute w-full h-full transform -rotate-90"
          viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}
        >
          <circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={CIRCLE_RADIUS}
            strokeWidth={STROKE_WIDTH}
            stroke={isWork ? "#00FF00" : "#FF0000"}
            fill="none"
            strokeDasharray={CIRCLE_CIRCUMFERENCE}
            strokeDashoffset={`${
              (CIRCLE_CIRCUMFERENCE *
                (100 -
                  calculateProgress(
                    currentTime,
                    isWork ? workTime : restTime
                  ))) /
              100
            }`}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        {/* Timer Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-9xl font-bold">{currentTime}</div>
          <div className="text-5xl font-semibold">
            {isPreparing ? "PREP" : isWork ? "WORK" : "REST"}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="fixed bottom-4 flex space-x-4">
        <button
          onClick={toggleTimer}
          className="p-4 bg-green-600 rounded-full hover:bg-green-700"
        >
          {isActive ? <Pause size={32} /> : <Play size={32} />}
        </button>
        <button
          onClick={resetTimer}
          className="p-4 bg-red-600 rounded-full hover:bg-red-700"
        >
          <RotateCcw size={32} />
        </button>
        <button
          className="p-4 bg-gray-600 rounded-full hover:bg-gray-700"
        >
          <Settings size={32} />
        </button>
      </div>
    </div>
  );
};

export default WorkoutTimer;
