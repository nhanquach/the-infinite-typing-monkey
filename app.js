window.onload = function () {
    var quote = document.getElementById('target_quote').value;
    var h1 = document.getElementById('thisword');
    var h3 = document.getElementById('bestfit');
    var genDisplay = document.getElementById('generations');
    var button = document.getElementById('btn');
    var title = document.getElementById('title');
    
    var pop = new Population(1000, quote);
    var gen = 0;

    executeGA(); 
    
    button.addEventListener('click', function () {
        executeGA(); 
    });

    //RUN THE ALGORITHM
    function executeGA() {
        quote = document.getElementById('target_quote').value;

        pop = new Population(1000, quote);
        gen = 0;

        pop.init();
        var isEnd = pop.end();

        var update;
        update = setInterval(function () {
            genDisplay.innerHTML = "Generation #" + gen;
            title.innerHTML = "#" + gen + " - " + h1.innerHTML;
            gen++;
            if (isEnd != true) {
                //If the result is not the quote we need, Reproduce the population
                pop.reProduce();
                //Check it again.
                isEnd = pop.end();
            } else {
                //Yay!!!
                stopTheLoop();
            };
        }, 0);

        function stopTheLoop() {
            //alert();
            clearInterval(update);
        }
    }
    
}