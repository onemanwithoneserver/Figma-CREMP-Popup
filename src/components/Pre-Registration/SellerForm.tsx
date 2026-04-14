import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface SellerFormProps {
  isDesktop: boolean;
}

type SellerRole = 'agent' | 'broker' | 'owner' | 'franchisee' | 'employee';

const sellerRoles: { value: SellerRole; label: string }[] = [
  { value: 'agent', label: 'Agent' },
  { value: 'broker', label: 'Broker' },
  { value: 'owner', label: 'Owner' },
  { value: 'franchisee', label: 'Franchisee' },
  { value: 'employee', label: 'Employee' },
];

interface FormValues {
  role: SellerRole | '';
  name: string;
  companyName: string;
  mobile: string;
  email: string;
  termsAccepted: boolean;
}

interface FormErrors {
  role?: string;
  name?: string;
  companyName?: string;
  mobile?: string;
  email?: string;
}

const emptyForm: FormValues = { role: '', name: '', companyName: '', mobile: '', email: '', termsAccepted: false };

export default function SellerForm({ isDesktop }: SellerFormProps) {
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!values.role) errs.role = 'Please select a role.';
    if (!values.name.trim()) errs.name = 'Name is required.';
    if (!values.companyName.trim()) errs.companyName = 'Company name is required.';
    if (!values.mobile.trim()) {
      errs.mobile = 'Mobile number is required.';
    } else if (!/^\d{10}$/.test(values.mobile.trim())) {
      errs.mobile = 'Enter a valid 10-digit mobile number.';
    }
    if (!values.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errs.email = 'Enter a valid email address.';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 gap-4">
        <div className="w-14 h-14 rounded-[7px] bg-gradient-to-br from-[#bf953f] via-[#d4af37] to-[#b38728] flex items-center justify-center shadow-[0_10px_20px_rgba(212,175,55,0.2)]">
          <CheckCircleIcon sx={{ fontSize: '1.75rem', color: '#ffffff' }} />
        </div>
        <div className="text-center space-y-1">
          <h2 className={`font-light tracking-wide text-[#0a1128] ${isDesktop ? 'text-2xl' : 'text-xl'}`}>
            Registration Submitted
          </h2>
          <p className={`text-[#637089] font-light max-w-sm mx-auto leading-relaxed ${isDesktop ? 'text-sm' : 'text-xs'}`}>
            Thank you for registering. Our advisory team will connect with you shortly.
          </p>
        </div>
        <button
          onClick={() => { setSubmitted(false); setValues(emptyForm); setErrors({}); }}
          className="px-6 py-2 mt-2 rounded-[7px] bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] text-white font-light tracking-wider text-sm hover:opacity-90 transition-opacity shadow-[0_10px_20px_rgba(10,17,40,0.1)]"
        >
          Register Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      <div>
        <label className={`flex items-center gap-1.5 font-medium text-[#0a1128] mb-1.5 ${isDesktop ? 'text-sm' : 'text-[13px]'}`}>
          <BadgeIcon sx={{ fontSize: 16, color: '#d4af37' }} />
          Select Your Role <span className="text-[#e05252] font-light">*</span>
        </label>
        <div className="flex flex-wrap gap-1.5 w-full">
          {sellerRoles.map(({ value, label }, index) => (
            <button
              type="button"
              key={value}
              onClick={() => setValues((prev) => ({ ...prev, role: value }))}
              className={`${isDesktop
                ? 'px-3 py-1.5 text-xs min-w-[80px]'
                : `py-2 text-[11px] ${index < 3 ? 'w-[calc(33.333%-4px)]' : 'w-[calc(50%-3px)]'}`
              } rounded-[4px] font-medium border transition-all duration-300 whitespace-nowrap flex items-center justify-center ${
                values.role === value
                  ? 'bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] text-white border-[#0a1128] shadow-[0_4px_10px_rgba(10,17,40,0.15)]'
                  : 'bg-white text-[#637089] border-black/5 hover:border-[#d4af37]/40 hover:text-[#0a1128] hover:bg-[#fafafb]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {errors.role && <p className="text-[#e05252] text-[11px] mt-1 font-light">{errors.role}</p>}
      </div>

      <div>
        <label className={`flex items-center gap-1.5 font-medium text-[#0a1128] mb-1 ${isDesktop ? 'text-sm' : 'text-xs'}`}>
          <PersonIcon sx={{ fontSize: 16, color: '#d4af37' }} />
          Full Name <span className="text-[#e05252] font-light">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={values.name}
          onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
          className={`w-full border rounded-[7px] px-3 py-2 text-[#0a1128] text-sm outline-none transition-all duration-300 placeholder:text-[#a0aabf] font-light font-['Outfit'] ${
            errors.name
              ? 'border-[#e05252] bg-[#fff5f5]'
              : 'border-black/5 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20 bg-[#fafafb] focus:bg-white'
          }`}
        />
        {errors.name && <p className="text-[#e05252] text-[11px] mt-1 font-light">{errors.name}</p>}
      </div>

      <div>
        <label className={`flex items-center gap-1.5 font-medium text-[#0a1128] mb-1 ${isDesktop ? 'text-sm' : 'text-xs'}`}>
          <BusinessIcon sx={{ fontSize: 16, color: '#d4af37' }} />
          Entity Name <span className="text-[#e05252] font-light">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter your company name"
          value={values.companyName}
          onChange={(e) => setValues((prev) => ({ ...prev, companyName: e.target.value }))}
          className={`w-full border rounded-[7px] px-3 py-2 text-[#0a1128] text-sm outline-none transition-all duration-300 placeholder:text-[#a0aabf] font-light font-['Outfit'] ${
            errors.companyName
              ? 'border-[#e05252] bg-[#fff5f5]'
              : 'border-black/5 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20 bg-[#fafafb] focus:bg-white'
          }`}
        />
        {errors.companyName && <p className="text-[#e05252] text-[11px] mt-1 font-light">{errors.companyName}</p>}
      </div>

      <div>
        <label className={`flex items-center gap-1.5 font-medium text-[#0a1128] mb-1 ${isDesktop ? 'text-sm' : 'text-xs'}`}>
          <PhoneIcon sx={{ fontSize: 16, color: '#d4af37' }} />
          Contact Number <span className="text-[#e05252] font-light">*</span>
        </label>
        <input
          type="tel"
          placeholder="Enter 10-digit mobile number"
          value={values.mobile}
          maxLength={10}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            setValues((prev) => ({ ...prev, mobile: val }));
          }}
          className={`w-full border rounded-[7px] px-3 py-2 text-[#0a1128] text-sm outline-none transition-all duration-300 placeholder:text-[#a0aabf] font-light font-['Outfit'] ${
            errors.mobile
              ? 'border-[#e05252] bg-[#fff5f5]'
              : 'border-black/5 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20 bg-[#fafafb] focus:bg-white'
          }`}
        />
        {errors.mobile && <p className="text-[#e05252] text-[11px] mt-1 font-light">{errors.mobile}</p>}
      </div>

      <div>
        <label className={`flex items-center gap-1.5 font-medium text-[#0a1128] mb-1 ${isDesktop ? 'text-sm' : 'text-xs'}`}>
          <EmailIcon sx={{ fontSize: 16, color: '#d4af37' }} />
          Email Address <span className="text-[#e05252] font-light">*</span>
        </label>
        <input
          type="email"
          placeholder="Enter your email address"
          value={values.email}
          onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
          className={`w-full border rounded-[7px] px-3 py-2 text-[#0a1128] text-sm outline-none transition-all duration-300 placeholder:text-[#a0aabf] font-light font-['Outfit'] ${
            errors.email
              ? 'border-[#e05252] bg-[#fff5f5]'
              : 'border-black/5 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20 bg-[#fafafb] focus:bg-white'
          }`}
        />
        {errors.email && <p className="text-[#e05252] text-[11px] mt-1 font-light">{errors.email}</p>}
      </div>

      <div className="flex items-center justify-start mt-1">
        <input
          id="seller-terms"
          type="checkbox"
          checked={values.termsAccepted || false}
          onChange={e => setValues(prev => ({ ...prev, termsAccepted: e.target.checked }))}
          className="accent-[#d4af37] w-3.5 h-3.5 mr-2 cursor-pointer rounded-[4px]"
          required
        />
        <label htmlFor="seller-terms" className={`text-[#a0aabf] font-light ${isDesktop ? 'text-[12px]' : 'text-[11px]'} select-none cursor-pointer`}>
          I accept the <a href="#" className="text-[#0a1128] underline decoration-black/20 hover:decoration-[#d4af37] hover:text-[#d4af37] transition-colors">Terms of Service</a> and <a href="#" className="text-[#0a1128] underline decoration-black/20 hover:decoration-[#d4af37] hover:text-[#d4af37] transition-colors">Privacy Policy</a>.
        </label>
      </div>

      <button
        type="submit"
        className={`mx-auto py-2.5 rounded-[7px] bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728] text-white font-medium text-sm shadow-[0_4px_10px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_15px_rgba(212,175,55,0.3)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 tracking-wide mt-1 ${isDesktop ? 'w-1/3' : 'w-2/3'}`}
      >
        Submit Registration
      </button>
    </form>
  );
}