import { Link } from "react-router-dom";

export default function Hero()
{
  return (
    <div className="min-h-screen pt-24 bg-linear-to-b from-gray-950 via-gray-900 to-black">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col items-start justify-center md:ml-24 px-6 md:px-0 gap-6 md:gap-10 py-16">
          <h1 className="text-4xl md:text-5xl font-bold font-space-age text-white">
            Build your dream setup
          </h1>
          <p className="text-lg text-white/70 max-w-xl">
            Keyboards, mice, headphones, monitors, and speakers — curated gear to elevate your gaming and productivity.
          </p>
          <div className="flex gap-4">
            <Link to="/products" className="bg-indigo-600 hover:bg-indigo-500 rounded-md px-6 py-4 text-white cursor-pointer inline-flex items-center justify-center">
              Shop peripherals
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="relative w-full max-w-xl aspect-[4/3] rounded-2xl bg-linear-to-br from-indigo-900/30 via-purple-900/20 to-fuchsia-900/20 border border-white/10 overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-3 p-6">
              <div className="rounded-xl bg-white/5 border border-white/10" />
              <div className="rounded-xl bg-white/5 border border-white/10" />
              <div className="rounded-xl bg-white/5 border border-white/10" />
              <div className="rounded-xl bg-white/5 border border-white/10" />
              <div className="rounded-xl bg-white/5 border border-white/10" />
              <div className="rounded-xl bg-white/5 border border-white/10" />
              <div className="rounded-xl bg-white/5 border border-white/10" />
              <div className="rounded-xl bg-white/5 border border-white/10" />
              <div className="rounded-xl bg-white/5 border border-white/10" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm text-white/70">
              <span>Hot picks</span>
              <span>Fast shipping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}