import Link from 'next/link';

export default function ShopifyPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#FAF7F3] flex flex-col justify-between p-6 sm:p-10 md:p-16 select-none">
      <div>
        <Link
          href="/"
          className="font-mono text-xs tracking-[0.24em] text-[#FAF7F3]/45 hover:text-[#FAF7F3] uppercase transition-colors duration-200"
        >
          ← BACK
        </Link>
      </div>
      <div>
        <span className="font-mono text-xs sm:text-sm tracking-[0.26em] text-[#FAF7F3]/40 uppercase block mb-4">
          SERVICE / 02
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.05em] text-[#FAF7F3] uppercase">
          SHOPIFY STORE DEVELOPMENT
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-xl text-[#FAF7F3]/60 max-w-xl">
          Professional storefronts built around your products and brand.
        </p>
      </div>
      <div className="font-mono text-xs tracking-[0.2em] text-[#FAF7F3]/30 uppercase">
        ©2026 HAMAIL
      </div>
    </main>
  );
}
