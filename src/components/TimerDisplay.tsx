import React from 'react';

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
  const circleRadius = 90;
  const strokeWidth = 10;
  const circleCircumference = 2 * Math.PI * circleRadius;

  const progress = (currentTime / 40) * 100;
  const strokeDashoffset =
    circleCircumference - (progress / 100) * circleCircumference;

  return (
    <div className="relative">
      <svg
        className="w-60 h-60 transform -rotate-90"
        viewBox={`0 0 ${circleRadius * 2 + strokeWidth} ${
          circleRadius * 2 + strokeWidth
        }`}
      >
        <circle
          cx={circleRadius + strokeWidth / 2}
          cy={circleRadius + strokeWidth / 2}
          r={circleRadius}
          strokeWidth={strokeWidth}
          stroke="#333"
          fill="none"
        />
        <circle
          cx={circleRadius + strokeWidth / 2}
          cy={circleRadius + strokeWidth / 2}
          r={circleRadius}
          strokeWidth={strokeWidth}
          stroke={isWork ? workColor : restColor}
          fill="none"
          strokeDasharray={circleCircumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.5s linear' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <div className="text-6xl font-bold">{currentTime}</div>
        <div className="text-2xl">{isWork ? 'WORK' : 'REST'}</div>
      </div>
    </div>
  );
};

export default TimerDisplay;
