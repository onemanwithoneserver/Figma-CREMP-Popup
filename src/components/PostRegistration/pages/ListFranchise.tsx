import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FormInput from '../components/FormInput';
import FormTextarea from '../components/FormTextarea';

interface ListFranchiseProps {
  isDesktop: boolean;
}

const CATEGORIES = [
  'Food & Beverage', 'Retail', 'Education', 'Healthcare', 'Automotive',
  'Fitness & Wellness', 'Technology', 'Finance', 'Hospitality', 'Other',
];

const STEPS = [
  { label: 'Franchise Info',   Icon: StorefrontOutlinedIcon },
  { label: 'Business Details', Icon: BusinessCenterOutlinedIcon },
  { label: 'Financial',        Icon: AttachMoneyOutlinedIcon },
  { label: 'Media',            Icon: PhotoLibraryOutlinedIcon },
  { label: 'Review',           Icon: TaskAltOutlinedIcon },
];

interface FormData {
  // Step 1
  name: string;
  category: string;
  description: string;
  website: string;
  // Step 2
  businessType: 'running' | 'new' | 'both' | '';
  yearEstablished: string;
  totalLocations: string;
  availableCities: string;
  // Step 3
  franchiseFee: string;
  investmentMin: string;
  investmentMax: string;
  liquidCapital: string;
  royaltyPct: string;
  // Step 4
  logoUrl: string;
  galleryUrls: string;
  brochureUrl: string;
}

const EMPTY: FormData = {
  name: '', category: '', description: '', website: '',
  businessType: '', yearEstablished: '', totalLocations: '', availableCities: '',
  franchiseFee: '', investmentMin: '', investmentMax: '', liquidCapital: '', royaltyPct: '',
  logoUrl: '', galleryUrls: '', brochureUrl: '',
};

type Errors = Partial<Record<keyof FormData, string>>;

const labelCls = 'flex items-center gap-1.5 font-medium text-[#0a1128] mb-1 text-sm';

