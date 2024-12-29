import React, { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";
import TimerDisplay from "./components/ui/TimerDisplay";
import SettingsDialog from "./components/ui/SettingsDialog";

const WorkoutTimer: React.FC = () => {
    const [workTime, setWorkTime] = useState(40);
    const [restTime, setRestTime] = useState(20);
    const [currentTime, setCurrentTime] = useState(40);
    const [isWork, setIsWork] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const totalSessionTime = formatTime(isActive ? (isWork ? currentTime : currentTime) : (isWork ? workTime : restTime))

    const toggleTimer = useCallback(() => {
        setIsActive((prev) => !prev);
    }, []);

    const resetTimer = useCallback(() => {
        setIsActive(false);
        setCurrentTime(workTime);
        setIsWork(true);
    }, [workTime]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive) {
            interval = setInterval(() => {
                setCurrentTime((prev) => {
                    if (prev === 0) {
                        setIsWork((prevIsWork) => !prevIsWork);
                        return prevIsWork ? restTime : workTime;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive, workTime, restTime]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-black text-white p-8">
            <h1 className="text-2xl font-bold mb-8">Total Session Time: {totalSessionTime}</h1>
            <TimerDisplay currentTime={currentTime} isWork={isWork} totalTime={isWork ? workTime : restTime} />

            <div className="mt-8 flex space-x-6">
                <button onClick={toggleTimer} className="p-4 bg-green-600 rounded-full hover:bg-green-700">
                    {isActive ? <Pause size={32} /> : <Play size={32} />}
                </button>
                <button onClick={resetTimer} className="p-4 bg-red-600 rounded-full hover:bg-red-700">
                    <RotateCcw size={32} />
                </button>
                <button onClick={() => setIsSettingsOpen(true)} className="p-4 bg-gray-600 rounded-full hover:bg-gray-700">
                    <Settings size={32} />
                </button>
            </div>

            <SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} workTime={workTime} setWorkTime={setWorkTime} restTime={restTime} setRestTime={setRestTime} />
        </div>
    );
};

export default WorkoutTimer;
