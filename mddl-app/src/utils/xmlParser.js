export async function parseXMLCorpus(file) {
  const text = await file.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, "text/xml");
  
  const sentences = Array.from(xmlDoc.getElementsByTagName('s'));
  
  return sentences.map((sNode, sIndex) => {
    const words = Array.from(sNode.getElementsByTagName('w')).map(wNode => ({
      text: wNode.textContent.trim(),
      pos: wNode.getAttribute('pos')
    }));
    
    // Construct a reasonably formatted sentence string for display
    let sentenceText = '';
    words.forEach((w, index) => {
      if (index === 0) {
        sentenceText += w.text;
      } else {
        // Simple heuristic: don't put a space before punctuation like , . ? !
        if (/^[.,?!;:]/.test(w.text)) {
          sentenceText += w.text;
        } else {
          sentenceText += ' ' + w.text;
        }
      }
    });
    
    return {
      id: `${file.name}_s${sIndex}`,
      words,
      sentenceText,
      source: file.name
    };
  });
}
