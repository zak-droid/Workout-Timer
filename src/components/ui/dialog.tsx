import React from "react";

export const Dialog: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}> = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-white p-6 rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
