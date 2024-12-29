import React from "react";

interface TimerDisplayProps {
    currentTime: number;
    isWork: boolean;
    totalTime: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ currentTime, isWork, totalTime }) => {
    const percentage = ((totalTime - currentTime) / totalTime) * 100;
    const strokeDashoffset = 282.6 - (282.6 * percentage) / 100;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="absolute w-full h-full">
                <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke={isWork ? "green" : "red"}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="282.6"
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300 ease-linear" // Smooth transition
                />
            </svg>
            <div className="text-center">
                <div className="text-5xl md:text-8xl font-bold">{formatTime(currentTime)}</div> {/* Formatted Time */}
                <div className="text-2xl md:text-4xl font-semibold uppercase">{isWork ? "WORK" : "REST"}</div> {/* Uppercase */}
            </div>
        </div>
    );
};

export default TimerDisplay;
