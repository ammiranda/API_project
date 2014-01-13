    function getPrimes(max) {                  //Function to find a set of prime numbers with the max number of the set as the parameter
        var sieve = [], i, j, primes = [];     
        for (i = 2; i <= max; ++i) {
            if (!sieve[i]) {
                primes.push(i);
                for (j = i << 1; j <= max; j += i) {
                    sieve[j] = true;
                }
            }
        }
        return primes;
    };

    function loadFirstComic(data) {             // Callback function passed into the tester function on document ready
        var prime_list = getPrimes(data.num);   // Run getPrimes with input of the current comic number which serves as the largest
        var i = Math.floor(Math.random() * prime_list.length);  // Randomly generates the index value given the length of the prime_list array
        $('#comic_num').remove();                               // Removes comic_num div if it exists
        $('#comic_view').attr('src', '');                       // Sets the src property of the comic_view img tag to empty string
        $.ajax({
            url: "http://dynamic.xkcd.com/api-0/jsonp/comic/" + prime_list[i],  // Url used to make the GET request with the prime_list number appended to the end route
            dataType: 'jsonp',                                      // Type of data requested in the AJAX call; valid for cross-domain requests
            cache: false,
            timeout: 5000,                                          // Causes AJAX call to error out if it exceeds five seconds to get a response
            beforeSend: function() {
                $('#comic_view').hide();
                $('#viewer').append('<div id="loading_div"><p id="loading">Loading Comic! Please Standby.</p></div>');
                },
            complete: function() {
                $('#loading').remove();
                },
            success: function(data, textStatus, jqXHR) {
                $('#loading_div').remove();                         // Removes the loading_div if it exists currently in the DOM
                $('#comic_view').attr('src', data.img);             // Sets the src attribute of the img tag to match the current comic object
                $('#comic_view').show();
                $('#header').append('<p id="comic_num">Comic Number: <br><span id="prim_num">' + prime_list[i] + '</span></p>');
                },
            error: function(data, textStatus, jqXHR) {             // Error callback that will be called on failure of GET request
                $('#comic_view').append('<div id="error_div"><p id="error_msg">Sorry.. something went wrong!  Please click the random button again!"</p></div>');
                }
          });
     };

    function tester(callback) {
        $.ajax({
            url: "http://dynamic.xkcd.com/api-0/jsonp/comic/",     // Url doing a GET request on the most recent comic
            dataType: 'jsonp',
            success: function(data, textStatus, jqXHR) {
                loadFirstComic(data);                             // Passes the data object received from the AJAX call into loadFirstComic function
            },
            error: function(data, textStatus, jqXHR) {
                $('#comic_view').append('<div id="error_div"><p id="error_msg">Sorry.. something went wrong!  Please click the random button again!"</p></div>');
            }
        })
    }

$(document).ready(function() {

    tester(loadFirstComic);  // Initial random comic load on document ready

    $('#random_Num').click(function(event) {
        event.preventDefault();  // Prevents form submission upon click of submit button
        tester(loadFirstComic);  // Loads another random comic on click of submit button
    });
});
