// Cursor.tsx
// Main dot: 32 px.  Accent dots: 16 px, offset –12 px.

export default function Cursor() {
  return (
    <div className="relative w-10 h-10 pointer-events-none opacity-30">
      {/* main dot */}
      <div className="absolute inset-0 rounded-full bg-black " />

      {/* bottom‑left accent dot */}
      <div className="absolute -bottom-3 -left-5 w-4 h-4 rounded-full bg-[#586183]" />

      {/* bottom‑right accent dot */}
      <div className="absolute -bottom-3 -right-5 w-4 h-4 rounded-full bg-[#C01C1C]" />
    </div>
  );
}
