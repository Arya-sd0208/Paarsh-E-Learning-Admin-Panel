"use client";

import { useDeleteCourseMutation } from "@/redux/api/courseApi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DeleteCourseDialog({
  deleteId,
  setDeleteId,
}: any) {
  const [deleteCourse] = useDeleteCourseMutation();

  const handleDelete = async () => {
    await deleteCourse(deleteId);
    toast.success("Deleted");
    setDeleteId(null);
  };

  if (!deleteId) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <p>Are you sure?</p>
        <div className="flex gap-4 mt-4">
          <Button onClick={() => setDeleteId(null)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}