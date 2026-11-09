import React, { useState } from 'react';
import { X, Plus, Trash2, Upload, FileText, Check, AlertCircle } from 'lucide-react';
import { saveCustomVocabSet } from '../../data/vocabularySets';

export default function SetCreatorModal({ isOpen, onClose, onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [grade, setGrade] = useState('Lớp 10');
  const [book, setBook] = useState('Global Success');
  const [activeTab, setActiveTab] = useState('import'); // 'import' | 'manual'

  // Import raw text state
  const [rawText, setRawText] = useState('');
  const [delimiter, setDelimiter] = useState('tab'); // 'tab' | 'comma' | 'dash'
  const [fileError, setFileError] = useState('');

  // Handle JSON file upload
  const handleFileUpload = (e) => {
    setFileError('');
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.title) setTitle(parsed.title);
        if (parsed.description) setDescription(parsed.description);
        if (parsed.grade) setGrade(parsed.grade);
        if (parsed.book) setBook(parsed.book);

        if (Array.isArray(parsed.terms) && parsed.terms.length > 0) {
          const formatted = parsed.terms.map(t => `${t.term}\t${t.definition}`).join('\n');
          setRawText(formatted);
          setDelimiter('tab');
          setActiveTab('import');
        } else {
          setFileError('File không chứa danh sách từ vựng hợp lệ.');
        }
      } catch (err) {
        setFileError('Lỗi định dạng file JSON. Vui lòng chọn đúng file sao lưu.');
      }
    };
    reader.readAsText(file);
  };

  // Manual list state
  const [manualTerms, setManualTerms] = useState([
    { term: '', definition: '' },
    { term: '', definition: '' }
  ]);

  if (!isOpen) return null;

  // Parse raw text into array of { term, definition }
  const parseRawText = () => {
    if (!rawText.trim()) return [];
    const lines = rawText.split('\n').filter(l => l.trim().length > 0);

    return lines.map((line, idx) => {
      let parts = [];
      if (delimiter === 'tab') {
        parts = line.split('\t');
      } else if (delimiter === 'dash') {
        parts = line.split('-');
      } else if (delimiter === 'comma') {
        parts = line.split(',');
      }

      if (parts.length < 2) {
        // Fallback: try splitting by tab, then dash, then colon
        if (line.includes('\t')) parts = line.split('\t');
        else if (line.includes(':')) parts = line.split(':');
        else if (line.includes('-')) parts = line.split('-');
        else parts = [line, ''];
      }

      const term = parts[0]?.trim() || '';
      const definition = parts.slice(1).join(delimiter === 'dash' ? '-' : ' ').trim() || '';

      return {
        id: `custom-${Date.now()}-${idx}`,
        term,
        definition
      };
    }).filter(item => item.term && item.definition);
  };

  const parsedPreview = parseRawText();

  const handleSave = () => {
    if (!title.trim()) {
      alert('Vui lòng nhập tiêu đề bộ từ vựng.');
      return;
    }

    let finalTerms = [];
    if (activeTab === 'import') {
      finalTerms = parsedPreview;
    } else {
      finalTerms = manualTerms
        .filter(t => t.term.trim() && t.definition.trim())
        .map((t, i) => ({
          id: `custom-${Date.now()}-${i}`,
          term: t.term.trim(),
          definition: t.definition.trim()
        }));
    }

    if (finalTerms.length === 0) {
      alert('Bộ từ vựng cần có ít nhất 1 từ hợp lệ.');
      return;
    }

    const newSet = {
      id: `custom-set-${Date.now()}`,
      title: title.trim(),
      subtitle: `${grade} - ${book}`,
      description: description.trim() || `Bộ từ vựng tự tạo gồm ${finalTerms.length} thuật ngữ.`,
      grade,
      book,
      author: 'Giáo viên / Học sinh',
      tags: [grade, book, 'Tự tạo'],
      isOfficial: false,
      terms: finalTerms
    };

    saveCustomVocabSet(newSet);
    if (onCreated) onCreated(newSet);
    onClose();
  };

  const addManualRow = () => {
    setManualTerms(prev => [...prev, { term: '', definition: '' }]);
  };

  const removeManualRow = (index) => {
    setManualTerms(prev => prev.filter((_, i) => i !== index));
  };

  const updateManualRow = (index, field, value) => {
    setManualTerms(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-pop-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-left">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-gray-900">Tạo bộ học từ vựng mới</h3>
            <p className="text-xs text-gray-500">Nhập danh sách từ vựng thông minh hoàn toàn miễn phí</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Tiêu đề bộ từ vựng *
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Unit 2: Humans and the Environment - Lớp 10"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Khối lớp</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold focus:outline-none focus:border-primary"
              >
                <option value="Lớp 10">Lớp 10</option>
                <option value="Lớp 11">Lớp 11</option>
                <option value="Lớp 12">Lớp 12</option>
                <option value="IELTS">IELTS</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Bộ sách</label>
              <input
                type="text"
                placeholder="Global Success, Friends Global, ..."
                value={book}
                onChange={(e) => setBook(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold focus:outline-none focus:border-primary"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Mô tả (Tùy chọn)
              </label>
              <input
                type="text"
                placeholder="Ghi chú thêm về bộ từ..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 text-xs font-medium focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Storage notice banner */}
          <div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-blue-900">
            <span className="font-bold text-primary mt-0.5">💾 Tự động lưu trữ:</span>
            <span>Bộ từ bạn tạo sẽ được lưu trực tiếp trên trình duyệt của bạn (Local Storage). Lần sau mở web bạn sẽ thấy ngay mà không bị mất.</span>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex border-b border-gray-200 gap-4">
            <button
              onClick={() => setActiveTab('import')}
              className={`pb-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === 'import'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Upload size={14} />
              <span>Dán văn bản hàng loạt</span>
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`pb-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === 'manual'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Plus size={14} />
              <span>Nhập từng thẻ thủ công</span>
            </button>
            <button
              onClick={() => setActiveTab('file')}
              className={`pb-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === 'file'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <FileText size={14} />
              <span>Nhập từ file sao lưu (.json)</span>
            </button>
          </div>

          {/* TAB: FILE BACKUP IMPORT */}
          {activeTab === 'file' && (
            <div className="p-6 border-2 border-dashed border-gray-300 rounded-2xl text-center space-y-3 bg-gray-50/50">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto">
                <Upload size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Chọn file sao lưu (.json)</p>
                <p className="text-xs text-gray-500 mt-0.5">Hỗ trợ file xuất ra từ trang học từ vựng Dream Education</p>
              </div>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:bg-primary-container cursor-pointer"
              />
              {fileError && (
                <p className="text-xs text-rose-600 font-semibold">{fileError}</p>
              )}
            </div>
          )}

          {/* TAB 1: BATCH IMPORT */}
          {activeTab === 'import' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">
                  Dán từ vựng từ Excel, Quizlet hoặc file văn bản (Mỗi từ 1 dòng):
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Ngăn cách bởi:</span>
                  <select
                    value={delimiter}
                    onChange={(e) => setDelimiter(e.target.value)}
                    className="px-2 py-1 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold focus:outline-none"
                  >
                    <option value="tab">Phím Tab (Excel / Quizlet copy)</option>
                    <option value="dash">Dấu gạch ngang (-)</option>
                    <option value="comma">Dấu phẩy (,)</option>
                  </select>
                </div>
              </div>

              <textarea
                rows={7}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder={`sports field\tsân thể thao\nbe afraid\te rằng\nprepare dinner\tchuẩn bị bữa tối`}
                className="w-full p-3 font-mono text-xs rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />

              {/* Preview detected terms count */}
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-blue-900 font-semibold">
                  <FileText size={16} className="text-primary" />
                  <span>
                    Đã nhận diện: <strong className="text-primary font-black text-sm">{parsedPreview.length}</strong> từ vựng hợp lệ
                  </span>
                </div>

                {parsedPreview.length > 0 && (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <Check size={14} /> Sẵn sàng tạo
                  </span>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: MANUAL ROWS */}
          {activeTab === 'manual' && (
            <div className="space-y-3">
              <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                {manualTerms.map((row, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 w-6 text-center">{idx + 1}</span>
                    <input
                      type="text"
                      placeholder="Thuật ngữ tiếng Anh"
                      value={row.term}
                      onChange={(e) => updateManualRow(idx, 'term', e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-xs font-semibold focus:outline-none focus:border-primary"
                    />
                    <input
                      type="text"
                      placeholder="Nghĩa tiếng Việt"
                      value={row.definition}
                      onChange={(e) => updateManualRow(idx, 'definition', e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-xs font-medium focus:outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => removeManualRow(idx)}
                      className="p-2 text-gray-400 hover:text-rose-500 rounded-lg transition-colors"
                      title="Xóa dòng này"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addManualRow}
                className="w-full py-2.5 border-2 border-dashed border-gray-200 hover:border-primary rounded-xl text-xs font-bold text-gray-600 hover:text-primary transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus size={16} />
                <span>Thêm từ mới</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            Lưu & Bắt đầu học
          </button>
        </div>
      </div>
    </div>
  );
}
