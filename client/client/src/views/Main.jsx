import React, { useState } from 'react'
import axios from 'axios';
import PersonList from '../components/PiratesList';


const Main = (props) => {
    
    const [people, setPeople] = useState([]);
    const removeFromDom = personId => {
    setPeople(people.filter(person => person._id != personId));
    }
    
    return (
        <div>
    	
           
           <PersonList people={people} setPeople={setPeople} removeFromDom={removeFromDom} />
       
        </div>
    )
}
export default Main;