import { motion } from "framer-motion";
import AgentAvatar from "./AgentAvatar";
import MeshBackground from "./MeshBackground";
import { Loader2 } from "lucide-react";

const agents = [
  { name: "Nova" as const, label: "Nova — Research Agent", desc: "Extracts key facts and data from your source material." },
  { name: "Echo" as const, label: "Echo — Creative Agent", desc: "Transforms facts into compelling narratives and content." },
  { name: "Aegis" as const, label: "Aegis — Editor Agent", desc: "Audits, refines, and perfects the final output." },
];

interface Props {
  apiReady: boolean;
  onComplete: () => void;
}

const AgentIntro = ({ apiReady, onComplete }: Props) => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MeshBackground />
      <div className="flex flex-col items-center gap-10">
        <motion.h2
          className="text-3xl font-bold text-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Meet Your Agents
        </motion.h2>

        <div className="flex flex-col gap-6 w-full max-w-md">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              className="glass-card rounded-2xl p-5 flex items-center gap-4"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3, duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              >
                <AgentAvatar name={agent.name} />
              </motion.div>
              <div>
                <p className="text-base font-semibold text-foreground">{agent.label}</p>
                <p className="text-sm text-muted-foreground">{agent.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex items-center gap-3 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {apiReady ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <button
                onClick={onComplete}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-nova to-aegis text-primary-foreground font-semibold glow-button hover:scale-105 transition-transform"
              >
                Enter the Agent Room →
              </button>
            </motion.div>
          ) : (
            <>
              <Loader2 className="animate-spin text-muted-foreground" size={18} />
              <span className="text-muted-foreground text-sm font-medium">Connecting with agents...</span>
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AgentIntro;
