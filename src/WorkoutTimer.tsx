import React, { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog";

const WorkoutTimer = () => {
  const [workTime, setWorkTime] = useState(40);
  const [restTime, setRestTime] = useState(20);
  const [currentTime, setCurrentTime] = useState(40);
  const [isWork, setIsWork] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSettingsClose = () => {
    setIsSettingsOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
      {/* Session Timer */}
      <div className="absolute top-4 text-2xl font-mono">
        {formatTime(sessionTime)} / {formatTime(workTime + restTime)}
      </div>

      {/* Timer Display */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-96 h-96 transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="gray"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={isWork ? "green" : "red"}
              strokeWidth="4"
              fill="none"
              strokeDasharray="282.6"
              strokeDashoffset={
                282.6 - (currentTime / (isWork ? workTime : restTime)) * 282.6
              }
            />
          </svg>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-9xl font-bold">{currentTime}</div>
          <div className="text-5xl font-semibold">
            {isWork ? "WORK" : "REST"}
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
          onClick={() => setIsSettingsOpen(true)}
          className="p-4 bg-gray-600 rounded-full hover:bg-gray-700"
        >
          <Settings size={32} />
        </button>
      </div>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={handleSettingsClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label>Work Time (seconds):</label>
              <input
                type="number"
                value={workTime}
                onChange={(e) => setWorkTime(Number(e.target.value))}
                className="p-2 border rounded w-full"
              />
            </div>
            <div>
              <label>Rest Time (seconds):</label>
              <input
                type="number"
                value={restTime}
                onChange={(e) => setRestTime(Number(e.target.value))}
                className="p-2 border rounded w-full"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkoutTimer;
