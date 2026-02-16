'use client';

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EnquiryForm from "@/components/EnquiryForm";

interface Props {
  courseTitle: string;
}

export default function EnrollWithEnquiryModal({ courseTitle }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Enroll Button */}
      <Button
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        size="lg"
        onClick={() => setOpen(true)}
      >
        Enroll Now
      </Button>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
<DialogContent
  className="
    max-w-lg
    sm:rounded-2xl
    p-0
    fixed
    top-20
    left-1/2
    -translate-x-1/2
    translate-y-0
    overflow-hidden
  "
>
        <DialogHeader className="px-6 pt-6 pb-2">
    <DialogTitle className="text-lg font-headline">
              Enquire for {courseTitle}
            </DialogTitle>
          </DialogHeader>

         <div className="px-6 pb-6 max-h-[70vh] overflow-y-auto">
    <EnquiryForm courseTitle={courseTitle} />
  </div>
        </DialogContent>
      </Dialog>
    </>
  );
}