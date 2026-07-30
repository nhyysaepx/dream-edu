import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { logUserAction } from '../utils/logger';

const AITutor = ({ onNavigate }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hi! I am your AI Tutor. You can ask me anything about English vocabulary, grammar, or specific sentences.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);
    logUserAction('AI_TUTOR_ASK', { query: inputValue });

    // Mock AI response
    setTimeout(() => {
      const isPresentQuestion = newUserMessage.content.toLowerCase().includes('present');
      
      const mockResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: isPresentQuestion 
          ? "Trong câu **\"I am going to present the work\"**, từ **\"present\"** đóng vai trò là một động từ (verb).\n\nNghĩa của nó ở đây là **trình bày, giới thiệu** (để cho người khác xem hoặc biết đến). \n\nVí dụ khác: \n- *He will **present** his findings at the conference.* (Anh ấy sẽ trình bày những phát hiện của mình tại hội nghị.)\n\nLưu ý về phát âm: Khi là động từ, trọng âm rơi vào âm tiết thứ hai: **/prɪˈzent/**."
          : "Đó là một câu hỏi thú vị! Đây chỉ là giao diện ví dụ nên tôi sẽ luôn trả lời bạn thế này. Nếu tích hợp API thật của Gemini, tôi sẽ trả lời chi tiết chính xác những gì bạn hỏi nhé!",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, mockResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Header */}
      <header className="flex-none p-4 bg-primary text-on-primary sticky top-0 z-10 shadow-md">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => onNavigate('home')}
            className="p-2 -ml-2 rounded-full hover:bg-primary/80 transition-colors"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 font-semibold text-lg">
            <Sparkles className="w-5 h-5 text-accent" />
            AI Tutor
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-surface">
        <div className="max-w-3xl mx-auto space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-5 h-5 text-on-primary" />
                  </div>
                )}
                
                <div 
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    msg.role === 'user' 
                      ? 'bg-secondary text-on-secondary rounded-tr-sm' 
                      : 'bg-white shadow-sm border border-outline/20 rounded-tl-sm text-on-surface'
                  }`}
                >
                  {/* Basic markdown-like rendering for mock response */}
                  <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
                    {msg.content.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, j) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={j}>{part.slice(2, -2)}</strong>;
                          } else if (part.startsWith('*') && part.endsWith('*')) {
                            return <em key={j}>{part.slice(1, -1)}</em>;
                          }
                          return part;
                        })}
                        {i < msg.content.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-secondary-variant flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-5 h-5 text-on-secondary" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 justify-start"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-5 h-5 text-on-primary" />
              </div>
              <div className="bg-white shadow-sm border border-outline/20 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-sm text-on-surface-variant font-medium">AI is thinking...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="flex-none p-4 bg-surface border-t border-outline/20">
        <div className="max-w-3xl mx-auto">
          <div className="relative flex items-end gap-2 bg-white rounded-2xl shadow-sm border border-outline/30 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all p-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about a word or sentence..."
              className="flex-1 max-h-32 min-h-[44px] bg-transparent resize-none outline-none py-2 px-3 text-[15px] placeholder:text-on-surface-variant/50"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className={`p-3 rounded-xl flex-shrink-0 transition-colors ${
                inputValue.trim() && !isTyping 
                  ? 'bg-primary text-on-primary hover:bg-primary/90 shadow-md' 
                  : 'bg-surface-variant text-on-surface-variant/50'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="text-[11px] text-on-surface-variant/70">
              AI Tutor can make mistakes. Consider verifying important information.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AITutor;
