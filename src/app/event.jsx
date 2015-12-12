import React, { PropTypes, Component } from 'react';
import styles from './styles.scss';

class Event extends Component {

  constructor(props, context){
    super(props, context);
  }

  shouldComponentUpdate(nextProps, nextState){
    return false;
  }

  render(){
    const {event, categoryClass, dayClass} = this.props;
    return (
      <a href={event.url} target="_blank" >
        <div className={styles.event + ' ' + styles[categoryClass[event.category]] + ' ' + styles[dayClass[event.dayOfWeek]]}>
          <div className={styles.centerAlign+' '+styles.eventInner}>
            <span className={styles.time}>{event.chDay+' '+event.time}</span>
            <div className={styles.title}>{event.title}</div>
            <span className={styles.location}>{event.location}</span>
          </div>
        </div> 
      </a>
    );
  }
}

export default Event;