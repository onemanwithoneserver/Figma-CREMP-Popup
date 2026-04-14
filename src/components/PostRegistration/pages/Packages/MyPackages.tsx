

interface MyPackagesProps {
  isDesktop: boolean;
}

export default function MyPackages({ isDesktop }: MyPackagesProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Content will be loaded from backend */}
      <h2 className="text-sm font-semibold text-[#0a1128] tracking-wide">My Packages</h2>
      <div className="text-[#637089] text-sm">Your package details will appear here.</div>
    </div>
  );
}
