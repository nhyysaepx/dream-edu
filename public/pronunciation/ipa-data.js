// Fallback IPA dictionary for common words and distractors
// This enables offline or API-free distractor generation
const IPA_DICTIONARY = {
  "study": { ipa: "ˈstʌdi", type: "vowel", focus: "u", sound: "ʌ", rule: "Short 'u' sound /ʌ/." },
  "computer": { ipa: "kəmˈpjuːtər", type: "vowel", focus: "u", sound: "juː", rule: "When 'u' follows certain consonants, it is often pronounced /juː/." },
  "understand": { ipa: "ˌʌndərˈstænd", type: "vowel", focus: "u", sound: "ʌ", rule: "Short 'u' sound /ʌ/ at the beginning of a stressed or unstressed syllable." },
  "sunny": { ipa: "ˈsʌni", type: "vowel", focus: "u", sound: "ʌ", rule: "Short 'u' sound /ʌ/." },
  "culture": { ipa: "ˈkʌltʃər", type: "vowel", focus: "u", sound: "ʌ", rule: "Short 'u' sound /ʌ/." },
  "music": { ipa: "ˈmjuːzɪk", type: "vowel", focus: "u", sound: "juː", rule: "Pronounced /juː/ often after 'm'." },
  "teacher": { ipa: "ˈtiːtʃər", type: "vowel", focus: "ea", sound: "iː", rule: "The digraph 'ea' is usually pronounced /iː/." },
  "village": { ipa: "ˈvɪlɪdʒ", type: "vowel", focus: "a", sound: "ɪ", rule: "The 'a' in '-age' suffix is typically pronounced /ɪ/." },
  "laugh": { ipa: "læf", type: "consonant", focus: "gh", sound: "f", rule: "'gh' at the end of some words is pronounced /f/." },
  "enough": { ipa: "ɪˈnʌf", type: "consonant", focus: "gh", sound: "f", rule: "'gh' at the end of some words is pronounced /f/." },
  "through": { ipa: "θruː", type: "silent", focus: "gh", sound: "", rule: "'gh' is silent after 'u' and 'i'." },
  "physics": { ipa: "ˈfɪzɪks", type: "consonant", focus: "ph", sound: "f", rule: "'ph' is pronounced /f/." },
  "phone": { ipa: "foʊn", type: "consonant", focus: "ph", sound: "f", rule: "'ph' is pronounced /f/." },
  "photo": { ipa: "ˈfoʊtoʊ", type: "consonant", focus: "ph", sound: "f", rule: "'ph' is pronounced /f/." },
  "pat": { ipa: "pæt", type: "consonant", focus: "p", sound: "p", rule: "'p' is pronounced /p/." },
  "wanted": { ipa: "ˈwɑːntɪd", type: "ed", focus: "ed", sound: "ɪd", rule: "'-ed' is pronounced /ɪd/ after 't' or 'd'." },
  "played": { ipa: "pleɪd", type: "ed", focus: "ed", sound: "d", rule: "'-ed' is pronounced /d/ after voiced sounds." },
  "washed": { ipa: "wɑːʃt", type: "ed", focus: "ed", sound: "t", rule: "'-ed' is pronounced /t/ after unvoiced sounds like /ʃ/." },
  "needed": { ipa: "ˈniːdɪd", type: "ed", focus: "ed", sound: "ɪd", rule: "'-ed' is pronounced /ɪd/ after 't' or 'd'." },
  "books": { ipa: "bʊks", type: "s", focus: "s", sound: "s", rule: "'-s' is pronounced /s/ after unvoiced consonants (p, t, k, f)." },
  "dogs": { ipa: "dɔːɡz", type: "s", focus: "s", sound: "z", rule: "'-s' is pronounced /z/ after voiced consonants and vowels." },
  "houses": { ipa: "ˈhaʊzɪz", type: "s", focus: "es", sound: "ɪz", rule: "'-es' is pronounced /ɪz/ after sibilant sounds (s, z, ʃ, ʒ, tʃ, dʒ)." },
  "laughs": { ipa: "læfs", type: "s", focus: "s", sound: "s", rule: "'-s' is pronounced /s/ after unvoiced consonants (/f/)." },
  "knife": { ipa: "naɪf", type: "silent", focus: "k", sound: "", rule: "'k' is silent before 'n' at the beginning of a word." },
  "write": { ipa: "raɪt", type: "silent", focus: "w", sound: "", rule: "'w' is silent before 'r' at the beginning of a word." },
  "hour": { ipa: "aʊər", type: "silent", focus: "h", sound: "", rule: "'h' is silent in 'hour', 'honor', 'honest'." },
  "honest": { ipa: "ˈɑːnɪst", type: "silent", focus: "h", sound: "", rule: "'h' is silent in 'hour', 'honor', 'honest'." },
  "important": { ipa: "ɪmˈpɔːrtnt", type: "stress", focus: "por", sound: "ˈpɔːr", rule: "Stress is on the second syllable." },
  "engineer": { ipa: "ˌendʒɪˈnɪr", type: "stress", focus: "neer", sound: "ˈnɪr", rule: "Words ending in '-eer' usually have stress on the last syllable." },
  "history": { ipa: "ˈhɪstəri", type: "stress", focus: "his", sound: "ˈhɪs", rule: "Stress is on the first syllable." },
  
  // Extra Distractors
  "cut": { ipa: "kʌt", type: "vowel", focus: "u", sound: "ʌ", rule: "Short 'u'." },
  "put": { ipa: "pʊt", type: "vowel", focus: "u", sound: "ʊ", rule: "'u' pronounced as /ʊ/." },
  "but": { ipa: "bʌt", type: "vowel", focus: "u", sound: "ʌ", rule: "Short 'u'." },
  "university": { ipa: "ˌjuːnɪˈvɜːrsəti", type: "vowel", focus: "u", sound: "juː", rule: "Pronounced /juː/." },
  "watched": { ipa: "wɑːtʃt", type: "ed", focus: "ed", sound: "t", rule: "'-ed' is pronounced /t/ after unvoiced sounds." },
  "loved": { ipa: "lʌvd", type: "ed", focus: "ed", sound: "d", rule: "'-ed' is pronounced /d/ after voiced sounds." },
  "cats": { ipa: "kæts", type: "s", focus: "s", sound: "s", rule: "'-s' is pronounced /s/ after unvoiced consonants." },
  "pens": { ipa: "penz", type: "s", focus: "s", sound: "z", rule: "'-s' is pronounced /z/ after voiced consonants." },
  "buses": { ipa: "ˈbʌsɪz", type: "s", focus: "es", sound: "ɪz", rule: "'-es' is pronounced /ɪz/ after sibilant sounds." },
  "know": { ipa: "noʊ", type: "silent", focus: "k", sound: "", rule: "'k' is silent before 'n'." },
  "ghost": { ipa: "ɡoʊst", type: "silent", focus: "h", sound: "", rule: "'h' is silent after 'g'." }
};

// Helper to find words by type
function getWordsByType(type) {
  return Object.keys(IPA_DICTIONARY).filter(word => IPA_DICTIONARY[word].type === type);
}
