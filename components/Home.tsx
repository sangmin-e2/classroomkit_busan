
import React from 'react';
import { ToolType } from '../types';
import { QrCode, UserCheck, Timer as TimerIcon, Dices } from 'lucide-react';

interface HomeProps {
  onSelectTool: (tool: ToolType) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectTool }) => {
  const tools = [
    {
      type: ToolType.QR_GEN,
      title: 'QR 생성기',
      description: 'URL을 즉석에서 QR코드로 변환합니다.',
      icon: <QrCode size={48} />,
      color: 'bg-blue-500'
    },
    {
      type: ToolType.RANDOM_PICKER,
      title: '랜덤 뽑기',
      description: '명단에서 무작위로 한 명씩 추첨합니다.',
      icon: <UserCheck size={48} />,
      color: 'bg-emerald-500'
    },
    {
      type: ToolType.STOPWATCH,
      title: '스탑워치',
      description: '1분에서 60분까지 시간 설정 및 알람.',
      icon: <TimerIcon size={48} />,
      color: 'bg-orange-500'
    },
    {
      type: ToolType.DICE,
      title: '주사위 뽑기',
      description: '숫자를 무작위로 정할 수 있는 주사위.',
      icon: <Dices size={48} />,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {tools.map((tool) => (
        <button
          key={tool.type}
          onClick={() => onSelectTool(tool.type)}
          className="group relative bg-white p-8 rounded-3xl shadow-lg border-2 border-transparent hover:border-indigo-400 hover:scale-105 transition-all duration-300 text-left"
        >
          <div className={`${tool.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-6 transition-transform`}>
            {tool.icon}
          </div>
          <h2 className="text-2xl font-bold mb-2">{tool.title}</h2>
          <p className="text-gray-600">{tool.description}</p>
        </button>
      ))}
    </div>
  );
};

export default Home;
