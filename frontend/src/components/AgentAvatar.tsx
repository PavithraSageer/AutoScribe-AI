import { Sparkles, AudioLines, ShieldCheck } from "lucide-react";

const agentConfig = {
  Nova: { icon: Sparkles, colorClass: "bg-nova-bg text-nova" },
  Echo: { icon: AudioLines, colorClass: "bg-echo-bg text-echo" },
  Aegis: { icon: ShieldCheck, colorClass: "bg-aegis-bg text-aegis" },
} as const;

type AgentName = keyof typeof agentConfig;

interface Props {
  name: AgentName;
  size?: "sm" | "md";
}

const AgentAvatar = ({ name, size = "md" }: Props) => {
  const config = agentConfig[name];
  const Icon = config.icon;
  const sizeClass = size === "sm" ? "w-8 h-8" : "w-12 h-12";
  const iconSize = size === "sm" ? 16 : 22;

  return (
    <div className={`${sizeClass} rounded-full flex items-center justify-center ${config.colorClass} shrink-0`}>
      <Icon size={iconSize} />
    </div>
  );
};

export default AgentAvatar;
export { agentConfig };
export type { AgentName };