export default function ListFranchise({ isDesktop }: ListFranchiseProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep = (): boolean => {
    const errs: Errors = {};
    if (step === 0) {
      if (!data.name.trim())        errs.name        = 'Franchise name is required.';
      if (!data.category)           errs.category    = 'Please select a category.';
      if (!data.description.trim()) errs.description = 'Description is required.';
    }
    if (step === 1) {
      if (!data.businessType)            errs.businessType    = 'Please select a business type.';
      if (!data.yearEstablished.trim())  errs.yearEstablished = 'Year established is required.';
      if (!data.totalLocations.trim())   errs.totalLocations  = 'Number of locations is required.';
    }
    if (step === 2) {
      if (!data.franchiseFee.trim())   errs.franchiseFee   = 'Franchise fee is required.';
      if (!data.investmentMin.trim())  errs.investmentMin  = 'Minimum investment is required.';
      if (!data.investmentMax.trim())  errs.investmentMax  = 'Maximum investment is required.';
      if (!data.liquidCapital.trim())  errs.liquidCapital  = 'Required liquid capital is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((s) => s + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 gap-4">
        <div className="w-14 h-14 rounded-[7px] bg-gradient-to-br from-[#bf953f] via-[#d4af37] to-[#b38728] flex items-center justify-center shadow-[0_10px_20px_rgba(212,175,55,0.2)]">
          <CheckCircleIcon sx={{ fontSize: '1.75rem', color: '#ffffff' }} />
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-xl font-light tracking-wide text-[#0a1128]">Franchise Listed!</h2>
          <p className="text-sm font-light text-[#637089] max-w-sm mx-auto leading-relaxed">
            Your franchise <span className="font-medium text-[#0a1128]">{data.name}</span> has been submitted for review. Our team will verify and publish it shortly.
          </p>
        </div>
        <button
          onClick={() => { setSubmitted(false); setData(EMPTY); setStep(0); setErrors({}); }}
          className="mt-2 px-6 py-2 rounded-[7px] bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] text-white font-light tracking-wider text-sm hover:opacity-90 transition-opacity shadow-[0_10px_20px_rgba(10,17,40,0.1)]"
        >
          List Another
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      {/* Step indicators */}
      <div className={`flex items-start gap-1 ${isDesktop ? '' : 'overflow-x-auto pb-1'}`}>
        {STEPS.map(({ label, Icon }, i) => (
          <div key={i} className="flex items-center gap-1 shrink-0">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-[7px] flex items-center justify-center transition-all duration-300 ${
                  i < step
                    ? 'bg-gradient-to-br from-[#bf953f] via-[#d4af37] to-[#b38728] shadow-[0_4px_10px_rgba(212,175,55,0.25)]'
                    : i === step
                    ? 'bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] shadow-[0_4px_10px_rgba(10,17,40,0.2)]'
                    : 'bg-[#fafafb] border border-black/[0.06]'
                }`}
              >
                {i < step ? (
                  <CheckCircleIcon sx={{ fontSize: 16, color: '#fff' }} />
                ) : (
                  <Icon sx={{ fontSize: 15, color: i === step ? '#fff' : '#a0aabf' }} />
                )}
              </div>
              {isDesktop && (
                <span className={`text-[10px] font-medium whitespace-nowrap ${i === step ? 'text-[#0a1128]' : 'text-[#a0aabf]'}`}>
                  {label}
                </span>
              )}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-[2px] w-8 rounded-full mb-4 transition-all duration-300 ${i < step ? 'bg-[#d4af37]' : 'bg-[#eef0f3]'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-white rounded-[7px] border border-black/[0.03] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className={`${isDesktop ? 'px-6 py-5' : 'px-4 py-4'} flex flex-col gap-4`}>

          {/* ── Step 1: Franchise Info ── */}
          {step === 0 && (
            <>
              <div>
                <label className={labelCls}>Franchise Name <span className="text-[#e05252] font-light">*</span></label>
                <FormInput
                  type="text"
                  placeholder="e.g. Sunrise Café"
                  value={data.name}
                  onChange={(e) => set('name', e.target.value)}
                  error={errors.name}
                />
              </div>
              <div>
                <label className={labelCls}>Category <span className="text-[#e05252] font-light">*</span></label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => set('category', cat)}
                      className={`px-3 py-1.5 text-xs rounded-[4px] font-medium border transition-all duration-200 ${
                        data.category === cat
                          ? 'bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] text-white border-[#0a1128]'
                          : 'bg-white text-[#637089] border-black/5 hover:border-[#d4af37]/40 hover:text-[#0a1128] hover:bg-[#fafafb]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                {errors.category && <p className="text-[#e05252] text-[11px] mt-1 font-light">{errors.category}</p>}
              </div>
              <div>
                <label className={labelCls}>Description <span className="text-[#e05252] font-light">*</span></label>
                <FormTextarea
                  rows={3}
                  placeholder="Briefly describe your franchise opportunity..."
                  value={data.description}
                  onChange={(e) => set('description', e.target.value)}
                  error={errors.description}
                />
              </div>
              <div>
                <label className={labelCls}>Website URL <span className="text-[#a0aabf] font-light text-xs">(optional)</span></label>
                <FormInput
                  type="url"
                  placeholder="https://www.example.com"
                  value={data.website}
                  onChange={(e) => set('website', e.target.value)}
                />
              </div>
            </>
          )}

          {/* ── Step 2: Business Details ── */}
          {step === 1 && (
            <>
              <div>
                <label className={labelCls}>Business Type <span className="text-[#e05252] font-light">*</span></label>
                <div className="flex flex-wrap gap-2">
                  {([['running', 'Running Business'], ['new', 'New Franchise'], ['both', 'Both']] as const).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => set('businessType', val)}
                      className={`px-4 py-2 text-xs rounded-[4px] font-medium border transition-all duration-200 ${
                        data.businessType === val
                          ? 'bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] text-white border-[#0a1128]'
                          : 'bg-white text-[#637089] border-black/5 hover:border-[#d4af37]/40 hover:text-[#0a1128] hover:bg-[#fafafb]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {errors.businessType && <p className="text-[#e05252] text-[11px] mt-1 font-light">{errors.businessType}</p>}
              </div>
              <div className={`grid gap-4 ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'}`}>
                <div>
                  <label className={labelCls}>Year Established <span className="text-[#e05252] font-light">*</span></label>
                  <FormInput
                    type="number"
                    placeholder="e.g. 2005"
                    min="1900"
                    max="2026"
                    value={data.yearEstablished}
                    onChange={(e) => set('yearEstablished', e.target.value)}
                    error={errors.yearEstablished}
                  />
                </div>
                <div>
                  <label className={labelCls}>Current Locations <span className="text-[#e05252] font-light">*</span></label>
                  <FormInput
                    type="number"
                    placeholder="e.g. 50"
                    min="0"
                    value={data.totalLocations}
                    onChange={(e) => set('totalLocations', e.target.value)}
                    error={errors.totalLocations}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Available Cities / States</label>
                <FormInput
                  type="text"
                  placeholder="e.g. Mumbai, Delhi, Bangalore"
                  value={data.availableCities}
                  onChange={(e) => set('availableCities', e.target.value)}
                />
              </div>
            </>
          )}

          {/* ── Step 3: Financial ── */}
          {step === 2 && (
            <>
              <div className={`grid gap-4 ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'}`}>
                <div>
                  <label className={labelCls}>Franchise Fee <span className="text-[#e05252] font-light">*</span></label>
                  <FormInput
                    type="text"
                    placeholder="e.g. ₹5 Lakhs"
                    value={data.franchiseFee}
                    onChange={(e) => set('franchiseFee', e.target.value)}
                    error={errors.franchiseFee}
                  />
                </div>
                <div>
                  <label className={labelCls}>Royalty % <span className="text-[#a0aabf] font-light text-xs">(optional)</span></label>
                  <FormInput
                    type="text"
                    placeholder="e.g. 5%"
                    value={data.royaltyPct}
                    onChange={(e) => set('royaltyPct', e.target.value)}
                  />
                </div>
              </div>
              <div className={`grid gap-4 ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'}`}>
                <div>
                  <label className={labelCls}>Min Investment <span className="text-[#e05252] font-light">*</span></label>
                  <FormInput
                    type="text"
                    placeholder="e.g. ₹20 Lakhs"
                    value={data.investmentMin}
                    onChange={(e) => set('investmentMin', e.target.value)}
                    error={errors.investmentMin}
                  />
                </div>
                <div>
                  <label className={labelCls}>Max Investment <span className="text-[#e05252] font-light">*</span></label>
                  <FormInput
                    type="text"
                    placeholder="e.g. ₹50 Lakhs"
                    value={data.investmentMax}
                    onChange={(e) => set('investmentMax', e.target.value)}
                    error={errors.investmentMax}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Required Liquid Capital <span className="text-[#e05252] font-light">*</span></label>
                <FormInput
                  type="text"
                  placeholder="e.g. ₹10 Lakhs"
                  value={data.liquidCapital}
                  onChange={(e) => set('liquidCapital', e.target.value)}
                  error={errors.liquidCapital}
                />
              </div>
            </>
          )}

          {/* ── Step 4: Media ── */}
          {step === 3 && (
            <>
              <div>
                <label className={labelCls}>Logo Image URL <span className="text-[#a0aabf] font-light text-xs">(optional)</span></label>
                <FormInput
                  type="url"
                  placeholder="https://example.com/logo.png"
                  value={data.logoUrl}
                  onChange={(e) => set('logoUrl', e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Gallery Image URLs <span className="text-[#a0aabf] font-light text-xs">(comma-separated, optional)</span></label>
                <FormTextarea
                  rows={3}
                  placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                  value={data.galleryUrls}
                  onChange={(e) => set('galleryUrls', e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Brochure / PDF URL <span className="text-[#a0aabf] font-light text-xs">(optional)</span></label>
                <FormInput
                  type="url"
                  placeholder="https://example.com/brochure.pdf"
                  value={data.brochureUrl}
                  onChange={(e) => set('brochureUrl', e.target.value)}
                />
              </div>
              <p className="text-xs font-light text-[#a0aabf] leading-relaxed">
                Direct image/PDF links are accepted. For file uploads, a full implementation would use cloud storage.
              </p>
            </>
          )}

          {/* ── Step 5: Review ── */}
          {step === 4 && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['Franchise Name', data.name],
                  ['Category',       data.category],
                  ['Business Type',  data.businessType],
                  ['Year Est.',      data.yearEstablished],
                  ['Locations',      data.totalLocations],
                  ['Franchise Fee',  data.franchiseFee],
                  ['Investment',     `${data.investmentMin} – ${data.investmentMax}`],
                  ['Liquid Capital', data.liquidCapital],
                  ['Royalty',        data.royaltyPct || '—'],
                ].map(([label, val]) => (
                  <div key={label} className="bg-[#fafafb] rounded-[7px] px-3 py-2.5 border border-black/[0.03]">
                    <p className="text-[10px] font-semibold text-[#637089] tracking-wide mb-0.5">{label}</p>
                    <p className="text-sm font-light text-[#0a1128] truncate">{val || '—'}</p>
                  </div>
                ))}
              </div>
              {data.description && (
                <div className="bg-[#fafafb] rounded-[7px] px-3 py-2.5 border border-black/[0.03]">
                  <p className="text-[10px] font-semibold text-[#637089] tracking-wide mb-0.5">Description</p>
                  <p className="text-sm font-light text-[#0a1128] leading-relaxed">{data.description}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="px-6 py-4 border-t border-black/[0.03] flex items-center justify-between bg-[#fafafb]">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className={`flex items-center gap-1 px-4 py-2 rounded-[7px] text-sm font-light border transition-all duration-200 ${
              step === 0
                ? 'text-[#a0aabf] border-black/[0.03] cursor-not-allowed'
                : 'text-[#637089] border-black/5 hover:border-[#d4af37]/40 hover:text-[#0a1128] bg-white'
            }`}
          >
            <ChevronLeftIcon sx={{ fontSize: 18 }} /> Back
          </button>
          <span className="text-xs font-light text-[#a0aabf]">
            Step {step + 1} of {STEPS.length}
          </span>
          {step < STEPS.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-5 py-2 rounded-[7px] bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] text-white text-sm font-light tracking-wider hover:opacity-90 transition-opacity shadow-[0_4px_12px_rgba(10,17,40,0.15)]"
            >
              Next <ChevronRightIcon sx={{ fontSize: 18 }} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1 px-5 py-2 rounded-[7px] bg-gradient-to-br from-[#bf953f] via-[#d4af37] to-[#b38728] text-white text-sm font-light tracking-wider hover:opacity-90 transition-opacity shadow-[0_4px_12px_rgba(212,175,55,0.25)]"
            >
              Submit Listing
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
