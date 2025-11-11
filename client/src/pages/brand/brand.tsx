import { Link } from "react-router-dom";

export default function Brand() {
  return (
    <div className="min-h-screen pt-24 bg-linear-to-b from-gray-950 via-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-bold font-space-age text-white">About Our Brand</h1>
            <p className="text-white/70 text-lg">
              We create a space where technology becomes a part of your style and comfort.
              Our brand brings together modern design, reliability, and performance — so every detail of your workspace or gaming setup inspires you to do more.
            </p>
            <div className="flex gap-4">
              <Link to="/products" className="bg-indigo-600 hover:bg-indigo-500 rounded-md px-6 py-4 text-white inline-flex items-center justify-center">
                Explore products
              </Link>
              <Link to="/products" className="rounded-md px-6 py-4 border border-white/20 text-white hover:bg-white/10 transition-colors inline-flex items-center justify-center">
                Browse all
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center p-2 md:p-4">
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
                <span>Quality first</span>
                <span>Ergonomic design</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
            <p className="text-white/70 leading-relaxed">
              We believe that technology should do more than just work — it should bring joy.
              Our mission is to make interaction with devices smooth, natural, and effortless.
              That’s why every mouse, keyboard, headset, and monitor we offer goes through careful selection and testing.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-3">Our Values</h2>
            <p className="text-white/70 leading-relaxed">
              We partner only with trusted manufacturers and focus on quality above all.
              Every product comes with warranty and support because we value our customers’ trust.
              We constantly follow the latest tech trends and choose models that combine ergonomics, style, and performance.
            </p>
          </section>

          <section className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-3">Why Choose Us</h2>
            <p className="text-white/70 leading-relaxed">
              People choose us because we care about comfort, aesthetics, and precision.
              We don’t just sell devices — we create an experience where every detail matters.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-white/80">
                Comfort-first approach
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-white/80">
                Curated, tested gear
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-white/80">
                Reliable support & warranty
              </div>
            </div>
          </section>
        </div>

        {/* Closing */}
        <div className="mt-12 text-center text-white/80">
          <p className="mb-2">We are the brand that lets you feel the technology.</p>
          <p className="font-semibold">Work. Play. Live in comfort.</p>
        </div>
      </div>
    </div>
  );
}
