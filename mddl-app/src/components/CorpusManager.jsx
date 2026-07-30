import React, { useState } from 'react';
import { Upload, Database, ArrowLeft, Trash2 } from 'lucide-react';
import { parseXMLCorpus } from '../utils/xmlParser';
import { logUserAction } from '../utils/logger';

export default function CorpusManager({ onNavigate, onCorpusLoaded, customCorpus }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsProcessing(true);
    let allSentences = [...customCorpus];

    try {
      for (const file of files) {
        if (file.name.endsWith('.xml')) {
          logUserAction('UPLOAD_CORPUS_FILE', { filename: file.name });
          const sentences = await parseXMLCorpus(file);
          allSentences = [...allSentences, ...sentences];
        }
      }
      onCorpusLoaded(allSentences);
    } catch (error) {
      console.error("Error parsing corpus:", error);
      alert("There was an error parsing the XML files.");
    } finally {
      setIsProcessing(false);
    }
  };

  const clearCorpus = () => {
    if (confirm("Are you sure you want to clear all loaded custom corpora?")) {
      logUserAction('CLEAR_CUSTOM_CORPUS');
      onCorpusLoaded([]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface">
      <header className="bg-primary text-on-primary p-4 shadow-sm flex items-center shrink-0">
        <button onClick={() => onNavigate('home')} className="p-2 mr-2 hover:bg-primary-container rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold flex-1">Corpus Manager</h1>
      </header>

      <div className="p-6 flex-1 overflow-y-auto">
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm mb-6">
          <h2 className="text-lg font-bold text-primary mb-4 flex items-center">
            <Upload className="w-5 h-5 mr-2" /> Upload XML Corpus
          </h2>
          <p className="text-on-surface-variant mb-4 text-sm">
            Load standard XML corpus files. The application will extract all sentences and POS tags so you can search them.
          </p>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-primary-container/10 hover:bg-primary-container/20 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-primary" />
                <p className="mb-2 text-sm text-primary font-semibold">
                  {isProcessing ? "Processing..." : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-on-surface-variant">XML files only</p>
              </div>
              <input type="file" className="hidden" multiple accept=".xml" onChange={handleFileUpload} disabled={isProcessing} />
            </label>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-primary flex items-center">
              <Database className="w-5 h-5 mr-2" /> Loaded Data
            </h2>
            {customCorpus.length > 0 && (
              <button onClick={clearCorpus} className="text-error hover:bg-error-container p-2 rounded-lg transition-colors flex items-center text-sm font-semibold">
                <Trash2 className="w-4 h-4 mr-1" /> Clear All
              </button>
            )}
          </div>
          
          {customCorpus.length === 0 ? (
            <p className="text-on-surface-variant text-sm text-center py-4">No custom corpus data loaded.</p>
          ) : (
            <div>
              <p className="text-on-surface mb-2"><strong>Total Sentences:</strong> {customCorpus.length.toLocaleString()}</p>
              <p className="text-on-surface-variant text-sm">
                You can now return to the Home screen and search. Results from your uploaded corpus will be included.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
