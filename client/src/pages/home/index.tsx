import useAuthStore from "@/store/auth.store";
import Loading from "@/components/ui/loading";
import Hero from "./lib/comnponents/hero";

export default function Home()
{
  const { loading } = useAuthStore();

  if (loading)
  {
    return (
      <Loading />
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-linear-to-b from-gray-950 via-gray-900 to-black">
      <Hero/>
      <section className="max-w-7xl mx-auto px-6 py-16 animate-in fade-in-50 slide-in-from-top-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3 animate-in fade-in-50 zoom-in-95">
            Comments
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto animate-in fade-in-50 slide-in-from-bottom-2">
            What our customers say after building their dream setups with us
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Alex Kim",
              role: "Streamer",
              text:
                "Absolutely love the experience. The curated gear and quick support made my streaming setup shine.",
              avatar: "https://i.pravatar.cc/100?img=5",
            },
            {
              name: "Riley Morgan",
              role: "Designer",
              text:
                "Seamless from start to finish. The recommendations saved me hours and the final look is stunning!",
              avatar: "https://i.pravatar.cc/100?img=15",
            },
            {
              name: "Jordan Lee",
              role: "Gamer",
              text:
                "Performance and aesthetics in perfect balance. Couldn’t be happier with my battlestation.",
              avatar: "https://i.pravatar.cc/100?img=32",
            },
          ].map((c, i) => (
            <div
              key={i}
              className="group bg-linear-to-br from-indigo-500/10 to-purple-600/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all animate-in fade-in-50 slide-in-from-bottom-6 will-change-transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10"
                />
                <div>
                  <p className="text-white font-semibold leading-tight">{c.name}</p>
                  <p className="text-xs text-white/60">{c.role}</p>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed">
                “{c.text}”
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20 animate-in fade-in-50 slide-in-from-bottom-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3 animate-in fade-in-50 zoom-in-95">
            Setups that customers made by using us
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto animate-in fade-in-50 slide-in-from-bottom-2">
            Explore a selection of community builds for inspiration
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Minimal Workstation",
              img: "https://i.pinimg.com/736x/05/61/da/0561da8a45903e6150da9e5005cc3e6a.jpg",
            },
            {
              title: "RGB Gaming Nook",
              img: "https://i.pinimg.com/736x/75/41/ea/7541ea9ed417514f93a905d0b2fff0a4.jpg",
            },
            {
              title: "Creator’s Suite",
              img: "https://i.pinimg.com/736x/b9/5b/51/b95b51f57020d65212961a4ce314034c.jpg",
            },
            {
              title: "Studio Vibes",
              img: "https://i.pinimg.com/736x/33/1a/21/331a21c1e351ec170fe66dececf2e1dd.jpg",
            },
            {
              title: "Dark Mode Setup",
              img: "https://i.pinimg.com/736x/34/0e/d9/340ed9d58be12a94eadbb435bf572cf9.jpg",
            },
            {
              title: "Dual Monitor Desk",
              img: "https://i.pinimg.com/1200x/4a/f3/3a/4af33ac802c1e319ff215b285d977d05.jpg",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-indigo-500/10 to-purple-600/10 backdrop-blur-xl hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all animate-in fade-in-50 slide-in-from-bottom-6 will-change-transform hover:-translate-y-1"
            >
              <div className="relative h-56 sm:h-60">
                <img
                  src={s.img}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-semibold text-lg animate-in fade-in-50">{s.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}