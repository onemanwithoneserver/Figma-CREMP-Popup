import { Storefront, CheckCircle, Language, Instagram, LinkedIn } from '@mui/icons-material';
import { data } from '../data';
import { Card } from '../SharedUI';

export default function HeaderSection({ isDesktop }: { isDesktop: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      <Card>
        <div className={`flex items-start ${isDesktop ? 'gap-5' : 'gap-3'} mb-5`}>

          {/* Brand Logo / Icon Box */}
          <div className={`shrink-0 rounded border border-[#d9dde3] flex items-center justify-center bg-gradient-to-br from-[#f5f6f8] to-[#eef0f3] ${isDesktop ? 'w-[5rem] h-[5rem]' : 'w-[3.5rem] h-[3.5rem]'}`}>
            <Storefront sx={{ fontSize: isDesktop ? '2.5rem' : '1.75rem', color: '#c9a34e' }} />
          </div>

          {/* Brand Title & Categories */}
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h1 className={`font-extrabold text-[#0f1f3d] m-0 leading-none truncate ${isDesktop ? 'text-[1.875rem]' : 'text-[1.25rem]'}`}>
                {data.basicInfo.brandName}
              </h1>
              <CheckCircle sx={{ fontSize: isDesktop ? '1.25rem' : '1rem', color: '#1f3b73', flexShrink: 0 }} />
            </div>

            <p className={`text-[#6b7280] font-bold m-0 leading-snug ${isDesktop ? 'text-[1rem]' : 'text-[0.875rem]'}`}>
              {data.basicInfo.tagline}
            </p>

            <div className={`flex flex-wrap ${isDesktop ? 'gap-3 mt-2' : 'gap-2 mt-1'}`}>
              {[data.basicInfo.category, data.basicInfo.subcategory, data.basicInfo.microCategory].map(t => (
                <span key={t} className="inline-flex items-center px-2.5 py-1 rounded bg-[#eef0f3] border border-[#e2e8f0] text-[0.75rem] font-semibold text-[#1c2a44]">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Metadata & Socials Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#f1f5f9]">

          <ul className={`flex items-center gap-6 text-[#6b7280] font-bold list-disc list-inside m-0 p-0 ${isDesktop ? 'text-[0.875rem]' : 'text-[0.75rem]'}`}>
            <li>Est. {data.basicInfo.establishedYear}</li>
            <li>{data.basicInfo.headquarters}</li>
          </ul>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {[
              { icon: <Language sx={{ fontSize: isDesktop ? '1.25rem' : '1rem' }} />, label: data.basicInfo.website },
              { icon: <Instagram sx={{ fontSize: isDesktop ? '1.25rem' : '1rem' }} />, label: data.basicInfo.socialLinks.instagram },
              { icon: <LinkedIn sx={{ fontSize: isDesktop ? '1.25rem' : '1rem' }} />, label: data.basicInfo.socialLinks.linkedin },
            ].map((item, i) => (
              <a key={i} href="#" className={`flex items-center gap-1.5 text-[#c9a34e] font-extrabold hover:text-[#b8903c] transition-colors leading-none ${isDesktop ? 'text-[0.875rem]' : 'text-[0.75rem]'}`}>
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>

        </div>
      </Card>

      {/* Concept Tags */}
      <div className={`flex flex-wrap ${isDesktop ? 'gap-3' : 'gap-2'}`}>
        {data.conceptTags.map((tag, idx) => (
          <div key={idx} className={`inline-flex items-center gap-2 bg-white border border-[#d9dde3] rounded px-3 py-1.5 font-extrabold text-[#0f1f3d] shadow-sm ${isDesktop ? 'text-[0.875rem]' : 'text-[0.75rem]'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#c9a34e] to-[#b8903c] shrink-0" />
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}