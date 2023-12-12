const calculateFitness = (genes: string[], quote: string) => {
  var score = 0;
  //Loop through the array of characters, if 1 charater is at the right place => score++
  //fitness = score/length
  for (var i = 0; i < quote.length; i++) {
    if (genes[i] === quote[i]) {
      score++;
    }
  }
  var fitness = score / quote.length;
  return fitness;
};

export default calculateFitness;
