import { FC } from "react";

interface Props {
  badge?: "verified" | "fair" | "trusted";
}

export const Badge: FC<Props> = ({ badge }) => {
  if (!badge) return null;

  const styles = {
    verified: { emoji: "✅", color: "#00b894", label: "Verified" },
    fair: { emoji: "⚖️", color: "#fdcb6e", label: "Fair" },
    trusted: { emoji: "🔒", color: "#0984e3", label: "Trusted" },
  };

  const { emoji, color, label } = styles[badge];

  return (
    <span
      style={{
        marginLeft: "0.5rem",
        padding: "0.25rem 0.5rem",
        backgroundColor: color,
        color: "#fff",
        borderRadius: "4px",
        fontSize: "0.75rem",
      }}
    >
      {emoji} {label}
    </span>
  );
};
