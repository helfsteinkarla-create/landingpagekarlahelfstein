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
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="glass-card rounded-3xl p-12 text-center md:text-left">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Karla Helfstein
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 md:mx-0 mx-auto mb-6"></div>
          <p className="text-2xl text-gray-100 mb-8">
            Especialista em Consórcio
          </p>
          <p className="text-lg text-gray-300 mb-12">
            Investimento • Imóveis • Veículo • Cartas Contempladas
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
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
          
          <div className="hidden md:block">
            <div className="glass-card rounded-3xl p-4 overflow-hidden">
              <img 
                src="/karla-hero.jpg" 
                alt="Karla Helfstein" 
                className="w-full h-auto rounded-2xl object-cover shadow-2xl"
              />
            </div>
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
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Vídeos
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
                <h3 className="text-lg font-semibold text-center text-white">
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário de Interesse Section */}
      <section
        ref={sectionsRef.form}
        data-section="form"
        className={`py-20 px-4 fade-in-up ${isVisible.form ? "visible" : ""}`}
      >
        <div className="container">
          <div className="glass-card rounded-3xl p-12 max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">
              Manifeste seu Interesse
            </h2>
            <p className="text-center text-gray-300 mb-8">
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
          <div className="glass-card rounded-3xl p-12 max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              Quem Sou Eu
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
              <div className="order-2 md:order-1">
                <div className="glass-card rounded-2xl p-4 overflow-hidden">
                  <img 
                    src="/karla-about.jpg" 
                    alt="Karla Helfstein" 
                    className="w-full h-auto rounded-xl object-cover shadow-xl"
                  />
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none text-gray-100 order-1 md:order-2">
              <p className="text-lg leading-relaxed mb-6">
                Eu sou <strong>Karla Helfstein</strong>, empresária, vendedora, mãe da Marina, esposa e líder que acredita que sucesso se constrói com verdade.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Depois de mais de 10 anos ajudando milhares de pessoas a proteger o que conquistaram, encontrei no consórcio uma forma real e acessível de gerar prosperidade — sem promessas vazias.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Vou te ensinar as estratégias que eu também utilizo com o consórcio.
              </p>
              <p className="text-lg leading-relaxed mb-8">
                Hoje, ensino minha equipe e clientes a enxergarem o consórcio como o que ele realmente é: uma estratégia inteligente de investimento e realização.
              </p>
              <p className="text-lg text-center font-semibold text-white">
                Se você quer aprender a investir com segurança — está no lugar certo.
              </p>
              </div>
            </div>

            {/* Depoimentos */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-8 text-white">
                Clientes Satisfeitos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 rounded-xl p-6">
                  <p className="text-gray-100 italic mb-4">
                    "Realmente é diferente lidar com alguém que de verdade busca a melhor solução para o cliente."
                  </p>
                  <p className="font-semibold text-white">- Júlio</p>
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
              <h3 className="text-xl font-bold mb-4 text-white">
                ATMA CORRETORA DE SEGUROS
              </h3>
              <p className="text-gray-100 mb-2">CNPJ: 18.965.818/0001-04</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Contato</h3>
              <p className="text-gray-100 mb-2">
                WhatsApp:{" "}
                <a href="https://wa.me/5562983136222" className="text-blue-600 hover:underline">
                  (62) 98313-6222
                </a>
              </p>
              <p className="text-gray-100 mb-4">
                Email:{" "}
                <a href="mailto:karla@atmaseguros.com.br" className="text-blue-600 hover:underline">
                  karla@atmaseguros.com.br
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
          <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-300">
            <p>© 2025 Karla Helfstein - Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
