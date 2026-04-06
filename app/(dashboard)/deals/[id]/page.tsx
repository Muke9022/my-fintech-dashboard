import DealDetailsClient from './DealDetailsClient';
import dealsData from '../../../../src/data/deals.json';

// Build time par pages generate karne ke liye
export async function generateStaticParams() {
  return dealsData.map((deal: any) => ({
    id: deal.id.toString(),
  }));
}

export default function Page() {
  return <DealDetailsClient />;
}