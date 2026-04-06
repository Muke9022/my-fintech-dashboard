import dealsData from '../data/deals.json';
import { Deal } from '../types';

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

export const dealService = {
  // Fetch all deals with simulated delay
  getDeals: async (): Promise<Deal[]> => {
    return new Promise((resolve) => {
      const delay = Math.floor(Math.random() * 500) + 300;
      setTimeout(() => {
        resolve(dealsData as Deal[]);
      }, delay);
    });
  },

  // Get single deal by id
  getDealById: async (id: string): Promise<Deal | undefined> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const deal = dealsData.find((d) => d.id === id);
        if (deal) {
          resolve(deal as Deal);
        } else {
          reject(new Error(`Deal with id ${id} not found`));
        }
      }, 400);
    });
  },

  // Filter + sort + paginate
  getFilteredDeals: async (options: FilterOptions): Promise<PaginatedDeals> => {
    return new Promise((resolve) => {
      const delay = Math.floor(Math.random() * 500) + 300;
      setTimeout(() => {
        let filtered = [...dealsData] as Deal[];

        // Search
        if (options.search) {
          const s = options.search.toLowerCase();
          filtered = filtered.filter(d =>
            d.companyName.toLowerCase().includes(s) ||
            d.description.toLowerCase().includes(s) ||
            d.industry.toLowerCase().includes(s)
          );
        }

        // Industry filter
        if (options.industry && options.industry !== 'All Industries') {
          filtered = filtered.filter(d => d.industry === options.industry);
        }

        // Risk filter
        if (options.riskLevel && options.riskLevel !== 'All Risk Levels') {
          filtered = filtered.filter(d => d.riskLevel === options.riskLevel);
        }

        // ROI range
        if (options.minRoi !== undefined) {
          filtered = filtered.filter(d => d.roi >= options.minRoi!);
        }
        if (options.maxRoi !== undefined) {
          filtered = filtered.filter(d => d.roi <= options.maxRoi!);
        }

        // Funding range
        if (options.minFunding !== undefined) {
          filtered = filtered.filter(d => d.fundingGoal >= options.minFunding!);
        }
        if (options.maxFunding !== undefined) {
          filtered = filtered.filter(d => d.fundingGoal <= options.maxFunding!);
        }

        // Sorting
        if (options.sortBy) {
          filtered.sort((a, b) => {
            const aVal = a[options.sortBy!] as any;
            const bVal = b[options.sortBy!] as any;
            if (options.sortOrder === 'desc') return bVal > aVal ? 1 : -1;
            return aVal > bVal ? 1 : -1;
          });
        }

        // Pagination
        const page = options.page || 1;
        const perPage = options.perPage || 6;
        const total = filtered.length;
        const totalPages = Math.ceil(total / perPage);
        const start = (page - 1) * perPage;
        const deals = filtered.slice(start, start + perPage);

        resolve({ deals, total, page, totalPages });
      }, delay);
    });
  },

  // Simulate error state
  getDealsWithError: async (): Promise<Deal[]> => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Failed to fetch deals. Please try again.'));
      }, 500);
    });
  },
};