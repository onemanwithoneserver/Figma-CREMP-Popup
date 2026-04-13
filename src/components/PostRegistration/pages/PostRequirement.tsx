import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import FormTextarea from '../components/FormTextarea';
import DatePicker from '../components/DatePicker';

interface PostRequirementProps {
  isDesktop: boolean;
  userType: 'seller' | 'buyer';
}

const BUSINESS_CATEGORIES = [
  'Food & Beverage', 'Retail', 'Education', 'Healthcare',
  'Automotive', 'Fitness & Wellness', 'Technology', 'Finance', 'Other',
];

const TIMELINES = [
  'Immediately', '1–3 months', '3–6 months', '6–12 months', '12+ months',
];

interface FormData {
  intent: 'buy' | 'lease' | '';
  businessType: 'running' | 'new' | '';
  category: string;
  budgetMin: string;
  budgetMax: string;
  location: string;
  timeline: string;
  description: string;
  smsContact: boolean;
  whatsappContact: boolean;
  expiryDate: string;
}

type Errors = Partial<Record<keyof FormData, string>>;

const EMPTY: FormData = {
  intent: '', businessType: '', category: '', budgetMin: '', budgetMax: '',
  location: '', timeline: '', description: '', smsContact: false, whatsappContact: true,
  expiryDate: '',
};

const labelCls = 'block text-sm font-medium text-[#0a1128] mb-1';

