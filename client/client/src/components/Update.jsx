import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const Update = (props) => {
    const { id } = useParams();
    const [pirateName, setPirateName] = useState(""); 
    const [imgUrl, setImgUrl] = useState("");
    const [crewPosition, setCrewPosition] = useState("");
    const [pegLeg, setPegLeg] = useState(false);
    const [eyePatch, setEyePatch] = useState(false);
    const [hookHand, setHookHand] = useState(false);
    const [treasures, setTreasures] = useState(0);
    const [pirateCatch, setPirateCatch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/people/${id}`)
            .then(res => {
                console.log(res.data);
                setPirateName(res.data.pirateName);
                setImgUrl(res.data.imgUrl);
                setCrewPosition(res.data.crewPosition);
                setPegLeg(res.data.pegLeg);
                setEyePatch(res.data.eyePatch);
                setHookHand(res.data.hookHand);
                setTreasures(res.data.treasures);
                setPirateCatch(res.data.pirateCatch);
            })
            .catch(err => console.log(err));
    }, [id]);

    const updatePerson = (e) => {
        e.preventDefault();
        const updateData = {
            pirateName,  
            imgUrl,
            crewPosition,
            pegLeg,
            eyePatch,
            hookHand,
            treasures,
            pirateCatch 
        };
        console.log('Update Data:', updateData); 

        axios.put(`http://localhost:8000/api/people/${id}`, updateData)
            .then(res => {
                console.log(res);
                navigate("/");
            })
            .catch(err => {
                console.error('Error:', err);
                if (err.response) {
                    console.error('Response data:', err.response.data); 
                }
            });
    };

    return (
        <div className="container mt-5 bg-warning p-3">
        <h2 className="mb-4 text-center border-bottom">Update Pirate</h2>
        <form onSubmit={updatePerson}>
            <div className="row p-5">
                <div className="col-md-6">
                    <div className="mb-2">
                        <label className="form-label" style={{ width: '150px' }}>Pirate Name</label>
                        <input 
                            type="text" 
                            name="pirateName" 
                            className="form-control form-control-sm" 
                            style={{ width: '200px' }}
                            value={pirateName} 
                            onChange={(e) => setPirateName(e.target.value)} 
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label" style={{ width: '150px' }}>Image URL</label>
                        <input 
                            type="text" 
                            name="imgUrl"
                            className="form-control form-control-sm" 
                            style={{ width: '200px' }}
                            value={imgUrl} 
                            onChange={(e) => setImgUrl(e.target.value)} 
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label" htmlFor="treasures" style={{ width: '150px' }}>Number of Treasure Chests</label>
                        <input 
                            type="number" 
                            id="treasures" 
                            name="treasures" 
                            className="form-control form-control-sm" 
                            style={{ width: '50px' }}
                            min="0" 
                            value={treasures}
                            onChange={(e) => setTreasures(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label" style={{ width: '150px' }}>Pirate Catchphrase</label>
                        <input 
                            type="text" 
                            name="pirateCatch" 
                            className="form-control form-control-sm" 
                            style={{ width: '200px' }}
                            value={pirateCatch} 
                            onChange={(e) => setPirateCatch(e.target.value)} 
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-2">
                        <label className="form-label" style={{ width: '150px' }}>Crew Position</label>
                        <select
                            id="crewPosition"
                            name="crewPosition"
                            className="form-select form-select-sm"
                            style={{ width: '200px' }}
                            value={crewPosition}
                            onChange={(e) => setCrewPosition(e.target.value)}
                        >
                            <option value="" disabled>Select a Crew Position</option>
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
                            id="pegLeg"
                            name="pegLeg"
                            className="form-check-input"
                            checked={pegLeg}
                            onChange={(e) => setPegLeg(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="pegLeg" style={{ width: '150px' }}>Peg Leg</label>
                    </div>
                    <div className="mb-2 form-check">
                        <input
                            type="checkbox"
                            id="eyePatch"
                            name="eyePatch"
                            className="form-check-input"
                            checked={eyePatch}
                            onChange={(e) => setEyePatch(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="eyePatch" style={{ width: '150px' }}>Eye Patch</label>
                    </div>
                    <div className="mb-2 form-check">
                        <input
                            type="checkbox"
                            id="hookHand"
                            name="hookHand"
                            className="form-check-input"
                            checked={hookHand}
                            onChange={(e) => setHookHand(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="hookHand" style={{ width: '150px' }}>Hook Hand</label>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary btn-sm mt-3">Update</button>
            </div>
        </form>
    </div>
    
    );
}

export default Update;
