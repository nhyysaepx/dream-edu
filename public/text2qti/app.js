let pyodideReadyPromise;
let convertToBase64Func;

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const statusContainer = document.getElementById('status-container');
    const resultContainer = document.getElementById('result-container');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    const resetBtn = document.getElementById('reset-btn');
    const loadingOverlay = document.getElementById('loading-overlay');

    // Initialize Pyodide
    async function initPyodide() {
        try {
            let pyodide = await loadPyodide();
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
            convertToBase64Func = pyodide.globals.get('convert_to_base64');
            
            // Hide loading overlay
            loadingOverlay.classList.add('hidden');
        } catch (error) {
            console.error("Pyodide initialization failed:", error);
            loadingOverlay.innerHTML = `
                <div style="text-align:center; padding: 20px;">
                    <h2 style="color:var(--error);">Failed to load Python Engine</h2>
                    <p>${error.message}</p>
                </div>
            `;
        }
    }
    
    // Start initialization immediately
    pyodideReadyPromise = initPyodide();

    // Drag and Drop Handlers
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('dragover');
        }, false);
    });

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    });

    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        if (files.length === 0) return;
        const file = files[0];
        
        // Basic validation
        const lowerName = file.name.toLowerCase();
        if (!lowerName.endsWith('.txt') && !lowerName.endsWith('.md') && !lowerName.endsWith('.rtf')) {
            showResult(false, 'Please select a .txt, .md, or .rtf file.');
            return;
        }

        // Switch UI state
        dropZone.classList.add('hidden');
        statusContainer.classList.remove('hidden');

        // Read file contents
        const reader = new FileReader();
        reader.onload = async (e) => {
            const textContent = e.target.result;
            const filename = file.name;
            const isRtf = lowerName.endsWith('.rtf');
            
            try {
                // Ensure pyodide is ready (should be, but just in case)
                await pyodideReadyPromise;
                
                // Call Python function directly in browser
                const base64Zip = convertToBase64Func(textContent, filename, isRtf);
                
                // Convert base64 to Blob
                const byteCharacters = atob(base64Zip);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], {type: "application/zip"});
                
                // Create download link
                const downloadUrl = URL.createObjectURL(blob);
                const downloadName = filename.substring(0, filename.lastIndexOf('.')) + '.zip';
                
                // Auto-trigger download
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = downloadName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(downloadUrl);
                
                statusContainer.classList.add('hidden');
                showResult(true, `Success! File converted and downloaded as: ${downloadName}`);
            } catch (error) {
                console.error("Conversion error:", error);
                statusContainer.classList.add('hidden');
                // Extract python error message if available
                let errorMsg = error.message || "Failed to convert file.";
                if (errorMsg.includes('Text2qtiError')) {
                    errorMsg = errorMsg.split('Text2qtiError:')[1].split('\n')[0].trim();
                }
                showResult(false, "Error: " + errorMsg);
            }
        };
        
        reader.onerror = () => {
            statusContainer.classList.add('hidden');
            showResult(false, 'Failed to read the file.');
        };

        reader.readAsText(file);
    }

    function showResult(success, message) {
        resultContainer.classList.remove('hidden');
        resultTitle.textContent = success ? 'Conversion Successful!' : 'Conversion Failed';
        resultTitle.style.color = success ? 'var(--success)' : 'var(--error)';
        
        resultMessage.textContent = message;
        if (!success) {
            resultMessage.classList.add('error-text');
            document.querySelector('.success-icon svg').innerHTML = '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>';
            document.querySelector('.success-icon svg').setAttribute('stroke', 'var(--error)');
        } else {
            resultMessage.classList.remove('error-text');
            document.querySelector('.success-icon svg').innerHTML = '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>';
            document.querySelector('.success-icon svg').setAttribute('stroke', 'var(--success)');
        }
    }

    resetBtn.addEventListener('click', () => {
        resultContainer.classList.add('hidden');
        dropZone.classList.remove('hidden');
        fileInput.value = '';
    });
});
