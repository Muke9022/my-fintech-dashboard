// src/utils/scoring.ts



//recommendation engine 
import { Deal } from "../types";

//  Calculate Match Score for a Deal
export const calculateMatchScore = (
  deal: any,
  userInterests: string[]
) => {
  let score = 0;

  // Safe field handling
  const industry = deal.industry || deal.sector;
  const risk = deal.riskLevel || deal.risk;

  //  1. Industry Match
  if (userInterests.includes(industry)) {
    score += 50;
  }

  //  2. ROI
  if (deal.roi > 15) {
    score += 30;
  } else if (deal.roi > 10) {
    score += 15;
  }

  //  3. Risk
  if (risk === "Low") {
    score += 20;
  } else if (risk === "Medium") {
    score += 10;
  }

  return score;
};

//  Get Top Recommended Deals
export const getRecommendedDeals = (
  deals: any[],
  userInterests: string[]
) => {
  return deals
    .map((deal) => ({
      ...deal,
      score: calculateMatchScore(deal, userInterests),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // UI ke liye 3 best
};