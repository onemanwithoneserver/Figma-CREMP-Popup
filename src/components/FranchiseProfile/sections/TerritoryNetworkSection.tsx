import { Language, Groups } from '@mui/icons-material';
import { data } from '../data';
import { Card, SectionTitle, LabelValueRow } from '../SharedUI';

export default function TerritoryNetworkSection({ isDesktop }: { isDesktop: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Territory Availability Card */}
      <Card>
        <SectionTitle
          title="Territory"
          icon={<Language sx={{ fontSize: isDesktop ? '1.5rem' : '1.25rem' }} />}
          isDesktop={isDesktop}
        />

        <div className="flex flex-col gap-0 mt-4">
          {[
            { label: 'Cities', value: data.territoryAvailability.cities },
            { label: 'Regions', value: data.territoryAvailability.regions },
            { label: 'Exclusive', value: data.territoryAvailability.exclusive },
          ].map((row, i) => (
            <LabelValueRow key={i} label={row.label} value={row.value} />
          ))}
        </div>

        <div className={`mt-4 bg-[#f5f6f8] border border-[#eef0f3] rounded flex flex-col ${isDesktop ? 'px-4 py-3 gap-2' : 'px-3 py-2 gap-1.5'}`}>
          <span className={`text-[#6b7280] font-bold leading-none ${isDesktop ? 'text-[0.875rem]' : 'text-[0.75rem]'}`}>
            Expansion Plans
          </span>
          <span className={`text-[#0f1f3d] font-extrabold leading-[1.5] ${isDesktop ? 'text-[1rem]' : 'text-[0.875rem]'}`}>
            {data.territoryAvailability.expansionPlans}
          </span>
        </div>
      </Card>

      {/* Existing Network Card */}
      <Card>
        <SectionTitle
          title="Existing Network"
          icon={<Groups sx={{ fontSize: isDesktop ? '1.5rem' : '1.25rem' }} />}
          isDesktop={isDesktop}
        />

        <div className={`grid grid-cols-2 mt-4 ${isDesktop ? 'gap-4' : 'gap-3'}`}>

          <div className={`flex flex-col items-center justify-center bg-[#f5f6f8] rounded border border-[#eef0f3] ${isDesktop ? 'py-5 gap-2' : 'py-3 gap-1.5'}`}>
            <span className={`font-extrabold text-[#0f1f3d] leading-none ${isDesktop ? 'text-[2rem]' : 'text-[1.5rem]'}`}>
              {data.existingNetwork.totalUnits}
            </span>
            <span className={`text-[#6b7280] font-bold leading-none ${isDesktop ? 'text-[0.875rem]' : 'text-[0.75rem]'}`}>
              Total Units
            </span>
          </div>

          <div className={`flex flex-col items-center justify-center rounded border border-[#e3c980]/40 bg-gradient-to-br from-[#fdfaf3] to-[#f5f6f8] ${isDesktop ? 'py-5 gap-2' : 'py-3 gap-1.5'}`}>
            <span className={`font-extrabold text-[#c9a34e] leading-none ${isDesktop ? 'text-[2rem]' : 'text-[1.5rem]'}`}>
              {data.existingNetwork.franchiseUnits}
            </span>
            <span className={`text-[#6b7280] font-bold leading-none ${isDesktop ? 'text-[0.875rem]' : 'text-[0.75rem]'}`}>
              Franchise
            </span>
          </div>

        </div>
      </Card>
    </div>
  );
}