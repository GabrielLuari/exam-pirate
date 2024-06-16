import { useState } from 'react'
import {BrowserRouter, Routes, Route,Link} from 'react-router-dom';
import Main from './views/Main'
import Update from './components/Update';
import PiratesForm from './components/PiratesForm'; 
import Details from './components/Details';


  const App = () => {
    
    return(
	<div>
    	<BrowserRouter>
            <Routes>
	    <Route excat element={<Main/>} path="/" default /> 
        <Route element={<PiratesForm/>} path="/people" /> 
        <Route element={<Details/>} path="/people/:id" /> 
        <Route element={<Update/>} path="/people/edit/:id"/>
            </Routes>
    	</BrowserRouter>
        </div>
    ) 
}
export default App;
