import React from "react";

const STATS = [
  { number: "250", label: "Projects Completed" },
  { number: "300", label: "Happy Clients" },
  { number: "50", label: "Innovations" },
  { number: "30", label: "Team Members" },
];

export default function FunFact() {
  return (
    <section className="relative z-20 w-full -mt-44 sm:-mt-40 lg:-mt-36">
      {/* Dark background starts exactly where Hero ends (offset matches the negative margin) */}
      <div
        className="absolute bottom-0 left-0 right-0 top-44 sm:top-40 lg:top-36"
        style={{ backgroundColor: "#101828" }}
        aria-hidden="true"
      />

      {/* Card container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-10">
        <div
          className="relative w-full rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-16 overflow-hidden shadow-2xl"
          style={{ backgroundColor: "#151515" }}
        >
          {/* Subtle background wave/curve graphic */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg
              viewBox="0 0 1000 400"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0,400 C300,400 400,100 600,150 C800,200 900,50 1000,0 L1000,400 Z"
                fill="#2a2a2a"
              />
              <path
                d="M0,400 C200,300 300,150 500,200 C700,250 850,100 1000,100 L1000,400 Z"
                fill="#1f1f1f"
              />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left Column: Text */}
            <div className="flex flex-col items-start">
              <h2 className="font-bold text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight">
                Our fun fact
              </h2>
              <p
                className="mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed max-w-md"
                style={{ color: "#A0A0A0" }}
              >
                Each time we fix a particularly tricky bug, we give it a name
                and create a virtual &apos;Bug Wall of Fame&apos;. It&apos;s our way of
                celebrating overcoming challenges and learning from our
                mistakes.
              </p>
            </div>

            {/* Right Column: Stats Grid */}
            <div className="grid grid-cols-2 gap-y-8 gap-x-4 sm:gap-y-10 sm:gap-x-12">
              {STATS.map((stat, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3 lg:gap-4">
                  <div className="flex items-start">
                    <span className="font-bold text-white text-4xl sm:text-5xl tracking-tight leading-none">
                      {stat.number}
                    </span>
                    <span
                      className="font-bold text-xl sm:text-2xl leading-none ml-0.5"
                      style={{ color: "#E85D4C" }}
                    >
                      +
                    </span>
                  </div>
                  <span
                    className="text-xs sm:text-sm font-medium leading-tight"
                    style={{ color: "#A0A0A0" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
