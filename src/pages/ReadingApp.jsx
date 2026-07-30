import React, { useState, useRef } from 'react';

export default function ReadingApp() {
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
    <div className="flex flex-col min-h-screen bg-surface pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-2">Reading Layout <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Generator</span></h1>
          <p className="text-on-surface-variant text-lg">Tạo code HTML giao diện bài đọc IELTS/TOEFL nhanh chóng.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-8">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-on-surface mb-2">1. Reading Passage</h2>
              <p className="text-sm text-on-surface-variant mb-4">Nhập hoặc dán nội dung bài đọc vào đây (có thể dán từ Word để giữ định dạng)</p>
              <div 
                ref={passageRef}
                className="w-full bg-surface border border-outline-variant rounded-xl p-4 min-h-[250px] max-h-[400px] overflow-y-auto focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/50 transition-all text-on-surface"
                contentEditable 
                onFocus={(e) => handleClearPlaceholder(e, 'Dán bài đọc vào đây...')}
              >
                Dán bài đọc vào đây...
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-on-surface mb-2">2. Questions</h2>
              <p className="text-sm text-on-surface-variant mb-4">Nhập hoặc dán nội dung câu hỏi vào đây</p>
              <div 
                ref={questionsRef}
                className="w-full bg-surface border border-outline-variant rounded-xl p-4 min-h-[250px] max-h-[400px] overflow-y-auto focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/50 transition-all text-on-surface"
                contentEditable 
                onFocus={(e) => handleClearPlaceholder(e, 'Dán câu hỏi vào đây...')}
              >
                Dán câu hỏi vào đây...
              </div>
            </div>
            
            <button 
              onClick={handleGenerate} 
              className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-all active:scale-[0.98] shadow-md"
            >
              Tạo HTML & Xem trước
            </button>
          </div>

          {/* Output Section */}
          <div className="space-y-8">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm h-auto flex flex-col hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-on-surface mb-4">3. Preview</h2>
              <div className="flex-1 bg-white text-black rounded-xl border border-outline-variant overflow-hidden min-h-[250px]">
                {generatedHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: generatedHtml }} className="p-4" />
                ) : (
                  <div className="h-full flex items-center justify-center p-8 text-slate-500 italic text-center">
                    Bấm "Tạo HTML & Xem trước" để xem kết quả
                  </div>
                )}
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-on-surface">4. Generated HTML</h2>
                <button 
                  onClick={handleCopy} 
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    copied 
                      ? 'bg-green-500 text-white border border-green-600' 
                      : 'bg-surface border border-outline-variant text-primary hover:bg-surface-container'
                  }`}
                >
                  {copied ? 'Đã Copy!' : 'Copy Code'}
                </button>
              </div>
              <textarea 
                readOnly 
                value={generatedHtml} 
                placeholder="Mã HTML sẽ hiện ở đây..." 
                className="w-full bg-surface border border-outline-variant rounded-xl p-4 min-h-[250px] font-mono text-sm text-purple-600 focus:outline-none focus:border-secondary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
