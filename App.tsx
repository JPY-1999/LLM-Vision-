import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Info, Github } from 'lucide-react';
import { CONTENT_STEPS } from './constants';
import { StageId } from './types';
import StageVisualizer from './components/StageVisualizer';

const App: React.FC = () => {
  const [currentStageId, setCurrentStageId] = useState<StageId>(StageId.INTRO);

  const currentStep = CONTENT_STEPS.find(s => s.id === currentStageId) || CONTENT_STEPS[0];
  const totalSteps = CONTENT_STEPS.length;

  const nextStep = () => {
    if (currentStageId < totalSteps - 1) {
      setCurrentStageId(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStageId > 0) {
      setCurrentStageId(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans selection:bg-blue-500/30">
      
      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20">
             Ai
           </div>
           <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
             LLM Vision Explainer
           </h1>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-400">
           <span className="hidden md:inline">Interactive Learning Module</span>
           <a href="#" className="hover:text-white transition-colors"><Github size={20}/></a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left: Visualization (Dominant) */}
        <div className="flex-1 bg-slate-950 p-4 lg:p-8 relative overflow-hidden flex flex-col">
           <div className="flex-1 relative z-10">
              <StageVisualizer stage={currentStageId} />
           </div>
           
           {/* Mobile Controls (visible only on small screens) */}
           <div className="lg:hidden mt-4 flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
              <button onClick={prevStep} disabled={currentStageId === 0} className="p-2 rounded-full hover:bg-slate-800 disabled:opacity-30"><ChevronLeft/></button>
              <span className="text-sm font-mono text-slate-400">{currentStageId + 1} / {totalSteps}</span>
              <button onClick={nextStep} disabled={currentStageId === totalSteps - 1} className="p-2 rounded-full hover:bg-slate-800 disabled:opacity-30"><ChevronRight/></button>
           </div>
        </div>

        {/* Right: Explanation Sidebar */}
        <div className="w-full lg:w-[450px] bg-slate-900 border-l border-slate-800 flex flex-col z-20 shadow-2xl">
          
          {/* Progress Bar */}
          <div className="h-1 w-full bg-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
              style={{ width: `${((currentStageId + 1) / totalSteps) * 100}%` }}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="mb-6">
               <span className="inline-block px-2 py-1 rounded bg-slate-800 text-blue-400 text-xs font-mono mb-3 border border-slate-700">
                 STEP {currentStageId + 1} OF {totalSteps}
               </span>
               <h2 className="text-2xl font-bold text-slate-100 mb-2">{currentStep.title}</h2>
               <h3 className="text-lg text-purple-400 font-medium mb-6">{currentStep.subtitle}</h3>
               
               <p className="text-slate-300 leading-relaxed mb-6 text-base">
                 {currentStep.description}
               </p>

               <div className="space-y-3">
                 {currentStep.details.map((detail, idx) => (
                   <div key={idx} className="flex gap-3 items-start p-3 rounded bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors">
                      <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-400 leading-snug">{detail}</p>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Desktop Controls */}
          <div className="p-6 border-t border-slate-800 bg-slate-900 hidden lg:flex items-center justify-between gap-4">
             <button 
               onClick={prevStep} 
               disabled={currentStageId === 0}
               className="flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
             >
               <ChevronLeft size={18} />
               <span>Previous</span>
             </button>

             <button 
               onClick={nextStep} 
               disabled={currentStageId === totalSteps - 1}
               className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-700 shadow-lg shadow-blue-500/20 transition-all group"
             >
               <span>{currentStageId === totalSteps - 1 ? "Finish" : "Next Step"}</span>
               <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;
