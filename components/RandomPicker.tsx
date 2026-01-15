
import React, { useState, useMemo } from 'react';
import { UserPlus, RefreshCw, Trophy, Trash2 } from 'lucide-react';

const RandomPicker: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [names, setNames] = useState<string[]>([]);
  const [remainingNames, setRemainingNames] = useState<string[]>([]);
  const [pickedHistory, setPickedHistory] = useState<string[]>([]);
  const [currentWinner, setCurrentWinner] = useState<string | null>(null);
  const [isPicking, setIsPicking] = useState(false);

  const handleUpdateNames = () => {
    const list = inputText
      .split('\n')
      .map(n => n.trim())
      .filter(n => n.length > 0);
    setNames(list);
    setRemainingNames(list);
    setPickedHistory([]);
    setCurrentWinner(null);
  };

  const pickRandom = () => {
    if (remainingNames.length === 0) return;
    
    setIsPicking(true);
    setCurrentWinner(null);

    // Visual effect delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * remainingNames.length);
      const picked = remainingNames[randomIndex];
      
      setCurrentWinner(picked);
      setPickedHistory(prev => [picked, ...prev]);
      setRemainingNames(prev => prev.filter((_, i) => i !== randomIndex));
      setIsPicking(false);
    }, 800);
  };

  const resetAll = () => {
    setRemainingNames([...names]);
    setPickedHistory([]);
    setCurrentWinner(null);
  };

  const clearInput = () => {
    setInputText('');
    setNames([]);
    setRemainingNames([]);
    setPickedHistory([]);
    setCurrentWinner(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-xl flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl text-gray-800">명단 입력</h3>
          <button onClick={clearInput} className="text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 size={20} />
          </button>
        </div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="엑셀에서 명단을 복사해서 여기에 붙여넣으세요 (한 줄에 한 명)"
          className="flex-grow w-full p-4 border border-gray-200 rounded-2xl resize-none focus:ring-2 focus:ring-emerald-400 outline-none transition-all h-64 lg:h-auto"
        />
        <button
          onClick={handleUpdateNames}
          className="mt-4 w-full bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 shadow-md transition-colors flex items-center justify-center gap-2"
        >
          <UserPlus size={20} />
          명단 적용하기
        </button>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center justify-center min-h-[400px]">
          {names.length === 0 ? (
            <div className="text-center text-gray-400">
              <UserPlus size={64} className="mx-auto mb-4 opacity-20" />
              <p>왼쪽에서 명단을 먼저 입력해주세요.</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-2">
                  남은 인원: {remainingNames.length} / {names.length}
                </span>
                <h2 className="text-4xl font-bold text-gray-800">행운의 주인공은?</h2>
              </div>

              <div className={`h-40 flex items-center justify-center mb-8 w-full max-w-sm rounded-2xl ${isPicking ? 'animate-pulse bg-emerald-50' : 'bg-gray-50'}`}>
                {isPicking ? (
                  <span className="text-2xl font-bold text-emerald-500">추첨 중...</span>
                ) : currentWinner ? (
                  <div className="text-center">
                    <Trophy className="text-yellow-500 mx-auto mb-2" size={48} />
                    <span className="text-5xl font-extrabold text-emerald-600">{currentWinner}</span>
                  </div>
                ) : (
                  <span className="text-gray-300 text-lg">준비 완료</span>
                )}
              </div>

              <div className="flex gap-4 w-full max-w-md">
                <button
                  onClick={pickRandom}
                  disabled={remainingNames.length === 0 || isPicking}
                  className="flex-grow bg-emerald-500 text-white py-4 rounded-2xl font-bold text-xl hover:bg-emerald-600 disabled:bg-gray-300 shadow-lg transition-all"
                >
                  {remainingNames.length === 0 ? "뽑기 종료" : "랜덤 뽑기!"}
                </button>
                <button
                  onClick={resetAll}
                  className="bg-gray-100 text-gray-600 p-4 rounded-2xl hover:bg-gray-200 shadow transition-all"
                  title="다시 시작하기"
                >
                  <RefreshCw size={24} />
                </button>
              </div>
            </>
          )}
        </div>

        {pickedHistory.length > 0 && (
          <div className="bg-white p-6 rounded-3xl shadow-xl overflow-hidden">
            <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
              <Trophy size={18} className="text-yellow-500" />
              당첨 히스토리 (최근 순)
            </h4>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2">
              {pickedHistory.map((name, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm border border-gray-200">
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomPicker;
