import { useNavigate } from "react-router-dom";
import { LogoIcon } from "../icons/Logo";
import { useState } from "react";

export function Landing() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleAddToBrain = () => {
    // Store the URL if entered, then redirect to signup
    if (inputValue.trim()) {
      localStorage.setItem("pendingUrl", inputValue);
    }
    navigate("/Signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d12] via-[#0a0a0f] to-[#0d0d12] relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-purple-900/5 pointer-events-none"></div>
      
      {/* Animated gradient orbs - Purple glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/2 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-[80px] animate-pulse-slow animation-delay-400"></div>
      
      {/* Animated fog layers */}
      <div className="fog-container">
        <div className="fog fog-1"></div>
        <div className="fog fog-2"></div>
        <div className="fog fog-3"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 lg:px-16 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="text-purple-500">
            <LogoIcon />
          </div>
          <span className="text-white text-xl font-semibold tracking-tight">Brainly</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a>
          <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">How it works</a>
          <a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/Signin")}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors text-sm"
          >
            Sign in
          </button>
          <button
            onClick={() => navigate("/Signup")}
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all duration-300 text-sm font-medium"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-24 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-purple-400 text-sm tracking-[0.25em] uppercase mb-6 animate-fade-in font-medium">
            Your Second Brain
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] animate-fade-in-up tracking-tight">
            What will you
            <span className="block text-purple-400 mt-2">
              remember today?
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-14 max-w-2xl mx-auto animate-fade-in-up animation-delay-200 leading-relaxed">
            Save your favorite YouTube videos, tweets, and links. Organize your digital 
            life and never lose an important idea again.
          </p>

          {/* Search/Input Box - Main CTA */}
          <div className="relative max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
            <div className="bg-[#18181f]/90 backdrop-blur-xl border border-gray-800/60 rounded-2xl p-6 shadow-2xl shadow-black/20">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Paste a YouTube link, tweet, or any URL to save..."
                className="w-full bg-transparent text-gray-200 placeholder-gray-500 outline-none text-base"
                onKeyDown={(e) => e.key === 'Enter' && handleAddToBrain()}
              />
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-800/50">
                <span className="text-gray-500 text-sm">+ Add to your brain</span>
                <button 
                  onClick={handleAddToBrain}
                  className="p-2.5 bg-purple-600 hover:bg-purple-500 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Quick action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10 animate-fade-in-up animation-delay-600">
            <button
              onClick={() => navigate("/Signup")}
              className="group flex items-center gap-2 px-5 py-2.5 bg-transparent border border-gray-700/60 rounded-xl text-gray-300 hover:border-purple-500/50 hover:text-white transition-all duration-300 text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Connect GitHub
            </button>
            <button
              onClick={() => navigate("/Signup")}
              className="group flex items-center gap-2 px-5 py-2.5 bg-purple-600/10 border border-purple-500/30 rounded-xl text-purple-400 hover:bg-purple-600/20 hover:text-purple-300 transition-all duration-300 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Start Free Trial
            </button>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-purple-400 text-sm tracking-[0.2em] uppercase text-center mb-4">Features</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Everything you need to
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-purple-400 text-center mb-16">
            organize your mind
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group p-8 bg-[#18181f]/60 backdrop-blur-xl border border-gray-800/40 rounded-2xl hover:border-purple-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-600/15 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Save Anything</h3>
              <p className="text-gray-500 leading-relaxed">YouTube videos, tweets, articles, and links. Everything in one organized place.</p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-[#18181f]/60 backdrop-blur-xl border border-gray-800/40 rounded-2xl hover:border-purple-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-600/15 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Search Instantly</h3>
              <p className="text-gray-500 leading-relaxed">Find any saved content in seconds with powerful search and filtering.</p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-[#18181f]/60 backdrop-blur-xl border border-gray-800/40 rounded-2xl hover:border-purple-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-600/15 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Share Collections</h3>
              <p className="text-gray-500 leading-relaxed">Share your curated collections with friends or keep them private.</p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 bg-[#18181f]/60 backdrop-blur-xl border border-gray-800/40 rounded-2xl hover:border-purple-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-600/15 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Smart Tags</h3>
              <p className="text-gray-500 leading-relaxed">Auto-categorize your content with intelligent tagging system.</p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 bg-[#18181f]/60 backdrop-blur-xl border border-gray-800/40 rounded-2xl hover:border-purple-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-600/15 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Mobile Ready</h3>
              <p className="text-gray-500 leading-relaxed">Access your brain from anywhere, on any device, anytime.</p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 bg-[#18181f]/60 backdrop-blur-xl border border-gray-800/40 rounded-2xl hover:border-purple-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-600/15 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Secure & Private</h3>
              <p className="text-gray-500 leading-relaxed">Your data is encrypted and secure. We never sell your information.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative z-10 py-28 px-4 border-t border-gray-800/30">
        <div className="max-w-5xl mx-auto">
          <p className="text-purple-400 text-sm tracking-[0.2em] uppercase text-center mb-4">How it works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Three simple steps
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-400 text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold text-white mb-3">Copy the link</h3>
              <p className="text-gray-500">Find something interesting? Just copy the URL from your browser.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-400 text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold text-white mb-3">Paste & Save</h3>
              <p className="text-gray-500">Paste it into Brainly and add a title. We'll handle the rest.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-400 text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold text-white mb-3">Access Anytime</h3>
              <p className="text-gray-500">Search, filter, and access your saved content whenever you need it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-28 px-4 border-t border-gray-800/30">
        <div className="max-w-5xl mx-auto">
          <p className="text-purple-400 text-sm tracking-[0.2em] uppercase text-center mb-4">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Simple, transparent pricing
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 bg-[#18181f]/60 backdrop-blur-xl border border-gray-800/40 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
              <p className="text-gray-500 mb-6">Perfect for getting started</p>
              <div className="text-4xl font-bold text-white mb-6">$0<span className="text-lg text-gray-500 font-normal">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Up to 50 saved items
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Basic search
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Share up to 3 collections
                </li>
              </ul>
              <button 
                onClick={() => navigate("/Signup")}
                className="w-full py-3 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800/50 transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="p-8 bg-gradient-to-b from-purple-600/20 to-transparent border border-purple-500/30 rounded-2xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">Popular</div>
              <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
              <p className="text-gray-500 mb-6">For power users</p>
              <div className="text-4xl font-bold text-white mb-6">$9<span className="text-lg text-gray-500 font-normal">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited saved items
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Advanced search & filters
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited collections
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority support
                </li>
              </ul>
              <button 
                onClick={() => navigate("/Signup")}
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-all"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-28 px-4 border-t border-gray-800/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to build your second brain?
          </h2>
          <p className="text-gray-500 text-lg mb-10">
            Join thousands of users who are already organizing their digital lives with Brainly.
          </p>
          <button 
            onClick={() => navigate("/Signup")}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-all duration-300 text-lg font-medium"
          >
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-gray-800/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="text-purple-500">
                <LogoIcon />
              </div>
              <span className="text-gray-500">© 2025 Brainly. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-8">
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Terms</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
