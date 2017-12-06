function Dna(genes, quote) {
    //genes is an array of Charater.
    this.genes = genes;
    //quote is the target.
    this.quote = quote;
    
    this.fitnessScore = calcFitness(this.genes, this.quote);

    this.crossOver = function (anotherDna) {
        var childGenes = [];
        //choose a CrossOver Point
        var crossOverPoint = Math.floor(Math.random() * 
        (this.genes.length) + 0);
        for (var i = 0; i < this.genes.length; i++) {
            if (i < crossOverPoint) {
                //take all the characters from position 0 to CrossOver Point of the 1st DNA and add it to the new genes array
                childGenes[i] = this.genes[i];
            } else {
                //take all the characters from position CrossOver Point to the end of the 2st DNA and add it to the new genes array
                childGenes[i] = anotherDna.genes[i];
            }
        }
        //Create a new DNA object form the new genes
        var dnaChild = new Dna(childGenes, this.quote);

        return dnaChild;
    };

    this.mutation = function (genes, rate) {
        //rate is the chance the mutation will happen to a gene inside the genes array.
        for (var i = 0; i < this.genes.length; i++){
            var r = Math.random() * (1 - 0) + 0;
            if (r < rate) {
                //Generate a new charater and replace it with the character in the position "i" of the genes array.
                var newchar = newChar();
                genes[i] = newchar;
            }
        }
        return new Dna(genes, this.quote);
    }
}

function calcFitness(genes, quote) {
    var score = 0;
    //Loop through the array of character, if 1 charater is at the right place => score++
    //fitness = score/length
    for (var i = 0; i < quote.length; i++) {
        if (genes[i] === quote[i]) {
            score++;
        }
    };
    var fitness = (score / quote.length);
    return (fitness);
};

function newChar() {
    //Return a random Character.
    //Math.random() * (max - min) + min;
    var r = Math.random() * (126 - 32) + 32;
    return String.fromCharCode(r);
};