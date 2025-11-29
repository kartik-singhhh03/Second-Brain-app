import { CrossIcon } from "../icons/CrossIcon";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Link = "link"
}

export function CreatComponentModal({ open, onClose }: { open: boolean, onClose: () => void }) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Check for pending URL from landing page
    useEffect(() => {
        if (open) {
            const pendingUrl = localStorage.getItem('pendingUrl');
            if (pendingUrl && linkRef.current) {
                linkRef.current.value = pendingUrl;
                localStorage.removeItem('pendingUrl');
                
                // Auto-detect type
                if (pendingUrl.includes('youtube.com') || pendingUrl.includes('youtu.be')) {
                    setType(ContentType.Youtube);
                } else if (pendingUrl.includes('twitter.com') || pendingUrl.includes('x.com')) {
                    setType(ContentType.Twitter);
                } else {
                    setType(ContentType.Link);
                }
            }
        }
    }, [open]);

    // Auto-detect content type from URL
    const detectType = (url: string) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            setType(ContentType.Youtube);
        } else if (url.includes('twitter.com') || url.includes('x.com')) {
            setType(ContentType.Twitter);
        } else {
            setType(ContentType.Link);
        }
    };

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        if (!title || !link) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                title,
                link,
                type
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            
            // Clear form
            if (titleRef.current) titleRef.current.value = '';
            if (linkRef.current) linkRef.current.value = '';
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to add content");
        } finally {
            setLoading(false);
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative bg-[#18181f] border border-gray-800/40 rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800/40">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Add to Brain</h2>
                        <p className="text-gray-500 text-sm mt-1">Save a link, video, or tweet</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all"
                    >
                        <CrossIcon />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-gray-400 text-sm mb-2 font-medium">Title</label>
                        <input
                            ref={titleRef}
                            placeholder="Give it a memorable name"
                            className="w-full px-4 py-3 bg-[#0d0d12] border border-gray-800/60 rounded-xl text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2 font-medium">Link</label>
                        <input
                            ref={linkRef}
                            placeholder="Paste URL here"
                            onChange={(e) => detectType(e.target.value)}
                            className="w-full px-4 py-3 bg-[#0d0d12] border border-gray-800/60 rounded-xl text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-3 font-medium">Content Type</label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => setType(ContentType.Youtube)}
                                className={`flex flex-col items-center gap-2 py-3 px-2 rounded-xl font-medium transition-all ${
                                    type === ContentType.Youtube
                                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                                        : 'bg-[#0d0d12] text-gray-400 border border-gray-800/60 hover:border-gray-700'
                                }`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                                    <path fill="#18181f" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                                <span className="text-xs">YouTube</span>
                            </button>
                            <button
                                onClick={() => setType(ContentType.Twitter)}
                                className={`flex flex-col items-center gap-2 py-3 px-2 rounded-xl font-medium transition-all ${
                                    type === ContentType.Twitter
                                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                                        : 'bg-[#0d0d12] text-gray-400 border border-gray-800/60 hover:border-gray-700'
                                }`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                                <span className="text-xs">Twitter</span>
                            </button>
                            <button
                                onClick={() => setType(ContentType.Link)}
                                className={`flex flex-col items-center gap-2 py-3 px-2 rounded-xl font-medium transition-all ${
                                    type === ContentType.Link
                                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                                        : 'bg-[#0d0d12] text-gray-400 border border-gray-800/60 hover:border-gray-700'
                                }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                <span className="text-xs">Link</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0">
                    <button
                        onClick={addContent}
                        disabled={loading}
                        className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-300"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Saving...
                            </span>
                        ) : (
                            "Save to Brain"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
