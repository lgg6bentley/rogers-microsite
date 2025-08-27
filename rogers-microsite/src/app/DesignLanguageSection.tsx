export default function DesignLanguageSection() {
  return (
    <section id="design-language" className="bg-white text-[#1A1A1A] py-20 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Typography */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#DA291C] mb-4">Typography</h2>
          <p className="text-lg mb-6">
            Rogers’ rebrand introduced the custom “Ted” typeface—modern, geometric, and human.
          </p>
          <div className="space-y-4">
            <p className="text-5xl font-bold tracking-tight font-sans">Headline Example</p>
            <p className="text-xl font-medium font-sans">Subhead Example</p>
            <p className="text-base font-normal font-sans">Body text with clarity and rhythm.</p>
          </div>
        </div>

        {/* Color Palette */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#DA291C] mb-4">Color Palette</h2>
          <p className="text-lg mb-6">
            Rogers Red leads the palette, supported by neutral tones that evoke clarity and warmth.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <div className="w-24 h-24 bg-[#DA291C] rounded-full shadow-md"></div>
            <div className="w-24 h-24 bg-[#F5F5F5] rounded-full shadow-md"></div>
            <div className="w-24 h-24 bg-[#1A1A1A] rounded-full shadow-md"></div>
          </div>
        </div>

        {/* Iconography */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#DA291C] mb-4">Iconography</h2>
          <p className="text-lg mb-6">
            Simple, rounded icons reflect the brand’s human-first approach to technology.
          </p>
          <div className="flex justify-center gap-8 text-[#DA291C] text-4xl">
            <span className="transition-transform hover:scale-110">📶</span>
            <span className="transition-transform hover:scale-110">📱</span>
            <span className="transition-transform hover:scale-110">🔗</span>
            <span className="transition-transform hover:scale-110">💬</span>
          </div>
        </div>
      </div>
    </section>
  );
}