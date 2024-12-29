import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface SettingsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    workTime: number;
    setWorkTime: React.Dispatch<React.SetStateAction<number>>;
    restTime: number;
    setRestTime: React.Dispatch<React.SetStateAction<number>>;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ isOpen, onClose, workTime, setWorkTime, restTime, setRestTime }) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
                    <Dialog.Title className="text-lg font-medium mb-4">Settings</Dialog.Title>
                    <div className="mb-4">
                        <label htmlFor="workTime" className="block text-sm font-medium text-gray-700">Work Time (seconds)</label>
                        <input
                            type="number"
                            id="workTime"
                            value={workTime}
                            onChange={(e) => setWorkTime(Number(e.target.value))}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="restTime" className="block text-sm font-medium text-gray-700">Rest Time (seconds)</label>
                        <input
                            type="number"
                            id="restTime"
                            value={restTime}
                            onChange={(e) => setRestTime(Number(e.target.value))}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <Dialog.Close asChild>
                            <button className="bg-gray-200 px-4 py-2 rounded">Close</button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default SettingsDialog;
