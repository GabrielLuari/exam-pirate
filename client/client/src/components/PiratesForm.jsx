import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const PiratesForm = () => {
    const [pirateName, setPirateName] = useState(""); 
    const [imgUrl, setImgUrl] = useState("");
    const [crewPosition, setCrewPosition] = useState("");
    const [pegLeg, setPegLeg] = useState(false);
    const [eyePatch, setEyePatch] = useState(false);
    const [hookHand, setHookHand] = useState(false);
    const [treasures, setTreasures] = useState(0);
    const [pirateCatch, setPirateCatch] = useState();
    const [people, setPeople] = useState([]);
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const personData = {
            pirateName,  
            imgUrl,
            crewPosition,
            pegLeg,
            eyePatch,
            hookHand,
            treasures,
            pirateCatch  
        };

        console.log("Submitting:", personData);

        axios.post('http://localhost:8000/api/people', personData, {
           
        })
        .then(res => {
            console.log(res); 
            console.log(res.data);
            setPeople([...people, res.data]);
            navigate("/");
           
        })
        .catch(err => {
            console.error('Error response: ', err.response);
            console.error('Error message: ', err.message);
            alert(`Error: ${err.response?.data?.message || err.message}`);
        });
    }   
    

  return (
    <form onSubmit={onSubmitHandler} className="container mt-5 bg-warning">
    <h1 className="mb-4 text-center border-bottom">Add Pirates</h1>
    <div className="row">
        <div className="col-md-6">
            <div className="mb-2">
                <label className="form-label" style={{ width: '150px' }}>Pirate Name</label>
                <input   type="text"className="form-control form-control-sm" style={{ width: '200px' }}onChange={(e) => setPirateName(e.target.value)} value={pirateName} />
            </div>

            <div className="mb-2">
                <label className="form-label" style={{ width: '150px' }}>ImgUrl</label>
                <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    style={{ width: '200px' }}
                    onChange={(e) => setImgUrl(e.target.value)} 
                    value={imgUrl} 
                />
            </div>

            <div className="mb-2">
                <label className="form-label" htmlFor="treasuresFound" style={{ width: '150px' }}> # Treasure Chests</label>
                <input 
                    type="number" 
                    className="form-control form-control-sm" 
                    style={{ width: '50px' }}
                    id="treasuresFound" 
                    name="treasuresFound" 
                    min="0" 
                    placeholder="Enter number of treasures"  
                    onChange={(e) => setTreasures(e.target.value)} 
                    value={treasures}  />
            </div>

            <div className="mb-2">
                <label className="form-label" style={{ width: '150px' }}>Pirate Catchphrase</label>
                <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    style={{ width: '200px' }}
                    onChange={(e) => setPirateCatch(e.target.value)} 
                    value={pirateCatch} 
                />
            </div>

        </div>
        <div className="col-md-6">
            <div className="mb-2">
                <label className="form-label" style={{ width: '150px' }}>Crew Position</label>
                <select 
                    className="form-select form-select-sm" 
                    style={{ width: '200px' }}
                    onChange={(e) => setCrewPosition(e.target.value)} 
                    value={crewPosition}
                >
                    <option value="" disabled>Select crew position</option>
                    <option value="Captain">Captain</option>
                    <option value="FirstMate">First Mate</option>
                    <option value="QuarterMaster">Quarter Master</option>
                    <option value="Bootswain">Bootswain</option>
                    <option value="PowderMonkey">Powder Monkey</option>
                </select>
            </div>
            
            <div className="mb-2 form-check">
                <input 
                    type="checkbox" 
                    className="form-check-input" 
                    checked={pegLeg} 
                    onChange={(e) => setPegLeg(e.target.checked)} 
                    id="pegLeg" 
                />
                <label className="form-check-label" htmlFor="pegLeg" style={{ width: '150px' }}>Peg Leg</label>
            </div>
            <div className="mb-2 form-check">
                <input 
                    type="checkbox" 
                    className="form-check-input" 
                    checked={eyePatch} 
                    onChange={(e) => setEyePatch(e.target.checked)} 
                    id="eyePatch" 
                />
                <label className="form-check-label" htmlFor="eyePatch" style={{ width: '150px' }}>Eye Patch</label>
            </div>
            <div className="mb-2 form-check">
                <input 
                    type="checkbox" 
                    className="form-check-input" 
                    checked={hookHand} 
                    onChange={(e) => setHookHand(e.target.checked)} 
                    id="hookHand" 
                />
                <label className="form-check-label" htmlFor="hookHand" style={{ width: '150px' }}>Hook Hand</label>
            </div>
        </div>
    </div>
    <div className="d-flex justify-content-center">
        <input type="submit" value="Submit" className="btn btn-primary btn-sm mt-3" />
    </div>
</form>

  )
}

export default PiratesForm