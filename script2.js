$(document).ready(function() {
	function getPrimes(max) { //Function to find a set of prime numbers with the max number of the set as the parameter
    var sieve = [], i, j, primes = [];
    for (i = 2; i <= max; ++i) {
        if (!sieve[i]) {
            // i has not been marked -- it is prime
            primes.push(i);
            for (j = i << 1; j <= max; j += i) {
                sieve[j] = true;
            }
        }
    }
    return primes;
}
 	var prime_list = getPrimes(1240);
 	console.log(prime_list);
 	var moo = $.getJSON("http://xkcd.com/info.0.json/callback=?");
 	console.log(moo);
 	
 	/*$.ajax({
 		url: "http://xkcd.com/info." + prime_list + ".json/",
 		dataType: 'jsonp',
 		success: function(*/
 	});