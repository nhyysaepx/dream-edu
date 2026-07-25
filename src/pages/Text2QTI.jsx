import React, { useState, useEffect, useRef } from 'react';
import './Text2QTI.css';

export default function Text2QTI() {
    const [isLoadingEngine, setIsLoadingEngine] = useState(true);
    const [engineError, setEngineError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState({ show: false, success: false, message: '' });
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);
    
    // We need to keep a reference to the pyodide convertToBase64Func
    const convertFuncRef = useRef(null);

    useEffect(() => {
        const initPyodide = async () => {
            try {
                let pyodide = await window.loadPyodide();
                await pyodide.loadPackage("micropip");
                const micropip = pyodide.pyimport("micropip");
                
                // Install packages
                await micropip.install("text2qti");
                await micropip.install("striprtf");
                
                // Define the python conversion wrapper
                await pyodide.runPythonAsync(`
import base64
from text2qti.quiz import Quiz
from text2qti.qti import QTI
from text2qti.config import Config

def convert_to_base64(text_content, filename, is_rtf):
    if is_rtf:
        from striprtf.striprtf import rtf_to_text
        text_content = rtf_to_text(text_content)
        
    config = Config()
    config.load()
    quiz = Quiz(text_content, config=config, source_name=filename)
    qti = QTI(quiz)
    
    # Save to Pyodide's in-memory virtual file system
    qti.save('output.zip')
    
    with open('output.zip', 'rb') as f:
        return base64.b64encode(f.read()).decode('utf-8')
                `);
                
                // Get the python function reference
                convertFuncRef.current = pyodide.globals.get('convert_to_base64');
                setIsLoadingEngine(false);
            } catch (error) {
                console.error("Pyodide initialization failed:", error);
                setEngineError(error.message);
                setIsLoadingEngine(false);
            }
        };

        if (window.loadPyodide) {
            initPyodide();
        } else {
            // Dynamically load pyodide script
            const script = document.createElement('script');
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
            script.async = true;
            
            script.onload = () => {
                initPyodide();
            };

            script.onerror = () => {
                setEngineError("Failed to load Pyodide script.");
                setIsLoadingEngine(false);
            };

            document.body.appendChild(script);
            
            return () => {
                // don't remove script, pyodide might be used later or takes time to load
            };
        }
    }, []);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleFiles = (files) => {
        if (files.length === 0) return;
        const file = files[0];
        
        // Basic validation
        const lowerName = file.name.toLowerCase();
        if (!lowerName.endsWith('.txt') && !lowerName.endsWith('.md') && !lowerName.endsWith('.rtf')) {
            setResult({ show: true, success: false, message: 'Please select a .txt, .md, or .rtf file.' });
            return;
        }

        setIsProcessing(true);
        setResult({ show: false, success: false, message: '' });

        const reader = new FileReader();
        reader.onload = async (e) => {
            const textContent = e.target.result;
            const filename = file.name;
            const isRtf = lowerName.endsWith('.rtf');
            
            try {
                if (!convertFuncRef.current) {
                    throw new Error("Python engine is not ready yet.");
                }
                
                const base64Zip = convertFuncRef.current(textContent, filename, isRtf);
                
                const byteCharacters = atob(base64Zip);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], {type: "application/zip"});
                
                const downloadUrl = URL.createObjectURL(blob);
                const downloadName = filename.substring(0, filename.lastIndexOf('.')) + '.zip';
                
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = downloadName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(downloadUrl);
                
                setIsProcessing(false);
                setResult({ show: true, success: true, message: `Success! File converted and downloaded as: ${downloadName}` });
            } catch (error) {
                console.error("Conversion error:", error);
                setIsProcessing(false);
                let errorMsg = error.message || "Failed to convert file.";
                if (errorMsg.includes('Text2qtiError')) {
                    errorMsg = errorMsg.split('Text2qtiError:')[1].split('\n')[0].trim();
                }
                setResult({ show: true, success: false, message: "Error: " + errorMsg });
            }
        };
        
        reader.onerror = () => {
            setIsProcessing(false);
            setResult({ show: true, success: false, message: 'Failed to read the file.' });
        };

        reader.readAsText(file);
    };

    return (
        <div className="text2qti-wrapper mt-16 pb-20">
            <div className="background-orbs">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
            </div>
            
            {isLoadingEngine && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <h2>Initializing Engine...</h2>
                    <p>Loading Python WebAssembly Environment. Please wait.</p>
                </div>
            )}
            
            {engineError && (
                <div className="loading-overlay" style={{opacity: 1, pointerEvents: 'auto'}}>
                    <div style={{textAlign: 'center', padding: '20px'}}>
                        <h2 style={{color: '#ef4444'}}>Failed to load Python Engine</h2>
                        <p>{engineError}</p>
                    </div>
                </div>
            )}

            <main className="glass-container">
                <header>
                    <div className="logo-box">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                    </div>
                    <h1>Text2QTI</h1>
                    <p className="subtitle">Convert your Markdown quizzes into Canvas QTI format effortlessly.</p>
                </header>

                {!isProcessing && !result.show && (
                    <section 
                        className={`drop-zone ${isDragOver ? 'dragover' : ''}`}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current.click()}
                    >
                        <div>
                            <svg className="upload-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                            <h3>Drag & Drop your .txt, .md, or .rtf file</h3>
                            <p>or click to browse</p>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                accept=".txt,.md,.rtf" 
                                style={{display: 'none'}} 
                                onChange={(e) => handleFiles(e.target.files)}
                            />
                        </div>
                    </section>
                )}

                {isProcessing && (
                    <section className="status-container">
                        <div className="loader"></div>
                        <p id="status-text">Processing your file...</p>
                    </section>
                )}

                {result.show && (
                    <section className="result-container">
                        <div className="success-icon">
                            {result.success ? (
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            ) : (
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                </svg>
                            )}
                        </div>
                        <h3 id="result-title" className={result.success ? 'success' : 'error'}>
                            {result.success ? 'Conversion Successful!' : 'Conversion Failed'}
                        </h3>
                        <p id="result-message" className={!result.success ? 'error-text' : ''}>{result.message}</p>
                        <button className="convert-btn" onClick={() => setResult({ show: false, success: false, message: '' })}>
                            Convert Another File
                        </button>
                    </section>
                )}
            </main>
        </div>
    );
}
