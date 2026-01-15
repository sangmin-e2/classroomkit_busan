
import React, { useState } from 'react';
import { ToolType } from './types';
import Home from './components/Home';
import QRGenerator from './components/QRGenerator';
import RandomPicker from './components/RandomPicker';
import Timer from './components/Timer';
import DiceRoller from './components/DiceRoller';
import { Home as HomeIcon } from 'lucide-react';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>(ToolType.HOME);

  const renderTool = () => {
    switch (activeTool) {
      case ToolType.QR_GEN:
        return <QRGenerator />;
      case ToolType.RANDOM_PICKER:
        return <RandomPicker />;
      case ToolType.STOPWATCH:
        return <Timer />;
      case ToolType.DICE:
        return <DiceRoller />;
      default:
        return <Home onSelectTool={setActiveTool} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl relative">
        {activeTool !== ToolType.HOME && (
          <button
            onClick={() => setActiveTool(ToolType.HOME)}
            className="absolute top-0 left-0 flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md hover:bg-indigo-50 transition-all font-semibold z-10"
          >
            <HomeIcon size={20} />
            홈으로
          </button>
        )}
        
        <header className="text-center mb-8 pt-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            {activeTool === ToolType.HOME && "스마트 교실 툴킷"}
          </h1>
        </header>

        <main className="w-full">
          {renderTool()}
        </main>
      </div>
    </div>
  );
};

export default App;
