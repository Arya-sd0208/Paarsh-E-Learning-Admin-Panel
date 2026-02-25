"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useSubmitEntranceTestMutation } from "@/redux/api";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Flag, Save } from "lucide-react";
import { ConfirmationModal } from "./ConfirmationModal";
import { Skeleton } from "@/components/ui/skeleton";
// import { QuestionNavigation } from "./QuestionNavigation";
// import { QuestionMeta } from "./QuestionMeta";

interface Question {
  _id: string;
  question: string;
  options: Array<{
    text: string;
    isCorrect: boolean;
  }>;
  selectedAnswer: number;
  timeSpent: number;
}

interface TestProps {
  questions: Question[];
  sessionId: string;
  timeRemaining: number | null;
  onSubmitTest: (result: { score: number; percentage: number; totalQuestions: number }) => void;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  onMarkForReview: (questionId: string) => void;
  markedQuestions: { [key: string]: boolean };
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
}

const QuestionSkeleton = () => (
  <div className="space-y-4 sm:space-y-6">
    <Skeleton className="h-6 w-3/4 sm:h-8" />
    <div className="space-y-3 sm:space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-12 w-full sm:h-16" />
      ))}
    </div>
  </div>
);

export const Test: React.FC<TestProps> = ({
  questions,
  sessionId,
  timeRemaining,
  onSubmitTest,
  setQuestions,
  onMarkForReview,
  markedQuestions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
}) => {
  const [submitTest] = useSubmitEntranceTestMutation();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate question status for navigation and meta
  const questionStatus = questions.reduce((acc, q, index) => {
    acc[index + 1] = {
      answered: q.selectedAnswer !== -1,
      marked: markedQuestions[q._id] || false
    };
    return acc;
  }, {} as { [key: string]: { answered: boolean; marked: boolean } });

  // Calculate meta statistics
  const metaStats = {
    totalQuestions: questions.length,
    attempted: questions.filter(q => q.selectedAnswer !== -1).length,
    notAttempted: questions.filter(q => q.selectedAnswer === -1).length,
    marked: Object.values(markedQuestions).filter(Boolean).length
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAnswerChange = useCallback(
    (questionId: string, selectedAnswer: number) => {
      setQuestions((prev) =>
        prev.map((q) =>
          q._id === questionId ? { ...q, selectedAnswer, timeSpent: q.timeSpent + 1 } : q
        )
      );
    },
    [setQuestions]
  );

  const handleOpenSubmitModal = useCallback(() => {
    const unansweredCount = questions.filter(q => q.selectedAnswer === -1).length;
    const markedCount = Object.values(markedQuestions).filter(Boolean).length;

    if (unansweredCount > 0 || markedCount > 0) {
      const message: string[] = [];
      if (unansweredCount > 0) message.push(`${unansweredCount} questions unanswered`);
      if (markedCount > 0) message.push(`${markedCount} questions marked for review`);

      toast.warning(`Warning: ${message.join(' and ')}`);
    }

    setShowSubmitModal(true);
  }, [questions, markedQuestions]);

  const handleSubmitTest = useCallback(async () => {
    if (!sessionId) {
      toast.error("Session ID is missing");
      return;
    }

    if (isSubmitting) {
      return;
    }

    try {
      console.log("Submitting test for session:", sessionId);
      setIsSubmitting(true);
      const submissionToastId = toast.loading("Submitting examination results...");

      const answers = questions.map((q) => ({
        questionId: q._id,
        selectedAnswer: q.selectedAnswer,
        timeSpent: q.timeSpent
      }));

      const response = await submitTest({ sessionId, answers }).unwrap();
      toast.dismiss(submissionToastId);
      toast.success("Examination submitted successfully!");
      setShowSubmitModal(false);
      onSubmitTest(response);
    } catch (err: any) {
      console.error("Submit test error:", err);
      toast.error(err?.data?.message || "Failed to submit test. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  }, [sessionId, questions, submitTest, onSubmitTest, isSubmitting]);

  const handleModalClose = useCallback(() => {
    if (!isSubmitting) {
      setShowSubmitModal(false);
    }
  }, [isSubmitting]);

  const currentQuestion = questions[currentQuestionIndex];
  const isMarked = currentQuestion && markedQuestions[currentQuestion._id];

  if (isLoading || !currentQuestion) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <Card className="p-4 sm:p-6">
          <QuestionSkeleton />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="p-4 sm:p-6">
        <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:mb-6 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-base font-semibold text-gray-700 dark:text-gray-200 sm:text-lg">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            {isMarked && (
              <span className="rounded bg-orange-50 px-2 py-1 text-xs text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 sm:text-sm font-semibold">
                Marked for Review
              </span>
            )}
          </div>
          <Button
            variant="outline"
            onClick={() => onMarkForReview(currentQuestion._id)}
            className={`flex items-center gap-1 text-xs sm:gap-2 sm:text-sm font-bold rounded-lg ${isMarked
              ? "border-[#F37021] bg-[#F37021]/10 text-[#F37021] hover:bg-[#F37021]/20"
              : "border-gray-300 text-gray-500 hover:bg-gray-50"
              }`}
          >
            <Flag className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{isMarked ? "Unmark" : "Mark for Review"}</span>
          </Button>
        </div>

        <div className="mb-6 sm:mb-8">
          <p className="text-base leading-relaxed text-gray-800 dark:text-gray-200 sm:text-lg">
            {currentQuestion.question}
          </p>
        </div>
        <RadioGroup
          value={currentQuestion.selectedAnswer.toString()}
          onValueChange={(value) =>
            handleAnswerChange(currentQuestion._id, parseInt(value))
          }
          className="space-y-3 sm:space-y-4"
        >
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`flex cursor-pointer items-start rounded-xl border-2 p-3 transition-all sm:items-center sm:p-5 ${currentQuestion.selectedAnswer === index
                ? "border-[#2C4276] bg-[#f0f4f9] dark:border-blue-400 dark:bg-blue-900/30"
                : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                }`}
            >
              <RadioGroupItem
                value={index.toString()}
                id={`option-${index}`}
                className="mr-2 mt-0.5 sm:mr-3 sm:mt-0"
              />
              <Label
                htmlFor={`option-${index}`}
                className="flex-1 cursor-pointer text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-base"
              >
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Card>

      <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:gap-4">
        {/* Navigation buttons row */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestionIndex(Math.max(currentQuestionIndex - 1, 0))}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-1 px-4 py-6 text-sm sm:gap-2 sm:px-6 sm:py-7 sm:text-base border-2 border-[#2C4276] text-[#2C4276] font-bold rounded-xl hover:bg-[#f0f4f9]"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={() => setCurrentQuestionIndex(Math.min(currentQuestionIndex + 1, questions.length - 1))}
            disabled={currentQuestionIndex === questions.length - 1}
            className="flex items-center gap-1 px-4 py-6 text-sm sm:gap-2 sm:px-6 sm:py-7 sm:text-base bg-[#2C4276] hover:bg-[#1e2e52] font-bold rounded-xl shadow-lg"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Submit button in its own row */}
        <div className="flex justify-center pt-4">
          <Button
            type="button"
            onClick={() => {
              console.log("Submit button clicked");
              handleOpenSubmitModal();
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-6 text-lg font-black rounded-2xl shadow-xl shadow-green-500/20 hover:scale-105 active:scale-95 transition-all"
            disabled={isSubmitting}
          >
            <Save className="h-5 w-5" />
            {isSubmitting ? "Processing Submission..." : "Complete & Submit Test"}
          </Button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showSubmitModal}
        onClose={handleModalClose}
        onConfirm={handleSubmitTest}
        type="submit"
        isLoading={isSubmitting}
      />
    </div>
  );
};