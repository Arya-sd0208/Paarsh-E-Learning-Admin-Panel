"use client";

import { useDeleteSubcategoryMutation } from "@/redux/api/subcategoryApi";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  deleteId: string | null;
  setDeleteId: (id: string | null) => void;
}

export default function DeleteSubcategoryDialog({
  deleteId,
  setDeleteId,
}: Props) {
  const [deleteSubcategory] = useDeleteSubcategoryMutation();

  const handleDelete = async () => {
    if (!deleteId) return;

    await deleteSubcategory(deleteId);
    toast.success("Subcategory deleted");
    setDeleteId(null);
  };

  return (
    <AlertDialog
      open={!!deleteId}
      onOpenChange={() => setDeleteId(null)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setDeleteId(null)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}