import { AssignmentTurnedIn, CheckCircle } from '@mui/icons-material';
import { data } from '../data';
import { Card, SectionTitle } from '../SharedUI';

export default function BusinessOverviewSection({ isDesktop }: { isDesktop: boolean }) {
  return (
    <Card>
      <SectionTitle
        title="Business Overview"
        icon={<AssignmentTurnedIn sx={{ fontSize: isDesktop ? '1.5rem' : '1.25rem' }} />}
        isDesktop={isDesktop}
      />

      <div className="flex flex-col gap-6 mt-4">
        {/* Main Description */}
        <p className={`${isDesktop ? 'text-[1.125rem]' : 'text-[0.875rem]'} text-[#4b5563] font-medium leading-[1.6] m-0`}>
          {data.businessOverview.description}
        </p>

        {/* Content Grid: 2 Columns on Desktop, 1 Column on Mobile */}
        <div className={`grid gap-8 ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'}`}>

          {/* Unique Selling Points */}
          <div className="flex flex-col">
            <h3 className={`${isDesktop ? 'text-[1.125rem]' : 'text-[1rem]'} font-extrabold text-[#0f1f3d] m-0 mb-4 leading-none`}>
              Unique Selling Points
            </h3>
            <ul className="flex flex-col gap-3 m-0 p-0 list-none">
              {data.businessOverview.usps.map((usp, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle sx={{ fontSize: isDesktop ? '1.25rem' : '1.125rem', color: '#c9a34e', mt: '0.125rem', flexShrink: 0 }} />
                  <span className={`${isDesktop ? 'text-[1rem]' : 'text-[0.875rem]'} text-[#4b5563] font-bold leading-[1.5]`}>
                    {usp}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Model */}
          <div className="flex flex-col">
            <h3 className={`${isDesktop ? 'text-[1.125rem]' : 'text-[1rem]'} font-extrabold text-[#0f1f3d] m-0 mb-4 leading-none`}>
              Business Model
            </h3>
            <div className={`bg-[#f5f6f8] border border-[#eef0f3] rounded px-4 py-3 ${isDesktop ? 'text-[1rem]' : 'text-[0.875rem]'} font-bold text-[#1f3b73] leading-[1.6]`}>
              {data.businessOverview.modelSummary}
            </div>
          </div>

        </div>
      </div>
    </Card>
  );
}