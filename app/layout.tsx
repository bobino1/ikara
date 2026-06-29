// Root layout je len priechodný — <html> dodáva buď app/[locale]/layout.tsx
// (lokalizované stránky) alebo app/studio/[[...tool]]/layout.tsx (admin).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
