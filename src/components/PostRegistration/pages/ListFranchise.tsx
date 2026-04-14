
interface ListFranchiseProps {
  isDesktop: boolean;
}

export default function ListFranchise({ }: ListFranchiseProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-[#0a1128] tracking-wide">List Franchise</h2>
    </div>
  );
}
