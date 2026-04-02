import { Box, Tab, Tabs } from '@mui/material';

export interface PremiumTabOption<T extends string = string> {
  label: string;
  value: T;
}

interface PremiumTabsProps<T extends string = string> {
  tabs: PremiumTabOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

const PremiumTabs = <T extends string>({ tabs, value, onChange }: PremiumTabsProps<T>) => {
  return (
    <Box
      sx={{
        position: 'relative',
        border: '1px solid var(--border-default)',
        borderRadius: '4px',
        backgroundColor: 'var(--bg-card)',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(28, 42, 68, 0.06)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #1C2A44 0%, #C69C44 100%)',
          zIndex: 1,
        }}
      />
      <Tabs
        value={value}
        onChange={(_event, nextValue) => onChange(nextValue as T)}
        variant="scrollable"
        scrollButtons={false}
        sx={{
          minHeight: '32px',
          px: '2px',
          pt: '2px',
          '& .MuiTabs-indicator': {
            display: 'none',
          },
          '& .MuiTab-root': {
            minHeight: '28px',
            borderRadius: '4px',
            px: '8px',
            py: '4px',
            mr: '4px',
            textTransform: 'none',
            fontFamily: 'Outfit',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.01em',
            color: 'var(--text-muted)',
            alignItems: 'flex-start',
            transition: 'all 180ms ease-in-out',
          },
          '& .MuiTab-root:last-of-type': {
            mr: 0,
          },
          '& .Mui-selected': {
            color: 'var(--text-main)',
            fontWeight: 600,
            background:
              'linear-gradient(135deg, rgba(28, 42, 68, 0.08) 0%, rgba(198, 156, 68, 0.12) 100%)',
            border: '1px solid rgba(198, 156, 68, 0.45)',
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} disableRipple value={tab.value} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default PremiumTabs;