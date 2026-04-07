import { useState, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import LandingScreen from "@/components/LandingScreen";
import UploadScreen from "@/components/UploadScreen";
import AgentIntro from "@/components/AgentIntro";
import ChatRoom from "@/components/ChatRoom";
import CampaignKit from "@/components/CampaignKit";
import TopBar from "@/components/TopBar";

type Screen = "landing" | "upload" | "intro" | "chat" | "result";

interface ChatMessage {
  agent: string;
  message: string;
}

interface FinalContent {
  blog: string;
  social_thread: string | string[];
  email: string;
}

interface ApiResponse {
  chat: ChatMessage[];
  fact_sheet: string;
  final_content: FinalContent;
}

const API_URL = "https://autoscribe-ai-1-qlub.onrender.com/autoscribe";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("landing");
  const [loading, setLoading] = useState(false);
  const [apiReady, setApiReady] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [finalContent, setFinalContent] = useState<FinalContent | null>(null);
  const lastInputRef = useRef<{ file: File | null; text: string }>({ file: null, text: "" });

  const callApi = useCallback(async (file: File | null, text: string) => {
    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("text_input", text || "");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000);

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return (await response.json()) as ApiResponse;
  }, []);

  const handleSubmit = useCallback(async (file: File | null, text: string) => {
    setLoading(true);
    setApiReady(false);
    lastInputRef.current = { file, text };
    setScreen("intro");

    try {
      const data = await callApi(file, text);
      setChatMessages(data.chat || []);
      setFinalContent(data.final_content || { blog: "", social_thread: "", email: "" });
      setApiReady(true);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        toast.error("Connection timed out. The server may be sleeping — please try again.");
      } else {
        toast.error("Connection Error. Please try again in a moment.");
      }
      console.error(err);
      setScreen("upload");
    } finally {
      setLoading(false);
    }
  }, [callApi]);

  const handleRegenerate = useCallback(async () => {
    setRegenerating(true);
    setApiReady(false);
    setScreen("intro");

    try {
      const { file, text } = lastInputRef.current;
      const data = await callApi(file, text);
      setChatMessages(data.chat || []);
      setFinalContent(data.final_content || { blog: "", social_thread: "", email: "" });
      setApiReady(true);
      toast.success("Content regenerated!");
    } catch {
      toast.error("Regeneration failed. Please try again.");
      setScreen("result");
    } finally {
      setRegenerating(false);
    }
  }, [callApi]);

  const handleHome = useCallback(() => {
    setScreen("landing");
    setChatMessages([]);
    setFinalContent(null);
    setApiReady(false);
    lastInputRef.current = { file: null, text: "" };
  }, []);

  const showTopBar = screen !== "landing";

  return (
    <>
      {showTopBar && (
        <TopBar
          onHome={handleHome}
          onRegenerate={handleRegenerate}
          regenerating={regenerating}
          showRegenerate={screen === "result"}
        />
      )}
      <AnimatePresence mode="wait">
        {screen === "landing" && (
          <LandingScreen key="landing" onLaunch={() => setScreen("upload")} />
        )}
        {screen === "upload" && (
          <UploadScreen key="upload" onSubmit={handleSubmit} loading={loading} />
        )}
        {screen === "intro" && (
          <AgentIntro key="intro" apiReady={apiReady} onComplete={() => setScreen("chat")} />
        )}
        {screen === "chat" && (
          <ChatRoom
            key="chat"
            messages={chatMessages}
            onComplete={() => setScreen("result")}
          />
        )}
        {screen === "result" && finalContent && (
          <CampaignKit key="result" content={finalContent} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
