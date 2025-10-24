import { getUserStats } from '@/lib-wkt3/analyticsEngine/userStats';
import { getGameStats } from '@/lib-wkt3/analyticsEngine/gameStats';
import { getSpendingStats } from '@/lib-wkt3/analyticsEngine/spendingStats';

export function getAnalytics() {
  const userStats = getUserStats();
  const gameStats = getGameStats();
  const spendingStats = getSpendingStats();

  return { userStats, gameStats, spendingStats };
}