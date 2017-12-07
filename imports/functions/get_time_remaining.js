export function get_time_remaining (date_time) {

  var t = Date.parse(date_time) - Date.parse(new Date());
  var seconds = ("0" + Math.floor( (t/1000) % 60 )).slice(-2);
  var minutes = ("0" + Math.floor( (t/1000/60) % 60 )).slice(-2);
  var hours = ("0" + Math.floor( (t/(1000*60*60)) % 24 )).slice(-2);
  var days = Math.floor( t/(1000*60*60*24) );

  if (t <= 0) {
    clear_interval(time_interval);
  }

  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}
