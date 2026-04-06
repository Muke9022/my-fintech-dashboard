import investorsData from '../data/investors.json';
import { Investor } from '../types';

export const investorService = {
  getInvestors: async (): Promise<Investor[]> => {
    return new Promise((resolve) => {
      const delay = Math.floor(Math.random() * 500) + 300;
      setTimeout(() => {
        resolve(investorsData as Investor[]);
      }, delay);
    });
  },

  getInvestorById: async (id: string): Promise<Investor | undefined> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const investor = investorsData.find((i) => i.id === id);
        if (investor) resolve(investor as Investor);
        else reject(new Error(`Investor ${id} not found`));
      }, 400);
    });
  },
};