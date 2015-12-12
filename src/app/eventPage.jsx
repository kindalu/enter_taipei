import React, { PropTypes, Component } from 'react';
import allEventsObj from './allEvents.js';
import Event from './event';
import styles from './styles.scss';

class EventPage extends Component {

  state = {hideCategory:{
  }}

  constructor(props, context){
    super(props, context);
    for(let cat=0; cat<=20; cat++){
      this.state.hideCategory[cat] = true;
    }
  }

  onCategoryToggle(cat){
    this.state.hideCategory[cat] = !this.state.hideCategory[cat];
    this.setState({hideCategory:this.state.hideCategory});
  }

  render(){
    const {
      allEvents, 
      categoryClass, 
      categoryName, 
      categoryCount, 
      dayClass,
    } = allEventsObj;

    //apply the filter
    let eventStaticId = 0;
    let displayEvents = [];
    for(let event of allEvents){
      event.sId = eventStaticId++;
      if(this.state.hideCategory[event.category])
        continue;
      displayEvents.push(event);
    }
    let categories = [];
    let eventCount = 0;
    for(let cat in categoryName) {
      categories.push(cat);
      eventCount += categoryCount[cat];
    }


    return ( 
      <div className={styles.allEvents}>

        {/*Header*/}
        <div>
          <a href='https://github.com/kindalu/enter_taipei' target="_blank">
            <div className={styles.pageTitle}>
              Enter Taipei：{eventCount} events for you to enter.
            </div>  
          </a>
          {/*Category Buttons*/}
          <div className={styles.allCategories}>
            { categories.map( cat => {
                if(categoryCount[cat] === 0)
                  return;

                let enableStyle='';
                if(!this.state.hideCategory[cat])
                  enableStyle = styles.categoryOn;

                return (
                  <div key={cat} className={styles.catOuter}>
                    <div 
                      className={styles.category+' '+enableStyle+' '+styles[categoryClass[cat]]}
                      onClick={e => {
                        this.onCategoryToggle(cat);
                      }}>
                      {categoryName[cat]}({categoryCount[cat]})
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>

        {/* Events */}
        <div className={styles.eventContainer}>
          {displayEvents.map( event => {
            return (
              <Event 
                key={event.sId} 
                event={event} 
                categoryClass={categoryClass}
                dayClass={dayClass} />
            );
          })} 
        </div> 
      </div>
    );
  }
}

export default EventPage;