import { FC } from "react";

export const BotServiceCard: FC<{
  name: string;
  description: string;
  verified: boolean;
}> = ({ name, description, verified }) => {
  return (
    <div className="border rounded p-4 space-y-2 bg-white shadow">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">{name}</h2>
        {verified && (
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
            Verified ✅
          </span>
        )}
      </div>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
};
