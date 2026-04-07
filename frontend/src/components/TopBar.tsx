import { motion } from "framer-motion";
import { Home, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  onHome: () => void;
  onRegenerate?: () => void;
  regenerating?: boolean;
  showRegenerate?: boolean;
}

const TopBar = ({ onHome, onRegenerate, regenerating, showRegenerate }: Props) => (
  <motion.div
    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <motion.span
      className="text-lg font-bold text-foreground tracking-tight"
      layoutId="logo-text"
    >
      AutoScribe{" "}
      <span className="bg-gradient-to-r from-nova via-echo to-aegis bg-clip-text text-transparent">
        AI
      </span>
    </motion.span>
    <div className="flex items-center gap-2">
      {showRegenerate && onRegenerate && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRegenerate}
          disabled={regenerating}
          className="gap-2 glass-card-hover rounded-full"
        >
          {regenerating ? <Loader2 size={14} className="animate-spin" /> : <RotateCcw size={14} />}
          Regenerate
        </Button>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={onHome}
        className="gap-2 glass-card-hover rounded-full"
      >
        <Home size={14} /> Home
      </Button>
    </div>
  </motion.div>
);

export default TopBar;
