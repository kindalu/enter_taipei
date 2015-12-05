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

function addressInTaipei(address){
  return (
    typeof address === 'string' && 
    (address.indexOf('臺北市') >= 0 || 
     address.indexOf('台北市') >= 0 ||
     address.indexOf('新北市') >= 0 ||
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
  let time = `${month}月${date}日(${day})${hours}:${minutes}`;

  //title
  let title = event.title;

  //location & address
  let [location, address] = event.content.split('地點：')[1].split(' / ');

  // url
  let url = event.url;

  let isInTaipei = addressInTaipei(address);

  if(isInTaipei){
    allEvents.push({
      time:time,
      title:title,
      location:location,
      address:address,
      url:url,
    });
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
      let time = `${month}月${date}日(${day})${hours}:${minutes}`;

      let location = info.locationName;
      let address = info.location;
      let title = event.title;
      let url = event.webSales || event.sourceWebPromote;


      let isInTaipei = addressInTaipei(address);

      if(isInTaipei){
        allEvents.push({
          time:time,
          title:title,
          location:location,
          address:address,
          url:url,
        });
        console.log(time+' '+title);
      }else{
        //console.log('iCulture non taipei address='+address);
      }
    }
  });
}

console.log(`${allEvents.length} events in next two weeks converted`);

let output = './src/app/eventData/allProcessedEvents.json'

jsonfile.writeFileSync(output, allEvents);