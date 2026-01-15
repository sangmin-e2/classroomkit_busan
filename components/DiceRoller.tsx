
import React, { useState } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, PlayCircle } from 'lucide-react';

const DiceRoller: React.FC = () => {
  const [value, setValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    let count = 0;
    const maxRolls = 10;
    
    const interval = setInterval(() => {
      setValue(Math.floor(Math.random() * 6) + 1);
      count++;
      
      if (count >= maxRolls) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 100);
  };

  const getDiceIcon = (num: number) => {
    const props = { size: 140, strokeWidth: 1.5, className: "text-purple-600" };
    switch (num) {
      case 1: return <Dice1 {...props} />;
      case 2: return <Dice2 {...props} />;
      case 3: return <Dice3 {...props} />;
      case 4: return <Dice4 {...props} />;
      case 5: return <Dice5 {...props} />;
      case 6: return <Dice6 {...props} />;
      default: return <Dice1 {...props} />;
    }
  };

  return (
    <div className="bg-white p-12 rounded-3xl shadow-xl flex flex-col items-center min-h-[500px] justify-center">
      <h2 className="text-3xl font-bold mb-12 text-purple-700">주사위 굴리기</h2>

      <div className={`relative mb-16 transform transition-all duration-300 ${isRolling ? 'rotate-12 scale-110' : ''}`}>
        <div className={`bg-purple-50 p-10 rounded-[3rem] shadow-inner border-4 border-purple-100 transition-all ${isRolling ? 'animate-bounce' : ''}`}>
          {getDiceIcon(value)}
        </div>
        
        {/* Decorative shadows */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-gray-200 blur-xl rounded-full opacity-50"></div>
      </div>

      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        <button
          onClick={rollDice}
          disabled={isRolling}
          className="group w-full bg-purple-600 text-white py-6 rounded-3xl font-black text-2xl hover:bg-purple-700 disabled:bg-purple-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-4"
        >
          <PlayCircle size={32} className={isRolling ? 'animate-spin' : 'group-hover:rotate-90 transition-transform'} />
          {isRolling ? "데굴 데굴..." : "주사위 던지기!"}
        </button>
        
        <p className="text-gray-400 font-medium">던지고 싶은 만큼 마음껏 던져보세요!</p>
      </div>

      <div className="mt-12 flex gap-4 opacity-30">
        <Dice1 size={32} />
        <Dice2 size={32} />
        <Dice3 size={32} />
        <Dice4 size={32} />
        <Dice5 size={32} />
        <Dice6 size={32} />
      </div>
    </div>
  );
};

export default DiceRoller;
