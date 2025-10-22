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
                href="https://instagram.com/karlahelfstein"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="glass-button flex items-center gap-2 px-6 py-6 text-lg">
                  <img src="/instagram.svg" alt="Instagram" className="w-5 h-5 invert" />
                  Instagram
                </Button>
              </a>
              <a
                href="https://youtube.com/@karlahelfstein8196"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="glass-button flex items-center gap-2 px-6 py-6 text-lg">
                  <img src="/youtube.svg" alt="YouTube" className="w-5 h-5 invert" />
                  YouTube
                </Button>
              </a>
            </div>

            {/* CTA Destacado */}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div key={video.id} className="glass-card video-card rounded-2xl p-6 fade-in-up" style={{transitionDelay: `${index * 0.1}s`}}>
                <div className="text-4xl text-center mb-4">{video.icon}</div>
                <a 
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block youtube-embed mb-4 relative group"
                >
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover rounded-xl"
                    loading="eager"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all rounded-xl">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </a>
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
        id="form"
        ref={sectionsRef.form}
        data-section="form"
        className={`py-20 px-4 fade-in-up ${isVisible.form ? "visible" : ""}`}
      >
        <div className="container">
          <div className="glass-card rounded-3xl p-12 max-w-2xl mx-auto">
            <div className="text-5xl text-center mb-6">📋</div>
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">
              Manifeste seu Interesse
            </h2>
            <div className="gradient-divider w-32 mx-auto mb-6"></div>
            <p className="text-center text-gray-300 mb-8 text-lg">
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
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">
              Quem Sou Eu
            </h2>
            <div className="gradient-divider w-32 mx-auto mb-12"></div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
              <div className="order-2 md:order-1">
                <div className="glass-card rounded-2xl p-4 overflow-hidden">
                  <img 
                    src="/karla-about-new.jpg" 
                    alt="Karla Helfstein" 
                    className="w-full h-auto rounded-xl object-cover about-image"
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
              <p className="text-xl text-center font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-xl">
                Se você quer aprender a investir com segurança — está no lugar certo.
              </p>
              </div>
            </div>

            {/* Depoimentos */}
            <div className="mt-16">
              <h3 className="text-3xl font-bold text-center mb-2 text-white">
                ⭐ Clientes Satisfeitos
              </h3>
              <div className="gradient-divider w-24 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="testimonial-card rounded-xl p-8">
                  <div className="text-4xl mb-4">💬</div>
                  <p className="text-gray-100 italic mb-4 text-lg">
                    "Realmente é diferente lidar com alguém que de verdade busca a melhor solução para o cliente."
                  </p>
                  <p className="font-bold text-white text-lg">- Júlio</p>
                </div>
                
                <div className="testimonial-card rounded-xl p-8">
                  <div className="text-4xl mb-4">💬</div>
                  <p className="text-gray-100 italic mb-4 text-lg">
                    "Profissional excepcional! A Karla me ajudou a entender como o consórcio funciona de verdade."
                  </p>
                  <p className="font-bold text-white text-lg">- Daniel Toledo</p>
                  <a href="https://instagram.com/danieltoledomtor" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 mt-2">
                    <img src="/instagram.svg" alt="Instagram" className="w-4 h-4" />
                    @danieltoledomtor
                  </a>
                </div>
                
                <div className="testimonial-card rounded-xl p-8">
                  <div className="text-4xl mb-4">💬</div>
                  <p className="text-gray-100 italic mb-4 text-lg">
                    "Atendimento personalizado e transparente. Recomendo de olhos fechados!"
                  </p>
                  <p className="font-bold text-white text-lg">- Thaynná Britto</p>
                  <a href="https://instagram.com/tatabritto_7" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 mt-2">
                    <img src="/instagram.svg" alt="Instagram" className="w-4 h-4" />
                    @tatabritto_7
                  </a>
                </div>
                
                <div className="testimonial-card rounded-xl p-8">
                  <div className="text-4xl mb-4">💬</div>
                  <p className="text-gray-100 italic mb-4 text-lg">
                    "Conquistei meu primeiro imóvel através do consórcio com a ajuda da Karla. Gratidão!"
                  </p>
                  <p className="font-bold text-white text-lg">- Samuel Ribeiro</p>
                  <a href="https://instagram.com/cassiapba" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 mt-2">
                    <img src="/instagram.svg" alt="Instagram" className="w-4 h-4" />
                    @samuel.ribeiro__1222
                  </a>
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
                <a href="https://wa.me/5562983136222" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                  (62) 98313-6222
                </a>
              </p>
              <p className="text-gray-100 mb-4">
                Email:{" "}
                <a href="mailto:karla@atmaseguros.com.br" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                  karla@atmaseguros.com.br
                </a>
              </p>
              <div className="flex gap-4">
                <a
                  href="https://wa.me/5562983136222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity icon-bounce"
                >
                  <img src="/whatsapp.svg" alt="WhatsApp" className="w-6 h-6" />
                </a>
                <a
                  href="https://instagram.com/karlahelfstein"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity icon-bounce"
                >
                  <img src="/instagram.svg" alt="Instagram" className="w-6 h-6" />
                </a>
                <a
                  href="https://youtube.com/@karlahelfstein8196"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity icon-bounce"
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

