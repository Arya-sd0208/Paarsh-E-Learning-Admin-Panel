import Link from "next/link";

export default function WorkshopsPage() {
  return (
<main className="bg-background px-4 sm:px-6 lg:px-10 xl:px-12">

{/* ================= WORKSHOP CARDS ================= */}
<section className="py-12">
  <div className="container mx-auto px-4">

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center">
      {[
        { slug: "data-science", img: "/promo1.png" },
        { slug: "software-development", img: "/promo2.png" },
        { slug: "ai-ml", img: "/promo3.png" },
      ].map((item) => (
        <Link
          key={item.slug}
          href={`/workshops/${item.slug}`}
          className="group relative rounded-2xl bg-[#f7f5f2]
                     shadow-[0_10px_24px_rgba(0,0,0,0.10)]
                     hover:shadow-[0_14px_32px_rgba(0,0,0,0.14)]
                     transition-all duration-300
                     overflow-hidden"
        >

          {/* Poster Image */}
          <img
            src={item.img}
            alt=""
            className="block max-h-[440px] w-auto object-contain"
          />

          {/* Hover Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center
                       bg-black/0 group-hover:bg-black/35
                       transition-all duration-300"
          >
            <span
              className="opacity-0 group-hover:opacity-100
                         rounded-lg bg-teal-600 px-5 py-2.5
                         text-sm font-semibold text-white
                         transition"
            >
              View Workshop Details
            </span>
          </div>

        </Link>
      ))}
    </div>

  </div>
</section>




{/* ================= WORKSHOP VALUE ================= */}
<section className="py-12 bg-muted/40">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-10 items-start">

      {/* ================= LEFT – WHY ATTEND (ACCORDION ONLY) ================= */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Why Attend Our Workshops
        </h2>

        <div className="space-y-4">

          <details className="group rounded-lg bg-white p-4 shadow-sm">
            <summary className="flex cursor-pointer items-center justify-between font-medium list-none">
              Live Instructor-led Sessions
<span className="ml-2 inline-block h-3 w-3 border-r-2 border-b-2 border-gray-400
                 rotate-45 transition-transform duration-200
                 group-open:rotate-[225deg]" />
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">
              Learn directly from experienced instructors through live,
              interactive sessions with real-time doubt solving and
              industry-focused explanations.
            </p>
          </details>

          <details className="group rounded-lg bg-white p-4 shadow-sm">
            <summary className="flex cursor-pointer items-center justify-between font-medium list-none">
              Hands-on Real Projects
<span className="ml-2 inline-block h-3 w-3 border-r-2 border-b-2 border-gray-400
                 rotate-45 transition-transform duration-200
                 group-open:rotate-[225deg]" />
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">
              Work on real-world projects and practical use cases to
              understand how concepts are applied in actual industry
              environments.
            </p>
          </details>

          <details className="group rounded-lg bg-white p-4 shadow-sm">
            <summary className="flex cursor-pointer items-center justify-between font-medium list-none">
              Beginner Friendly
<span className="ml-2 inline-block h-3 w-3 border-r-2 border-b-2 border-gray-400
                 rotate-45 transition-transform duration-200
                 group-open:rotate-[225deg]" />
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">
              Designed for students and beginners with no prior technical
              background. Concepts are explained step-by-step.
            </p>
          </details>

          <details className="group rounded-lg bg-white p-4 shadow-sm">
            <summary className="flex cursor-pointer items-center justify-between font-medium list-none">
              Industry Certificate
<span className="ml-2 inline-block h-3 w-3 border-r-2 border-b-2 border-gray-400
                 rotate-45 transition-transform duration-200
                 group-open:rotate-[225deg]" />
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">
              Receive a recognized certificate upon successful completion,
              adding credibility to your resume and professional profile.
            </p>
          </details>

        </div>
      </div>

      {/* ================= RIGHT – WORKSHOP FORMAT (STATIC) ================= */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">
          Workshop Format
        </h3>

        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Duration: 3–5 Days</li>
          <li>• Mode: Online / Offline</li>
          <li>• Language: English + Hindi</li>
          <li>• Level: Beginner to Intermediate</li>
        </ul>

        <div className="mt-6 rounded-lg bg-teal-50 p-4">
          <h4 className="font-semibold text-teal-700">
            Certificate Included
          </h4>
          <p className="mt-1 text-sm text-teal-700/80">
            Receive a recognized certificate after successful completion.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

    </main>
  );
}