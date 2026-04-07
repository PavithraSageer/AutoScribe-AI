import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AgentAvatar from "./AgentAvatar";
import type { AgentName } from "./AgentAvatar";
import TypingIndicator from "./TypingIndicator";
import MeshBackground from "./MeshBackground";

interface ChatMessage {
  agent: string;
  message: string;
}

interface Props {
  messages: ChatMessage[];
  onComplete: () => void;
}

const agentColors: Record<string, string> = {
  Nova: "hsl(250, 70%, 72%)",
  Echo: "hsl(20, 80%, 75%)",
  Aegis: "hsl(199, 80%, 68%)",
};

const agentBgClass: Record<string, string> = {
  Nova: "bg-nova-bg/40 border-nova/20",
  Echo: "bg-echo-bg/40 border-echo/20",
  Aegis: "bg-aegis-bg/40 border-aegis/20",
};

const ChatRoom = ({ messages, onComplete }: Props) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleCount >= messages.length) {
      setShowTyping(false);
      setTimeout(onComplete, 800);
      return;
    }

    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [visibleCount, messages.length, onComplete]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleCount]);

  const nextAgent = visibleCount < messages.length ? messages[visibleCount].agent : null;

  return (
    <motion.div
      className="min-h-screen flex flex-col relative pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MeshBackground />
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">The Agent Room</h2>
        <div className="space-y-4">
          <AnimatePresence>
            {messages.slice(0, visibleCount).map((msg, i) => (
              <motion.div
                key={i}
                className={`flex gap-3 items-start p-4 rounded-2xl border backdrop-blur-xl ${agentBgClass[msg.agent] || "bg-card/60"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AgentAvatar name={msg.agent as AgentName} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">{msg.agent}</p>
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {showTyping && nextAgent && (
            <motion.div
              className={`flex gap-3 items-center p-3 rounded-2xl border backdrop-blur-xl ${agentBgClass[nextAgent] || "bg-card/60"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AgentAvatar name={nextAgent as AgentName} size="sm" />
              <TypingIndicator color={agentColors[nextAgent] || "#999"} />
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    </motion.div>
  );
};

export default ChatRoom;
