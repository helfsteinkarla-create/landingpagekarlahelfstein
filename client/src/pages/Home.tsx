import { useEffect, useRef, useState } from "react";
import InterestForm from "../components/InterestForm";
import YouTubeVideo from "../components/YouTubeVideo";

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
            const section = entry.target.getAttribute("data-section");
            if (section) {
              setIsVisible((prev) => ({ ...prev, [section]: true }));
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
      icon: "📚",
      thumbnail: "/video1-thumb.jpg"
    },
    {
      id: "E5JldIes7ak",
      title: "Vantagens do Consórcio",
      icon: "💎",
      thumbnail: "/video2-thumb.jpg"
    },
    {
      id: "adv9mw3oJ7Q",
      title: "Investimento em Consórcio",
      icon: "📈",
      thumbnail: "/video3-thumb.jpg"
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
        <div className="container max-w-2xl mx-auto relative">
          {/* Foto circular no topo com animação */}
          <div className="flex justify-center mb-8">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500/30 profile-photo">
              <img 
                src="/karla-face-circle.png" 
                alt="Karla Helfstein" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="glass-card rounded-3xl p-12 text-center">
            <h1 className="text-6xl font-bold mb-4 gradient-text">
              Karla Helfstein
            </h1>
            <div className="gradient-divider w-32 mx-auto mb-6"></div>
            <p className="text-2xl text-gray-100 mb-8 font-semibold">
              Especialista em Consórcio
            </p>
            <p className="text-lg text-gray-300 mb-12">
              Investimento • Imóveis • Veículo • Cartas Contempladas
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <a
                href="https://wa.me/5562983136222"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="glass-button flex items-center gap-2 px-6 py-6 text-lg">
                  <img src="/whatsapp.svg" alt="WhatsApp" className="w-5 h-5 invert" />
                  WhatsApp
                </Button>
              </a>
              <a
                href="https://www.instagram.com/karlahelfstein/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="glass-button flex items-center gap-2 px-6 py-6 text-lg">
                  <img src="/instagram.svg" alt="Instagram" className="w-5 h-5 invert" />
                  Instagram
                </Button>
              </a>
              <a
                href="https://www.youtube.com/@KarlaHelfstein"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="glass-button flex items-center gap-2 px-6 py-6 text-lg">
                  <img src="/youtube.svg" alt="YouTube" className="w-5 h-5 invert" />
                  YouTube
                </Button>
              </a>
            </div>

            <div className="mt-8">
              <a
                href="#form"
                onClick={(e) => {
                  e.preventDefault();
                  sectionsRef.form.current?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Button className="cta-button px-8 py-6 text-lg font-semibold rounded-full">
                  ✨ Quero Investir com Segurança
                </Button>
              </a>
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
          <h2 className="text-5xl font-bold text-center mb-4 gradient-text">
            Vídeos
          </h2>
          <div className="gradient-divider w-24 mx-auto mb-12"></div>
          
          {/* Grid de Vídeos */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {videos.map((video, index) => (
              <div
                key={video.id}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <YouTubeVideo
                  videoId={video.id}
                  title={video.title}
                  icon={video.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário de Interesse */}
      <section
        ref={sectionsRef.form}
        data-section="form"
        id="form"
        className={`py-20 px-4 fade-in-up ${isVisible.form ? "visible" : ""}`}
      >
        <div className="container max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-5xl font-bold mb-4 gradient-text">
              Manifeste seu Interesse
            </h2>
            <div className="gradient-divider w-24 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300">
              Preencha o formulário abaixo e entraremos em contato
            </p>
          </div>
          <InterestForm />
        </div>
      </section>

      {/* Quem Sou Eu Section */}
      <section
        ref={sectionsRef.about}
        data-section="about"
        className={`py-20 px-4 fade-in-up ${isVisible.about ? "visible" : ""}`}
      >
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 gradient-text">
            Quem Sou Eu
          </h2>
          <div className="gradient-divider w-24 mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Eu sou <strong className="text-white">Karla Helfstein</strong>, empresária, vendedora, mãe da Marina, esposa e líder que acredita que sucesso se constrói com verdade.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Depois de mais de 10 anos ajudando milhares de pessoas a proteger o que conquistaram, encontrei no consórcio uma forma real e acessível de gerar prosperidade — sem promessas vazias.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Vou te ensinar as estratégias que eu também utilizo com o consórcio.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Hoje, ensino minha equipe e clientes a enxergarem o consórcio como o que ele realmente é: uma estratégia inteligente de investimento e realização.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mt-6">
                Se você quer aprender a investir com segurança — está no lugar certo.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105">
                <img
                  src="/karla-about-new.jpg"
                  alt="Karla Helfstein"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Depoimentos */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-center mb-8 gradient-text">
              ⭐ Clientes Satisfeitos
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card rounded-xl p-6 hover:scale-105 transition-transform">
                <div className="text-3xl mb-3">💬</div>
                <p className="text-gray-300 mb-4 italic">
                  "Realmente é diferente lidar com alguém que de verdade busca a melhor solução para o cliente."
                </p>
                <p className="text-white font-semibold">- Júlio</p>
              </div>
              <div className="glass-card rounded-xl p-6 hover:scale-105 transition-transform">
                <div className="text-3xl mb-3">💬</div>
                <p className="text-gray-300 mb-4 italic">
                  "Profissional excepcional! A Karla me ajudou a entender como o consórcio funciona de verdade."
                </p>
                <p className="text-white font-semibold">- Daniel Toledo</p>
                <a href="https://instagram.com/danieltoledomtor" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                  @danieltoledomtor
                </a>
              </div>
              <div className="glass-card rounded-xl p-6 hover:scale-105 transition-transform">
                <div className="text-3xl mb-3">💬</div>
                <p className="text-gray-300 mb-4 italic">
                  "Atendimento personalizado e transparente. Recomendo de olhos fechados!"
                </p>
                <p className="text-white font-semibold">- Thaynná Britto</p>
                <a href="https://instagram.com/tatabritto_7" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                  @tatabritto_7
                </a>
              </div>
              <div className="glass-card rounded-xl p-6 hover:scale-105 transition-transform">
                <div className="text-3xl mb-3">💬</div>
                <p className="text-gray-300 mb-4 italic">
                  "Conquistei meu primeiro imóvel através do consórcio com a ajuda da Karla. Gratidão!"
                </p>
                <p className="text-white font-semibold">- Samuel Ribeiro</p>
                <a href="https://instagram.com/samuel.ribeiro__1222" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                  @samuel.ribeiro__1222
                </a>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="mt-16 text-center">
            <div className="glass-card rounded-2xl p-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
              <h3 className="text-3xl font-bold mb-4 text-white">
                Pronto para Investir com Segurança?
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Entre em contato e descubra como o consórcio pode transformar seus planos em realidade.
              </p>
              <a
                href="https://wa.me/5562983136222"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="cta-button px-8 py-6 text-lg font-semibold rounded-full">
                  💬 Falar com Karla no WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">ATMA CORRETORA DE SEGUROS</h3>
              <p className="text-gray-400">CNPJ: 19.465.916/0001-41</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Contato</h3>
              <p className="text-gray-400">
                WhatsApp:{" "}
                <a href="https://wa.me/5562983136222" className="text-blue-400 hover:text-blue-300">
                  (62) 98313-6222
                </a>
              </p>
              <p className="text-gray-400">
                Email:{" "}
                <a href="mailto:karlahelfstein@gmail.com" className="text-blue-400 hover:text-blue-300">
                  karlahelfstein@gmail.com
                </a>
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>© 2025 Karla Helfstein • Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

