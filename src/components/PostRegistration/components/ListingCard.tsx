import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export interface ListingItem {
  id: string;
  title: string;
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
  const isGrid = mode === 'grid';

  const Actions = () => (
    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
      {showSaveAction && (
        <button
          onClick={() => onSave?.(item.id)}
          className="p-1.5 rounded-[5px] hover:bg-[#fafafb] transition-colors"
          title={item.isSaved ? 'Unsave' : 'Save'}
        >
          {item.isSaved
            ? <BookmarkOutlinedIcon sx={{ fontSize: 16, color: '#d4af37' }} />
            : <BookmarkBorderOutlinedIcon sx={{ fontSize: 16, color: '#a0aabf' }} />}
        </button>
      )}
      {showHideAction && (
        <button
          onClick={() => onHide?.(item.id)}
          className="p-1.5 rounded-[5px] hover:bg-[#fafafb] transition-colors"
          title={item.isHidden ? 'Unhide' : 'Hide'}
        >
          {item.isHidden
            ? <VisibilityOutlinedIcon sx={{ fontSize: 16, color: '#d4af37' }} />
            : <VisibilityOffOutlinedIcon sx={{ fontSize: 16, color: '#a0aabf' }} />}
        </button>
      )}
      {showEditAction && (
        <button
          onClick={() => onEdit?.(item.id)}
          className="p-1.5 rounded-[5px] hover:bg-[#fafafb] transition-colors"
          title="Edit"
        >
          <EditOutlinedIcon sx={{ fontSize: 16, color: '#637089' }} />
        </button>
      )}
      {showDeleteAction && (
        <button
          onClick={() => onDelete?.(item.id)}
          className="p-1.5 rounded-[5px] hover:bg-[#fafafb] transition-colors"
          title="Delete"
        >
          <DeleteOutlineIcon sx={{ fontSize: 16, color: '#e05252' }} />
        </button>
      )}
    </div>
  );

  /* ── LIST ROW ── */
  if (!isGrid) {
    return (
      <div
        className={`flex items-center gap-4 px-4 py-3 border-b border-black/[0.03] last:border-b-0 hover:bg-[#fafafb] transition-colors duration-200 ${
          onClick ? 'cursor-pointer' : ''
        }`}
        onClick={() => onClick?.(item.id)}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-14 h-14 rounded-[7px] object-cover shrink-0 bg-[#f0f0f5]"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#0a1128] truncate">{item.title}</p>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="text-xs text-[#637089] font-light">{item.category}</span>
            {item.savedDate && (
              <span className="text-xs text-[#a0aabf] font-light">· {item.savedDate}</span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <LocationOnOutlinedIcon sx={{ fontSize: 12, color: '#a0aabf' }} />
            <span className="text-xs text-[#a0aabf] font-light">{item.location}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            {showStatus && item.status && (
              <span className={`text-[10px] px-2 py-0.5 rounded-[4px] font-semibold ${STATUS_STYLES[item.status]}`}>
                {item.status}
              </span>
            )}
            <p className="text-sm font-semibold text-[#0a1128] mt-0.5">{item.price}</p>
          </div>
          <Actions />
        </div>
      </div>
    );
  }

  /* ── GRID CARD ── */
  return (
    <div
      className={`bg-white rounded-[7px] border border-black/[0.03] shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 group ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={() => onClick?.(item.id)}
    >
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500 bg-[#f0f0f5]"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
        />
        <div className="absolute top-2 left-2">
          <span className="bg-white/90 backdrop-blur-sm text-[#0a1128] text-[10px] font-medium px-2 py-0.5 rounded-[4px] shadow-sm">
            {item.category}
          </span>
        </div>
        {showStatus && item.status && (
          <div className="absolute top-2 right-2">
            <span className={`text-[10px] px-2 py-0.5 rounded-[4px] font-semibold ${STATUS_STYLES[item.status]}`}>
              {item.status}
            </span>
          </div>
        )}
        <div
          className="absolute inset-x-0 bottom-0 flex items-center justify-end gap-1 px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-black/30 to-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          {showSaveAction && (
            <button
              onClick={() => onSave?.(item.id)}
              className="p-1.5 bg-white/90 rounded-[5px] hover:bg-white transition-colors"
            >
              {item.isSaved
                ? <BookmarkOutlinedIcon sx={{ fontSize: 14, color: '#d4af37' }} />
                : <BookmarkBorderOutlinedIcon sx={{ fontSize: 14, color: '#637089' }} />}
            </button>
          )}
          {showHideAction && (
            <button
              onClick={() => onHide?.(item.id)}
              className="p-1.5 bg-white/90 rounded-[5px] hover:bg-white transition-colors"
            >
              {item.isHidden
                ? <VisibilityOutlinedIcon sx={{ fontSize: 14, color: '#d4af37' }} />
                : <VisibilityOffOutlinedIcon sx={{ fontSize: 14, color: '#637089' }} />}
            </button>
          )}
          {showEditAction && (
            <button
              onClick={() => onEdit?.(item.id)}
              className="p-1.5 bg-white/90 rounded-[5px] hover:bg-white transition-colors"
            >
              <EditOutlinedIcon sx={{ fontSize: 14, color: '#637089' }} />
            </button>
          )}
          {showDeleteAction && (
            <button
              onClick={() => onDelete?.(item.id)}
              className="p-1.5 bg-white/90 rounded-[5px] hover:bg-white transition-colors"
            >
              <DeleteOutlineIcon sx={{ fontSize: 14, color: '#e05252' }} />
            </button>
          )}
        </div>
      </div>
      <div className="px-3 py-3">
        <h4 className="text-sm font-medium text-[#0a1128] truncate mb-1">{item.title}</h4>
        <div className="flex items-center gap-1 mb-2">
          <LocationOnOutlinedIcon sx={{ fontSize: 12, color: '#a0aabf' }} />
          <span className="text-xs text-[#a0aabf] font-light truncate">{item.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#0a1128]">{item.price}</span>
          {item.savedDate && (
            <span className="text-[10px] text-[#a0aabf] font-light">{item.savedDate}</span>
          )}
        </div>
      </div>
    </div>
  );
}
