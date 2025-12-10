import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StageId } from '../types';
import { Brain, Eye, FileText, ArrowRight, Zap, Database, Layers, ScanFace, MessageSquare } from 'lucide-react';

interface StageVisualizerProps {
  stage: StageId;
}

const IMAGE_URL = "https://picsum.photos/id/237/400/400"; // A dog image usually

const StageVisualizer: React.FC<StageVisualizerProps> = ({ stage }) => {
  // Grid configuration
  const gridSize = 4; // 4x4 grid for simplification (16 patches)
  const totalPatches = gridSize * gridSize;
  const patches = Array.from({ length: totalPatches }, (_, i) => i);

  return (
    <div className="w-full h-full relative flex items-center justify-center bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden shadow-inner p-4">
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]" />
        <div className="grid grid-cols-8 grid-rows-8 w-full h-full opacity-10">
           {Array.from({length: 64}).map((_, i) => (
             <div key={i} className="border-[0.5px] border-slate-500/30"></div>
           ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* STAGE 0: INTRO - Show the full Image */}
        {stage === StageId.INTRO && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <img src={IMAGE_URL} alt="Input" className="relative w-64 h-64 rounded-lg shadow-2xl object-cover border-2 border-slate-600" />
            </div>
            <div className="flex gap-4 text-slate-400">
               <div className="flex flex-col items-center">
                  <div className="bg-slate-800 p-3 rounded-full mb-2"><Eye className="w-6 h-6 text-blue-400"/></div>
                  <span className="text-xs font-mono">Vision Encoder</span>
               </div>
               <ArrowRight className="w-6 h-6 mt-4 text-slate-600" />
               <div className="flex flex-col items-center">
                  <div className="bg-slate-800 p-3 rounded-full mb-2"><Brain className="w-6 h-6 text-green-400"/></div>
                  <span className="text-xs font-mono">LLM</span>
               </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 1: PATCHING - Break Image apart */}
        {stage === StageId.PATCHING && (
          <motion.div
            key="patching"
            className="relative w-80 h-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid grid-cols-4 gap-1 w-full h-full">
              {patches.map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 1, x: 0, y: 0 }}
                  animate={{ 
                    scale: 0.9,
                    x: (i % 4 - 1.5) * 10, // Spread out slightly
                    y: (Math.floor(i / 4) - 1.5) * 10
                  }}
                  className="relative overflow-hidden rounded-sm border border-blue-500/50 bg-slate-800"
                >
                  {/* Simulate background image position for each patch */}
                  <div 
                    className="absolute w-[320px] h-[320px] top-0 left-0"
                    style={{
                      backgroundImage: `url(${IMAGE_URL})`,
                      backgroundSize: '320px 320px',
                      backgroundPosition: `-${(i % 4) * 80}px -${Math.floor(i / 4) * 80}px`
                    }}
                  />
                  <div className="absolute bottom-0 right-0 text-[8px] bg-black/70 text-white px-1 font-mono">
                    P{i+1}
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div 
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{delay: 1}}
              className="absolute -bottom-12 w-full text-center text-blue-300 text-sm font-mono"
            >
              Flatten & Positional Encoding...
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 2: ENCODER/CLIP - Turn to Vectors */}
        {stage === StageId.ENCODER_CLIP && (
          <motion.div
            key="clip"
            className="flex flex-col items-center justify-center w-full h-full gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
             <div className="grid grid-cols-4 gap-2">
              {patches.map((i) => (
                <motion.div
                  key={i}
                  initial={{ width: 64, height: 64, borderRadius: 0, backgroundColor: 'transparent' }}
                  animate={{ 
                    width: 40, 
                    height: 12, 
                    borderRadius: 4,
                    backgroundColor: '#60a5fa' // blue-400
                  }}
                  transition={{ duration: 0.5, delay: i * 0.02 }}
                  className="relative"
                >
                   {/* Abstract vector representation */}
                   <div className="absolute inset-0 flex gap-[2px] opacity-50">
                     <div className="w-[20%] h-full bg-white/30"></div>
                     <div className="w-[50%] h-full bg-white/10"></div>
                     <div className="w-[30%] h-full bg-white/20"></div>
                   </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-4 bg-slate-800/80 p-4 rounded-xl border border-purple-500/30">
               <ScanFace className="text-purple-400 w-8 h-8 animate-pulse" />
               <div className="flex flex-col">
                 <span className="text-purple-300 font-bold text-sm">CLIP Encoder</span>
                 <span className="text-slate-400 text-xs">Extracting Semantic Features...</span>
               </div>
            </div>

            <div className="flex gap-4 text-xs">
              <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/50 flex items-center gap-2">
                 <span>Matched: "Black Dog"</span>
                 <Zap size={12}/>
              </div>
              <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/50">
                 Diff: "Salad"
              </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 3: PROJECTION - Matrix Transform */}
        {stage === StageId.PROJECTION && (
          <motion.div
            key="projection"
            className="flex items-center w-full justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
             {/* Raw Vectors */}
             <div className="flex flex-col gap-1">
                {Array.from({length: 8}).map((_, i) => (
                  <motion.div key={i} className="w-16 h-2 bg-blue-500 rounded-sm opacity-50" />
                ))}
                <span className="text-center text-[10px] text-blue-400 mt-2">ViT Output (1024 dim)</span>
             </div>

             {/* The Matrix/Projector */}
             <div className="relative w-32 h-48 border-2 border-dashed border-pink-500/50 rounded-lg flex items-center justify-center bg-pink-900/10">
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-6 opacity-20">
                    {Array.from({length: 24}).map((_,i) => <div key={i} className="border border-pink-500/30"></div>)}
                </div>
                <div className="text-pink-400 font-mono text-xs font-bold bg-slate-900 px-2 z-10">Projector (MLP)</div>
                <Layers className="absolute text-pink-500 opacity-20 w-16 h-16" />
             </div>

             <ArrowRight className="text-slate-500 animate-pulse" />

             {/* Projected Tokens */}
             <div className="flex flex-col gap-1">
                {Array.from({length: 8}).map((_, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ backgroundColor: '#3b82f6' }}
                    animate={{ backgroundColor: '#ec4899' }}
                    className="w-24 h-3 rounded-sm relative overflow-hidden"
                  >
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
                  </motion.div>
                ))}
                 <span className="text-center text-[10px] text-pink-400 mt-2">LLM Embedding (4096 dim)</span>
             </div>
          </motion.div>
        )}

        {/* STAGE 4: TOKENS - Sequence */}
        {stage === StageId.TOKENS && (
          <motion.div
            key="tokens"
            className="flex flex-col justify-center items-center w-full h-full gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-slate-300 text-sm mb-4">Input Sequence to LLM</div>
            <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
               {/* Visual Tokens */}
               {Array.from({length: 8}).map((_, i) => (
                 <motion.div
                    key={`v-${i}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-10 h-10 rounded bg-pink-600/20 border border-pink-500 flex items-center justify-center relative group cursor-help"
                 >
                    <div className="w-full h-full absolute opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <span className="text-[10px] font-mono text-pink-300">IMG</span>
                    
                    {/* Tooltip for meaning */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-xs px-2 py-1 rounded border border-slate-600 opacity-0 group-hover:opacity-100 whitespace-nowrap z-20 pointer-events-none">
                       Feature: {i % 2 === 0 ? "Fur Texture" : "Ear Shape"}
                    </div>
                 </motion.div>
               ))}
               
               {/* Text Tokens */}
               {['<sep>', '这', '是', '什', '么', '?'].map((char, i) => (
                 <motion.div
                    key={`t-${i}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + (i * 0.1) }}
                    className="w-10 h-10 rounded bg-emerald-600/20 border border-emerald-500 flex items-center justify-center"
                 >
                    <span className="text-sm font-bold text-emerald-300">{char}</span>
                 </motion.div>
               ))}
            </div>
            
            <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700 max-w-lg">
                <p className="text-slate-400 text-xs font-mono text-center">
                   Visual Tokens drift in vector space between concepts like "Dog", "Black", "Animal".
                </p>
            </div>
          </motion.div>
        )}

        {/* STAGE 5: INFERENCE - Brain */}
        {stage === StageId.INFERENCE && (
          <motion.div
            key="inference"
            className="flex flex-col items-center justify-center w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
             <div className="relative mb-8">
                <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse-slow"></div>
                <Brain size={80} className="text-emerald-400 relative z-10" />
                
                {/* Attention Lines */}
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] pointer-events-none opacity-40">
                   <motion.path 
                     d="M150,100 L50,180" 
                     stroke="#ec4899" 
                     strokeWidth="2" 
                     strokeDasharray="5,5"
                     animate={{ strokeDashoffset: [0, -20] }}
                     transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                   />
                    <motion.path 
                     d="M150,100 L250,180" 
                     stroke="#10b981" 
                     strokeWidth="2"
                     animate={{ strokeDashoffset: [0, -20] }}
                     transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                   />
                </svg>
             </div>

             {/* Context Window */}
             <div className="flex gap-2 mb-8 opacity-50">
                <div className="w-20 h-2 bg-pink-500 rounded"></div>
                <div className="w-20 h-2 bg-pink-500 rounded"></div>
                <div className="w-32 h-2 bg-emerald-500 rounded"></div>
             </div>

             {/* Generation */}
             <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl w-full max-w-md shadow-2xl">
                <div className="flex items-start gap-3">
                   <div className="w-8 h-8 rounded-full bg-emerald-600/30 flex items-center justify-center shrink-0">
                      <Zap size={16} className="text-emerald-400"/>
                   </div>
                   <div className="font-mono text-sm leading-relaxed text-emerald-100">
                     <span className="text-slate-500 select-none">AI: </span>
                     <TypewriterText text="这是一只黑色的拉布拉多犬。它正看着镜头，表情看起来很温顺。" />
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper for typewriter effect
const TypewriterText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayed((prev) => text.slice(0, index));
      index++;
      if (index > text.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayed}<span className="animate-pulse inline-block w-1.5 h-4 bg-emerald-400 ml-1 align-middle"></span></span>;
};

export default StageVisualizer;