import React from "react";
import { Dialog } from "./ui/dialog";

type SettingsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  workTime: number;
  restTime: number;
  setWorkTime: (time: number) => void;
  setRestTime: (time: number) => void;
};

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  isOpen,
  onClose,
  workTime,
  restTime,
  setWorkTime,
  setRestTime,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Work Time:</label>
            <input
              type="number"
              value={workTime}
              onChange={(e) => setWorkTime(Number(e.target.value))}
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-2">Rest Time:</label>
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
