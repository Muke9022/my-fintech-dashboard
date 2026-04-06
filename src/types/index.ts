export interface Deal {
  id: string;
  companyName: string;
  industry: string;
  description: string;
  fundingGoal: number;
  raisedAmount: number;
  roi: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  tags: string[];
}

export interface Investor {
  id: string;
  name: string;
  avatar: string;
  location: string;
  portfolio: number;
  activeDeals: number;
  avgRoi: number;
  riskAppetite: 'Low' | 'Medium' | 'High';
  preferredIndustries: string[];
  totalDeals: number;
  successRate: number;
}

export interface RecommendedDeal extends Deal {
  matchScore: number;
  matchReasons: string[];
}

export interface FilterOptions {
  search?: string;
  industry?: string;
  riskLevel?: string;
  minRoi?: number;
  maxRoi?: number;
  minFunding?: number;
  maxFunding?: number;
  sortBy?: 'roi' | 'fundingGoal' | 'raisedAmount' | 'companyName';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
}

export interface PaginatedDeals {
  deals: Deal[];
  total: number;
  page: number;
  totalPages: number;
}