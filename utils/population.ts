import newChar from "./charUtils";
import { Dna } from "./dna";

export default class Population {
  popmax: number;
  quote: string;
  population: Dna[];

  bestScore = 0;
  bestPhase = "";

  h3 = document.getElementById("bestfit") as any;
  h1 = document.getElementById("thisword") as any;
  //   div = (document.getElementById("all_population") as any) || {};

  constructor(popmax: number, quote: string) {
    this.popmax = popmax;
    this.quote = quote;
    this.population = [];
  }

  init() {
    //Init a population
    var population = [];
    for (var i = 0; i < this.popmax; i++) {
      var s = [];
      for (var j = 0; j < this.quote.length; j++) {
        //Create a Random char-array
        s[j] = newChar();
      }
      //Each chromosome in the population is a DNA object.
      var dna = new Dna(s, this.quote);
      //add the DNA to the population array
      population[i] = dna;
    }
    //the initial population to begin - gen0.
    return (this.population = population);
  }

  reproduce(setCurrentPopulation: (population: any[]) => void) {
    var newPopulation = []; //Create a new population array.
    var matingPool = this.matingPool(); //Make a mating Pool
    for (var i = 0; i < this.population.length; ) {
      //Pick 2 DNA as parent
      var a = this.pickOne(matingPool);
      var b = this.pickOne(matingPool);
      //Crossover them to create a new DNA - child
      var child = a.crossOver(b);
      for (var j = 0; j < 2; j++) {
        //Mutate that child into m_child
        var m_child = child[j].mutation(child[j].genes, 0.01);
        //Add that m_child to the new population array
        newPopulation[i] = m_child;
        i++;
      }
    }
    //Replace the all population with the new population.
    this.population = newPopulation;

    setCurrentPopulation(newPopulation.map((item) => item.genes.join("")));

    //Check the new population for new result.
    return this.end();
  }

  end(
    setBestFit?: (score: number) => void,
    setBestGuess?: (guess: string) => void
  ) {
    // Check if the quote is in the population or not.
    // If yes => true | no => false
    for (var i = 0; i < this.population.length; i++) {
      var res = this.population[i].genes.join("");
      var score = this.population[i].fitnessScore;

      if (this.bestScore < score) {
        this.bestScore = score;
        this.bestPhase = res;
      }

      if (setBestFit && setBestGuess) {
        setBestFit(score);
        setBestGuess(res);
      }

      if (res == this.quote) {
        console.log("Found it " + res);
        return true;
      }
    }

    return false;
  }

  matingPool() {
    let matingPool = [];
    for (var i = 0; i < this.population.length; i++) {
      var s = this.population[i].fitnessScore * 100;

      for (var j = 0; j < s; j++) {
        matingPool.push(this.population[i]);
      }
    }
    return matingPool;
  }

  pickOne(matingPool: any[]) {
    var r = Math.floor(Math.random() * (matingPool.length - 0) + 0);
    return matingPool[r];

    /** This is just an another approach in Pick a random DNA.
     *
     * var randomN = Math.floor(Math.random() * (this.population.length - 1) + 1);
     * var randomDNA = this.population[randomN];
     * if (AcceptOrReject(randomDNA.fitnessScore)) {
     *    return randomDNA;
     * }
     */
  }

  // function AcceptOrReject(percent) {
  //     var limit = Math.random();
  //     return percent > limit;
  // }
}