export default function PostRequirement({ isDesktop }: PostRequirementProps) {
  const [data, setData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const errs: Errors = {};
    if (!data.intent)          errs.intent       = 'Please select Buy or Lease.';
    if (!data.businessType)    errs.businessType = 'Please select business type.';
    if (!data.category)        errs.category     = 'Please select a category.';
    if (!data.budgetMin.trim()) errs.budgetMin   = 'Minimum budget is required.';
    if (!data.budgetMax.trim()) errs.budgetMax   = 'Maximum budget is required.';
    if (!data.location.trim()) errs.location     = 'Location is required.';
    if (!data.timeline)        errs.timeline     = 'Please pick a timeline.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 gap-4 max-w-lg">
        <div className="w-14 h-14 rounded-[7px] bg-gradient-to-br from-[#bf953f] via-[#d4af37] to-[#b38728] flex items-center justify-center shadow-[0_10px_20px_rgba(212,175,55,0.2)]">
          <CheckCircleIcon sx={{ fontSize: '1.75rem', color: '#ffffff' }} />
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-xl font-light tracking-wide text-[#0a1128]">Requirement Posted!</h2>
          <p className="text-sm font-light text-[#637089] max-w-sm mx-auto leading-relaxed">
            Your requirement to <span className="font-medium text-[#0a1128] capitalize">{data.intent}</span> a{' '}
            <span className="font-medium text-[#0a1128]">{data.category}</span> franchise has been published.
            Matching sellers will be notified.
          </p>
        </div>
        <button
          onClick={() => { setSubmitted(false); setData(EMPTY); setErrors({}); }}
          className="mt-2 px-6 py-2 rounded-[7px] bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] text-white font-light tracking-wider text-sm hover:opacity-90 transition-opacity shadow-[0_10px_20px_rgba(10,17,40,0.1)]"
        >
          Post Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 max-w-2xl">
      <div className="bg-white rounded-[7px] border border-black/[0.03] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className={`flex flex-col gap-4 ${isDesktop ? 'px-6 py-5' : 'px-4 py-4'}`}>

          {/* Intent */}
          <div>
            <label className={labelCls}>I want to <span className="text-[#e05252] font-light">*</span></label>
            <div className="flex gap-3">
              {(['buy', 'lease'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => set('intent', v)}
                  className={`flex-1 py-2.5 rounded-[7px] text-sm font-medium border transition-all duration-200 capitalize ${
                    data.intent === v
                      ? 'bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] text-white border-[#0a1128] shadow-[0_4px_10px_rgba(10,17,40,0.15)]'
                      : 'bg-white text-[#637089] border-black/5 hover:border-[#d4af37]/40 hover:text-[#0a1128]'
                  }`}
                >
                  {v === 'buy' ? 'Buy a Franchise' : 'Lease a Space'}
                </button>
              ))}
            </div>
            {errors.intent && <p className="text-[#e05252] text-[11px] mt-1 font-light">{errors.intent}</p>}
          </div>

          {/* Business Type */}
          <div>
            <label className={labelCls}>Business Type <span className="text-[#e05252] font-light">*</span></label>
            <div className="flex gap-2">
              {([['running', 'Running Business'], ['new', 'New Franchise']] as const).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => set('businessType', val)}
                  className={`px-4 py-2 rounded-[4px] text-xs font-medium border transition-all duration-200 ${
                    data.businessType === val
                      ? 'bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] text-white border-[#0a1128]'
                      : 'bg-white text-[#637089] border-black/5 hover:border-[#d4af37]/40 hover:text-[#0a1128]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {errors.businessType && <p className="text-[#e05252] text-[11px] mt-1 font-light">{errors.businessType}</p>}
          </div>

          {/* Category */}
          <div>
            <label className={labelCls}>Category <span className="text-[#e05252] font-light">*</span></label>
            <div className="flex flex-wrap gap-2">
              {BUSINESS_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => set('category', cat)}
                  className={`px-3 py-1.5 rounded-[4px] text-xs font-medium border transition-all duration-200 ${
                    data.category === cat
                      ? 'bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] text-white border-[#0a1128]'
                      : 'bg-white text-[#637089] border-black/5 hover:border-[#d4af37]/40 hover:text-[#0a1128]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {errors.category && <p className="text-[#e05252] text-[11px] mt-1 font-light">{errors.category}</p>}
          </div>

          {/* Budget */}
          <div>
            <label className={labelCls}>Budget Range <span className="text-[#e05252] font-light">*</span></label>
            <div className={`grid gap-3 ${isDesktop ? 'grid-cols-2' : 'grid-cols-2'}`}>
              <FormInput
                type="text"
                placeholder="Min (e.g. ₹10L)"
                value={data.budgetMin}
                onChange={(e) => set('budgetMin', e.target.value)}
                error={errors.budgetMin}
              />
              <FormInput
                type="text"
                placeholder="Max (e.g. ₹50L)"
                value={data.budgetMax}
                onChange={(e) => set('budgetMax', e.target.value)}
                error={errors.budgetMax}
              />
            </div>
          </div>

          {/* Location & Timeline */}
          <div className={`grid gap-3 ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'}`}>
            <div>
              <label className={labelCls}>Preferred Location <span className="text-[#e05252] font-light">*</span></label>
              <FormInput
                type="text"
                placeholder="City, State"
                value={data.location}
                onChange={(e) => set('location', e.target.value)}
                error={errors.location}
              />
            </div>
            <div>
              <label className={labelCls}>Timeline <span className="text-[#e05252] font-light">*</span></label>
              <FormSelect
                value={data.timeline}
                onChange={(e) => set('timeline', e.target.value)}
                options={TIMELINES.map((t) => ({ value: t, label: t }))}
                placeholder="Select timeline..."
                error={errors.timeline}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Additional Details <span className="text-[#a0aabf] font-light text-xs">(optional)</span></label>
            <FormTextarea
              rows={3}
              placeholder="Any specific requirements, preferences or notes..."
              value={data.description}
              onChange={(e) => set('description', e.target.value)}
            />
          </div>

          {/* Contact Preference */}
          <div>
            <label className={labelCls}>Contact Preference</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => set('smsContact', !data.smsContact)}
                className={`flex items-center gap-2 px-4 py-2 rounded-[7px] text-sm border transition-all duration-200 ${
                  data.smsContact
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-white text-[#637089] border-black/5 hover:border-blue-200 hover:bg-blue-50/50'
                }`}
              >
                <SmsOutlinedIcon sx={{ fontSize: 16 }} />
                SMS
                <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  data.smsContact ? 'border-blue-600 bg-blue-600' : 'border-[#a0aabf]'
                }`}>
                  {data.smsContact && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
              </button>
              <button
                type="button"
                onClick={() => set('whatsappContact', !data.whatsappContact)}
                className={`flex items-center gap-2 px-4 py-2 rounded-[7px] text-sm border transition-all duration-200 ${
                  data.whatsappContact
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-white text-[#637089] border-black/5 hover:border-emerald-200 hover:bg-emerald-50/50'
                }`}
              >
                <WhatsAppIcon sx={{ fontSize: 16 }} />
                WhatsApp
                <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  data.whatsappContact ? 'border-emerald-600 bg-emerald-600' : 'border-[#a0aabf]'
                }`}>
                  {data.whatsappContact && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
              </button>
            </div>
          </div>

          {/* Expiry */}
          <div>
            <label className={labelCls}>Expiry Date <span className="text-[#a0aabf] font-light text-xs">(optional)</span></label>
            <DatePicker
              value={data.expiryDate}
              onChange={(e) => set('expiryDate', e.target.value)}
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-black/[0.03] bg-[#fafafb] flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-[7px] bg-gradient-to-br from-[#bf953f] via-[#d4af37] to-[#b38728] text-white text-sm font-light tracking-wider hover:opacity-90 transition-opacity shadow-[0_4px_12px_rgba(212,175,55,0.25)]"
          >
            Post Requirement
          </button>
        </div>
      </div>
    </form>
  );
}
