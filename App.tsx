
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stage } from './types';
import FloatingHearts from './components/FloatingHearts';

const App: React.FC = () => {
  const [stage, setStage] = useState<Stage>(Stage.INTRO);
  const [showAngryCat, setShowAngryCat] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [questionIndex, setQuestionIndex] = useState(0);

  // Configuration for the sweet questions stage
  const questions = [
    { text: "Do you know you have the most beautiful smile?", img: "https://picsum.photos/seed/cat1/400/400" },
    { text: "Do you know I think about you every single day?", img: "https://picsum.photos/seed/cat2/400/400" },
    { text: "Do you know you're the best thing that ever happened to me?", img: "https://picsum.photos/seed/cat3/400/400" }
  ];

  const handleNoClickIntro = () => {
    setShowAngryCat(true);
    setTimeout(() => setShowAngryCat(false), 3000);
  };

  const moveNoButton = useCallback(() => {
    const newX = Math.random() * 200 - 100;
    const newY = Math.random() * 200 - 100;
    setNoButtonPos({ x: newX, y: newY });
  }, []);

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else {
      setStage(Stage.FINAL);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-pink-100 to-red-100">
      <FloatingHearts />
      
      <AnimatePresence mode="wait">
        {/* Stage 1: Intro */}
        {stage === Stage.INTRO && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="z-10 bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border border-pink-200"
          >
            <img 
              src={showAngryCat ? "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMThpYXF4Nnl0eG9pZXZsNXN3ZzZwdnk0NmFkZHVrdjUybHhpYmtyYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YJ85eVpdZleBq/giphy.gif" : "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW40amR5Nm9ncnUydXNqNWx1Mnc4OHI1N2VpYnZsdmxzMnlidXZkOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Vz96yQy3Q3w4/giphy.gif"} 
              alt="Cat" 
              className="w-48 h-48 mx-auto rounded-xl mb-6 object-cover shadow-lg border-4 border-pink-300"
            />
            <h1 className="text-3xl font-bold text-pink-600 mb-8">Ready for a small surprise?</h1>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setStage(Stage.GIFT)}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-10 rounded-full transition-all transform hover:scale-110 shadow-lg"
              >
                YES!
              </button>
              <button
                onClick={handleNoClickIntro}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-10 rounded-full transition-all transform hover:scale-95"
              >
                No
              </button>
            </div>
            {showAngryCat && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-red-500 font-bold"
              >
                HOW DARE YOU CLICK NO! 😾
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Stage 2: Gift Box */}
        {stage === Stage.GIFT && (
          <motion.div
            key="gift"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="z-10 bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border border-pink-200"
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-9xl mb-8 cursor-pointer"
              onClick={() => setStage(Stage.LOVE_ME)}
            >
              🎁
            </motion.div>
            <h1 className="text-3xl font-bold text-pink-600 mb-4">You found it!</h1>
            <p className="text-slate-600 mb-8">Click the gift box to open it...</p>
            <button
              onClick={() => setStage(Stage.LOVE_ME)}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-10 rounded-full transition-all transform hover:scale-110 shadow-lg"
            >
              Open!
            </button>
          </motion.div>
        )}

        {/* Stage 3: Love Me Question (Runaway Button) */}
        {stage === Stage.LOVE_ME && (
          <motion.div
            key="loveme"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="z-10 bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border border-pink-200"
          >
            <img 
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXhicXR0bmF6cmV6bzhsc25kY3RlbzBpcmg4bHljczIzaWZtNHA4eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbM3vuzY2qEwuk/giphy.gif" 
              alt="Cute Cat" 
              className="w-48 h-48 mx-auto rounded-xl mb-6 object-cover shadow-lg border-4 border-pink-300"
            />
            <h1 className="text-3xl font-bold text-pink-600 mb-8">Do you love me? 🥺</h1>
            <div className="flex justify-center gap-6 relative h-20 items-center">
              <button
                onClick={() => setStage(Stage.SWEET_QUESTIONS)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-10 rounded-full transition-all transform hover:scale-110 shadow-lg z-20"
              >
                Yes!
              </button>
              <motion.button
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                className="bg-red-500 text-white font-bold py-3 px-10 rounded-full shadow-lg z-10"
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Stage 4: Sweet Questions */}
        {stage === Stage.SWEET_QUESTIONS && (
          <motion.div
            key={`question-${questionIndex}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="z-10 bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full border border-pink-200"
          >
            <img 
              src={questions[questionIndex].img} 
              alt="Sweetness" 
              className="w-full h-64 object-cover rounded-2xl mb-6 shadow-md border-2 border-pink-100"
            />
            <h2 className="text-2xl font-semibold text-pink-700 mb-8 italic">
              {questions[questionIndex].text}
            </h2>
            <div className="flex justify-center gap-6">
              <button
                onClick={nextQuestion}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-12 rounded-full transition-all transform hover:scale-110 shadow-lg"
              >
                {questionIndex === questions.length - 1 ? "Finish ❤️" : "I know! 🥰"}
              </button>
            </div>
          </motion.div>
        )}

        {/* Stage 5: Final Love Letter */}
        {stage === Stage.FINAL && (
          <motion.div
            key="final"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 bg-white/90 backdrop-blur-lg p-8 md:p-12 rounded-[40px] shadow-2xl text-center max-w-2xl w-full border-4 border-pink-400 relative"
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white p-3 rounded-full shadow-lg border-4 border-pink-400">
               <span className="text-5xl">💖</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-dancing font-bold text-red-600 mb-8">
              Happy Anniversary My Love!
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <motion.img
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  src={`https://picsum.photos/seed/love${i}/200/200`}
                  className="w-full aspect-square object-cover rounded-xl shadow-sm hover:scale-105 transition-transform"
                />
              ))}
            </div>

            <div className="prose prose-pink text-slate-700 text-lg md:text-xl leading-relaxed font-medium">
              <p className="mb-4">
                "Every day with you feels like a beautiful dream. You fill my life with so much laughter, warmth, and light. I am the luckiest person to have you by my side."
              </p>
              <p className="font-dancing text-3xl text-pink-600 mt-6">
                I love you forever and always.
              </p>
              <p className="mt-2">— Your Favorite Human ❤️</p>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="bg-red-100 p-4 rounded-2xl flex items-center gap-3 border border-red-200"
              >
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                   🎵
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-red-400 uppercase">Now Playing</p>
                  <p className="text-sm font-bold text-slate-800">Our Favorite Song</p>
                </div>
              </motion.div>
            </div>
            
            <button
              onClick={() => setStage(Stage.INTRO)}
              className="mt-8 text-pink-400 hover:text-pink-600 underline text-sm font-medium"
            >
              See it again? ✨
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
