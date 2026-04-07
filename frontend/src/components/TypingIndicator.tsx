interface Props {
  color: string;
}

const TypingIndicator = ({ color }: Props) => (
  <div className="flex items-center gap-1 px-4 py-3">
    <div className="typing-dot" style={{ backgroundColor: color }} />
    <div className="typing-dot" style={{ backgroundColor: color }} />
    <div className="typing-dot" style={{ backgroundColor: color }} />
  </div>
);

export default TypingIndicator;
