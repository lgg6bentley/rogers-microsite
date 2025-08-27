export default function HomePage() {
  return (
    <><nav className="sticky top-0 z-50 bg-white shadow-md text-[#DA291C] px-6 py-4 flex justify-between items-center">
  <span className="text-xl font-bold">Rogers Rebrand</span>
  <ul className="flex gap-6 font-medium">
    <li><a href="#brand-story" className="hover:underline">Brand Story</a></li>
    <li><a href="#design-language" className="hover:underline">Design Language</a></li>
    <li><a href="https://www.youtube.com/watch?v=AxZxAdfL19k" target="_blank" rel="noopener noreferrer" className="hover:underline">Watch Again</a></li>
  </ul>
</nav>

      {/* Hero Section */}
      <main className="min-h-screen bg-[#DA291C] text-white flex flex-col items-center justify-center px-6 py-20">
        <h1 className="text-5xl font-bold mb-4 text-center">
          Reimagining Connectivity
        </h1>
        <p className="text-xl mb-8 text-center max-w-xl">
          A tribute to Rogers’ $34M rebrand—modern, human, and proudly Canadian.
        </p>
        <a
          href="#brand-story"
          className="bg-white text-[#DA291C] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Explore the Rebrand
        </a>
      </main>

      {/* Cinematic Intro Video */}
      <section className="relative w-full h-screen overflow-hidden">
  <iframe
    className="absolute top-0 left-0 w-full h-full"
    src="https://www.youtube.com/embed/AxZxAdfL19k?autoplay=1&mute=1&controls=0&loop=1&playlist=AxZxAdfL19k"
    title="Rogers Cinematic Intro"
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
  ></iframe>

  {/* Overlay Text */}
  <div className="absolute inset-0 flex items-center justify-center z-10 text-white text-4xl font-bold">
    Connected by Design
  </div>

  {/* Watch with Sound Button */}
  <a
    href="https://www.youtube.com/watch?v=AxZxAdfL19k"
    target="_blank"
    rel="noopener noreferrer"
    className="absolute bottom-6 right-6 bg-white text-[#DA291C] px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition z-20"
  >
    Watch with Sound
  </a>
</section>

      {/* Brand Story Section */}
      <section id="brand-story" className="bg-white text-[#1A1A1A] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center text-[#DA291C]">
            The Evolution of a Canadian Icon
          </h2>
          <p className="text-lg mb-12 text-center">
            From humble beginnings in Canadian telecom to a bold new identity, Rogers has redefined what it means to connect.
          </p>

          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-semibold text-[#DA291C]">📡 1960s–2000s</h3>
              <p className="mt-2 text-gray-700">
                Rogers built its foundation as a telecom leader, pioneering cable and wireless services across Canada.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-[#DA291C]">📱 2010s</h3>
              <p className="mt-2 text-gray-700">
                The company expanded into mobile, media, and smart home tech—becoming a household name in digital services.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-[#DA291C]">🔴 2022–2023</h3>
              <p className="mt-2 text-gray-700">
                Rogers invested $34M in a full-scale rebrand, introducing the “Ted” typeface, a simplified logo, and a renewed focus on human connection.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="#design-language"
              className="inline-block bg-[#DA291C] text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition"
            >
              Explore the Design Language
            </a>
          </div>
        </div>
      </section>

      {/* Design Language Section */}
      <section id="design-language" className="scroll-mt-24 bg-white text-[#1A1A1A] py-20 px-6">
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
      {/* Portfolio Section */}
<section id="portfolio" className="bg-[#F5F5F5] text-[#1A1A1A] py-20 px-6">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-[#DA291C] mb-4">Meet the Maker</h2>
    <p className="text-lg mb-6">
      I'm Bentley, a designer and developer based in Mississauga, ON—passionate about brand storytelling, digital craftsmanship, and building experiences that feel intentional.
    </p>
    <a
      href="https://lgg6bentley.github.io/ufc-portfolio/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-[#DA291C] text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition"
    >
      View My Portfolio
    </a>
    <a
      href="https://www.linkedin.com/in/bentley-bond-89b39a375/"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white text-[#DA291C] px-6 py-3 rounded-full font-semibold border border-[#DA291C] hover:bg-gray-100 transition"
    >
      Connect on LinkedIn
    </a>
    </div>
</section>
    </>
  );
}