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
 	//var moo = $.getJSON("http://xkcd.com/info.0.json/callback=?");
 	//console.log(moo);
 	
 	function getMax() {
 		$.ajax({
 			url: "http://dynamic.xkcd.com/api-0/jsonp/comic/",
 			dataType: 'jsonp',
 			success: function(data, textStatus, jqXHR) {
 				$('#comic_view').attr('src', data.img);
 				$('#header').append('<p id="comic_num">Comic Number: <br><span id="prim_num">' + data.num + '</span></p>');
 				}
 				})};
 	getMax();
 	
 	$('#random_Num').click(function(event){
 	event.preventDefault();
 	var prime_list = getPrimes(1244);
 	var i = Math.floor(Math.random() * prime_list.length);
 	$('#comic_num').remove();
 	$('#comic_view').attr('src', ''); 	
 	console.log(i);
 	$.ajax({
 		url: "http://dynamic.xkcd.com/api-0/jsonp/comic/" + prime_list[i],
 		dataType: 'jsonp',
 		cache: false,
 		beforeSend: function() {
 			$('#comic_view').hide();
 			$('#viewer').append('<p id="loading">Loading Comic! Please Standby.</p>');
 			},
 		complete: function() {
 			$('#loading').remove();
 			},
 		success: function(data, textStatus, jqXHR) {
 			console.log(data);
 			$('#comic_view').attr('src', data.img);
 			$('#comic_view').show();
 			$('#header').append('<p id="comic_num">Comic Number: <br><span id="prim_num">' + prime_list[i] + '</span></p>');
 	}
 		//error: function(data, textStatus, jqXHR) {
 			
 		//	}
 	})})});