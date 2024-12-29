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
        const mins = Math.floor(seconds /
