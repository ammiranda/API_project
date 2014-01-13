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
    };

    function loadFirstComic(data) {
        var prime_list = getPrimes(data.num);
        var i = Math.floor(Math.random() * prime_list.length);
        $('#comic_num').remove();
        $('#comic_view').attr('src', '');   
        $.ajax({
            url: "http://dynamic.xkcd.com/api-0/jsonp/comic/" + prime_list[i],
            dataType: 'jsonp',
            cache: false,
            timeout: 5000,
            beforeSend: function() {
                $('#comic_view').hide();
                $('#viewer').append('<div id="loading_div"><p id="loading">Loading Comic! Please Standby.</p></div>');
                },
            complete: function() {
                $('#loading').remove();
                },
            success: function(data, textStatus, jqXHR) {
                console.log(data);
                console.log(prime_list);
                $('#loading_div').remove();
                $('#comic_view').attr('src', data.img);
                $('#comic_view').show();
                $('#header').append('<p id="comic_num">Comic Number: <br><span id="prim_num">' + prime_list[i] + '</span></p>');
                },
            error: function(data, textStatus, jqXHR) {
                $('#comic_view').append('<div id="error_div"><p id="error_msg">Sorry.. something went wrong!  Please click the random button again!"</p></div>');
                }
          });
     };

    function tester(callback) {
        $.ajax({
            url: "http://dynamic.xkcd.com/api-0/jsonp/comic/",
            dataType: 'jsonp',
            success: function(data, textStatus, jqXHR) {
                loadFirstComic(data);
            }
        })
    }

$(document).ready(function() {
    tester(loadFirstComic);
    $('#random_Num').click(function(event) {
        event.preventDefault();
        tester(loadFirstComic);
    });
});


/* 	function getMax(callback) {
        var returned_data = 0;
 		$.ajax({
 			url: "http://dynamic.xkcd.com/api-0/jsonp/comic/",
 			dataType: 'jsonp',
 			success: function(data, textStatus, jqXHR) {
 				returned_data = data.num;
 				var prime_list2 = getPrimes(data.num);
 				$('#comic_view').attr('src', data.img);
 				$('#header').append('<p id="comic_num">Comic Number: <br><span id="prim_num">' + data.num + '</span></p>');
 				console.log(prime_list2);
                callback(prime_list2);
 				}
 				});
    };

    function appendImages(m) {
        event.preventDefault();
        var prime_list = m;
        var i = Math.floor(Math.random() * prime_list.length);
        $('#comic_num').remove();
        $('#comic_view').attr('src', '');   
        $.ajax({
            url: "http://dynamic.xkcd.com/api-0/jsonp/comic/" + prime_list[i],
            dataType: 'jsonp',
            cache: false,
            timeout: 5000,
            beforeSend: function() {
                $('#comic_view').hide();
                $('#viewer').append('<div id="loading_div"><p id="loading">Loading Comic! Please Standby.</p></div>');
                },
            complete: function() {
                $('#loading').remove();
                },
            success: function(data, textStatus, jqXHR) {
                console.log(data);
                $('#loading_div').remove();
                $('#comic_view').attr('src', data.img);
                $('#comic_view').show();
                $('#header').append('<p id="comic_num">Comic Number: <br><span id="prim_num">' + prime_list[i] + '</span></p>');
                console.log(max(data.num));
                },
            error: function(data, textStatus, jqXHR) {
                $('#comic_view').append('<div id="error_div"><p id="error_msg">Sorry.. something went wrong!  Please click the random button again!"</p></div>');
                }
          })
     };

 	
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
    };

    function add() {
        return 5;
    }

$(document).ready(function() {
 	
 	$('#random_Num').click(function(event){

        getMax(appendImages(m));
        console.log(m);
        
 });

}); */