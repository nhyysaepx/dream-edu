import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Search, Network } from 'lucide-react';
import { logUserAction } from '../utils/logger';
import mockCorpus from '../data/mockCorpus.json';
import ExpandedContext from './ExpandedContext';
import CollocationGraph from './CollocationGraph';

export default function SearchExplorer({ initialQuery, onNavigate, onSave, savedMWEs, customCorpus = [] }) {
  const [query, setQuery] = useState(initialQuery || '');
  const [viewMode, setViewMode] = useState('KWIC'); // 'KWIC' or 'FULL'
  const [results, setResults] = useState([]);
  const [selectedMwe, setSelectedMwe] = useState(null);
  const [showGraph, setShowGraph] = useState(false);

  // Perform search
  useEffect(() => {
    if (query) {
      logUserAction('EXECUTE_SEARCH', { query, mode: viewMode });
      const lowerQuery = query.toLowerCase();
      const filtered = mockCorpus.filter(item => 
        item.keyword.toLowerCase() === lowerQuery || 
        (item.mwe && item.mwe.toLowerCase().includes(lowerQuery)) ||
        (item.mwe_type && item.mwe_type.toLowerCase().includes(lowerQuery)) ||
        item.sentence.toLowerCase().includes(lowerQuery)
      );

      const customFiltered = customCorpus.filter(item => 
        item.sentenceText.toLowerCase().includes(lowerQuery)
      ).map(item => {
        const matchIndex = item.sentenceText.toLowerCase().indexOf(lowerQuery);
        const left_context = item.sentenceText.substring(0, matchIndex);
        const right_context = item.sentenceText.substring(matchIndex + query.length);
        
        return {
          id: item.id,
          keyword: query,
          mwe: query,
          mwe_type: 'XML CORPUS',
          sentence: item.sentenceText,
          left_context,
          right_context,
          source: item.source,
          translation: 'N/A',
          definition: `Found in custom corpus file: ${item.source}`,
          collocates: [],
          meaning_options: []
        };
      });

      setResults([...filtered, ...customFiltered]);
    } else {
      setResults([]);
    }
  }, [query, viewMode]);

  const handleResultClick = (item) => {
    logUserAction('VIEW_EXPANDED_CONTEXT', { mwe: item.mwe });
    setSelectedMwe(item);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is handled by useEffect when query changes, 
    // but we can log the explicit submit here
    logUserAction('SEARCH_SUBMIT_EXPLORER', { query });
  };

  return (
    <div className="flex flex-col h-full bg-surface relative">
      {/* Header */}
      <header className="bg-primary text-on-primary p-4 shadow-sm flex items-center shrink-0">
        <button onClick={() => onNavigate('home')} className="p-2 mr-2 hover:bg-primary-container rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <form onSubmit={handleSearchSubmit} className="flex-1 relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-on-primary-container pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-20 bg-primary-container/50 border border-primary-container rounded-full text-on-primary placeholder-on-primary-container focus:outline-none focus:ring-2 focus:ring-secondary-container"
            placeholder="Search corpus..."
          />
          <button 
            type="submit"
            className="absolute right-1 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-sm font-semibold hover:bg-secondary-fixed transition-colors"
          >
            Search
          </button>
        </form>
      </header>

      {/* Toolbar */}
      <div className="p-4 border-b border-outline-variant flex justify-between items-center shrink-0">
        <div className="bg-surface-container-highest p-1 rounded-lg flex space-x-1">
          <button
            onClick={() => {
              setViewMode('KWIC');
              logUserAction('TOGGLE_VIEW', { mode: 'KWIC' });
            }}
            className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-all ${
              viewMode === 'KWIC' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            KWIC View
          </button>
          <button
            onClick={() => {
              setViewMode('FULL');
              logUserAction('TOGGLE_VIEW', { mode: 'FULL' });
            }}
            className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-all ${
              viewMode === 'FULL' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Full Sentence
          </button>
        </div>
        
        {results.length > 0 && (
          <button
            onClick={() => setShowGraph(true)}
            className="flex items-center text-sm font-semibold text-secondary-container hover:text-secondary-fixed transition-colors bg-primary p-2 rounded-lg"
          >
            <Network className="w-4 h-4 mr-1" /> Graph
          </button>
        )}
      </div>

      {/* Results Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 text-on-surface-variant">
            <Search className="w-12 h-12 mb-4 opacity-20" />
            <p>No results found for "{query}".</p>
            <p className="text-sm mt-2">Try searching for "research", "conclusions", or "impact".</p>
          </div>
        ) : (
          results.map((item) => (
            <div 
              key={item.id} 
              onClick={() => handleResultClick(item)}
              className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm hover:shadow-diffused cursor-pointer transition-all"
            >
              {item.mwe_type && (
                <div className="mb-3">
                  <span className="text-[10px] font-bold bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {item.mwe_type}
                  </span>
                </div>
              )}
              {viewMode === 'KWIC' ? (
                <div className="flex text-sm font-mono leading-relaxed">
                  <div className="flex-1 text-right truncate text-on-surface-variant pr-2">
                    {item.left_context}
                  </div>
                  <div className="font-bold text-secondary bg-secondary-container/20 px-1 rounded">
                    {query.toLowerCase() === item.keyword ? item.keyword : item.mwe}
                  </div>
                  <div className="flex-1 text-left truncate text-on-surface-variant pl-2">
                    {item.right_context}
                  </div>
                </div>
              ) : (
                <div className="text-on-surface leading-relaxed text-sm">
                  {/* Highlight the MWE in full sentence view */}
                  {item.sentence.split(new RegExp(`(${item.mwe})`, 'gi')).map((part, i) => 
                    part.toLowerCase() === item.mwe.toLowerCase() ? (
                      <span key={i} className="font-bold text-secondary bg-secondary-container/20 px-1 rounded">{part}</span>
                    ) : part
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Expanded Context Modal */}
      {selectedMwe && (
        <ExpandedContext 
          data={selectedMwe} 
          onClose={() => setSelectedMwe(null)} 
          onSave={() => onSave(selectedMwe)}
          isSaved={savedMWEs.some(saved => saved.id === selectedMwe.id)}
        />
      )}

      {/* Collocation Graph Modal */}
      {showGraph && (
        <CollocationGraph 
          keyword={query}
          results={results}
          onClose={() => setShowGraph(false)}
          onNodeClick={(word) => {
            setQuery(word);
            setShowGraph(false);
          }}
        />
      )}
    </div>
  );
}
