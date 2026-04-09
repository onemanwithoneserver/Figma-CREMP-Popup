import { useState, useMemo } from 'react';
import WhislistHeader from './sections/WhislistHeader';
import WishlistGrid from './sections/WishlistGrid';
import WishlistList from './sections/WishlistList';
import EmptyState from './sections/EmptyState';
import type { Folder, WishlistItem } from './types';
import { mockWishlistData, initialFolders } from './data';

interface WhislistProps {
  viewMode: 'desktop' | 'mobile';
}

export default function Whislist({ viewMode }: WhislistProps) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(mockWishlistData);
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  // Filters and search
  const [activeFolderId] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [investmentFilter, setInvestmentFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  const isDesktop = viewMode === 'desktop';

  // Get items in the active folder
  const activeFolderItems = useMemo(() => {
    const activeFolder = folders.find(f => f.id === activeFolderId);
    if (!activeFolder) return [];

    return wishlistItems.filter(item => activeFolder.itemIds.includes(item.id));
  }, [folders, activeFolderId, wishlistItems]);



  const removeItem = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));

    // Remove item from all folders
    setFolders(prev =>
      prev.map(folder => ({
        ...folder,
        itemIds: folder.itemIds.filter(itemId => itemId !== id)
      }))
    );
  };



  return (
    <div
      className={`w-full flex flex-col items-center overflow-hidden ${
        isDesktop ? 'bg-[#f4f7f9]' : 'h-screen bg-white'
      }`}
    >
      <div
        className={`transition-all duration-500 mx-auto overflow-hidden shadow-2xl bg-white ${
          isDesktop
            ? 'max-w-[100%] w-[100%] rounded-none border border-[#1c2a44]/10'
            : 'w-[24.375rem] shrink-0 pt-2 rounded-none'
        }`}
        style={{ height: isDesktop ? 'calc(100vh - 6.25rem)' : '48.75rem' }}
      >
        <div className="relative h-full flex flex-col">
          <div
            className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth [&::-webkit-scrollbar]:w-[0.25rem] [&::-webkit-scrollbar-thumb]:bg-[#1c2a44]/15 [&::-webkit-scrollbar-thumb]:rounded"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <WhislistHeader
              isDesktop={isDesktop}
              viewType={viewType}
              onViewChange={setViewType}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              investmentFilter={investmentFilter}
              onInvestmentFilterChange={setInvestmentFilter}
              locationFilter={locationFilter}
              onLocationFilterChange={setLocationFilter}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={setCategoryFilter}
            />

            <div className={isDesktop ? 'max-w-[80rem] mx-auto px-10 py-6 pb-6' : 'px-3 py-4 pb-20'}>
              {wishlistItems.length === 0 ? (
                <EmptyState isDesktop={isDesktop} />
              ) : activeFolderItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-16 h-16 rounded-full bg-[#f8fafc] flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-[#64748b] font-medium text-base">No items in this folder</p>
                  <p className="text-[#94a3b8] text-sm mt-1">Add items to this folder to see them here</p>
                </div>
              ) : viewType === 'grid' ? (
                <WishlistGrid
                  items={activeFolderItems}
                  isDesktop={isDesktop}
                  onRemove={removeItem}
                />
              ) : (
                <WishlistList
                  items={activeFolderItems}
                  isDesktop={isDesktop}
                  onRemove={removeItem}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
