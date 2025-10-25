import { BotStatus } from "@/types/Bot";

export function matchBotToUser(
  bot: BotStatus,
  user: { interests: string[]; fairness: string }
): boolean {
  const sharedInterests = bot.personality?.interests?.filter((i) =>
    user.interests.includes(i)
  );

  const trustMatch = bot.personality?.trustLevel === user.fairness;

  return (sharedInterests?.length ?? 0) > 0 && trustMatch;
}
