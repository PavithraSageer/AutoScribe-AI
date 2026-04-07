const MeshBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
    <div className="mesh-blob absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-nova/10 blur-3xl" />
    <div className="mesh-blob-2 absolute -top-1/4 right-0 w-[50vw] h-[50vw] rounded-full bg-echo/10 blur-3xl" />
    <div className="mesh-blob-3 absolute bottom-0 left-1/4 w-[55vw] h-[55vw] rounded-full bg-aegis/10 blur-3xl" />
    <div className="mesh-blob absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-3xl" style={{ animationDelay: '-3s' }} />
  </div>
);

export default MeshBackground;
