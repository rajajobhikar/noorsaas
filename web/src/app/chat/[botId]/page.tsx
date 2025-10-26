import ChatClient from "@/components/ChatClient";

export default function ChatPage({ params }: { params: { botId: string } }) {
  return <ChatClient botId={params.botId} />;
}
