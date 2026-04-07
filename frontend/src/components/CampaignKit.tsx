import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Download, Monitor, Smartphone, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import MeshBackground from "./MeshBackground";
import { toast } from "sonner";

interface FinalContent {
  blog: string;
  social_thread: string | string[];
  email: string;
}

interface Props {
  content: FinalContent;
}

const CampaignKit = ({ content }: Props) => {
  const [view, setView] = useState<"desktop" | "mobile">("desktop");
  const [copied, setCopied] = useState<string | null>(null);

  // Normalize social_thread to always be an array
  const socialPosts: string[] = Array.isArray(content.social_thread)
    ? content.social_thread
    : content.social_thread.split(/\n{2,}/).filter(Boolean);

  const socialText = Array.isArray(content.social_thread)
    ? content.social_thread.join("\n\n")
    : content.social_thread;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied to clipboard!`);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadFullKit = () => {
    const fullText = `=== BLOG ===\n\n${content.blog}\n\n=== SOCIAL THREAD ===\n\n${socialText}\n\n=== EMAIL ===\n\n${content.email}`;
    const blob = new Blob([fullText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "autoscribe-campaign-kit.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Campaign Kit downloaded!");
  };

  const CopyButton = ({ section, label }: { section: string; label: string }) => (
    <Button
      variant="outline"
      size="sm"
      onClick={() => copyToClipboard(section, label)}
      className="gap-2 glass-card-hover rounded-full"
    >
      {copied === label ? <Check size={14} /> : <Copy size={14} />}
      {copied === label ? "Copied!" : "Copy"}
    </Button>
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
    }),
  };

  return (
    <motion.div
      className="min-h-screen relative pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <MeshBackground />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-foreground">Campaign Kit</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center glass-card rounded-full p-1">
              <button
                onClick={() => setView("desktop")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  view === "desktop" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                <Monitor size={14} /> Desktop
              </button>
              <button
                onClick={() => setView("mobile")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  view === "mobile" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                <Smartphone size={14} /> Mobile
              </button>
            </div>
            <Button onClick={downloadFullKit} className="gap-2 rounded-full bg-gradient-to-r from-nova to-aegis text-primary-foreground glow-button">
              <Download size={16} /> Download Full Kit
            </Button>
          </div>
        </motion.div>

        <Tabs defaultValue="blog" className="w-full">
          <TabsList className="w-full grid grid-cols-3 glass-card rounded-xl p-1 h-auto">
            <TabsTrigger value="blog" className="rounded-lg py-2.5 font-semibold data-[state=active]:bg-nova-bg data-[state=active]:text-foreground">
              Blog
            </TabsTrigger>
            <TabsTrigger value="social" className="rounded-lg py-2.5 font-semibold data-[state=active]:bg-echo-bg data-[state=active]:text-foreground">
              Social Thread
            </TabsTrigger>
            <TabsTrigger value="email" className="rounded-lg py-2.5 font-semibold data-[state=active]:bg-aegis-bg data-[state=active]:text-foreground">
              Email
            </TabsTrigger>
          </TabsList>

          {/* Blog */}
          <TabsContent value="blog" className="mt-6">
            <div className="flex justify-end mb-3">
              <CopyButton section={content.blog} label="Blog" />
            </div>
            <motion.div
              className={`glass-card rounded-2xl p-8 prose prose-sm max-w-none transition-all ${
                view === "mobile" ? "max-w-sm mx-auto" : ""
              }`}
              custom={0}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">{content.blog}</div>
            </motion.div>
          </TabsContent>

          {/* Social Thread */}
          <TabsContent value="social" className="mt-6">
            <div className="flex justify-end mb-3">
              <CopyButton section={socialText} label="Social Thread" />
            </div>
            {view === "mobile" ? (
              <div className="flex justify-center">
                <div className="relative w-[320px]">
                  <div className="rounded-[2.5rem] border-[6px] border-foreground/10 bg-card shadow-2xl overflow-hidden">
                    <div className="h-6 bg-foreground/5 flex items-center justify-center">
                      <div className="w-20 h-3 bg-foreground/10 rounded-full" />
                    </div>
                    <div className="p-3 max-h-[500px] overflow-y-auto space-y-3">
                      {socialPosts.map((post, i) => (
                        <motion.div
                          key={i}
                          className="glass-card rounded-xl p-3"
                          custom={i}
                          initial="hidden"
                          animate="visible"
                          variants={cardVariants}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-echo-bg flex items-center justify-center">
                              <span className="text-[10px] font-bold text-echo">AS</span>
                            </div>
                            <span className="text-xs font-semibold text-foreground">AutoScribe AI</span>
                            <span className="text-[10px] text-muted-foreground">· {i + 1}/{socialPosts.length}</span>
                          </div>
                          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{post.trim()}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {socialPosts.map((post, i) => (
                  <motion.div
                    key={i}
                    className="glass-card rounded-2xl p-6"
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-echo-bg flex items-center justify-center">
                        <span className="text-xs font-bold text-echo">AS</span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">AutoScribe AI</span>
                      <span className="text-xs text-muted-foreground">· Post {i + 1} of {socialPosts.length}</span>
                    </div>
                    <p className="text-foreground leading-relaxed whitespace-pre-wrap">{post.trim()}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Email */}
          <TabsContent value="email" className="mt-6">
            <div className="flex justify-end mb-3">
              <CopyButton section={content.email} label="Email" />
            </div>
            <motion.div
              className={`glass-card rounded-2xl p-8 transition-all ${
                view === "mobile" ? "max-w-sm mx-auto" : ""
              }`}
              custom={0}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">{content.email}</div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default CampaignKit;
