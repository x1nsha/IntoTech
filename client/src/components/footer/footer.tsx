import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-black/70 backdrop-blur border-t border-white/10 text-white">
            <div className="container mx-auto px-6 py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="inline-block font-space-age text-2xl bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-wide mb-4">
                            IntoTech
                        </Link>
                        <p className="text-white/70 leading-relaxed">
                            Build your dream setup with curated peripherals keyboards, mice, headphones, monitors, and speakers for play and productivity.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-sm uppercase tracking-wider text-white/60 mb-4">Shop</h3>
                        <ul className="space-y-3 text-white/80">
                            <li><Link to="/products" className="hover:text-indigo-300 transition-colors">Keyboards</Link></li>
                            <li><Link to="/products" className="hover:text-indigo-300 transition-colors">Mice</Link></li>
                            <li><Link to="/products" className="hover:text-indigo-300 transition-colors">Headphones</Link></li>
                            <li><Link to="/products" className="hover:text-indigo-300 transition-colors">Monitors</Link></li>
                            <li><Link to="/products" className="hover:text-indigo-300 transition-colors">Speakers</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm uppercase tracking-wider text-white/60 mb-4">Company</h3>
                        <ul className="space-y-3 text-white/80">
                            <li><Link to="/brand" className="hover:text-indigo-300 transition-colors">About</Link></li>
                            <li><Link to="/products" className="hover:text-indigo-300 transition-colors">Shop</Link></li>
                            <li><Link to="/auth/login" className="hover:text-indigo-300 transition-colors">Login</Link></li>
                            <li><Link to="/auth/register" className="hover:text-indigo-300 transition-colors">Create account</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-sm uppercase tracking-wider text-white/60 mb-4">Stay in the loop</h3>
                        <p className="text-white/70 mb-4">Get product drops and deals directly to your inbox.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button type="button" className="px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/60 text-sm">
                    <p>© {new Date().getFullYear()} IntoTech. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <a href="https://github.com/x1nsha/IntoTech" aria-label="GitHub" className="hover:text-indigo-300 transition-colors">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.21.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.17-3.37-1.17-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.84.09-.65.35-1.1.63-1.36-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.56 9.56 0 0112 7.07c.85 0 1.71.12 2.51.35 1.9-1.3 2.74-1.03 2.74-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10 10 0 0012 2z" clipRule="evenodd"/></svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}