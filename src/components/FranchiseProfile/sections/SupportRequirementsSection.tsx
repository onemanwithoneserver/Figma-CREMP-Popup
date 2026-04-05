import { Handshake } from '@mui/icons-material';
import { data } from '../data';
import { Card, SectionTitle } from '../SharedUI';

export default function SupportRequirementsSection({ isDesktop }: { isDesktop: boolean }) {
  return (
    <Card>
      <SectionTitle
        title="Support & Requirements"
        icon={<Handshake sx={{ fontSize: isDesktop ? '1.5rem' : '1.25rem' }} />}
        isDesktop={isDesktop}
      />

      <div className={`grid mt-4 ${isDesktop ? 'gap-8 grid-cols-2' : 'gap-5 grid-cols-1'}`}>

        {/* Outlet Requirements Column */}
        <div className="flex flex-col">
          <h3 className={`text-[#0f1f3d] m-0 mb-4 leading-none pb-3 border-b border-[#eef0f3] ${isDesktop ? 'text-[1.125rem]' : 'text-[1rem]'} font-extrabold`}>
            Outlet Requirements
          </h3>
          <div className={`flex flex-col ${isDesktop ? 'gap-3' : 'gap-2'}`}>
            {data.outletRequirements.map((req, i) => (
              <div key={i} className={`flex items-center bg-[#f5f6f8] rounded border border-[#eef0f3] ${isDesktop ? 'px-4 py-3 gap-4' : 'px-3 py-2 gap-3'}`}>

                <div className={`shrink-0 rounded bg-white border border-[#d9dde3] flex items-center justify-center text-[#c9a34e] ${isDesktop ? 'w-10 h-10' : 'w-8 h-8'}`}>
                  <div className={isDesktop ? 'scale-110' : 'scale-90'}>
                    {req.icon}
                  </div>
                </div>

                <span className={`text-[#6b7280] flex-1 font-bold ${isDesktop ? 'text-[0.875rem]' : 'text-[0.75rem]'}`}>
                  {req.label}
                </span>

                <span className={`text-[#0f1f3d] font-extrabold shrink-0 ${isDesktop ? 'text-[1rem]' : 'text-[0.875rem]'}`}>
                  {req.value}
                </span>

              </div>
            ))}
          </div>
        </div>

        {/* Brand Support Column */}
        <div className="flex flex-col">
          <h3 className={`text-[#0f1f3d] m-0 mb-4 leading-none pb-3 border-b border-[#eef0f3] ${isDesktop ? 'text-[1.125rem]' : 'text-[1rem]'} font-extrabold`}>
            Brand Support
          </h3>
          <div className={`flex flex-col ${isDesktop ? 'gap-3' : 'gap-2'}`}>
            {data.support.map((sup, i) => (
              <div key={i} className={`border border-[#eef0f3] rounded bg-white flex flex-col ${isDesktop ? 'p-4 gap-3' : 'p-3 gap-2'}`}>

                <div className="flex items-center gap-3 leading-none">
                  <span className={`text-[#c9a34e] flex items-center ${isDesktop ? 'scale-110' : 'scale-90'}`}>
                    {sup.icon}
                  </span>
                  <h4 className={`font-extrabold text-[#0f1f3d] m-0 ${isDesktop ? 'text-[1rem]' : 'text-[0.875rem]'}`}>
                    {sup.category}
                  </h4>
                </div>

                <ul className={`flex flex-col gap-1.5 list-disc list-inside m-0 p-0 text-[#6b7280] font-bold ${isDesktop ? 'pl-8 text-[0.875rem]' : 'pl-7 text-[0.75rem]'}`}>
                  {sup.items.map((item, idx) => (
                    <li key={idx} className="leading-[1.5]">
                      {item}
                    </li>
                  ))}
                </ul>

              </div>
            ))}
          </div>
        </div>

      </div>
    </Card>
  );
}