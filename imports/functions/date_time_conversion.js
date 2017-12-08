export function date_time_conversion (date_time_in_ms) {

  var t = date_time_in_ms;
  var seconds = ("0" + Math.floor( (t/1000) % 60 )).slice(-2);
  var minutes = ("0" + Math.floor( (t/1000/60) % 60 )).slice(-2);
  var hours = ("0" + Math.floor( (t/(1000*60*60)) % 24 )).slice(-2);
  var days = Math.floor( t/(1000*60*60*24) );

  return {
    //'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}
