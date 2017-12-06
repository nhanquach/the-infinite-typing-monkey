function Population(popmax, quote) {
    //popmax is the population max elements
    //quote is the target
    this.population = [];
    
    this.quote = quote;
    this.popmax = popmax;
    
    var bestScore = 0;
    var bestPhase = "";
    var h3 = document.getElementById('bestfit');
    var h1 = document.getElementById('thisword');

    this.init = function () {
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
        //Make the population the initial population to start.
        return this.population = population;
    };

    var div = document.getElementById('all_population');

    this.reProduce = function () {
        //Reproduce//
        div.innerHTML = "";
        var newPopulation = []; //Create a new population array.
        var matingPool = this.matingPool(); //Make a mating Pool
        for (var i = 0; i < this.population.length; i++){
            //Pick 2 DNA as parent
            var a = this.pickOne(matingPool);
            var b = this.pickOne(matingPool);
            //Crossover them to create a new DNA - child
            var child = a.crossOver(b);
            //Mutate that child into m_child
            var m_child = child.mutation(child.genes, 0.01);
            //Add that m_child to the new population array
            newPopulation[i] = m_child;
            
            //Show it out the view
            var newcontent = document.createElement('div');
            div.appendChild(newcontent, newcontent.innerHTML= m_child.genes.join(""));
        };
        //Replace the all population with the new population.
        this.population = newPopulation;
        //Check the new population for new result.
        return this.end();
    };
    
    

    this.end = function () {
        //Check if the quote is in the population or not.
        //If yes => true | no => false
        for (var i = 0; i < this.population.length; i++) {
            var res = this.population[i].genes.join("");
            var score = this.population[i].fitnessScore;

            if (bestScore < score) {
                bestScore = score;
                bestPhase = res;
            }
            h3.innerText = bestScore * 100 + "%";
            h1.innerText = bestPhase;
            
            if (res == quote) {
                console.log("Found it " + res);
                return true;
            }
        }
        
        return false;
    };

    this.matingPool = function () {
        matingPool = [];
        for (var i = 0; i < this.population.length; i++) {
            var s = this.population[i].fitnessScore * 100;
            
            for (var j = 0; j < s; j++){
                matingPool.push(this.population[i]);
            }
       
        };
        return matingPool;
    };
    
    this.pickOne = function (matingPool) {
        var r = Math.floor(Math.random() * (matingPool.length - 0) + 0);
        return matingPool[r];

        //This is just an another approach in Pick a random DNA.
        // var randomN = Math.floor(Math.random() * (this.population.length - 1) + 1);
        // var randomDNA = this.population[randomN];
        
        // if (AcceptOrReject(randomDNA.fitnessScore)) {
        //     return randomDNA;
        // }
    }

    // function AcceptOrReject(percent) {
    //     var limit = Math.random();
    //     return percent > limit;
    // }

    function newChar() {
        //Math.random() * (max - min) + min;
        var r = Math.random() * (126 - 32) + 32;
        return String.fromCharCode(r);
    };

    
}