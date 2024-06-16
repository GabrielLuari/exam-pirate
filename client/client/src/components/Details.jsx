import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from "react-router-dom";

const Details = (props) => {
    const [person, setPerson] = useState({});
    const { id } = useParams();
    const { people, setPeople } = props;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/people/${id}`)
            .then(res => {
                console.log(res.data);
                setPerson(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

   

    const handleToggleChange = (name) => {
        const updatedValue = !person[name];
        const updatedPerson = { ...person, [name]: updatedValue };
        setPerson(updatedPerson);

        axios.put(`http://localhost:8000/api/people/${id}`, updatedPerson)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }

    const getButtonClass = (value) => {
        return value ? 'btn btn-success' : 'btn btn-danger';
    }

    const getButtonText = (value) => {
        return value ? 'Yes' : 'No';
    }

    return (
        <div className="container   ">
        <nav className="navbar navbar-expand-lg navbar-light bg-warning ">
            <div className="container-fluid ">
                <a className=" text-center  navbar-brand text-white " href="#">Deep sea Davy</a>
            </div>
        </nav>
        <div className="row mt-3 ">
            <div className="col-md-6">
                <img className="img-fluid rounded border rounded-top" width={450} height={450} src={person.imgUrl} alt="User" />
                <h1>"Shiver me timbers"</h1>
        
            </div>
            <div className="col-md-6">
                <h1>About</h1>
                <p><strong>Position:</strong> {person.crewPosition}</p>
                <p><strong>Treasures:</strong> {person.treasures}</p>
                

                <div className="d-flex">
                    <p className="me-2"><strong>Peg Leg:</strong> {person.pegLeg ? "Yes" : "No"}</p>
                    <button className={getButtonClass(person.pegLeg)} onClick={() => handleToggleChange('pegLeg')}>{getButtonText(person.pegLeg)}</button>
                </div>
                <div className="d-flex">
                    <p className="me-2"><strong>Eye Patch:</strong> {person.eyePatch ? "Yes" : "No"}</p>
                    <button className={getButtonClass(person.eyePatch)} onClick={() => handleToggleChange('eyePatch')}>{getButtonText(person.eyePatch)}</button>
                </div>
                <div className="d-flex">
                    <p className="me-2"><strong>Hook Hand:</strong> {person.hookHand ? "Yes" : "No"}</p>
                    <button className={getButtonClass(person.hookHand)} onClick={() => handleToggleChange('hookHand')}>{getButtonText(person.hookHand)}</button>
                </div>

                <div>
                        <Link className="btn btn-primary me-2" to={`/people/edit/${person._id}`}>Edit</Link>
                   
                </div>
            </div>
        </div>
    </div>
    );
}

export default Details;
