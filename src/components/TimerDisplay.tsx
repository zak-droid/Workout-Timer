import React from "react";

type TimerDisplayProps = {
  currentTime: number;
  isWork: boolean;
  workColor: string;
  restColor: string;
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  currentTime,
  isWork,
  workColor,
  restColor,
}) => {
  const CIRCLE_SIZE = 200;
  const CIRCLE_RADIUS = 90;
  const STROKE_WIDTH = 8;
  const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

  return (
    <div className="relative w-52 h-52">
      <svg className="w-full h-full -rotate-90">
        <circle
          cx={CIRCLE_SIZE / 2}
          cy={CIRCLE_SIZE / 2}
          r={CIRCLE_RADIUS}
          stroke={isWork ? workColor : restColor}
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={
            (CIRCUMFERENCE * (40 - currentTime)) / 40 // Adjust dynamically
          }
        />
      </svg>
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <div className="text-7xl font-bold">{currentTime}</div>
        <div className="text-xl">{isWork ? "WORK" : "REST"}</div>
      </div>
    </div>
  );
};

export default TimerDisplay;
