"use client";

import { useDeleteCourseMutation } from "@/redux/api/courseApi";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  deleteId: string | null;
  setDeleteId: (id: string | null) => void;
}

export default function DeleteCourseDialog({
  deleteId,
  setDeleteId,
}: Props) {
  const [deleteCourse] = useDeleteCourseMutation();

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteCourse(deleteId).unwrap();
      toast.success("Course deleted successfully");
      setDeleteId(null);
    } catch (error) {
      toast.error("Failed to delete course");
    }
  };

  return (
    <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
      <AlertDialogContent className="max-w-md">

        {/* HEADER */}
        <AlertDialogHeader className="flex flex-col items-center text-center gap-3">

          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <Trash2 className="text-red-600" size={22} />
          </div>

          <AlertDialogTitle className="text-lg font-semibold text-gray-900">
            Delete Course
          </AlertDialogTitle>

          <p className="text-sm text-gray-500 leading-relaxed">
            This action cannot be undone.  
            This will permanently delete the course from the system.
          </p>

        </AlertDialogHeader>

        {/* FOOTER */}
        <AlertDialogFooter className="flex justify-center gap-3 mt-4">

          <Button
            variant="outline"
            onClick={() => setDeleteId(null)}
          >
            Cancel
          </Button>

          <Button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </Button>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}