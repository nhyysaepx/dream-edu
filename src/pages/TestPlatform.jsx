import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  Menu, 
  Edit3, 
  ChevronDown, 
  Send, 
  Type, 
  LogOut, 
  ArrowLeft, 
  ArrowRight,
  Check,
  Moon,
  Highlighter
} from 'lucide-react';

const TestPlatform = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(1);
  
  // State for features
  const [contrast, setContrast] = useState('standard'); 
  const [textSize, setTextSize] = useState('standard');
  const [expandedOption, setExpandedOption] = useState(null); 
  
  const [selectionPopup, setSelectionPopup] = useState(null);
  
  // Notes state management
  const [notes, setNotes] = useState({}); // { [id]: { text: string, content: string } }
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [draftContent, setDraftContent] = useState('');

  // Sync draft content when a note is opened
  useEffect(() => {
    if (activeNoteId && notes[activeNoteId]) {
      setDraftContent(notes[activeNoteId].content);
    }
  }, [activeNoteId]); // Only run when activeNoteId changes

  // Handle Text Selection
  const handleMouseUp = (e) => {
    if (e.target.closest('#selection-popup') || e.target.closest('#note-sidebar') || e.target.closest('.annotation-mark') || e.target.tagName.toLowerCase() === 'input') {
      return;
    }
    
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed && selection.toString().trim() !== '') {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectionPopup({
        range,
        text: selection.toString(),
        x: rect.left + (rect.width / 2),
        y: rect.top - 10
      });
    } else {
      setSelectionPopup(null);
    }
  };

  // Apply Annotation (Highlight or Note)
  const applyAnnotation = (type) => {
    if (!selectionPopup || !selectionPopup.range) return;
    
    const groupId = 'anno-' + Date.now();
    const isHighlight = type === 'highlight';
    let className = 'annotation-mark ';
    
    if (isHighlight) {
      className += contrast === 'yellow-black' ? 'bg-yellow-600/50 text-yellow-200' : 'bg-yellow-300 text-black';
    } else {
      className += 'bg-blue-200 text-black cursor-pointer border-b-2 border-blue-500 hover:bg-blue-300 transition-colors';
    }

    try {
      const range = selectionPopup.range;
      
      const treeWalker = document.createTreeWalker(
        range.commonAncestorContainer,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            return range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          }
        },
        false
      );

      const nodes = [];
      while(treeWalker.nextNode()) {
        nodes.push(treeWalker.currentNode);
      }

      if (nodes.length > 0) {
        const startNode = nodes[0];
        const endNode = nodes[nodes.length - 1];

        if (range.endContainer === endNode && range.endOffset < endNode.nodeValue.length) {
          endNode.splitText(range.endOffset);
        }
        
        if (range.startContainer === startNode && range.startOffset > 0) {
          nodes[0] = startNode.splitText(range.startOffset);
        }

        nodes.forEach(node => {
          if (node.nodeValue.trim() === '') return;
          const mark = document.createElement('mark');
          mark.className = className;
          mark.dataset.groupId = groupId;
          
          if (!isHighlight) {
            // stable setter reference ensures this closure is safe
            mark.onclick = () => setActiveNoteId(groupId);
          }
          
          node.parentNode.insertBefore(mark, node);
          mark.appendChild(node);
        });
      }
      
      if (type === 'note') {
        setNotes(prev => ({
          ...prev,
          [groupId]: { text: selectionPopup.text, content: '' }
        }));
        setActiveNoteId(groupId);
      }
    } catch (e) {
      console.error("Highlighting failed.", e);
      alert("Đã xảy ra lỗi khi xử lý bôi đen. Vui lòng thử lại.");
    }
    
    setSelectionPopup(null);
    window.getSelection().removeAllRanges();
  };

  const saveNote = () => {
    if (activeNoteId) {
      setNotes(prev => ({
        ...prev,
        [activeNoteId]: {
          ...prev[activeNoteId],
          content: draftContent
        }
      }));
      setActiveNoteId(null);
    }
  };

  const deleteNote = () => {
    if (activeNoteId) {
      const marks = document.querySelectorAll(`mark[data-group-id="${activeNoteId}"]`);
      marks.forEach(mark => {
        const parent = mark.parentNode;
        while(mark.firstChild) {
          parent.insertBefore(mark.firstChild, mark);
        }
        parent.removeChild(mark);
      });
      
      setNotes(prev => {
        const next = { ...prev };
        delete next[activeNoteId];
        return next;
      });
      setActiveNoteId(null);
    }
  };

  // Dynamic Theme Classes
  const isDark = contrast !== 'standard';
  const isYellow = contrast === 'yellow-black';
  
  const mainBg = isDark ? 'bg-[#121212]' : 'bg-[#f4f6f8]';
  const paperBg = isDark ? 'bg-black' : 'bg-white';
  const textColor = isYellow ? 'text-yellow-400' : (isDark ? 'text-white' : 'text-gray-900');
  const borderColor = isDark ? 'border-gray-800' : 'border-gray-200';
  const mutedText = isYellow ? 'text-yellow-600' : (isDark ? 'text-gray-400' : 'text-gray-700');
  const inputBg = isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';
  const instructionBg = isDark ? 'bg-gray-900' : 'bg-[#e9eef4]';
  
  const sizeClass = textSize === 'large' ? 'text-lg' : textSize === 'very-large' ? 'text-xl' : 'text-base';

  return (
    <div className="h-screen w-full flex flex-col bg-white text-gray-900 font-sans fixed inset-0 z-[9999]">
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white shadow-sm z-30">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg">
              D
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">DREAM EDU</span>
          </div>
          
          <div className="flex flex-col border-l pl-6 border-gray-300">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Test Taker ID</span>
            <div className="flex items-center gap-2 text-red-500">
              <Volume2 size={16} className="animate-pulse" />
              <span className="font-semibold text-sm">Audio is playing</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium transition-colors">
            <span className="text-gray-600">Save/Restore</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-600 transition-colors">
            <Volume2 size={18} />
          </button>
          <button 
            className="p-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-600 transition-colors"
            onClick={() => setShowOptions(!showOptions)}
          >
            <Menu size={18} />
          </button>
          <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-600 transition-colors">
            <Edit3 size={18} />
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className={`flex-1 flex relative overflow-hidden ${mainBg} z-10 transition-colors duration-300`} onMouseUp={handleMouseUp}>
        
        {/* MAIN CONTENT AREA */}
        <main className={`flex-1 overflow-y-auto p-8 relative ${sizeClass} transition-all duration-300`}>
          <div className={`max-w-4xl mx-auto ${paperBg} p-8 rounded-lg shadow-sm border ${borderColor} min-h-full transition-colors duration-300`}>
            
            {/* Instruction Header */}
            <div className={`${instructionBg} p-4 rounded-md mb-8 transition-colors duration-300`}>
              <h2 className={`font-bold ${textSize === 'very-large' ? 'text-2xl' : textSize === 'large' ? 'text-xl' : 'text-lg'} mb-1 ${textColor}`}>Part 1</h2>
              <p className={`${mutedText}`}>Listen and answer questions 1–10.</p>
            </div>

            {/* Questions Section */}
            <div className="mb-8">
              <h3 className={`font-bold mb-4 ${textColor}`}>Questions 1–5</h3>
              <p className={`mb-6 ${mutedText}`}>
                Complete the notes below. Write <strong className={textColor}>ONE WORD AND/OR A NUMBER</strong> for each answer.
              </p>
              
              <h4 className={`font-bold mb-4 ${textColor}`}>ECO-FARM</h4>
              <p className={`mb-4 ${mutedText}`}>The farm is a member of the Northern Hotel Group.</p>
              <p className={`mb-6 ${mutedText}`}>Personal information:</p>

              <div className="space-y-6">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={textColor}>Name: Helen</span>
                  <div className="inline-flex items-center">
                    <input 
                      type="text" 
                      className={`w-32 border ${borderColor} ${inputBg} rounded px-3 py-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-center transition-colors`}
                      placeholder="1"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className={textColor}>E-mail address (work): helen123@</span>
                  <div className="inline-flex items-center">
                    <input 
                      type="text" 
                      className={`w-40 border ${borderColor} ${inputBg} rounded px-3 py-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-center transition-colors`}
                      placeholder="2"
                    />
                  </div>
                  <span className={textColor}>.com</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className={textColor}>Home address:</span>
                  <div className="inline-flex items-center">
                    <input 
                      type="text" 
                      className={`w-40 border ${borderColor} ${inputBg} rounded px-3 py-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-center transition-colors`}
                      placeholder="3"
                    />
                  </div>
                  <span className={textColor}>Road, Sheffield</span>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={textColor}>Source of information:</span>
                  <div className="inline-flex items-center">
                    <input 
                      type="text" 
                      className={`w-48 border ${borderColor} ${inputBg} rounded px-3 py-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-center transition-colors`}
                      placeholder="4"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={textColor}>Membership number:</span>
                  <div className="inline-flex items-center">
                    <input 
                      type="text" 
                      className={`w-40 border ${borderColor} ${inputBg} rounded px-3 py-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-center transition-colors`}
                      placeholder="5"
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className={`my-8 border-t ${borderColor}`} />

            <div className="mb-8">
              <h3 className={`font-bold mb-4 ${textColor}`}>Questions 6–10</h3>
              <p className={`mb-6 ${mutedText}`}>
                Complete the table below. Write <strong className={textColor}>ONE WORD ONLY</strong> for each answer.
              </p>
              <div className={`w-full h-32 ${instructionBg} border ${borderColor} rounded flex items-center justify-center ${mutedText} italic transition-colors`}>
                (Table content goes here)
              </div>
            </div>
            
          </div>
        </main>

        {/* ANNOTATION POPUP */}
        {selectionPopup && (
          <div 
            id="selection-popup"
            className="fixed z-[10000] bg-white rounded-md shadow-xl border border-gray-200 flex p-1"
            style={{ 
              left: selectionPopup.x, 
              top: selectionPopup.y, 
              transform: 'translate(-50%, -120%)' 
            }}
          >
            <button onClick={() => applyAnnotation('note')} className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800 w-16 transition-colors">
              <Edit3 size={18} className="mb-1" />
              <span className="text-xs font-medium">Note</span>
            </button>
            <button onClick={() => applyAnnotation('highlight')} className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800 w-16 transition-colors">
              <Highlighter size={18} className="mb-1" />
              <span className="text-xs font-medium">Highlight</span>
            </button>
          </div>
        )}

        {/* NOTE SIDEBAR */}
        {activeNoteId && notes[activeNoteId] && (
          <div id="note-sidebar" className="w-80 bg-gray-50 border-l border-gray-300 flex flex-col shadow-2xl z-20 shrink-0">
            <div className="bg-[#185bc3] text-white p-4 relative">
              <div className="font-bold mb-2">Note</div>
              <div className="text-sm italic mb-4 opacity-90 line-clamp-3 bg-white/10 p-2 rounded">
                "... {notes[activeNoteId].text} ..."
              </div>
              <div className="flex justify-end">
                <button onClick={deleteNote} className="text-xs hover:underline flex items-center gap-1 font-medium bg-red-500/20 px-2 py-1 rounded hover:bg-red-500/40 transition-colors">
                  Delete note
                </button>
              </div>
            </div>
            <div className="p-4 flex-1">
              <textarea 
                className="w-full h-full border border-gray-300 rounded p-3 focus:outline-none focus:border-[#185bc3] resize-none text-gray-800 shadow-inner bg-white"
                placeholder="Start typing your note..."
                value={draftContent}
                onChange={e => setDraftContent(e.target.value)}
              />
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2 bg-white">
               <button 
                onClick={() => setActiveNoteId(null)}
                className="px-4 py-2 rounded font-medium text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={saveNote}
                className="bg-[#185bc3] text-white px-4 py-2 rounded font-medium hover:bg-blue-700 shadow-sm transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* OPTIONS SIDEBAR */}
        {showOptions && !activeNoteId && (
          <div className="w-80 bg-white border-l border-gray-200 shadow-2xl z-20 flex flex-col shrink-0">
            <div className="p-4 border-b border-gray-200 font-bold text-center text-lg text-gray-800">
              Options
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              <button className="w-full bg-[#36549c] hover:bg-[#2c4482] text-white rounded-md py-3 px-4 flex items-center gap-3 font-semibold mb-6 transition-colors shadow-sm">
                <Send size={18} />
                Submit test
              </button>
              
              <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
                {/* Contrast Menu */}
                <div>
                  <button 
                    className="w-full flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left"
                    onClick={() => setExpandedOption(expandedOption === 'contrast' ? null : 'contrast')}
                  >
                    <div className="flex items-center gap-3 text-gray-700 font-medium">
                      <Moon size={18} />
                      Contrast
                    </div>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${expandedOption === 'contrast' ? 'rotate-180' : '-rotate-90'}`} />
                  </button>
                  {expandedOption === 'contrast' && (
                    <div className="bg-white border-b border-gray-200 flex flex-col">
                      <button onClick={() => setContrast('standard')} className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 text-sm text-gray-700">
                        <div className="border border-gray-300 rounded px-2 py-1 font-serif bg-white text-black font-bold">Aa</div>
                        Tiêu chuẩn
                        {contrast === 'standard' && <Check size={16} className="text-blue-600 ml-auto" />}
                      </button>
                      <button onClick={() => setContrast('white-black')} className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 text-sm text-gray-700">
                        <div className="border border-gray-800 rounded px-2 py-1 font-serif bg-black text-white font-bold">Aa</div>
                        White on black
                        {contrast === 'white-black' && <Check size={16} className="text-blue-600 ml-auto" />}
                      </button>
                      <button onClick={() => setContrast('yellow-black')} className="flex items-center gap-3 p-3 hover:bg-gray-50 text-sm text-gray-700">
                        <div className="border border-yellow-500 rounded px-2 py-1 font-serif bg-black text-yellow-400 font-bold">Aa</div>
                        Yellow on black
                        {contrast === 'yellow-black' && <Check size={16} className="text-blue-600 ml-auto" />}
                      </button>
                    </div>
                  )}
                </div>

                {/* Text Size Menu */}
                <div>
                  <button 
                    className="w-full flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left"
                    onClick={() => setExpandedOption(expandedOption === 'text-size' ? null : 'text-size')}
                  >
                    <div className="flex items-center gap-3 text-gray-700 font-medium">
                      <Type size={18} />
                      Text size
                    </div>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${expandedOption === 'text-size' ? 'rotate-180' : '-rotate-90'}`} />
                  </button>
                  {expandedOption === 'text-size' && (
                    <div className="bg-white border-b border-gray-200 flex flex-col">
                      <button onClick={() => setTextSize('standard')} className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 text-sm text-gray-700">
                        <span className="font-serif">Aa</span> Tiêu chuẩn
                        {textSize === 'standard' && <Check size={16} className="text-blue-600 ml-auto" />}
                      </button>
                      <button onClick={() => setTextSize('large')} className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 text-sm text-gray-700">
                        <span className="font-serif text-lg">Aa</span> Lớn
                        {textSize === 'large' && <Check size={16} className="text-blue-600 ml-auto" />}
                      </button>
                      <button onClick={() => setTextSize('very-large')} className="flex items-center gap-3 p-3 hover:bg-gray-50 text-sm text-gray-700">
                        <span className="font-serif text-xl">Aa</span> Rất lớn
                        {textSize === 'very-large' && <Check size={16} className="text-blue-600 ml-auto" />}
                      </button>
                    </div>
                  )}
                </div>

                {/* Annotations List */}
                <div>
                  <button 
                    className="w-full flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left"
                    onClick={() => setExpandedOption(expandedOption === 'annotations' ? null : 'annotations')}
                  >
                    <div className="flex items-center gap-3 text-gray-700 font-medium">
                      <Edit3 size={18} />
                      Annotations
                    </div>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${expandedOption === 'annotations' ? 'rotate-180' : '-rotate-90'}`} />
                  </button>
                  {expandedOption === 'annotations' && (
                    <div className="bg-gray-50 border-b border-gray-200 flex flex-col max-h-64 overflow-y-auto">
                      {Object.keys(notes).length === 0 ? (
                        <div className="p-6 text-sm text-gray-500 text-center italic">
                          Chưa có ghi chú nào.
                        </div>
                      ) : (
                        Object.entries(notes).map(([id, note]) => (
                          <div 
                            key={id} 
                            onClick={() => setActiveNoteId(id)}
                            className="flex flex-col p-3 hover:bg-blue-50 border-b border-gray-200 text-left cursor-pointer transition-colors"
                          >
                            <span className="text-xs font-semibold text-blue-700 line-clamp-1">"{note.text}"</span>
                            <span className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {note.content || <span className="italic text-gray-400">Trống...</span>}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4 bg-white">
              <button className="w-full border border-gray-200 rounded-md py-3 px-4 flex items-center justify-center gap-2 text-red-500 font-semibold hover:bg-red-50 transition-colors shadow-sm">
                <LogOut size={18} className="rotate-180" />
                Quit test
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER PAGINATION */}
      <footer className="h-16 border-t border-gray-200 flex items-center px-4 bg-white select-none z-30">
        <div className="flex-1 flex items-center gap-8 h-full">
          {/* Part Navigation */}
          <div className="flex items-center gap-6 h-full px-4 border-b-2 border-blue-600 cursor-pointer">
            <span className="font-bold text-sm tracking-wide text-gray-800">PART 1</span>
            <div className="flex gap-1.5">
              {[1,2,3,4,5,6,7,8,9,10].map(q => (
                <button 
                  key={`p1-${q}`}
                  onClick={() => setActiveQuestion(q)}
                  className={`w-6 h-6 flex items-center justify-center text-xs font-semibold rounded-sm transition-colors
                    ${activeQuestion === q 
                      ? 'border-2 border-blue-600 text-blue-600' 
                      : 'hover:bg-gray-100 text-gray-600'}`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 h-full text-gray-400 cursor-pointer hover:text-gray-600">
            <span className="font-bold text-sm tracking-wide">PART 2</span>
            <span className="text-xs">0 of 10</span>
          </div>
          
          <div className="flex items-center gap-2 h-full text-gray-400 cursor-pointer hover:text-gray-600">
            <span className="font-bold text-sm tracking-wide">PART 3</span>
            <span className="text-xs">0 of 10</span>
          </div>

          <div className="flex items-center gap-2 h-full text-gray-400 cursor-pointer hover:text-gray-600">
            <span className="font-bold text-sm tracking-wide">PART 4</span>
            <span className="text-xs">0 of 10</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
            <ArrowRight size={18} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-[#36549c] hover:bg-[#2c4482] text-white rounded transition-colors ml-2 shadow-sm">
            <Check size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default TestPlatform;
