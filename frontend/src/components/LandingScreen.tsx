import { motion } from "framer-motion";
import MeshBackground from "./MeshBackground";
import { Button } from "./ui/button";
import { Sparkles, Share2, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Multi-Agent Intelligence",
    description: "Nova, Echo and Aegis collaborate to research, write, and audit your content.",
    colorClass: "text-nova",
    bgClass: "bg-nova-bg",
  },
  {
    icon: Share2,
    title: "Platform Native Outputs",
    description: "Instantly generate formatted blogs, twitter threads, and email teaser.",
    colorClass: "text-echo",
    bgClass: "bg-echo-bg",
  },
  {
    icon: ShieldCheck,
    title: "Source-Grounded",
    description: "Zero hallucination. Every word is backed by your uploaded technical documents.",
    colorClass: "text-aegis",
    bgClass: "bg-aegis-bg",
  },
];

interface Props {
  onLaunch: () => void;
}

const LandingScreen = ({ onLaunch }: Props) => (
  <motion.div
    className="min-h-screen flex flex-col items-center justify-center relative"
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.5 }}
  >
    <MeshBackground />
    <motion.div
      className="text-center space-y-6 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1
        className="text-6xl md:text-8xl font-extrabold tracking-tight text-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        layoutId="logo-text"
      >
        AutoScribe{" "}
        <span className="bg-gradient-to-r from-nova via-echo to-aegis bg-clip-text text-transparent">
          AI
        </span>
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-muted-foreground font-medium max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        One Source. Infinite Content. Zero Effort.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Button
          size="lg"
          onClick={onLaunch}
          className="mt-4 px-10 py-6 text-lg font-semibold rounded-full bg-gradient-to-r from-nova to-aegis text-primary-foreground glow-button hover:scale-105 transition-transform"
        >
          Launch Dashboard
        </Button>
      </motion.div>
    </motion.div>

    {/* Feature Cards */}
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 mt-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.7 }}
    >
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          className="glass-card rounded-2xl p-6 text-center space-y-3 hover:scale-[1.03] transition-transform"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 + i * 0.15, duration: 0.5 }}
        >
          <div className={`w-12 h-12 mx-auto rounded-xl ${f.bgClass} flex items-center justify-center`}>
            <f.icon size={24} className={f.colorClass} />
          </div>
          <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

export default LandingScreen;
