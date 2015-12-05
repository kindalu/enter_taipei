import jsonfile from 'jsonfile'
import util from 'util'

let allEvents = [];

// from http://stackoverflow.com/questions/2848462/count-bytes-in-textarea-using-javascript
function getUTF8Length(string) {
    var utf8length = 0;
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            utf8length++;
        }
        else if((c > 127) && (c < 2048)) {
            utf8length = utf8length+2;
        }
        else {
            utf8length = utf8length+3;
        }
    }
    return utf8length;
 }

function getChDay(day){
  let ch = ['日','ㄧ', '二','三','四','五','六'];
  return ch[day];
}
function zeroFilled(x){
  return ('00' + x).substr(-2);
}
function eventTrim(event){
  while(getUTF8Length(event.title) > 80)
    event.title = event.title.substr(0, event.title.length-2);
  while(getUTF8Length(event.location) > 30)
    event.location = event.location.substr(0, event.location.length-2);
  return event;
}

function addressInTaipei(address){
  return (
    typeof address === 'string' && 
    (address.indexOf('臺北市') >= 0 || 
     address.indexOf('台北市') >= 0 ||
     address.indexOf('台北') >= 0 ||
     address.indexOf('台灣大學') >= 0 ||
     address.indexOf('臺灣大學') >= 0 ||
     address.indexOf('文山劇場') >= 0
    )
  );
}

let one_month_in_millisecond = 2.628e+9;
let two_weeks_in_millisecond = one_month_in_millisecond/2;

let now = new Date(Date.now());
let oneMonthTimeBound = now.getTime() + one_month_in_millisecond;
let twoWeeksTimeBound = now.getTime() + two_weeks_in_millisecond;
let timeBound = twoWeeksTimeBound;

// kktix
let file = './src/app/eventData/kktix/events.json';
let kktixEvents = jsonfile.readFileSync(file).entry;

kktixEvents.forEach( event => {
  //time
  let eventTime = new Date(event.published);
  if(eventTime.getTime() < now.getTime() || eventTime.getTime() > timeBound)
    return;

  let month = eventTime.getMonth()+1;
  let date = eventTime.getDate();
  let day = getChDay(eventTime.getDay());
  let hours = zeroFilled(eventTime.getHours());
  let minutes = zeroFilled(eventTime.getMinutes());
  let chDay = `${month}月${date}日(${day})`
  let time = `${hours}:${minutes}`;

  //title
  let title = event.title;

  //location & address
  let [location, address] = event.content.split('地點：')[1].split(' / ');

  // url
  let url = event.url;

  let isInTaipei = addressInTaipei(address);

  if(isInTaipei){
    allEvents.push(eventTrim({
      ms:eventTime.getTime(),
      chDay:chDay,
      time:time,
      title:title,
      location:location,
      //address:address,
      url:url,
      isIndie:false,
    }));
  }else{
    console.log('kktix non taipei address='+address);
  }
});

//iCulture
let iCultureCategoryTypes=[1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 14, 15, 17, 19];
for(let cat of iCultureCategoryTypes){
  let file = `./src/app/eventData/iCulture/${cat}.json`;
  let iEvents = jsonfile.readFileSync(file);
  iEvents.forEach( event => {
    if(event.showInfo &&
       event.showInfo.length > 0)
    {
      let info = event.showInfo[0];

      //time
      let eventTime = new Date(info.time);
      if(eventTime.getTime() < now.getTime() || eventTime.getTime() > timeBound)
        return;

      let month = eventTime.getMonth()+1;
      let date = eventTime.getDate();
      let day = getChDay(eventTime.getDay());
      let hours = zeroFilled(eventTime.getHours());
      let minutes = zeroFilled(eventTime.getMinutes());
      let chDay = `${month}月${date}日(${day})`
      let time = `${hours}:${minutes}`;

      let location = info.locationName;

      let address = info.location;
      let title = event.title;
      
      let url = event.webSales || event.sourceWebPromote;


      let isInTaipei = addressInTaipei(address);

      if(isInTaipei){
        allEvents.push(eventTrim({
          ms:eventTime.getTime(),
          chDay:chDay,
          time:time,
          title:title,
          location:location,
          //address:address,
          url:url,
          isIndie:cat === 5,
        }));
        console.log(time+' '+title);
      }else{
        //console.log('iCulture non taipei address='+address);
      }
    }
  });
}

allEvents.sort((a,b) => a.ms - b.ms);

console.log(`${allEvents.length} events in next two weeks converted and sorted`);

let output = './src/app/allEvents.js';

jsonfile.writeFileSync(output, allEvents);

// TODO Remove manually edit json to js
// currently you need to update allEvents.js manually like
// export default ...