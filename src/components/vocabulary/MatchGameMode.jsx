import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Timer, 
  Trophy, 
  RotateCcw, 
  Sparkles, 
  Flame, 
  Volume2, 
  ArrowRight,
  Play
} from 'lucide-react';
import { speakWord, triggerCelebration } from '../../utils/speechUtils';
import { getMatchLeaderboard, recordMatchScore } from '../../data/vocabularySets';

export default function MatchGameMode({ setId, terms }) {
  // Game state: 'intro' | 'playing' | 'completed'
  const [gameState, setGameState] = useState('intro');
  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [matchedIds, setMatchedIds] = useState(new Set());
  const [wrongPair, setWrongPair] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0); // in tenths of a second (100ms)
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentScore, setCurrentScore] = useState(null);

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    setLeaderboard(getMatchLeaderboard(setId));
  }, [setId]);

  // Start new game
  const startGame = () => {
    // Pick 6 random terms from the list
    const shuffledTerms = [...terms].sort(() => 0.5 - Math.random());
    const selectedPairs = shuffledTerms.slice(0, Math.min(6, shuffledTerms.length));

    // Create 12 cards (6 English terms + 6 Vietnamese definitions)
    const cardItems = [];
    selectedPairs.forEach((item) => {
      // English card
      cardItems.push({
        id: `term-${item.id}`,
        pairId: item.id,
        type: 'term',
        text: item.term,
        spokenText: item.term
      });
      // Vietnamese card
      cardItems.push({
        id: `def-${item.id}`,
        pairId: item.id,
        type: 'def',
        text: item.definition,
        spokenText: item.term
      });
    });

    // Shuffle the 12 cards
    const shuffledCards = cardItems.sort(() => 0.5 - Math.random());

    setCards(shuffledCards);
    setSelectedCardId(null);
    setMatchedIds(new Set());
    setWrongPair([]);
    setElapsedTime(0);
    setGameState('playing');

    // Start timer
    startTimeRef.current = Date.now();
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 100));
    }, 100);
  };

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Card click handler
  const handleCardClick = (card) => {
    if (gameState !== 'playing') return;
    if (matchedIds.has(card.id) || wrongPair.includes(card.id)) return;

    // First card selected
    if (!selectedCardId) {
      setSelectedCardId(card.id);
      if (card.type === 'term') {
        speakWord(card.spokenText);
      }
      return;
    }

    // Clicked the same card again
    if (selectedCardId === card.id) {
      setSelectedCardId(null);
      return;
    }

    // Second card selected -> Check match!
    const firstCard = cards.find(c => c.id === selectedCardId);
    if (!firstCard) return;

    if (firstCard.pairId === card.pairId) {
      // MATCH!
      const newMatched = new Set(matchedIds);
      newMatched.add(firstCard.id);
      newMatched.add(card.id);
      setMatchedIds(newMatched);
      setSelectedCardId(null);
      speakWord(card.spokenText);

      // Check if all pairs matched
      if (newMatched.size === cards.length) {
        // VICTORY!
        clearInterval(timerRef.current);
        const finalSeconds = Number(((Date.now() - startTimeRef.current) / 1000).toFixed(1));
        setCurrentScore(finalSeconds);
        const updatedLb = recordMatchScore(setId, finalSeconds);
        setLeaderboard(updatedLb);
        setGameState('completed');
        triggerCelebration();
      }
    } else {
      // WRONG PAIR!
      setWrongPair([firstCard.id, card.id]);
      setSelectedCardId(null);
      setTimeout(() => {
        setWrongPair([]);
      }, 500);
    }
  };

  const formattedTime = (elapsedTime / 10).toFixed(1);

  // Intro Screen
  if (gameState === 'intro') {
    return (
      <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-8 sm:p-12 text-center max-w-xl mx-auto my-6 animate-pop-in">
        <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xs border border-amber-200/60">
          <Flame size={44} />
        </div>
        
        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
          Ghép thẻ (Match Game)
        </h2>
        
        <p className="text-gray-600 text-sm sm:text-base mb-8 max-w-md mx-auto">
          Làm biến mất tất cả các thẻ bằng cách ghép thuật ngữ tiếng Anh với nghĩa tiếng Việt tương ứng càng nhanh càng tốt!
        </p>

        {leaderboard.length > 0 && (
          <div className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-4 mb-8 text-left">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
              <Trophy size={14} className="text-amber-500" />
              <span>Kỷ lục cá nhân nhanh nhất</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-amber-600">{leaderboard[0].score}s</span>
              <span className="text-xs text-gray-500">{leaderboard[0].date}</span>
            </div>
          </div>
        )}

        <button
          onClick={startGame}
          className="px-8 py-4 bg-primary hover:bg-primary-container text-white font-extrabold text-base rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 mx-auto"
        >
          <Play size={20} className="fill-white" />
          <span>Bắt đầu ghép thẻ</span>
        </button>
      </div>
    );
  }

  // Victory / Completed Screen
  if (gameState === 'completed') {
    return (
      <div className="bg-white rounded-3xl border border-gray-200/90 shadow-md p-8 sm:p-12 text-center max-w-xl mx-auto my-6 animate-pop-in">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
          <Trophy size={44} />
        </div>

        <h2 className="text-3xl font-black text-gray-900 mb-1">
          Hoàn thành xuất sắc!
        </h2>
        <p className="text-sm text-gray-500 mb-6">Bạn đã ghép đúng tất cả các cặp từ</p>

        {/* Score display */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200/80 rounded-2xl p-6 mb-6">
          <span className="text-xs uppercase font-bold text-primary tracking-wider">Thời gian kỷ lục</span>
          <p className="text-4xl sm:text-5xl font-black text-primary my-1">
            {currentScore} <span className="text-2xl font-medium text-gray-500">giây</span>
          </p>
        </div>

        {/* Leaderboard list */}
        {leaderboard.length > 0 && (
          <div className="bg-gray-50 rounded-2xl p-4 mb-8 text-left border border-gray-100">
            <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Trophy size={14} className="text-amber-500" />
              <span>Bảng thành tích gần đây</span>
            </h4>
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {leaderboard.slice(0, 5).map((rec, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-white border border-gray-100">
                  <span className="font-semibold text-gray-700">#{i + 1}. {rec.score}s</span>
                  <span className="text-gray-400">{rec.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={startGame}
            className="px-6 py-3 bg-primary hover:bg-primary-container text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            <span>Chơi lại ván mới</span>
          </button>
        </div>
      </div>
    );
  }

  // Active Game Screen
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Stopwatch & Info Bar */}
      <div className="flex items-center justify-between bg-white border border-gray-200/80 rounded-2xl px-5 py-3 mb-6 shadow-xs">
        <div className="flex items-center gap-2">
          <Timer size={20} className="text-primary animate-pulse" />
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Thời gian:</span>
          <span className="text-xl font-black text-primary font-mono">{formattedTime}s</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 font-medium">
            Đã ghép: <span className="font-bold text-emerald-600">{matchedIds.size / 2}</span> / {cards.length / 2}
          </span>
          <button
            onClick={startGame}
            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
            title="Bắt đầu lại ván này"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((card) => {
          const isMatched = matchedIds.has(card.id);
          const isSelected = selectedCardId === card.id;
          const isWrong = wrongPair.includes(card.id);

          // If matched, show transparent / hidden placeholder
          if (isMatched) {
            return (
              <div 
                key={card.id}
                className="h-28 sm:h-32 rounded-2xl border-2 border-dashed border-gray-200/40 opacity-0 pointer-events-none transition-all duration-300"
              />
            );
          }

          let cardClasses = 'bg-white border-2 border-gray-200 hover:border-primary/50 text-gray-800 shadow-sm';
          if (isSelected) {
            cardClasses = 'bg-blue-50/90 border-2 border-primary ring-2 ring-primary/20 text-primary font-bold shadow-md scale-[1.02]';
          } else if (isWrong) {
            cardClasses = 'bg-rose-50 border-2 border-rose-400 text-rose-800 animate-shake';
          }

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`h-28 sm:h-32 p-4 rounded-2xl transition-all duration-200 flex flex-col justify-center items-center text-center cursor-pointer select-none ${cardClasses}`}
            >
              <span className={`text-xs uppercase font-semibold mb-1 ${card.type === 'term' ? 'text-primary/70' : 'text-emerald-700/70'}`}>
                {card.type === 'term' ? 'Thuật ngữ' : 'Định nghĩa'}
              </span>
              <p className="text-sm sm:text-base font-bold line-clamp-3 leading-snug">
                {card.text}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
