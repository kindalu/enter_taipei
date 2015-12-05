import jsonfile from 'jsonfile'
import util from 'util'

let allEvents = [];

function getChDay(day){
  let ch = ['日','ㄧ', '二','三','四','五','六'];
  return ch[day];
}
function zeroFilled(x){
  return ('00' + x).substr(-2);
}

// kktix
let file = './src/app/eventData/kktix/events.json';
jsonfile.readFile(file, function(err, obj) {
  let kktixEvents = obj.entry;
  kktixEvents.forEach( event => {
    //time
    let eventTime = new Date(event.published);
    let month = eventTime.getMonth()+1;
    let date = eventTime.getDate();
    let day = getChDay(eventTime.getDay());
    let hours = zeroFilled(eventTime.getHours());
    let minutes = zeroFilled(eventTime.getMinutes());
    let time = `${month}月${date}日(${day})${hours}:${minutes}`;

    //title
    let title = event.title;

    //location & address
    let [location, address] = event.content.split('地點：')[1].split(' / ');

    // url
    let url = event.url;

    allEvents.push({
      time:time,
      title:title,
      location:location,
      address:address,
      url:url,
    });
  });
  console.log(allEvents);
})

