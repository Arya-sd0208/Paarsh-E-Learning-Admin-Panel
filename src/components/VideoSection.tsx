"use client";

export default function VideoSection() {
  return (
    <section className="relative py-12 md:py-14 overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/videobg.png')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/55 backdrop-blur-[0.5px]" />

      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-0 w-1/3 h-px bg-teal-300/30 rotate-3" />
        <div className="absolute bottom-16 right-0 w-1/3 h-px bg-teal-300/30 -rotate-3" />
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4 text-center">

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          How We Work
        </h2>

        <p className="mt-3 text-sm md:text-base text-gray-600 max-w-xl mx-auto">
          Streamlined processes, innovative solutions, and dedicated teamwork
          to deliver exceptional results every time.
        </p>

        {/* Video */}
        <div className="mt-8 rounded-xl overflow-hidden shadow-xl max-w-3xl mx-auto bg-white/90 border border-white/40">
          <div className="relative pb-[56.25%] h-0">

            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/video/how-we-work.mp4"
              controls
              preload="metadata"
              poster="/video/how-we-work.png" // optional thumbnail
            >
              Your browser does not support the video tag.
            </video>

          </div>
        </div>

      </div>
    </section>
  );
}