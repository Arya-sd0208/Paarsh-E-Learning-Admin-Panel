"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import SyllabusModal from "./SyllabusModal";

export default function DownloadSyllabusCTA({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="lg"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        Download Syllabus
      </Button>

      <SyllabusModal
        open={open}
        onClose={() => setOpen(false)}
        slug={slug}
      />
    </>
  );
}