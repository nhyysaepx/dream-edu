import React, { useState } from 'react';
import { Search, BookMarked, Layers, BarChart2, Sparkles, Database, Beaker } from 'lucide-react';
import { logUserAction } from '../utils/logger';

export default function Home({ onNavigate, onSearch }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      logUserAction('SEARCH_SUBMIT', { query: searchInput });
      onSearch(searchInput.trim());
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface p-6 overflow-y-auto">
      {/* Header */}
      <header className="mb-8 mt-4">
        <h1 className="text-3xl font-bold text-primary mb-2">DreamLexi</h1>
        <p className="text-on-surface-variant">Your Corpus-Informed AI Tutor</p>
      </header>

      <div className="mb-8">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <Search className="absolute left-4 text-outline w-6 h-6 pointer-events-none" />
          <input
            type="text"
            placeholder="Search (e.g., 'carry out')"
            className="w-full py-4 pl-12 pr-28 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm focus:outline-none focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/50 transition-all text-on-surface text-lg"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute right-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* MWE of the Day */}
      <div className="bg-primary text-on-primary rounded-2xl p-6 mb-8 shadow-diffused relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-secondary-container rounded-full opacity-20 blur-xl"></div>
        <h2 className="text-sm font-semibold tracking-wider uppercase mb-1 text-secondary-container">MWE of the Day</h2>
        <h3 className="text-2xl font-bold mb-2">carry out research</h3>
        <p className="text-primary-container-on opacity-90 mb-4 text-sm leading-relaxed">
          Meaning: To do or complete a detailed study of a subject.
        </p>
        <button 
          onClick={() => onSearch('research')}
          className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg font-semibold text-sm hover:bg-secondary-fixed transition-colors"
        >
          Explore in Corpus
        </button>
      </div>

      {/* Quick Links */}
      <h3 className="text-lg font-bold text-primary mb-4">Quick Links</h3>
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => onNavigate('ai_tutor')}
          className="col-span-2 flex items-center bg-primary text-on-primary p-4 rounded-2xl shadow-md hover:bg-primary/90 transition-all group cursor-pointer mb-2"
        >
          <div className="p-3 bg-white/20 rounded-full mr-4">
            <Sparkles className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-left">
            <span className="font-semibold block text-lg">Ask AI Tutor</span>
            <span className="text-sm opacity-90">Get help with English grammar & vocabulary</span>
          </div>
        </button>

        <button 
          onClick={() => onNavigate('practice')}
          className="flex flex-col items-center justify-center bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-diffused transition-all group"
        >
          <BookMarked className="w-8 h-8 text-primary mb-3 group-hover:text-secondary-container transition-colors" />
          <span className="font-semibold text-on-surface">My Notebook</span>
        </button>
        <button 
          onClick={() => onNavigate('practice')}
          className="flex flex-col items-center justify-center bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-diffused transition-all group"
        >
          <Layers className="w-8 h-8 text-primary mb-3 group-hover:text-secondary-container transition-colors" />
          <span className="font-semibold text-on-surface">Flashcards</span>
        </button>
        <button 
          onClick={() => onNavigate('corpus-manager')}
          className="col-span-2 flex items-center bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-sm hover:shadow-diffused transition-all group cursor-pointer"
        >
          <div className="p-3 bg-surface-container rounded-full mr-4">
            <Database className="w-6 h-6 text-primary group-hover:text-secondary-container transition-colors" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-on-surface block">Corpus Manager</span>
            <span className="text-xs text-on-surface-variant">Upload and search XML corpus data</span>
          </div>
        </button>
        <button 
          onClick={() => onNavigate('lab_room')}
          className="col-span-2 flex items-center bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-sm hover:shadow-diffused transition-all group cursor-pointer"
        >
          <div className="p-3 bg-surface-container rounded-full mr-4">
            <Beaker className="w-6 h-6 text-primary group-hover:text-secondary-container transition-colors" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-on-surface block">Phòng Lab</span>
            <span className="text-xs text-on-surface-variant">Công cụ tạo giao diện bài đọc IELTS/TOEFL</span>
          </div>
        </button>
        <button 
          onClick={() => {
            logUserAction('VIEW_ANALYTICS');
            alert('Analytics feature is coming soon!');
          }}
          className="col-span-2 flex items-center bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-sm hover:shadow-diffused transition-all group cursor-pointer"
        >
          <div className="p-3 bg-surface-container rounded-full mr-4">
            <BarChart2 className="w-6 h-6 text-primary group-hover:text-secondary-container transition-colors" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-on-surface block">Analytics</span>
            <span className="text-xs text-on-surface-variant">Track your learning progress</span>
          </div>
        </button>
      </div>
    </div>
  );
}
