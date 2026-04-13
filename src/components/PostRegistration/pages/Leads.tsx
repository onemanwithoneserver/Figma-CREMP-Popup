import { useState } from 'react';
import TableView from '../components/TableView';
import type { Column } from '../components/TableView';
import EmptyState from '../components/EmptyState';
import Filters from '../components/Filters';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

interface Lead {
  id: string;
  name: string;
  contact: string;
  email: string;
  interest: string;
  date: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  company?: string;
  message?: string;
  budget?: string;
  timeline?: string;
}

const LEADS: Lead[] = [
  {
    id: '1', name: 'Rahul Sharma', contact: '9876543210', email: 'rahul@example.com',
    interest: "McDonald's Franchise", date: '12 Apr 2026', status: 'new',
    company: 'Self', message: 'Interested in opening a franchise in South Mumbai. Have prior F&B experience.',
    budget: '₹1.5Cr – ₹2Cr', timeline: '3–6 months',
  },
  {
    id: '2', name: 'Priya Desai', contact: '9765432109', email: 'priya@desai.co',
    interest: 'Jockey Exclusive Store', date: '10 Apr 2026', status: 'contacted',
    company: 'Desai Ventures Pvt. Ltd.', message: 'Looking for a franchise in a premium mall. Have retail experience.',
    budget: '₹25L – ₹40L', timeline: '1–3 months',
  },
  {
    id: '3', name: 'Arjun Mehta', contact: '9654321098', email: 'arjun@mehta.in',
    interest: 'Anytime Fitness', date: '08 Apr 2026', status: 'qualified',
    company: 'Mehta Group', message: 'Have identified a 5000 sqft location. Ready to proceed quickly.',
    budget: '₹50L – ₹80L', timeline: 'Immediately',
  },
  {
    id: '4', name: 'Sneha Nair', contact: '9543210987', email: 'sneha@nair.org',
    interest: 'Apollo Pharmacy', date: '05 Apr 2026', status: 'contacted',
    message: 'First time franchisee, exploring options in healthcare.',
    budget: '₹20L – ₹35L', timeline: '6–12 months',
  },
  {
    id: '5', name: 'Vikram Kapoor', contact: '9432109876', email: 'vikram@kapoor.com',
    interest: 'NIIT Education Centre', date: '02 Apr 2026', status: 'closed',
    company: 'Kapoor Edu Services', message: 'Closed deal — signed franchise agreement on 01 Apr.',
    budget: '₹15L – ₹25L', timeline: 'Completed',
  },
];

const STATUS_CHIP: Record<Lead['status'], string> = {
  new:       'bg-blue-50 text-blue-700 border border-blue-100',
  contacted: 'bg-amber-50 text-amber-700 border border-amber-100',
  qualified: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  closed:    'bg-gray-100 text-gray-500 border border-gray-200',
};

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
];

interface LeadsProps {
  isDesktop: boolean;
}

