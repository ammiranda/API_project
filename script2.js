$(document).ready(function() {
$.ajax("http://search.ams.usda.gov/FarmersMarkets/v1/data.svc/zipSearch?zip=22203")
  .done(function(data){
    console.log(data);
  });

$.ajax("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=1004457")
  .done(function(data){
    console.log(data);
  });
});