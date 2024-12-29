import React from "react";
import { Dialog } from "./dialog";

const SettingsDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  workTime: number;
  setWorkTime: (time: number) => void;
  restTime: number;
  setRestTime: (time: number) => void;
}> = ({ isOpen, onClose, workTime, setWorkTime, restTime, setRestTime }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <div className="space-y-4">
          <div>
            <label>Work Time:</label>
            <input
              type="number"
              value={workTime}
              onChange={(e) => setWorkTime(Number(e.target.value))}
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label>Rest Time:</label>
            <input
              type="number"
              value={restTime}
              onChange={(e) => setRestTime(Number(e.target.value))}
              className="p-2 border rounded w-full"
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SettingsDialog;
