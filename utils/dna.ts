import calculateFitness from "./calculateFitness";
import newChar from "./charUtils";

export class Dna {
  genes: string[];
  quote: string;
  fitnessScore: number;

  constructor(genes: string[], quote: string) {
    //genes is an array of Charater.
    this.genes = genes;
    //quote is the target.
    this.quote = quote;

    this.fitnessScore = calculateFitness(genes, quote);
  }

  crossOver(anotherDna: Dna) {
    var offsprings = [];
    var childGenes1 = [];
    var childGenes2 = [];
    //choose a CrossOver Point
    var crossOverPoint = Math.floor(Math.random() * this.genes.length + 0);
    for (var i = 0; i < this.genes.length; i++) {
      if (i < crossOverPoint) {
        //take all the characters from position 0 to CrossOver Point of the 1st DNA and add it to the new genes array
        childGenes1[i] = this.genes[i];
        childGenes2[i] = anotherDna.genes[i];
      } else {
        //take all the characters from position CrossOver Point to the end of the 2st DNA and add it to the new genes array
        childGenes1[i] = anotherDna.genes[i];
        childGenes2[i] = this.genes[i];
      }
    }
    //Create a new DNA object from new genes
    var dnaChild1 = new Dna(childGenes1, this.quote);
    var dnaChild2 = new Dna(childGenes2, this.quote);
    offsprings.push(dnaChild1, dnaChild2);
    return offsprings;
  }

  mutation(genes: string[], rate: number) {
    //rate is the chance the mutation will happen to a gene inside the genes array.
    for (var i = 0; i < this.genes.length; i++) {
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
