import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, Network } from 'lucide-react';
import { logUserAction } from '../utils/logger';

export default function CollocationGraph({ keyword, results, onClose, onNodeClick }) {
  // Extract unique collocates from results
  const collocates = useMemo(() => {
    const allColls = results.flatMap(r => r.collocates || []);
    // Count frequencies
    const counts = allColls.reduce((acc, curr) => {
      if (curr.toLowerCase() !== keyword.toLowerCase()) {
        acc[curr] = (acc[curr] || 0) + 1;
      }
      return acc;
    }, {});
    
    // Sort by frequency
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6) // top 6
      .map(([word, count]) => ({ word, count }));
  }, [results, keyword]);

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-surface">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-outline-variant bg-surface-container-lowest">
        <h3 className="font-bold text-primary flex items-center">
          <Network className="w-5 h-5 text-secondary-container mr-2" />
          Collocation Graph
        </h3>
        <button onClick={onClose} className="p-2 bg-surface-container rounded-full text-on-surface-variant hover:text-primary transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-center overflow-hidden relative bg-surface-container-low">
        <p className="text-center text-on-surface-variant mb-12">
          Most frequent words co-occurring with <strong className="text-primary">"{keyword}"</strong>
        </p>

        {/* Central Node */}
        <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold text-lg shadow-diffused z-10"
          >
            {keyword}
          </motion.div>

          {/* Surrounding Nodes */}
          {collocates.map((col, index) => {
            const angle = (index / collocates.length) * 2 * Math.PI;
            const radius = 120; // Distance from center
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={col.word}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{ opacity: 1, x, y }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className="absolute flex items-center justify-center"
              >
                {/* Connecting Line (SVG) */}
                <svg className="absolute w-full h-full" style={{ overflow: 'visible', zIndex: 0 }}>
                  <line 
                    x1={-x} y1={-y} x2={0} y2={0} 
                    stroke="#b0c7f1" 
                    strokeWidth="2" 
                    strokeDasharray="4 4"
                  />
                </svg>

                {/* Node */}
                <div 
                  className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full font-semibold text-sm shadow-sm z-10 relative cursor-pointer hover:bg-secondary-fixed transition-colors"
                  onClick={() => {
                    logUserAction('CLICK_COLLOCATE', { word: col.word });
                    if (onNodeClick) onNodeClick(col.word);
                  }}
                >
                  {col.word}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
