import Population from "./population";

const execute = (
  quote: string,
  monkeys: number,
  setIsExecuting: any,
  setGenNo: any,
  setBestFit: any,
  setBestGuess: any,
  setCurrentPopulation: any
) => {
  setIsExecuting(true);

  return new Promise((resolve, rejects) => {
    try {
      const start = new Date();

      const pop = new Population(monkeys, quote);
      let gen = 0;

      pop.init();
      let isEnd = pop.end(setBestFit, setBestGuess);

      let update = setInterval(() => {
        gen++;
        setGenNo(gen);
        if (isEnd != true) {
          //If the result is not the quote we need, Reproduce the population
          pop.reproduce(setCurrentPopulation);
          //Check it again.
          isEnd = pop.end(setBestFit, setBestGuess);
        } else {
          //Yay!!!
          stopTheLoop();
          const time = new Date().getTime() - start.getTime();

          resolve({
            time,
            totalStrings: monkeys * gen,
          });
        }
      }, 0);

      const stopTheLoop = () => {
        //alert();
        clearInterval(update);
        setIsExecuting(false);
      };
    } catch (e) {
      rejects(e);
      setIsExecuting(false);
    }
  });
};

export default execute;
