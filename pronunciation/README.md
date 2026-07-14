# Dream Pronunciation Lab

AI-assisted English Pronunciation Practice Module. Designed to be completely self-contained, 100% free, and powered by Vanilla HTML, CSS, and JavaScript. 

## Features
- **Teacher Input:** Paste any vocabulary list to automatically generate pronunciation questions.
- **Student Mode:** Interactive quizzes with instant feedback and audio playback using browser SpeechSynthesis API.
- **Rule Engine:** Built-in heuristics for English pronunciation rules (vowels, consonants, word stress, silent letters, -ed, -s/-es).
- **Explanation Panel:** Immediate CALL-based feedback explaining the phonetic rules and common Vietnamese learner mistakes.
- **Analytics:** Tracks accuracy and identifies weak pronunciation areas at the end of the quiz.

## File Structure
- `index.html`: The main user interface.
- `style.css`: Premium styling utilizing CSS variables and modern UI trends.
- `script.js`: Core application state and event listeners.
- `pronunciation-rules.js`: The algorithmic generation logic to create distractors and phonetic categorizations.
- `ipa-data.js`: A fallback phonetic dictionary to enable fully offline capabilities and rich distractor generation.

## Usage
Simply drop this folder into any static server or web hosting platform. Open `index.html` to begin. No build steps or backend needed.
