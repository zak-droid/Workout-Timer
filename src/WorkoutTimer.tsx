import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import SettingsDialog from './ui/SettingsDialog';
import TimerDisplay from './ui/TimerDisplay';

const WorkoutTimer: React.FC = () => {
  const [workTime, setWorkTime] = useState(40);
  const [restTime, setRestTime] = useState(20);
  const [currentTime, setCurrentTime] = useState(workTime);
  const [isWork, setIsWork] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev === 0) {
            setIsWork((prevIsWork) => !prevIsWork);
            return isWork ? restTime : workTime;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isActive, isWork, workTime, restTime]);

  const resetTimer = () => {
    setIsActive(false);
    setCurrentTime(workTime);
    setIsWork(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <TimerDisplay
        currentTime={currentTime}
        isWork={isWork}
        workColor="#00FF00"
        restColor="#FF0000"
      />
      <div className="fixed bottom-4 flex space-x-4">
        <button
          onClick={() => setIsActive((prev) => !prev)}
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
      <SettingsDialog
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        workTime={workTime}
        restTime={restTime}
        setWorkTime={setWorkTime}
        setRestTime={setRestTime}
      />
    </div>
  );
};

export default WorkoutTimer;
