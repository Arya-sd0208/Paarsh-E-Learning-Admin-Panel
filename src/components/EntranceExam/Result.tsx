"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface ResultProps {
  testDetails: { name: string; college: string };
  onRedirect: () => void;
}

export const Result: React.FC<ResultProps> = ({ testDetails, onRedirect }) => {
  useEffect(() => {
    // Exit fullscreen mode when Result component mounts
    const exitFullscreen = async () => {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
      } catch (error) {
        console.error('Error exiting fullscreen:', error);
      }
    };

    exitFullscreen();

    // Set up auto-redirect after 1 minute
    const timeoutId = setTimeout(() => {
      onRedirect();
    }, 60000); // 60 seconds = 1 minute

    // Set up key press listener
    const handleKeyPress = () => {
      onRedirect();
    };
    window.addEventListener('keypress', handleKeyPress);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [onRedirect]);

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#f0f4f9] dark:bg-gray-900 py-10 px-4">
      <Card className="w-full max-w-lg overflow-hidden border-none bg-white shadow-2xl rounded-3xl dark:bg-gray-800">
        <div className="bg-[#2C4276] py-8 text-center text-white">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-white/20 p-3 backdrop-blur-md">
              <CheckCircle2 className="h-12 w-12 text-[#3DAED2]" />
            </div>
          </div>
          <h2 className="text-3xl font-bold">Submission Complete</h2>
        </div>
        <div className="p-8 text-center">
          <p className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
            Your <span className="text-[#2C4276]">{testDetails.name}</span> has been received.
          </p>
          <div className="mb-8 space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Paarsh Infotech will evaluate your performance and contact you with the results.
            </p>
            <div className="h-px w-20 bg-gray-100 mx-auto" />
            <p className="text-xs text-gray-500 italic">
              Redirecting to home in 1 minute...
            </p>
          </div>

          <button
            onClick={onRedirect}
            className="w-full rounded-xl bg-[#2C4276] py-4 font-bold text-white transition-all hover:bg-[#1e2e52] hover:shadow-lg active:scale-95"
          >
            Return to Assessment Portal
          </button>
        </div>
      </Card>
    </section>
  );
};