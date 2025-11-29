import { LogoIcon } from "../icons/Logo"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { SidebarItem } from "./sidebarItem"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

export function Sidebar(){
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="h-screen bg-[#0d0d12]/95 backdrop-blur-xl border-r border-gray-800/40 w-72 fixed left-0 top-0 flex flex-col">
            {/* Logo */}
            <div className="px-6 pt-7 pb-6 border-b border-gray-800/40">
                <Link to="/" className="flex items-center gap-3">
                    <div className="text-purple-500">
                        <LogoIcon/>
                    </div>
                    <span className="text-white text-xl font-semibold">Brainly</span>
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 px-4 py-6">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-4">Content</p>
                
                <nav className="space-y-1">
                    <button 
                        onClick={() => setActiveItem('all')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                            activeItem === 'all' || activeItem === null
                                ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        All Content
                    </button>
                    
                    <SidebarItem 
                        text="Twitter" 
                        icon={<TwitterIcon/>}
                        active={activeItem === 'twitter'}
                        onClick={() => setActiveItem('twitter')}
                    />
                    <SidebarItem 
                        text="YouTube" 
                        icon={<YoutubeIcon/>}
                        active={activeItem === 'youtube'}
                        onClick={() => setActiveItem('youtube')}
                    />
                    
                    <button 
                        onClick={() => setActiveItem('links')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                            activeItem === 'links'
                                ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        Links
                    </button>
                </nav>

                <div className="mt-8">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-4">Tools</p>
                    <nav className="space-y-1">
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            Tags
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                            Collections
                        </button>
                    </nav>
                </div>
            </div>

            {/* User Section */}
            <div className="px-4 py-4 border-t border-gray-800/40">
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                    <div className="w-8 h-8 bg-purple-600/30 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-medium truncate">User</p>
                        <p className="text-xs text-gray-500">Free Plan</p>
                    </div>
                </div>
                
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </div>
        </div>
    );
}