// Main UI and State Management
let state = {
    questions: [],
    currentIndex: 0,
    score: 0,
    wrongAnswers: {}, // To track weak areas
    accent: 'en-US'
};

document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const body = document.documentElement;
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
        } else {
            body.setAttribute('data-theme', 'dark');
        }
    });

    // Teacher View Interactions
    document.getElementById('btn-paste').addEventListener('click', () => {
        document.getElementById('vocab-input').value = "study\ncomputer\nculture\nmusic\nunderstand\nhistory\nvillage\nteacher\nlaugh\nthrough\nenough\nphysics\nwanted\nbooks\ndogs";
    });

    document.getElementById('btn-clear').addEventListener('click', () => {
        document.getElementById('vocab-input').value = "";
    });

    document.getElementById('btn-generate').addEventListener('click', async () => {
        const text = document.getElementById('vocab-input').value;
        const words = text.split('\n').map(w => w.trim()).filter(w => w.length > 0);
        
        if (words.length === 0) {
            alert("Please enter some vocabulary.");
            return;
        }

        const type = document.getElementById('setting-type').value;
        state.accent = document.getElementById('setting-accent').value;
        
        const btn = document.getElementById('btn-generate');
        const status = document.getElementById('generation-status');
        
        btn.disabled = true;
        status.classList.remove('hidden');

        // Simulate AI generation time for UX
        await new Promise(r => setTimeout(r, 800));
        
        // Generate Questions
        const questions = await generateQuizFromWords(words, type);
        
        if (questions.length === 0) {
            alert("Could not generate questions. Try pasting the example list to see supported words.");
            btn.disabled = false;
            status.classList.add('hidden');
            return;
        }

        // Initialize state
        state.questions = questions;
        state.currentIndex = 0;
        state.score = 0;
        state.wrongAnswers = {};
        
        btn.disabled = false;
        status.classList.add('hidden');
        
        switchView('view-student');
        loadQuestion();
    });

    // Student View Interactions
    document.getElementById('btn-next').addEventListener('click', () => {
        state.currentIndex++;
        if (state.currentIndex >= state.questions.length) {
            showResults();
        } else {
            loadQuestion();
        }
    });

    document.getElementById('btn-quit').addEventListener('click', () => {
        if(confirm("Are you sure you want to exit the quiz?")) {
            switchView('view-teacher');
        }
    });

    // Results View
    document.getElementById('btn-restart').addEventListener('click', () => {
        state.currentIndex = 0;
        state.score = 0;
        state.wrongAnswers = {};
        switchView('view-student');
        loadQuestion();
    });

    document.getElementById('btn-new-quiz').addEventListener('click', () => {
        switchView('view-teacher');
    });
});

function switchView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active', 'hidden'));
    document.querySelectorAll('.view').forEach(v => {
        if (v.id === viewId) v.classList.add('active');
        else v.classList.add('hidden');
    });
}

function loadQuestion() {
    const q = state.questions[state.currentIndex];
    
    // Update Stats
    document.getElementById('stat-progress').innerText = `Question ${state.currentIndex + 1} / ${state.questions.length}`;
    document.getElementById('stat-score').innerText = `Score: ${state.score}`;
    
    const progressFill = document.getElementById('progress-bar-fill');
    progressFill.style.width = `${(state.currentIndex / state.questions.length) * 100}%`;
    progressFill.style.backgroundColor = 'var(--color-primary-container)'; // reset color

    document.getElementById('question-text').innerText = q.questionText;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D'];
    
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('div');
        btn.className = 'option-btn';
        
        // Underline the focus part
        let displayWord = opt.word;
        if (opt.focus) {
            // Simple replace first occurrence (in a real app, Regex with word boundaries)
            displayWord = displayWord.replace(opt.focus, `<u>${opt.focus}</u>`);
        }
        
        btn.innerHTML = `
            <div class="option-letter">${letters[idx]}</div>
            <div class="option-word">${displayWord}</div>
            <button class="audio-btn material-symbols-outlined" title="Play pronunciation">volume_up</button>
        `;
        
        btn.addEventListener('click', (e) => {
            if (e.target.closest('.audio-btn')) {
                playAudio(opt.word);
                e.stopPropagation();
                return;
            }
            if (btn.classList.contains('disabled')) return;
            handleAnswer(idx, q.correctIndex, btn);
        });
        
        optionsContainer.appendChild(btn);
    });
    
    document.getElementById('feedback-panel').classList.add('hidden');
}

function handleAnswer(selectedIndex, correctIndex, btnElement) {
    const options = document.querySelectorAll('.option-btn');
    options.forEach(opt => opt.classList.add('disabled'));
    
    const isCorrect = selectedIndex === correctIndex;
    const progressFill = document.getElementById('progress-bar-fill');
    const q = state.questions[state.currentIndex];
    
    if (isCorrect) {
        btnElement.classList.add('correct');
        state.score++;
        progressFill.style.backgroundColor = 'var(--color-success)';
        showFeedback(true, q);
    } else {
        btnElement.classList.add('incorrect');
        options[correctIndex].classList.add('correct');
        progressFill.style.backgroundColor = 'var(--color-error)';
        
        // Track weak areas
        if (!state.wrongAnswers[q.type]) state.wrongAnswers[q.type] = 0;
        state.wrongAnswers[q.type]++;
        
        showFeedback(false, q);
    }
    
    document.getElementById('stat-score').innerText = `Score: ${state.score}`;
}

function showFeedback(isCorrect, question) {
    const panel = document.getElementById('feedback-panel');
    const title = document.getElementById('feedback-title');
    const icon = document.getElementById('feedback-icon');
    const body = document.getElementById('feedback-body');
    
    panel.classList.remove('hidden');
    panel.parentElement.classList.remove('correct', 'incorrect');
    
    if (isCorrect) {
        title.innerText = 'Correct!';
        title.parentElement.className = 'feedback-header correct';
        icon.innerText = 'check_circle';
    } else {
        title.innerText = 'Incorrect';
        title.parentElement.className = 'feedback-header incorrect';
        icon.innerText = 'cancel';
    }
    
    let tip = ``;
    if (!isCorrect) {
        tip = `<div class="mistake-box"><strong>Common mistake:</strong> Vietnamese learners often struggle with ${question.type === 'ed' ? 'endings' : 'this sound'}. Pay close attention to the final consonant or vowel purity.</div>`;
    }
    
    body.innerHTML = `
        <p>${question.explanation}</p>
        ${tip}
    `;
    
    // Auto scroll down to feedback
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showResults() {
    switchView('view-results');
    
    document.getElementById('final-score').innerText = `${state.score} / ${state.questions.length}`;
    
    const accuracy = Math.round((state.score / state.questions.length) * 100);
    document.getElementById('final-accuracy').innerText = `${accuracy}%`;
    
    const weakPanel = document.getElementById('weak-areas-panel');
    const weakList = document.getElementById('weak-areas-list');
    
    if (Object.keys(state.wrongAnswers).length > 0) {
        weakPanel.classList.remove('hidden');
        weakList.innerHTML = '';
        for (let type in state.wrongAnswers) {
            let li = document.createElement('li');
            li.innerText = `${type.toUpperCase()} pronunciation (${state.wrongAnswers[type]} mistakes)`;
            weakList.appendChild(li);
        }
    } else {
        weakPanel.classList.add('hidden');
    }
}

// Simple text-to-speech fallback
function playAudio(word) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Fix stuck speaker
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = state.accent || 'en-US';
        // Adjust properties for clearer pronunciation
        utterance.rate = 0.85; 
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Audio playback is not supported in this browser.");
    }
}