export default function Leads({ isDesktop }: LeadsProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sort, setSort] = useState('newest');

  const filtered = LEADS
    .filter((l) => {
      const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.interest.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || l.status === statusFilter.toLowerCase();
      return matchSearch && matchStatus;
    })
    .sort((a, b) =>
      sort === 'oldest'
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date)
    );

  const columns: Column<Record<string, unknown>>[] = [
    {
      key: 'name', label: 'Name',
      render: (row) => {
        const lead = row as unknown as Lead;
        return (
          <div>
            <p className="font-medium text-[#0a1128]">{lead.name}</p>
            {lead.company && <p className="text-[11px] text-[#a0aabf] font-light">{lead.company}</p>}
          </div>
        );
      },
    },
    {
      key: 'interest', label: 'Interested In',
      render: (row) => {
        const lead = row as unknown as Lead;
        return <span className="text-sm font-light text-[#0a1128]">{lead.interest}</span>;
      },
    },
    {
      key: 'date', label: 'Date', width: 'w-28',
      render: (row) => {
        const lead = row as unknown as Lead;
        return <span className="text-[#637089] font-light">{lead.date}</span>;
      },
    },
    {
      key: 'status', label: 'Status', width: 'w-28',
      render: (row) => {
        const lead = row as unknown as Lead;
        return (
          <span className={`text-[10px] px-2 py-0.5 rounded-[4px] font-medium capitalize ${STATUS_CHIP[lead.status]}`}>
            {lead.status}
          </span>
        );
      },
    },
  ];

  const expandContent = (row: Record<string, unknown>) => {
    const lead = row as unknown as Lead;
    return (
      <div className="flex flex-col gap-3">
        {lead.message && (
          <div>
            <p className="text-[10px] font-semibold text-[#637089] tracking-wide mb-1">Message</p>
            <p className="text-sm font-light text-[#0a1128] leading-relaxed">{lead.message}</p>
          </div>
        )}
        <div className={`grid gap-3 ${isDesktop ? 'grid-cols-3' : 'grid-cols-1'}`}>
          {lead.budget && (
            <div className="bg-white rounded-[7px] px-3 py-2 border border-black/[0.03]">
              <p className="text-[10px] font-semibold text-[#637089] tracking-wide mb-0.5">Budget</p>
              <p className="text-sm font-light text-[#0a1128]">{lead.budget}</p>
            </div>
          )}
          {lead.timeline && (
            <div className="bg-white rounded-[7px] px-3 py-2 border border-black/[0.03]">
              <p className="text-[10px] font-semibold text-[#637089] tracking-wide mb-0.5">Timeline</p>
              <p className="text-sm font-light text-[#0a1128]">{lead.timeline}</p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <a
            href={`tel:${lead.contact}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] border border-black/5 text-[#637089] text-xs font-medium hover:border-[#d4af37]/40 hover:text-[#0a1128] bg-white transition-all duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <PhoneOutlinedIcon sx={{ fontSize: 14 }} /> Call
          </a>
          <a
            href={`mailto:${lead.email}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] border border-black/5 text-[#637089] text-xs font-medium hover:border-[#d4af37]/40 hover:text-[#0a1128] bg-white transition-all duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <MailOutlinedIcon sx={{ fontSize: 14 }} /> Email
          </a>
          <a
            href={`https://wa.me/91${lead.contact}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] border border-emerald-100 text-emerald-700 text-xs font-medium hover:bg-emerald-50 bg-white transition-all duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <WhatsAppIcon sx={{ fontSize: 14 }} /> WhatsApp
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm font-light text-[#637089]">
          <span className="font-semibold text-[#0a1128]">{LEADS.length}</span> total leads
        </p>
        <div className="flex items-center gap-2">
          {(['All', 'New', 'Contacted', 'Qualified', 'Closed'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 rounded-[4px] text-xs font-medium border transition-all duration-200 ${
                statusFilter === s
                  ? 'bg-gradient-to-br from-[#0a1128] via-[#121c33] to-[#0a1128] text-white border-[#0a1128]'
                  : 'bg-white text-[#637089] border-black/5 hover:border-[#d4af37]/40 hover:text-[#0a1128]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <Filters
        searchPlaceholder="Search by name or franchise..."
        searchValue={search}
        onSearchChange={setSearch}
        sortOptions={SORT_OPTIONS}
        selectedSort={sort}
        onSortChange={setSort}
        isDesktop={isDesktop}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={<PeopleAltOutlinedIcon sx={{ fontSize: '1.5rem', color: '#a0aabf' }} />}
          title="No leads yet"
          description="Leads from interested buyers will appear here."
        />
      ) : (
        <div className="bg-white rounded-[7px] border border-black/[0.03] shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
          <TableView
            columns={columns}
            data={filtered as unknown as Record<string, unknown>[]}
            keyExtractor={(row) => (row as unknown as Lead).id}
            expandableContent={expandContent}
          />
        </div>
      )}
    </div>
  );
}
