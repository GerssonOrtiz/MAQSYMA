import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administración | MAQSYMA ESAB",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-grafito)] text-[var(--color-plata)] flex flex-col font-['Inter',sans-serif]">
      {children}
    </div>
  );
}
