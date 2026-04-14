import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export interface ListingItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  price: string;
  location: string;
  image: string;
  savedDate?: string;
  status?: 'active' | 'pending' | 'expired';
  isHidden?: boolean;
  isSaved?: boolean;
}

interface ListingCardProps {
  item: ListingItem;
  mode?: 'grid' | 'list';
  isDesktop?: boolean;
  showStatus?: boolean;
  showSaveAction?: boolean;
  showHideAction?: boolean;
  showEditAction?: boolean;
  showDeleteAction?: boolean;
  onSave?: (id: string) => void;
  onHide?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
}

const STATUS_STYLES: Record<string, string> = {
  active:  'bg-emerald-50 text-emerald-700 border border-emerald-100',
  pending: 'bg-amber-50  text-amber-700  border border-amber-100',
  expired: 'bg-red-50    text-red-600    border border-red-100',
};

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80';

export default function ListingCard({
  item,
  mode = 'grid',
  isDesktop = true,
  showStatus,
  showSaveAction,
  showHideAction,
  showEditAction,
  showDeleteAction,
  onSave,
  onHide,
  onEdit,
  onDelete,
  onClick,
}: ListingCardProps) {
  if (!item) return null;

  const isGrid = mode === 'grid';

  const renderActions = () => (
    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
      {showSaveAction && (
        <button onClick={() => onSave?.(item.id)} className={`flex items-center justify-center rounded-[4px] border border-black/5 hover:bg-white hover:border-[#d4af37]/40 hover:shadow-sm transition-all duration-300 ${isDesktop ? 'w-8 h-8 bg-white' : 'w-7 h-7 bg-[#f8f9fa]'}`}>
          {item.isSaved ? <BookmarkOutlinedIcon sx={{ fontSize: 16, color: '#d4af37' }} /> : <BookmarkBorderOutlinedIcon sx={{ fontSize: 16, color: '#d4af37' }} />}
        </button>
      )}
      {showHideAction && (
        <button onClick={() => onHide?.(item.id)} className={`flex items-center justify-center rounded-[4px] border border-black/5 hover:bg-white hover:border-[#d4af37]/40 hover:shadow-sm transition-all duration-300 ${isDesktop ? 'w-8 h-8 bg-white' : 'w-7 h-7 bg-[#f8f9fa]'}`}>
          {item.isHidden ? <VisibilityOutlinedIcon sx={{ fontSize: 16, color: '#d4af37' }} /> : <VisibilityOffOutlinedIcon sx={{ fontSize: 16, color: '#d4af37' }} />}
        </button>
      )}
      {showEditAction && (
        <button onClick={() => onEdit?.(item.id)} className={`flex items-center justify-center rounded-[4px] border border-black/5 hover:bg-white hover:border-[#d4af37]/40 hover:shadow-sm transition-all duration-300 ${isDesktop ? 'w-8 h-8 bg-white' : 'w-7 h-7 bg-[#f8f9fa]'}`}>
          <EditOutlinedIcon sx={{ fontSize: 16, color: '#637089' }} />
        </button>
      )}
      {showDeleteAction && (
        <button onClick={() => onDelete?.(item.id)} className={`flex items-center justify-center rounded-[4px] border border-black/5 hover:bg-[#fff5f5] hover:border-[#e05252]/40 hover:shadow-sm transition-all duration-300 ${isDesktop ? 'w-8 h-8 bg-white' : 'w-7 h-7 bg-[#f8f9fa]'}`}>
          <DeleteOutlineIcon sx={{ fontSize: 16, color: '#e05252' }} />
        </button>
      )}
    </div>
  );

  if (!isGrid) {
    return (
      <div
        className={`flex flex-row bg-white rounded-[4px] border border-black/5 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(212,175,55,0.08)] transition-all duration-300 overflow-hidden group last:mb-0 ${onClick ? 'cursor-pointer' : ''} ${isDesktop ? 'mb-4' : 'mb-3'}`}
        onClick={() => onClick?.(item.id)}
      >
        <div className={`relative shrink-0 border-r border-black/5 flex flex-col ${isDesktop ? 'w-[220px] h-[220px]' : 'w-[100px] h-[100px]'}`}>
          <img
            src={item.image || FALLBACK_IMG}
            alt={item.title || 'Listing Image'}
            className="absolute inset-0 w-full h-full object-cover bg-[#fafafb]"
            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
          />
          <div className={`absolute bottom-0 right-0 bg-[#0a1128] text-white font-medium rounded-tl-[4px] ${isDesktop ? 'text-[12px] px-3 py-1.5' : 'text-[10px] px-2 py-1'}`}>
            {item.category}
          </div>
          {showStatus && item.status && (
            <div className="absolute top-2 left-2">
              <span className={`font-medium rounded-[4px] shadow-sm ${STATUS_STYLES[item.status]} ${isDesktop ? 'text-[11px] px-2.5 py-1' : 'text-[9px] px-2 py-0.5'}`}>
                {item.status}
              </span>
            </div>
          )}
        </div>

        <div className={`flex-1 flex flex-col min-w-0 justify-between ${isDesktop ? 'p-6' : 'p-3'}`}>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className={`min-w-0 ${isDesktop ? 'space-y-1' : 'space-y-0.5'}`}>
              <h4 className={`font-bold text-[#0a1128] truncate ${isDesktop ? 'text-[22px]' : 'text-[14px]'}`}>{item.title}</h4>
              <p className={`text-[#637089] font-light truncate ${isDesktop ? 'text-[15px]' : 'text-[11px]'}`}>
                {item.description || item.category}
              </p>
            </div>
            <div className="shrink-0">
              {renderActions()}
            </div>
          </div>

          <div className={`flex justify-between items-center mt-auto flex-row ${isDesktop ? 'gap-4' : 'gap-2'}`}>
            <div className={`text-[#637089] font-light ${isDesktop ? 'text-[15px]' : 'text-[11px]'}`}>
              Investment: <span className={`font-bold text-[#2d6d33] ml-1 ${isDesktop ? 'text-[18px]' : 'text-[12px]'}`}>{item.price}</span>
            </div>
            <div className={`flex items-center ${isDesktop ? 'gap-1.5' : 'gap-1'}`}>
              <LocationOnIcon sx={{ fontSize: isDesktop ? 20 : 14, color: '#d4af37' }} />
              <span className={`text-[#637089] font-light truncate ${isDesktop ? 'text-[14px]' : 'text-[11px]'}`}>{item.location}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-[4px] border border-black/[0.03] shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-[0_8px_24px_rgba(212,175,55,0.08)] hover:-translate-y-0.5 transition-all duration-300 group flex flex-col ${onClick ? 'cursor-pointer' : ''}`}
      onClick={() => onClick?.(item.id)}
    >
      <div className="relative overflow-hidden shrink-0">
        <img
          src={item.image || FALLBACK_IMG}
          alt={item.title || 'Listing Image'}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out bg-[#fafafb] ${isDesktop ? 'h-[180px]' : 'h-[100px]'}`}
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
        />
        <div className={`absolute bottom-0 right-0 bg-[#0a1128] text-white font-medium rounded-tl-[4px] ${isDesktop ? 'text-[12px] px-3 py-1.5' : 'text-[10px] px-2 py-1'}`}>
          {item.category}
        </div>
        {showStatus && item.status && (
          <div className="absolute top-2 left-2">
            <span className={`font-medium rounded-[4px] shadow-sm ${STATUS_STYLES[item.status]} ${isDesktop ? 'text-[11px] px-2.5 py-1' : 'text-[9px] px-2 py-0.5'}`}>
              {item.status}
            </span>
          </div>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5">
          {renderActions()}
        </div>
      </div>

      <div className={`flex flex-col flex-1 ${isDesktop ? 'px-5 py-4' : 'p-3'}`}>
        <h4 className={`font-bold text-[#0a1128] truncate ${isDesktop ? 'text-[18px] mb-1' : 'text-[13px] mb-0.5'}`}>{item.title}</h4>
        <p className={`text-[#637089] font-light truncate ${isDesktop ? 'text-[14px] mb-3' : 'text-[11px] mb-2'}`}>
          {item.description || item.category}
        </p>
        
        <div className={`mt-auto flex flex-col ${isDesktop ? 'pt-3 border-t border-black/5' : 'pt-2 border-t border-black/5'}`}>
          {isDesktop ? (
            <>
              <span className="text-[12px] text-[#637089] font-light mb-1">Investment:</span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#2d6d33] text-[18px]">{item.price}</span>
                <div className="flex items-center gap-1.5">
                  <LocationOnIcon sx={{ fontSize: 16, color: '#d4af37' }} />
                  <span className="text-[13px] text-[#a0aabf] font-light truncate">{item.location}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-[11px] text-[#637089] font-light mb-1">
                Investment: <span className="font-bold text-[#2d6d33] ml-1 text-[13px]">{item.price}</span>
              </div>
              <div className="flex items-center gap-1">
                <LocationOnIcon sx={{ fontSize: 14, color: '#d4af37' }} />
                <span className="text-[12px] text-[#a0aabf] font-light truncate">{item.location}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}