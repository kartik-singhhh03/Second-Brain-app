import { useEffect, useState } from 'react';
import { Button } from '../components/button';
import '../App.css';
import { PlusIcon } from '../icons/plusicon';
import { ShareIcon } from '../icons/shareIcon';
import { Card } from '../components/card';
import { CreatComponentModal } from '../components/CreateContentModal';
import { Sidebar } from '../components/sidebar';
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [shareLoading, setShareLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const { contents, refresh } = useContent();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/Signin');
      return;
    }
    refresh();
  }, [modalOpen]);

  // Check for pending URL from landing page
  useEffect(() => {
    const pendingUrl = localStorage.getItem('pendingUrl');
    if (pendingUrl) {
      setModalOpen(true);
      // The modal should handle this
    }
  }, []);

  // Filter and search contents
  const filteredContents = contents.filter((item: any) => {
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.link?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleShare = async () => {
    setShareLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
        share: true
      }, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });

      const generatedUrl = `${window.location.origin}/share/${response.data.hash}`;
      setShareUrl(generatedUrl);
      setShowShareModal(true);
    } catch (error) {
      setNotification('Failed to create share link');
      setTimeout(() => setNotification(''), 3000);
    } finally {
      setShareLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setNotification('Link copied to clipboard!');
    setTimeout(() => setNotification(''), 3000);
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`Check out my Second Brain! 🧠\n${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(`Check out my Second Brain! 🧠`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToTelegram = () => {
    const text = encodeURIComponent(`Check out my Second Brain! 🧠`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${text}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent('Check out my Second Brain!');
    const body = encodeURIComponent(`Hey! I wanted to share my curated collection with you.\n\nView my brain: ${shareUrl}\n\n(View only - they can see but not edit)`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const contentTypes = [
    { value: 'all', label: 'All', count: contents.length },
    { value: 'youtube', label: 'YouTube', count: contents.filter((c: any) => c.type === 'youtube').length },
    { value: 'twitter', label: 'Twitter', count: contents.filter((c: any) => c.type === 'twitter').length },
    { value: 'link', label: 'Links', count: contents.filter((c: any) => c.type === 'link').length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d12] via-[#0a0a0f] to-[#0d0d12]">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-purple-900/3 pointer-events-none"></div>
      
      <Sidebar />
      
      <div className="ml-72 min-h-screen relative">
        <CreatComponentModal open={modalOpen} onClose={() => setModalOpen(false)} />
        
        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowShareModal(false)}></div>
            <div className="relative bg-[#12121a] border border-gray-800/60 rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl">
              {/* Close Button */}
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white hover:bg-gray-800/50 rounded-xl transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Share Your Brain</h2>
                <p className="text-gray-500">Invite friends to view your collection (read-only access)</p>
              </div>

              {/* View Only Badge */}
              <div className="flex items-center justify-center gap-2 mb-6 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-amber-400 text-sm font-medium">Recipients can only view, not edit</span>
              </div>

              {/* Share URL */}
              <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-2 font-medium">Share Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-4 py-3 bg-[#0a0a0f]/50 border border-gray-800 rounded-xl text-white text-sm truncate"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </button>
                </div>
              </div>

              {/* Share Options */}
              <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-3 font-medium">Share via</label>
                <div className="grid grid-cols-5 gap-3">
                  {/* WhatsApp */}
                  <button
                    onClick={shareToWhatsApp}
                    className="flex flex-col items-center gap-2 p-4 bg-[#0a0a0f]/50 hover:bg-green-500/10 border border-gray-800 hover:border-green-500/30 rounded-xl transition-all group"
                  >
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-green-400">WhatsApp</span>
                  </button>

                  {/* Twitter/X */}
                  <button
                    onClick={shareToTwitter}
                    className="flex flex-col items-center gap-2 p-4 bg-[#0a0a0f]/50 hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/30 rounded-xl transition-all group"
                  >
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center border border-gray-700">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-blue-400">Twitter</span>
                  </button>

                  {/* LinkedIn */}
                  <button
                    onClick={shareToLinkedIn}
                    className="flex flex-col items-center gap-2 p-4 bg-[#0a0a0f]/50 hover:bg-blue-600/10 border border-gray-800 hover:border-blue-600/30 rounded-xl transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#0A66C2] rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-blue-400">LinkedIn</span>
                  </button>

                  {/* Telegram */}
                  <button
                    onClick={shareToTelegram}
                    className="flex flex-col items-center gap-2 p-4 bg-[#0a0a0f]/50 hover:bg-sky-500/10 border border-gray-800 hover:border-sky-500/30 rounded-xl transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#0088cc] rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-sky-400">Telegram</span>
                  </button>

                  {/* Email */}
                  <button
                    onClick={shareViaEmail}
                    className="flex flex-col items-center gap-2 p-4 bg-[#0a0a0f]/50 hover:bg-purple-500/10 border border-gray-800 hover:border-purple-500/30 rounded-xl transition-all group"
                  >
                    <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-purple-400">Email</span>
                  </button>
                </div>
              </div>

              {/* QR Code hint */}
              <div className="text-center">
                <p className="text-gray-600 text-xs">Share this link with anyone to let them explore your curated content</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Notification Toast */}
        {notification && (
          <div className="fixed top-6 right-6 z-50 bg-purple-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {notification}
          </div>
        )}

        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#0d0d12]/80 backdrop-blur-xl border-b border-gray-800/40">
          <div className="px-8 py-5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Your Brain</h1>
                <p className="text-gray-500 text-sm mt-1">
                  {contents.length} item{contents.length !== 1 ? 's' : ''} saved
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setModalOpen(true)}
                  size="small"
                  variant="primary"
                  text="Add content"
                  startIcon={<PlusIcon />}
                />
                <Button
                  onClick={handleShare}
                  size="medium"
                  variant="secondary"
                  text={shareLoading ? "Creating..." : "Share Brain"}
                  startIcon={<ShareIcon />}
                />
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search your brain..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-[#18181f] border border-gray-800/60 rounded-xl text-white placeholder-gray-500 outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-[#18181f] border border-gray-800/60 rounded-xl p-1">
                {contentTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setFilterType(type.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filterType === type.value
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    {type.label}
                    <span className={`ml-1.5 ${filterType === type.value ? 'text-purple-200' : 'text-gray-600'}`}>
                      {type.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-[#18181f] border border-gray-800/60 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  title="Grid view"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  title="List view"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8">
          {filteredContents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 bg-[#18181f] rounded-2xl flex items-center justify-center mb-6 border border-gray-800/40">
                <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {searchQuery || filterType !== 'all' ? 'No results found' : 'Your brain is empty'}
              </h3>
              <p className="text-gray-500 text-center max-w-sm mb-6">
                {searchQuery || filterType !== 'all'
                  ? 'Try adjusting your search or filter to find what you\'re looking for.'
                  : 'Start adding YouTube videos, tweets, and links to build your second brain.'}
              </p>
              {!searchQuery && filterType === 'all' && (
                <Button
                  onClick={() => setModalOpen(true)}
                  size="medium"
                  variant="primary"
                  text="Add your first item"
                  startIcon={<PlusIcon />}
                />
              )}
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
              : 'flex flex-col gap-3'
            }>
              {filteredContents.map(({ type, link, title }: any, idx: number) => (
                <Card key={idx} type={type} link={link} title={title} />
              ))}
            </div>
          )}
        </main>

        {/* Quick Stats Footer */}
        <footer className="fixed bottom-0 right-0 left-72 bg-[#0d0d12]/90 backdrop-blur-sm border-t border-gray-800/40 px-8 py-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <span className="text-gray-500">
                <span className="text-white font-medium">{filteredContents.length}</span> of{' '}
                <span className="text-white font-medium">{contents.length}</span> items shown
              </span>
            </div>
            <div className="flex items-center gap-4 text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                YouTube: {contents.filter((c: any) => c.type === 'youtube').length}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Twitter: {contents.filter((c: any) => c.type === 'twitter').length}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Links: {contents.filter((c: any) => c.type === 'link').length}
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
