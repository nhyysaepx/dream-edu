// AI Rule Engine for Pronunciation Generation
// Uses local IPA_DICTIONARY and common heuristics to categorize words

const API_BASE = "https://api.dictionaryapi.dev/api/v2/entries/en/";

/**
 * Main AI function: Takes a list of words and generates a full quiz array
 */
async function generateQuizFromWords(wordsList, questionCount, preferredType) {
  let validWords = [];
  
  // 1. Enrich words with data (either from local dictionary or API fallback)
  for (let w of wordsList) {
    let cleanWord = w.toLowerCase().trim();
    if (!cleanWord) continue;
    
    let data = IPA_DICTIONARY[cleanWord];
    if (!data) {
        // Try to infer rules for -ed and -s even if not in dictionary
        let inferred = inferSimpleRules(cleanWord);
        if (inferred) {
            data = inferred;
            // add to dictionary to act as cache
            IPA_DICTIONARY[cleanWord] = data;
        }
    }
    
    if (data) {
        validWords.push({ word: cleanWord, ...data });
    }
  }

  // If we couldn't resolve enough words, pull random words from dictionary to pad
  if (validWords.length < 4) {
      let pool = Object.keys(IPA_DICTIONARY);
      while(validWords.length < 8 && pool.length > 0) {
          let randomWord = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
          if (!validWords.find(v => v.word === randomWord)) {
              validWords.push({ word: randomWord, ...IPA_DICTIONARY[randomWord] });
          }
      }
  }

  // 2. Group words by type
  let grouped = {
      vowel: validWords.filter(w => w.type === 'vowel'),
      consonant: validWords.filter(w => w.type === 'consonant'),
      ed: validWords.filter(w => w.type === 'ed'),
      s: validWords.filter(w => w.type === 's'),
      silent: validWords.filter(w => w.type === 'silent'),
      stress: validWords.filter(w => w.type === 'stress')
  };

  let questions = [];
  
  // 3. Generate Questions based on teacher preference
  let typesToUse = preferredType === 'mixed' ? Object.keys(grouped) : [preferredType];
  
  for (let i = 0; i < questionCount; i++) {
      // Pick a random available type
      let availableTypes = typesToUse.filter(t => grouped[t].length > 0);
      if (availableTypes.length === 0) {
          // If strict preference failed, fallback to mixed
          availableTypes = Object.keys(grouped).filter(t => grouped[t].length > 0);
      }
      if (availableTypes.length === 0) break; // Out of words
      
      let type = availableTypes[Math.floor(Math.random() * availableTypes.length)];
      
      let q = createQuestionForType(type, grouped[type], validWords);
      if (q) questions.push(q);
  }

  return questions;
}

/**
 * Creates a distractor-based question.
 * Needs 1 word of Sound A, and 3 words of Sound B (or vice versa).
 * The "odd one out" is the correct answer.
 */
function createQuestionForType(type, typeWords, allWords) {
    if (typeWords.length < 1) return null;
    
    // Pick a target word (the answer)
    let target = typeWords[Math.floor(Math.random() * typeWords.length)];
    
    // Find distractors from the entire dictionary of the same type, but DIFFERENT sound
    // Note: To make it a valid phonetic question, the other 3 MUST have the SAME sound as each other, and SAME focus.
    let possibleDistractors = Object.keys(IPA_DICTIONARY)
        .map(k => ({word: k, ...IPA_DICTIONARY[k]}))
        .filter(w => w.type === type && w.sound !== target.sound && w.word !== target.word && w.focus === target.focus);
        
    if (possibleDistractors.length < 3) return null; // Not enough data to form question
    
    // Group distractors by sound
    let distractorsBySound = {};
    possibleDistractors.forEach(d => {
        if (!distractorsBySound[d.sound]) distractorsBySound[d.sound] = [];
        distractorsBySound[d.sound].push(d);
    });
    
    // Find a sound group that has at least 3 words
    let validSoundGroups = Object.keys(distractorsBySound).filter(s => distractorsBySound[s].length >= 3);
    if (validSoundGroups.length === 0) return null;
    
    let selectedSound = validSoundGroups[Math.floor(Math.random() * validSoundGroups.length)];
    let distractors = distractorsBySound[selectedSound].sort(() => 0.5 - Math.random()).slice(0, 3);
    
    let options = [target, ...distractors].sort(() => 0.5 - Math.random());
    let correctIndex = options.findIndex(o => o.word === target.word);
    
    let questionText = `Choose the word whose underlined part is pronounced differently.`;
    if (type === 'stress') questionText = `Choose the word with a different stress pattern.`;
    
    return {
        type: type,
        questionText: questionText,
        options: options,
        correctIndex: correctIndex,
        explanation: `The targeted part in <strong>${target.word}</strong> is pronounced <span class="ipa-text">/${target.sound}/</span>, while the others are pronounced <span class="ipa-text">/${selectedSound}/</span>.<br><br><strong>Rule:</strong> ${target.rule}`
    };
}

/**
 * Simple heuristics for common suffixes if not in dictionary
 */
function inferSimpleRules(word) {
    if (word.endsWith('ed')) {
        let base = word.slice(0, -2);
        if (base.endsWith('t') || base.endsWith('d')) {
            return { ipa: "", type: "ed", focus: "ed", sound: "ɪd", rule: "'-ed' is pronounced /ɪd/ after 't' or 'd'." };
        } else if (base.endsWith('p') || base.endsWith('k') || base.endsWith('f') || base.endsWith('sh') || base.endsWith('ch')) {
            return { ipa: "", type: "ed", focus: "ed", sound: "t", rule: "'-ed' is pronounced /t/ after unvoiced consonants." };
        } else {
            return { ipa: "", type: "ed", focus: "ed", sound: "d", rule: "'-ed' is pronounced /d/ after voiced sounds." };
        }
    }
    if (word.endsWith('s') && !word.endsWith('ss')) {
        let base = word.slice(0, -1);
        if (base.endsWith('p') || base.endsWith('t') || base.endsWith('k') || base.endsWith('f')) {
            return { ipa: "", type: "s", focus: "s", sound: "s", rule: "'-s' is pronounced /s/ after unvoiced consonants." };
        } else if (base.endsWith('s') || base.endsWith('z') || base.endsWith('sh') || base.endsWith('ch') || base.endsWith('ge')) {
             return { ipa: "", type: "s", focus: "es", sound: "ɪz", rule: "'-es' is pronounced /ɪz/ after sibilant sounds." };
        } else {
            return { ipa: "", type: "s", focus: "s", sound: "z", rule: "'-s' is pronounced /z/ after voiced sounds and vowels." };
        }
    }
    return null;
}
