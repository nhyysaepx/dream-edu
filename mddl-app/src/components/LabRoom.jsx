import React, { useState, useRef } from 'react';
import { ArrowLeft, Copy, Check } from 'lucide-react';

export default function LabRoom({ onNavigate }) {
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [copied, setCopied] = useState(false);
  const passageRef = useRef(null);
  const questionsRef = useRef(null);

  const handleGenerate = () => {
    const pContent = passageRef.current.innerHTML.trim();
    const qContent = questionsRef.current.innerHTML.trim();
    
    const html = `<div style="display: flex; gap: 20px;">
<div style="flex: 1; max-height: 500px; overflow-y: scroll; border: 1px solid #ccc; padding: 15px; line-height: 1.6;">
${pContent}
</div>
<div style="flex: 1; max-height: 500px; overflow-y: scroll; border: 1px solid #ccc; padding: 15px; line-height: 1.6;">
${qContent}
</div>
</div>`;
    setGeneratedHtml(html);
  };

  const handleCopy = () => {
    if (!generatedHtml) return;
    navigator.clipboard.writeText(generatedHtml).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClearPlaceholder = (e, defaultText) => {
    if (e.target.textContent.trim() === defaultText) {
      e.target.innerHTML = '';
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button 
          onClick={() => onNavigate('home')}
          className="mr-4 p-2 rounded-full hover:bg-surface-container-highest transition-colors text-on-surface-variant"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-primary">Phòng Lab</h1>
          <p className="text-on-surface-variant text-sm">Reading Layout Generator</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm">
            <h2 className="text-lg font-semibold text-on-surface mb-1">1. Reading Passage</h2>
            <p className="text-sm text-on-surface-variant mb-4">Nhập hoặc dán nội dung bài đọc vào đây (có thể dán từ Word)</p>
            <div 
              ref={passageRef}
              className="w-full bg-surface border border-outline-variant rounded-xl p-4 min-h-[200px] max-h-[300px] overflow-y-auto focus:outline-none focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/50 transition-all text-on-surface"
              contentEditable 
              onFocus={(e) => handleClearPlaceholder(e, 'Dán bài đọc vào đây...')}
            >
              Dán bài đọc vào đây...
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm">
            <h2 className="text-lg font-semibold text-on-surface mb-1">2. Questions</h2>
            <p className="text-sm text-on-surface-variant mb-4">Nhập hoặc dán nội dung câu hỏi vào đây</p>
            <div 
              ref={questionsRef}
              className="w-full bg-surface border border-outline-variant rounded-xl p-4 min-h-[200px] max-h-[300px] overflow-y-auto focus:outline-none focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/50 transition-all text-on-surface"
              contentEditable 
              onFocus={(e) => handleClearPlaceholder(e, 'Dán câu hỏi vào đây...')}
            >
              Dán câu hỏi vào đây...
            </div>
          </div>
          
          <button 
            onClick={handleGenerate} 
            className="w-full bg-primary text-on-primary py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-transform active:scale-[0.98] shadow-md"
          >
            Tạo HTML & Xem trước
          </button>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm h-auto flex flex-col">
            <h2 className="text-lg font-semibold text-on-surface mb-4">3. Preview</h2>
            <div className="flex-1 bg-white text-black rounded-xl border border-outline-variant overflow-hidden min-h-[200px]">
              {generatedHtml ? (
                <div dangerouslySetInnerHTML={{ __html: generatedHtml }} className="p-4" />
              ) : (
                <div className="h-full flex items-center justify-center p-8 text-gray-400 italic text-center">
                  Bấm "Tạo HTML & Xem trước" để xem kết quả
                </div>
              )}
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-on-surface">4. Generated HTML</h2>
              <button 
                onClick={handleCopy} 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  copied 
                    ? 'bg-green-100 text-green-700 border border-green-300' 
                    : 'bg-surface border border-outline-variant text-primary hover:bg-surface-container'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Đã Copy!' : 'Copy Code'}
              </button>
            </div>
            <textarea 
              readOnly 
              value={generatedHtml} 
              placeholder="Mã HTML sẽ hiện ở đây..." 
              className="w-full bg-surface border border-outline-variant rounded-xl p-4 min-h-[200px] font-mono text-sm text-primary focus:outline-none focus:border-secondary-container"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
