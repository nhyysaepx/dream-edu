const fs = require('fs');

const ipaDataCode = fs.readFileSync('public/pronunciation/ipa-data.js', 'utf8');
const rulesCode = fs.readFileSync('public/pronunciation/pronunciation-rules.js', 'utf8');

eval(ipaDataCode);
eval(rulesCode);

async function run() {
    const words = ["study", "computer", "culture", "music", "understand"];
    const questions = await generateQuizFromWords(words, 'mixed');
    console.log("Q Count:", questions.length);
    for (let q of questions) {
        console.log(`Q: ${q.correctIndex} - ${q.options.map(o => o.word).join(', ')}`);
    }
}
run();
