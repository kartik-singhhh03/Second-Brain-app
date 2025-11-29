import { useState } from "react";

function getYouTubeVideoID(url: string): string | null {
  if (!url) return null;
  // Handle various YouTube URL formats including youtu.be with query params
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/v\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/ // Just the video ID
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

function getTweetID(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
  return match ? match[1] : null;
}

// Auto-detect content type from URL
function detectContentType(url: string): "youtube" | "twitter" | "link" {
  if (!url) return 'link';
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  } else if (url.includes('twitter.com') || url.includes('x.com')) {
    return 'twitter';
  }
  return 'link';
}

interface CardProps {
    title: string;
    link: string;
    type?: "twitter" | "youtube" | "link";
}

export function Card({ title, link, type: propType }: CardProps) {
    const [copied, setCopied] = useState(false);
    const [showEmbed, setShowEmbed] = useState(false);
    
    // Auto-detect type from URL (overrides propType if URL clearly indicates type)
    const detectedType = detectContentType(link);
    const actualType = detectedType !== 'link' ? detectedType : (propType || 'link');
    
    const youtubeId = getYouTubeVideoID(link);
    const tweetId = getTweetID(link);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // YouTube Card
    if (actualType === 'youtube' && youtubeId) {
        return (
            <div className="group bg-[#18181f] rounded-2xl border border-gray-800/40 overflow-hidden hover:border-red-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10">
                {/* YouTube Thumbnail */}
                <div className="relative aspect-video bg-black">
                    {!showEmbed ? (
                        <>
                            <img 
                                src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                            {/* Play Button Overlay */}
                            <button 
                                onClick={() => setShowEmbed(true)}
                                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors cursor-pointer"
                            >
                                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
                                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </div>
                            </button>
                            {/* YouTube Badge */}
                            <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/80 rounded-lg px-2 py-1">
                                <svg className="w-5 h-4" fill="#FF0000" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                                <span className="text-white text-xs font-medium">YouTube</span>
                            </div>
                        </>
                    ) : (
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                            title={title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    )}
                </div>
                
                {/* Info */}
                <div className="p-4">
                    <h3 className="text-white font-medium text-sm line-clamp-2 mb-3">{title}</h3>
                    <div className="flex items-center justify-between">
                        <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-red-400 text-xs hover:underline flex items-center gap-1"
                        >
                            Watch on YouTube
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                        <button 
                            onClick={handleCopy}
                            className="text-gray-500 hover:text-white text-xs flex items-center gap-1 transition-colors"
                        >
                            {copied ? '✓ Copied' : 'Copy link'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Twitter/X Card
    if (actualType === 'twitter' && tweetId) {
        return (
            <div className="group bg-[#18181f] rounded-2xl border border-gray-800/40 overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                {/* Twitter Embed */}
                <div className="bg-black p-4">
                    <div className="bg-[#16181c] rounded-xl border border-gray-800 overflow-hidden">
                        {/* Tweet Header */}
                        <div className="p-4 flex items-center gap-3 border-b border-gray-800">
                            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-white text-sm font-medium">Post on X</p>
                                <p className="text-gray-500 text-xs">@twitter</p>
                            </div>
                            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </div>
                        
                        {/* Tweet Content */}
                        <div className="p-4">
                            <p className="text-white text-sm leading-relaxed">{title}</p>
                        </div>
                        
                        {/* Tweet Footer */}
                        <div className="px-4 pb-4 flex items-center gap-6 text-gray-500 text-xs">
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </span>
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </span>
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* Actions */}
                <div className="p-4 flex items-center justify-between border-t border-gray-800/40">
                    <a 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 text-xs hover:underline flex items-center gap-1"
                    >
                        View on X
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                    <button 
                        onClick={handleCopy}
                        className="text-gray-500 hover:text-white text-xs flex items-center gap-1 transition-colors"
                    >
                        {copied ? '✓ Copied' : 'Copy link'}
                    </button>
                </div>
            </div>
        );
    }

    // Generic Link Card
    return (
        <div className="group bg-[#18181f] rounded-2xl border border-gray-800/40 overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
            {/* Link Preview */}
            <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-violet-900/20 flex items-center justify-center relative">
                <div className="w-20 h-20 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                    <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                </div>
                {/* Link Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 rounded-lg px-2 py-1">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span className="text-white text-xs font-medium">Link</span>
                </div>
            </div>
            
            {/* Info */}
            <div className="p-4">
                <h3 className="text-white font-medium text-sm line-clamp-2 mb-2">{title}</h3>
                <p className="text-gray-500 text-xs truncate mb-3">{link}</p>
                <div className="flex items-center justify-between">
                    <a 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-400 text-xs hover:underline flex items-center gap-1"
                    >
                        Open link
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                    <button 
                        onClick={handleCopy}
                        className="text-gray-500 hover:text-white text-xs flex items-center gap-1 transition-colors"
                    >
                        {copied ? '✓ Copied' : 'Copy link'}
                    </button>
                </div>
            </div>
        </div>
    );
}
