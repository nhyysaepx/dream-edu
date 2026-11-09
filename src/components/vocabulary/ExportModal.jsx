import React, { useState } from 'react';
import { X, Copy, Check, Printer, Download } from 'lucide-react';

export default function ExportModal({ isOpen, onClose, vocabSet }) {
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState('tab'); // 'tab' | 'comma' | 'numbered'

  if (!isOpen || !vocabSet) return null;

  const getExportText = () => {
    return vocabSet.terms.map((item, idx) => {
      if (exportFormat === 'tab') {
        return `${item.term}\t${item.definition}`;
      } else if (exportFormat === 'comma') {
        return `"${item.term}","${item.definition}"`;
      } else {
        return `${idx + 1}. ${item.term}: ${item.definition}`;
      }
    }).join('\n');
  };

  const textToExport = getExportText();

  const handleCopy = () => {
    navigator.clipboard.writeText(textToExport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>${vocabSet.title} - Dream Education</title>
          <style>
            body { font-family: sans-serif; padding: 24px; color: #111; }
            h1 { margin-bottom: 4px; color: #002862; }
            p.sub { color: #666; margin-top: 0; margin-bottom: 24px; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            th, td { border: 1px solid #ddd; padding: 10px 14px; text-align: left; }
            th { background-color: #f4f6fa; color: #002862; font-weight: bold; }
            tr:nth-child(even) { background-color: #fafbfc; }
            .num { width: 40px; text-align: center; color: #888; font-weight: bold; }
            .term { font-weight: bold; width: 45%; }
          </style>
        </head>
        <body>
          <h1>${vocabSet.title}</h1>
          <p class="sub">${vocabSet.subtitle} • Tổng số: ${vocabSet.terms.length} từ vựng • Dream Education</p>
          <table>
            <thead>
              <tr>
                <th class="num">STT</th>
                <th>Thuật ngữ tiếng Anh</th>
                <th>Nghĩa tiếng Việt</th>
              </tr>
            </thead>
            <tbody>
              ${vocabSet.terms.map((t, i) => `
                <tr>
                  <td class="num">${i + 1}</td>
                  <td class="term">${t.term}</td>
                  <td>${t.definition}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-pop-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full flex flex-col shadow-2xl overflow-hidden text-left">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-gray-900">Xuất danh sách từ vựng</h3>
            <p className="text-xs text-gray-500">Sao chép hoặc in ấn bộ từ {vocabSet.title}</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-gray-700">Định dạng xuất:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setExportFormat('tab')}
                className={`px-3 py-1 rounded-lg font-semibold border ${
                  exportFormat === 'tab' ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                Tab (Bảng tính / Anki)
              </button>
              <button
                onClick={() => setExportFormat('numbered')}
                className={`px-3 py-1 rounded-lg font-semibold border ${
                  exportFormat === 'numbered' ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                Đánh số STT
              </button>
            </div>
          </div>

          <textarea
            readOnly
            rows={8}
            value={textToExport}
            className="w-full p-3 font-mono text-xs rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none"
          />

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl flex items-center gap-2 transition-all"
            >
              <Printer size={16} />
              <span>In danh sách từ</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-6 py-2.5 bg-primary hover:bg-primary-container text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-sm"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Đã sao chép vào bộ nhớ!' : 'Sao chép toàn bộ'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
