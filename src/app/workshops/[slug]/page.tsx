import { notFound } from "next/navigation";
import { workshops } from "@/lib/workshops";

export default function WorkshopDetail({ params }: any) {
  const workshop = workshops[params.slug as keyof typeof workshops];
  if (!workshop) return notFound();

  const workshopHighlights = [
  {
    title: "Core Concepts & Foundations",
    description:
      "Understand the fundamental concepts, terminology, and workflows required to build a strong base before moving into advanced topics.",
  },
  {
    title: "Hands-On Practical Learning",
    description:
      "Work on guided exercises and activities that help you apply concepts in real time and gain practical confidence.",
  },
  {
    title: "Real-World Applications",
    description:
      "Learn how concepts are used in real industry scenarios, projects, and problem-solving situations.",
  },
  {
    title: "Best Practices & Next Steps",
    description:
      "Get insights into industry best practices, common mistakes to avoid, and clear guidance on how to continue learning after the workshop.",
  },
];


  return (
    <main className="bg-background px-4 sm:px-6 lg:px-8">

      {/* ================= HERO ================= */}
      <section className="py-14 border-b animate-fade-up">
        <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div className="rounded-2xl bg-muted p-5 flex justify-center">
            <img
              src={workshop.promoImage}
              alt={workshop.title}
              className="max-h-[500px] object-contain"
            />
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {workshop.title}
            </h1>

            <p className="mt-3 text-muted-foreground max-w-xl">
              {workshop.subtitle}
            </p>

            <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm animate-scale-in">
              <h3 className="font-semibold text-lg mb-4">
                Registration Instructions
              </h3>

              <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
                <li>Scan the QR code or click the registration link</li>
                <li>Fill in personal, academic & contact details</li>
                <li>Submit the form before the deadline</li>
              </ol>

              <div className="mt-6 flex flex-wrap items-center gap-6">
                <img
                  src={workshop.qrImage}
                  alt="QR"
                  className="w-36 h-36 rounded-xl border shadow-sm"
                  style={{ imageRendering: "pixelated" }}
                />

                <a
                  href={workshop.brochurePdf}
                  target="_blank"
                  className="rounded-lg bg-teal-600 px-6 py-2.5 text-white text-sm font-semibold"
                >
                  Download Brochure
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= HIGHLIGHTS (GLASS + FLOAT) ================= */}
{/* ================= KEY LEARNING MODULES ================= */}
<section className="py-20 bg-background">
  <div className="mx-auto max-w-7xl px-6 lg:px-12">

    {/* Header */}
    <div className="mb-14 text-center max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-headline font-bold">
        What You Will Learn
      </h2>
      <p className="mt-3 text-muted-foreground text-sm">
        A structured breakdown of concepts and skills covered during the workshop
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {workshopHighlights.map((item, i) => (
        <div
          key={i}
          className="
            group rounded-2xl bg-background
            border border-border
            p-6
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-lg
            hover:border-primary/40
          "
        >
          {/* Step Indicator */}
          <div
            className="
              mb-4 flex h-10 w-10 items-center justify-center
              rounded-xl bg-primary/10
              text-primary font-semibold
              transition-colors
              group-hover:bg-primary
              group-hover:text-primary-foreground
            "
          >
            {i + 1}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-base mb-2">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>




      {/* ================= AGENDA + INSTRUCTIONS ================= */}
      <section className="py-16 bg-muted/30 animate-scale-in">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-10">

            {/* AGENDA – TIMELINE STYLE */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">
                Workshop Agenda
              </h2>

              <div className="space-y-4">
                {workshop.agenda.map((row, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-20 text-sm font-medium text-teal-600">
                      {row.time}
                    </div>
                    <div className="flex-1 rounded-lg bg-muted/40 px-4 py-2.5 text-sm">
                      {row.activity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INSTRUCTIONS */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">
                Student Instructions
              </h2>

              <ul className="space-y-3 text-sm text-muted-foreground">
                {workshop.instructions.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 rounded-lg bg-muted/40 px-4 py-2.5"
                  >
                    <span className="text-teal-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}