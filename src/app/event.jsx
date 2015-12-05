import React, { PropTypes, Component } from 'react';
import styles from './styles.scss';

class Event extends Component {

  constructor(props, context){
    super(props, context);
  }

  shouldComponentUpdate(nextProps, nextState){
    return true;
  }

  render(){
    const {event, categoryClass} = this.props;
    return (
      <a href={event.url}>
        <div className={styles.event + ' ' + styles[categoryClass[event.category]]}>
          <div className={styles.centerAlign}>
            <span className={styles.time}>{event.time}</span>
            <span className={styles.performer}>{event.category===5 ? event.performer:''}</span>
            <div className={styles.title}>{event.title}</div>
            <span className={styles.location}>{event.location}</span>
          </div>
        </div> 
      </a>
    );
  }
}

export default Event;