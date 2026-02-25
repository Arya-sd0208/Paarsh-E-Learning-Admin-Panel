"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-md dark:bg-gray-800 dark:text-white">
      <div className="p-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0f4f9] dark:bg-green-900/30 shadow-inner">
          <CheckCircle2 className="h-8 w-8 text-[#3DAED2] dark:text-green-400" />
        </div>
        <h3 className="mb-4 text-xl font-bold text-[#2C4276] dark:text-white">
          Registration Successful!
        </h3>
        <p className="mb-6 text-gray-600 dark:text-gray-300 font-medium">
          Welcome to the portal. Your account is ready.
        </p>
        <Button
          onClick={onClose}
          className="w-full rounded-xl bg-[#2C4276] py-6 font-bold text-white hover:bg-[#1e2e52] shadow-lg active:scale-95"
        >
          Proceed to Login
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);