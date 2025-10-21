import InterestForm from "@/components/InterestForm";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    videos: false,
    form: false,
    about: false,
  });

  const sectionsRef = {
    hero: useRef<HTMLElement>(null),
    videos: useRef<HTMLElement>(null),
    form: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute(
              "data-section"
            ) as keyof typeof isVisible;
            if (sectionName) {
              setIsVisible((prev) => ({ ...prev, [sectionName]: true }));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionsRef).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const videos = [
    {
      id: "l6tsvgJSJ7s",
      title: "Consórcio - Como Funciona",
    },
    {
      id: "E5JldIes7ak",
      title: "Vantagens do Consórcio",
    },
    {
      id: "adv9mw3oJ7Q",
      title: "Investimento em Consórcio",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={sectionsRef.hero}
        data-section="hero"
        className={`min-h-screen flex items-center justify-center px-4 fade-in-up ${
          isVisible.hero ? "visible" : ""
        }`}
      >
        <div className="glass-card rounded-3xl p-12 max-w-4xl w-full text-center">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Karla Helfstein
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-2xl text-gray-700 mb-8">
            Especialista em Vendas de Consórcio
          </p>
          <p className="text-lg text-gray-600 mb-12">
            Aquisição de Imóvel • Veículo • Aumento de Patrimônio
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/5562983136222"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="glass-button flex items-center gap-2">
                <img src="/whatsapp.svg" alt="WhatsApp" className="w-5 h-5 invert" />
                WhatsApp
              </Button>
            </a>
            <a
              href="https://instagram.com/karlahelfstein"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="glass-button flex items-center gap-2">
                <img src="/instagram.svg" alt="Instagram" className="w-5 h-5 invert" />
                Instagram
              </Button>
            </a>
            <a
              href="https://youtube.com/@karlahelfstein8196"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="glass-button flex items-center gap-2">
                <img src="/youtube.svg" alt="YouTube" className="w-5 h-5 invert" />
                YouTube
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Vídeo Aulas Section */}
      <section
        ref={sectionsRef.videos}
        data-section="videos"
        className={`py-20 px-4 fade-in-up ${isVisible.videos ? "visible" : ""}`}
      >
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Vídeo Aulas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="glass-card rounded-2xl p-6">
                <div className="youtube-embed mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h3 className="text-lg font-semibold text-center text-gray-800">
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário Section */}
      <section
        ref={sectionsRef.form}
        data-section="form"
        className={`py-20 px-4 fade-in-up ${isVisible.form ? "visible" : ""}`}
      >
        <div className="container max-w-2xl">
          <div className="glass-card rounded-3xl p-10">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
              Demonstre seu Interesse
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Preencha o formulário abaixo e entraremos em contato
            </p>
            <InterestForm />
          </div>
        </div>
      </section>

      {/* Quem Sou Eu Section */}
      <section
        ref={sectionsRef.about}
        data-section="about"
        className={`py-20 px-4 fade-in-up ${isVisible.about ? "visible" : ""}`}
      >
        <div className="container">
          <div className="glass-card rounded-3xl p-12 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
              Quem Sou Eu
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-lg leading-relaxed mb-6">
                Olá! Sou <strong>Karla Helfstein</strong>, especialista em vendas de consórcio
                com anos de experiência no mercado. Minha missão é ajudar você a realizar
                seus sonhos de forma planejada e segura.
              </p>
              <p className="text-lg leading-relaxed mb-8">
                Com o consórcio, você pode adquirir seu <strong>veículo</strong> ou{" "}
                <strong>imóvel</strong> sem comprometer seu orçamento, além de ser uma
                excelente forma de <strong>investimento</strong> e aumento de patrimônio.
              </p>

              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Por que escolher o consórcio?
              </h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Sem juros, apenas taxa de administração</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Parcelas que cabem no seu bolso</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Possibilidade de antecipação de parcelas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Investimento seguro e regulamentado</span>
                </li>
              </ul>

              <p className="text-lg text-center font-semibold text-gray-800">
                Vamos juntos realizar seus objetivos!
              </p>
            </div>

            {/* Depoimentos */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
                Clientes Satisfeitos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 rounded-xl p-6">
                  <p className="text-gray-700 italic mb-4">
                    "Excelente profissional! Me ajudou a conquistar meu primeiro imóvel
                    de forma planejada e sem comprometer meu orçamento."
                  </p>
                  <p className="font-semibold text-gray-800">- Maria Silva</p>
                </div>
                <div className="bg-white/50 rounded-xl p-6">
                  <p className="text-gray-700 italic mb-4">
                    "Karla é muito atenciosa e explicou todo o processo com clareza.
                    Recomendo!"
                  </p>
                  <p className="font-semibold text-gray-800">- João Santos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-card py-12 px-4 mt-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Atma Corretora de Seguros Ltda.
              </h3>
              <p className="text-gray-700 mb-2">R. Benedito Bueno, Chácara C</p>
              <p className="text-gray-700 mb-2">Vila São Simão</p>
              <p className="text-gray-700">Indiara - GO, 75955-000</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Contato</h3>
              <p className="text-gray-700 mb-2">
                WhatsApp:{" "}
                <a href="https://wa.me/5562983136222" className="text-blue-600 hover:underline">
                  (62) 98313-6222
                </a>
              </p>
              <p className="text-gray-700 mb-4">
                Email:{" "}
                <a href="mailto:karla@atmacorretora.com.br" className="text-blue-600 hover:underline">
                  karla@atmacorretora.com.br
                </a>
              </p>
              <div className="flex gap-4">
                <a
                  href="https://wa.me/5562983136222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                >
                  <img src="/whatsapp.svg" alt="WhatsApp" className="w-6 h-6" />
                </a>
                <a
                  href="https://instagram.com/karlahelfstein"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                >
                  <img src="/instagram.svg" alt="Instagram" className="w-6 h-6" />
                </a>
                <a
                  href="https://youtube.com/@karlahelfstein8196"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                >
                  <img src="/youtube.svg" alt="YouTube" className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-600">
            <p>© 2025 Karla Helfstein - Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
