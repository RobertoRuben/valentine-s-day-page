// app.tsx
import { useState, useEffect } from 'react';
import { 
  Heart, 
  Stars, 
  Music, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Sparkles, 
} from 'lucide-react';

function App() {
  const [photoUrl] = useState('/img/img-san-valentin.jpg');
  const [showMessage, setShowMessage] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [, setShowSparkle] = useState(false);
  const [currentDate] = useState(
    new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  const messages = [
    {
      title: "Hola  :)",
      content:
        "Este es el pequño detalle que tengo, para ti, justo hace un momento lo acabo de desplegar. Espero que te guste, y que pases un buen día. 🌹💝",
    },
    {
      title: "Mi Amor ❤️",
      content:
        "Quizás no sea el mejor día, quizá no sea el mejor San Valentín, es un San Valentín donde no pasamos juntos. Sin embargo, a pesar de la distancia que nos separa, mi corazón se llena de esperanza y anhelo por el momento en el que podamos acortar esa brecha. Cada día que pasa, pienso en el reencuentro que sé que llegará, en el instante en que la ausencia se transforme en un abrazo cálido y reconfortante. 🫂✨",
    },
    {
      title: "... ",
      content:
        "Sé que no necesitamos una fecha especial para demostrar el amor que nos une; cada latido y cada pensamiento me recuerdan lo inmenso que es lo que siento por ti. Aunque hoy no celebremos juntos, cada minuto, cada recuerdo y cada sueño compartido es prueba de la fuerza de nuestro amor. La distancia, aunque a veces parezca insalvable, solo fortalece mi convicción de que lo nuestro es real, duradero y capaz de superar cualquier obstáculo. 💕",
    },
    {
      title: "... ",
      content:
        "A veces, el calendario nos marca un día en el que la ausencia se hace sentir, pero yo elijo ver más allá de los números y centrarme en la promesa de un futuro en el que estemos juntos. Imagino el día en que nuestros caminos se unan sin restricciones, en que cada mirada y cada gesto hablen por sí solos de todo lo que hemos compartido y de lo que aún nos espera. 🌈✨",
    },
    {
      title: "... ",
      content:
        "Te amo profundamente, y quiero que sepas que no hace falta una fecha para recordarte lo mucho que significas para mí. Cada día es una oportunidad para amarte, para pensar en ti y para soñar con ese instante en el que la distancia se disuelva en un abrazo eterno. Hasta entonces, mi amor, mantengo viva la esperanza y la certeza de que nuestro amor trasciende cualquier obstáculo, porque lo que sentimos es tan grande que ni siquiera el tiempo o la separación pueden disminuir su intensidad. 💫",
    },
    {
      title: "Nunca lo olvides ... ",
      content: (
        <div className="space-y-6">
          <p>
            Como te lo digo cuando te tengo frente a mis ojos: no me arrepiento, de nada contigo. Te amo mucho, Ángeles. ¡Que tengas un buen día! 🌹💝
          </p>
          <div className="mt-8">
            <div className="relative w-full max-w-xs aspect-square mx-auto rounded-lg overflow-hidden shadow-xl shadow-red-600/30 group hover:shadow-red-600/50 transition-shadow duration-300">
              <picture>
                <img
                  src={photoUrl}
                  alt="Nuestro amor"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <p className="text-white text-sm">Te amo mucho cachetes ❤️</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSparkle((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audio = document.getElementById('bgMusic') as HTMLAudioElement;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Error auto-playing audio:", error);
      });
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % messages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + messages.length) % messages.length);
  };

  const toggleMusic = () => {
    const audio = document.getElementById('bgMusic') as HTMLAudioElement;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error("Error reproduciendo audio:", error);
        setIsPlaying(false);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex flex-col items-center justify-center overflow-hidden relative">
      <audio id="bgMusic" loop preload="auto">
        <source src="/music/Andres_Calamaro-La_Parte_De_Adelante.mp3" type="audio/mp3" />
      </audio>

      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-red-600/20 text-red-600 hover:bg-red-600/30 transition-colors backdrop-blur-sm group"
      >
        {isPlaying ? (
          <VolumeX className="w-6 h-6 group-hover:scale-110 transition-transform" />
        ) : (
          <Volume2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
        )}
      </button>

      <div className="fixed top-4 left-4 z-50 p-3 rounded-full bg-red-600/20 backdrop-blur-sm">
        <p className="text-red-300 text-sm font-medium">{currentDate}</p>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-red-600/20 animate-float-${i % 3}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 2 + 1}rem`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto p-8 flex-grow">

        <div
          key={currentSlide}
          className={`transform transition-all duration-700 ease-in-out animate-slideIn ${
            showMessage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="bg-black/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-red-600 shadow-2xl shadow-red-600/20 relative overflow-hidden">

            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <Sparkles
                  key={i}
                  className={`absolute text-red-400/30 w-6 h-6 animate-sparkle`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            <div className="flex justify-center mb-6">
              <Heart className="text-red-600 w-16 h-16 animate-pulse animate-glow" />
            </div>

            <div className="relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-red-600/20 text-red-600 hover:bg-red-600/30 transition-colors backdrop-blur-sm hover:scale-110 transform duration-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-red-600/20 text-red-600 hover:bg-red-600/30 transition-colors backdrop-blur-sm hover:scale-110 transform duration-200"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="px-12">
                <h2 className="text-3xl md:text-4xl font-bold gradient-text text-center mb-6">
                  {messages[currentSlide].title}
                </h2>

                <div className="space-y-6 text-gray-100 text-center min-h-[300px]">
                  <div className="text-lg leading-relaxed transition-all duration-500 hover:text-red-200">
                    {messages[currentSlide].content}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {messages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                    currentSlide === index ? 'bg-red-600 animate-glow scale-110' : 'bg-red-600/20'
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-center space-x-4 text-red-600 mt-8">
              <Stars className="w-8 h-8 animate-spin-slow" />
              <Music className="w-8 h-8 animate-bounce animate-glow" />
              <Stars className="w-8 h-8 animate-spin-slow" />
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full bg-black/80 backdrop-blur-sm border-t border-red-600/30 py-4 px-6 mt-8">
        <div className="max-w-3xl mx-auto flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2 text-red-300/70">
            <Heart className="w-4 h-4 animate-pulse" />
            <p className="text-sm">Hecho con amor para ti</p>
            <Heart className="w-4 h-4 animate-pulse" />
          </div>
          <p className="text-red-300/50 text-xs">
            © {new Date().getFullYear()} • Con todo mi amor, para siempre @betooo
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
