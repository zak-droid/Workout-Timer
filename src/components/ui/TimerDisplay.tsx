import React from "react";

const TimerDisplay: React.FC<{
  currentTime: number;
  isWork: boolean;
  totalTime: number;
}> = ({ currentTime, isWork, totalTime }) => {
  const percentage = ((totalTime - currentTime) / totalTime) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative flex justify-center items-center">
      <svg className="absolute w-48 h-48">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          stroke={isWork ? "green" : "red"}
          strokeWidth="8"
          fill="none"
          strokeDasharray="282.6"
          strokeDashoffset={282.6 - (282.6 * percentage) / 100}
        />
      </svg>
      <div className="text-center">
        <div className="text-8xl font-bold">{currentTime}</div>
        <div className="text-4xl font-semibold">
          {isWork ? "WORK" : "REST"}
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
