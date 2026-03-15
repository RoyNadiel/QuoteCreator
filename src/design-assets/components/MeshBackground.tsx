interface MeshBackgroundProps {
  colors?: {
    blob1: string;
    blob2: string;
    blob3: string;
    blob4: string;
    base: string;
  };
}

export const MeshBackground = ({ colors }: MeshBackgroundProps) => {
  const defaultColors = {
    blob1: "bg-blue-600/30",
    blob2: "bg-purple-600/25",
    blob3: "bg-indigo-800/20",
    blob4: "bg-sky-500/20",
    base: "bg-[#0f172a]",
  };

  const color = colors || defaultColors;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${color.base} transition-colors duration-1000`}
    >
      {/* Blobs de colores animados */}
      <div
        className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full ${color.blob1} blur-[120px] animate-blob transition-colors duration-1000`}
      />
      <div
        className={`absolute top-[20%] right-[-5%] w-[45%] h-[45%] rounded-full ${color.blob2} blur-[120px] animate-blob animation-delay-2000 transition-colors duration-1000`}
      />
      <div
        className={`absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] rounded-full ${color.blob3} blur-[120px] animate-blob animation-delay-4000 transition-colors duration-1000`}
      />
      <div
        className={`absolute top-[40%] left-[30%] w-[35%] h-[35%] rounded-full ${color.blob4} blur-[100px] animate-blob transition-colors duration-1000`}
      />

      {/* Mesh Gradients via CSS */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `
            radial-gradient(at 0% 0%, rgba(255, 255, 255, 0.1) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(255, 255, 255, 0.05) 0px, transparent 50%)
          `,
        }}
      />

      {/* Ruido sutil para textura premium */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
