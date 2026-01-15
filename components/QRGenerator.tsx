
import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Link, Download } from 'lucide-react';

const QRGenerator: React.FC = () => {
  const [url, setUrl] = useState('');

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">QR 생성기</h2>
      
      <div className="w-full max-w-md mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">URL 입력</label>
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Link size={18} />
            </span>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-8 rounded-2xl flex items-center justify-center shadow-inner min-h-[300px] w-full max-w-sm">
        {url ? (
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <QRCodeSVG value={url} size={256} />
          </div>
        ) : (
          <p className="text-gray-400 italic">URL을 입력하면 QR 코드가 여기에 표시됩니다.</p>
        )}
      </div>

      {url && (
        <p className="mt-4 text-sm text-gray-500 break-all text-center">
          {url}
        </p>
      )}
    </div>
  );
};

export default QRGenerator;
