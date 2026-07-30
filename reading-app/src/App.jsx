import { useState, useRef } from 'react'
import './index.css'

function App() {
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [copied, setCopied] = useState(false);
  const passageRef = useRef(null);
  const questionsRef = useRef(null);

  const handleGenerate = () => {
    const pContent = passageRef.current.innerHTML.trim();
    const qContent = questionsRef.current.innerHTML.trim();
    
    const html = `<div style="display: flex;">
<div style="width: 60%; max-height: 500px; overflow-y: scroll; border: 1px solid #ccc; padding: 15px; line-height: 1.6;">
${pContent}
</div>
<div style="width: 40%; max-height: 500px; overflow-y: scroll; border: 1px solid #ccc; padding: 15px; line-height: 1.6;">
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
    <div className="app-container">
      <header>
        <h1>Reading Layout <span>Generator</span></h1>
        <p>Tạo code HTML giao diện bài đọc IELTS/TOEFL nhanh chóng.</p>
      </header>

      <main>
        <div className="input-section">
          <div className="card">
            <h2>1. Reading Passage</h2>
            <p className="subtitle">Nhập hoặc dán nội dung bài đọc vào đây (có thể dán từ Word để giữ định dạng)</p>
            <div 
              ref={passageRef}
              className="rich-input" 
              contentEditable 
              onFocus={(e) => handleClearPlaceholder(e, 'Dán bài đọc vào đây...')}
            >
              Dán bài đọc vào đây...
            </div>
          </div>

          <div className="card">
            <h2>2. Questions</h2>
            <p className="subtitle">Nhập hoặc dán nội dung câu hỏi vào đây</p>
            <div 
              ref={questionsRef}
              className="rich-input" 
              contentEditable 
              onFocus={(e) => handleClearPlaceholder(e, 'Dán câu hỏi vào đây...')}
            >
              Dán câu hỏi vào đây...
            </div>
          </div>
          
          <button onClick={handleGenerate} className="primary-btn">
            Tạo HTML & Xem trước
          </button>
        </div>

        <div className="output-section">
          <div className="card">
            <h2>3. Preview</h2>
            <div className="preview-area">
              {generatedHtml ? (
                <div dangerouslySetInnerHTML={{ __html: generatedHtml }} />
              ) : (
                <div className="empty-state">Bấm "Tạo HTML & Xem trước" để xem kết quả</div>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>4. Generated HTML</h2>
              <button onClick={handleCopy} className={`icon-btn ${copied ? 'copied' : ''}`}>
                {copied ? 'Đã Copy!' : 'Copy Code'}
              </button>
            </div>
            <textarea 
              readOnly 
              value={generatedHtml} 
              placeholder="Mã HTML sẽ hiện ở đây..." 
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
