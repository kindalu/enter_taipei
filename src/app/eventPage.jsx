import React, { PropTypes, Component } from 'react';
import allEventsObj from './allEvents.js';
import Event from './event';
import styles from './styles.scss';

String.prototype.hashCode = function() {
  let hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

class EventPage extends Component {

  state = {displayFilter:{
  }}

  constructor(props, context){
    super(props, context);
    for(let cat=0; cat<20; cat++){
      this.state.displayFilter[cat] = false;
    }
  }

  render(){
    let key1=0;
    let key2=0;
    let categoryClass = allEventsObj.categoryClass;

    //add blocking Date Event
    let allEvents = allEventsObj.allEvents;
    let displayEvents = [];
    let curDateString = ''; 
    let dayBlockEventCat = 999;
    for(let event of allEvents){
      //if(this.state.displayFilter[event.category])
      //  continue;
      if(event.chDay !== curDateString){
        let dayBlockEvent = {title:event.chDay, category:dayBlockEventCat, time:'', location:''};
        displayEvents.push(dayBlockEvent);
        curDateString = event.chDay;
      }
      displayEvents.push(event);
    }
    return ( 
      <div className={styles.allEvents}>
        {displayEvents.map( event => {
          return <Event key={key2++} event={event} categoryClass={categoryClass}/>
        })}  
      </div>
    );
  }
}

export default EventPage;