import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import MeshBackground from "./MeshBackground";

interface Props {
  onSubmit: (file: File | null, text: string) => void;
  loading: boolean;
}

const UploadScreen = ({ onSubmit, loading }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === "application/pdf") setFile(dropped);
  }, []);

  const canSubmit = (file || text.trim()) && !loading;

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MeshBackground />
      <div className="w-full max-w-3xl space-y-8">
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-foreground">Upload Your Source</h2>
          <p className="text-muted-foreground">
            Upload a Technical Document (PDF) or Paste a Transcript to begin.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* PDF Upload Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-2xl border-2 border-dashed p-8 flex flex-col items-center justify-center gap-4 glass-card cursor-pointer transition-all min-h-[220px] ${
              dragOver ? "border-nova bg-nova-bg/30 scale-[1.02]" : file ? "border-nova/50 bg-nova-bg/20" : "border-border hover:border-nova/40"
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("pdf-input")?.click()}
          >
            <input
              id="pdf-input"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            {file ? (
              <>
                <FileText className="text-nova" size={40} />
                <p className="text-sm font-medium text-foreground text-center truncate max-w-full">{file.name}</p>
                <button className="text-xs text-muted-foreground underline" onClick={(e) => { e.stopPropagation(); setFile(null); }}>
                  Remove
                </button>
              </>
            ) : (
              <>
                <Upload className="text-muted-foreground" size={40} />
                <p className="text-sm text-muted-foreground text-center">
                  Drag & drop a PDF here<br />or click to browse
                </p>
              </>
            )}
          </motion.div>

          {/* Text Area Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl glass-card p-6 flex flex-col"
          >
            <label className="text-sm font-medium text-foreground mb-2">Paste Transcript</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your transcript or content here..."
              className="flex-1 min-h-[160px] bg-muted/50 rounded-xl p-4 text-sm resize-none border-0 focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
            />
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            size="lg"
            disabled={!canSubmit}
            onClick={() => onSubmit(file, text)}
            className="px-10 py-6 text-lg font-semibold rounded-full bg-gradient-to-r from-nova to-aegis text-primary-foreground glow-button hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 animate-spin" size={20} />
                Waking up the Factory...
              </>
            ) : (
              "Start Campaign"
            )}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UploadScreen;
