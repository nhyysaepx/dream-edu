// AI Rule Engine for Pronunciation Generation

const API_BASE = "https://api.dictionaryapi.dev/api/v2/entries/en/";

/**
 * Main AI function: Takes a list of words and generates a full quiz array
 */
async function generateQuizFromWords(wordsList, preferredType) {
  let questions = [];
  
  for (let w of wordsList) {
    let cleanWord = w.toLowerCase().trim();
    if (!cleanWord) continue;
    
    let data = IPA_DICTIONARY[cleanWord];
    if (!data) {
        let inferred = inferSimpleRules(cleanWord);
        if (inferred) {
            data = inferred;
            IPA_DICTIONARY[cleanWord] = data;
        } else {
            // Fallback: Find the first vowel to use as focus
            let match = cleanWord.match(/[aeiou]/);
            let focus = match ? match[0] : cleanWord.charAt(0);
            data = { ipa: "...", type: "vowel", focus: focus, sound: "unknown_" + cleanWord, rule: "Pronunciation inferred." };
            IPA_DICTIONARY[cleanWord] = data;
        }
    }
    
    let target = { word: cleanWord, ...data };
    
    // Find distractors based on target
    let possibleDistractors = Object.keys(IPA_DICTIONARY)
        .map(k => ({word: k, ...IPA_DICTIONARY[k]}))
        .filter(d => d.type === target.type && d.sound !== target.sound && d.word !== target.word && d.focus === target.focus);
        
    let distractorsBySound = {};
    possibleDistractors.forEach(d => {
        if (!distractorsBySound[d.sound]) distractorsBySound[d.sound] = [];
        distractorsBySound[d.sound].push(d);
    });
    
    // Find a group of exactly 3 distractors with the SAME sound
    let validSoundGroups = Object.keys(distractorsBySound).filter(s => distractorsBySound[s].length >= 3);
    
    let options = [];
    let selectedSound = "different sound";
    
    if (validSoundGroups.length > 0) {
        // Perfect scenario: 3 distractors with same sound
        selectedSound = validSoundGroups[Math.floor(Math.random() * validSoundGroups.length)];
        let distractors = distractorsBySound[selectedSound].sort(() => 0.5 - Math.random()).slice(0, 3);
        options = [target, ...distractors].sort(() => 0.5 - Math.random());
    } else {
        // Fallback scenario: just pick ANY 3 distractors with same focus, regardless of matching sounds
        if (possibleDistractors.length >= 3) {
            let distractors = possibleDistractors.sort(() => 0.5 - Math.random()).slice(0, 3);
            options = [target, ...distractors].sort(() => 0.5 - Math.random());
            selectedSound = "various sounds";
        } else {
            // Absolute fallback: pick 3 random words from the whole dictionary
            let anyDistractors = Object.keys(IPA_DICTIONARY)
                .map(k => ({word: k, ...IPA_DICTIONARY[k]}))
                .filter(d => d.word !== target.word)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);
            options = [target, ...anyDistractors].sort(() => 0.5 - Math.random());
        }
    }
    
    let correctIndex = options.findIndex(o => o.word === target.word);
    
    let questionText = `Choose the word whose underlined part is pronounced differently.`;
    if (target.type === 'stress') questionText = `Choose the word with a different stress pattern.`;
    
    let explanationText = "";
    if (target.sound.startsWith("unknown_")) {
        explanationText = `The targeted part in <strong>${target.word}</strong> is pronounced differently from the others.<br><br><strong>Note:</strong> The exact pronunciation of this word is inferred.`;
    } else {
        explanationText = `The targeted part in <strong>${target.word}</strong> is pronounced <span class="ipa-text">/${target.sound}/</span>, while the others are pronounced differently.<br><br><strong>Rule:</strong> ${target.rule}`;
    }
    
    questions.push({
        type: target.type,
        questionText: questionText,
        options: options,
        correctIndex: correctIndex,
        explanation: explanationText
    });
  }

  return questions;
}

/**
 * Simple heuristics for common suffixes if not in dictionary
 */
function inferSimpleRules(word) {
    if (word.endsWith('ed')) {
        let base = word.slice(0, -2);
        if (base.endsWith('t') || base.endsWith('d')) {
            return { ipa: "", type: "ed", focus: "ed", sound: "ɪd", rule: "'-ed' is /ɪd/ after 't' or 'd'." };
        } else if (base.endsWith('p') || base.endsWith('k') || base.endsWith('f') || base.endsWith('sh') || base.endsWith('ch')) {
            return { ipa: "", type: "ed", focus: "ed", sound: "t", rule: "'-ed' is /t/ after unvoiced sounds." };
        } else {
            return { ipa: "", type: "ed", focus: "ed", sound: "d", rule: "'-ed' is /d/ after voiced sounds." };
        }
    }
    if (word.endsWith('s') && !word.endsWith('ss') && !word.endsWith('ous')) {
        let base = word.slice(0, -1);
        if (base.endsWith('p') || base.endsWith('t') || base.endsWith('k') || base.endsWith('f')) {
            return { ipa: "", type: "s", focus: "s", sound: "s", rule: "'-s' is /s/ after unvoiced consonants." };
        } else if (base.endsWith('s') || base.endsWith('z') || base.endsWith('sh') || base.endsWith('ch') || base.endsWith('ge')) {
             return { ipa: "", type: "s", focus: "es", sound: "ɪz", rule: "'-es' is /ɪz/ after sibilant sounds." };
        } else {
            return { ipa: "", type: "s", focus: "s", sound: "z", rule: "'-s' is /z/ after voiced sounds." };
        }
    }
    return null;
}
