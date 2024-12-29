import React from 'react';

type SettingsDialogProps = {
  open: boolean;
  onClose: () => void;
  workTime: number;
  restTime: number;
  setWorkTime: (time: number) => void;
  setRestTime: (time: number) => void;
};

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onClose,
  workTime,
  restTime,
  setWorkTime,
  setRestTime,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Work Time (seconds):</label>
          <input
            type="number"
            value={workTime}
            onChange={(e) => setWorkTime(Number(e.target.value))}
            className="p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Rest Time (seconds):</label>
          <input
            type="number"
            value={restTime}
            onChange={(e) => setRestTime(Number(e.target.value))}
            className="p-2 border rounded w-full"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default SettingsDialog;
