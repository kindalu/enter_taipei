import React, { PropTypes, Component } from 'react';
import allEvents from './allEvents.js';
import styles from './styles.scss';

class EventPage extends Component {
  constructor(props, context){
    super(props, context);

  }

  render(){
    let eventKey = 0;
    return ( 
      <div className={styles.allEvents}>
        {allEvents.map( event => {
          return (
            <a key={eventKey++} href={event.url}>
              <div className={styles.event}>
                <div className={styles.centerAlign}>
                  <span className={styles.time}>{event.chDay+' '+event.time}</span>
                  <div className={styles.title}>{event.title}</div>
                  <span className={styles.location}>{event.location}</span>
                </div>
              </div> 
            </a>
          );
        })}
      </div>
    );
  }
}

export default EventPage;