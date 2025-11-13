import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Brand()
{
    const location = useLocation();

    useEffect(() =>
    {
        if (location.hash === "#about")
        {
            const el = document.getElementById("about");
            if (el)
            {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, [location]);

    return (
        <div className="min-h-screen pt-24 bg-linear-to-b from-gray-950 via-gray-900 to-black">
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                    <div className="flex flex-col gap-6 animate-fade-in-up">
                        <h1
                            id="about"
                            className="text-4xl md:text-6xl font-bold font-space-age text-white bg-gradient-to-r from-white to-purple-200 bg-clip-text animate-fade-in-up"
                            style={{ animationDelay: "0.1s" }}
                        >
                            About Our Brand
                        </h1>
                        <p
                            className="text-white/80 text-lg leading-relaxed animate-fade-in-up"
                            style={{ animationDelay: "0.2s" }}
                        >
                            We create a space where technology becomes a part of your style and comfort.
                            Our brand brings together modern design, reliability, and performance — so every detail of your workspace or gaming setup inspires you to do more.
                        </p>

                        <div
                            className="flex gap-8 mt-4 animate-fade-in-up"
                            style={{ animationDelay: "0.3s" }}
                        >
                            <div className="text-center">
                                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">50K+</div>
                                <div className="text-white/60 text-sm">Happy Clients</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">100+</div>
                                <div className="text-white/60 text-sm">Products</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">5★</div>
                                <div className="text-white/60 text-sm">Rating</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center p-2 md:p-4 animate-scale-in">
                        <div className="relative w-full max-w-xl aspect-[4/3] rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-600/20 to-fuchsia-500/20 border border-white/20 overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"></div>

                            <div className="absolute inset-0">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute w-2 h-2 bg-white/30 rounded-full animate-ping"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                            animationDelay: `${Math.random() * 2}s`,
                                            animationDuration: `${3 + Math.random() * 2}s`
                                        }}
                                    />
                                ))}
                            </div>

                            <img
                                src="/vite.svg"
                                alt="Our Brand"
                                className="relative z-1000 w-3/4 h-3/4 object-contain filter drop-shadow-2xl animate-float"
                                style={{ transform: "translateX(50px)" }}
                            />



                            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-sm animate-fade-in-up">
                <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent transition-transform duration-300 hover:scale-110">
                  Quality first
                </span>
                                <span className="font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent transition-transform duration-300 hover:scale-110">
                  Ergonomic design
                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <section className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 group hover:-translate-y-2 animate-fade-in-up">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white font-bold text-lg">🚀</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
                        </div>
                        <p className="text-white/70 leading-relaxed text-lg">
                            We believe that technology should do more than just work — it should bring joy.
                            Our mission is to make interaction with devices smooth, natural, and effortless.
                            That's why every mouse, keyboard, headset, and monitor we offer goes through careful selection and testing.
                        </p>
                    </section>

                    <section className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 group hover:-translate-y-2 animate-fade-in-up">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white font-bold text-lg">💎</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white">Our Values</h2>
                        </div>
                        <p className="text-white/70 leading-relaxed text-lg">
                            We partner only with trusted manufacturers and focus on quality above all.
                            Every product comes with warranty and support because we value our customers' trust.
                            We constantly follow the latest tech trends and choose models that combine ergonomics, style, and performance.
                        </p>
                    </section>

                    <section className="md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 group hover:-translate-y-1 animate-fade-in-up">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white font-bold text-lg">⭐</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white">Why Choose Us</h2>
                        </div>
                        <p className="text-white/70 leading-relaxed text-lg mb-8">
                            People choose us because we care about comfort, aesthetics, and precision.
                            We don't just sell devices — we create an experience where every detail matters.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[
                                { text: "Comfort-first approach", emoji: "😌" },
                                { text: "Curated, tested gear", emoji: "🔧" },
                                { text: "Reliable support & warranty", emoji: "🛡️" }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-6 text-white/80 backdrop-blur-sm hover:from-white/20 hover:to-white/10 transition-all duration-300 group cursor-pointer hover:scale-105 hover:-translate-y-1"
                                >
                                    <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                        {item.emoji}
                                    </div>
                                    <div className="font-semibold">{item.text}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="mt-16 text-center text-white/80 relative animate-fade-in">
                    <p className="mb-4 text-xl">
                        We are the brand that lets you feel the technology.
                    </p>
                    <p className="font-bold text-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-pulse">
                        Work. Play. Live in comfort.
                    </p>
                </div>
            </div>
        </div>
    );
}