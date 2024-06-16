import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PiratesList() {
    const [people, setPeople] = useState([]);
    const sortedPeople = [...people].sort((a, b) => a.pirateName.localeCompare(b.pirateName));

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/people")
            .then(res => {
                console.log(res.data);
                setPeople(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const deletePerson = (personId) => {
        axios.delete(`http://localhost:8000/api/people/${personId}`)
            .then(res => {
                setPeople(prevPeople => prevPeople.filter(person => person._id !== personId));
                navigate("/");
            })
            .catch(err => console.log(err));
    }
  return (
    <div className="container bg-warning mt-5 px-5 ">
    <div className="d-flex justify-content-around bg-warning mb-2 p-2  border-bottom">
        <h1>Pirate Crew</h1>
        <Link to="/people" className="btn btn-primary btn-lg">Add Pirate</Link>
        
    </div>
    
    <div className="row">
        {sortedPeople.map((person) => (
            <div className="col-md-12 mb-4" key={person._id}>
                <div className="card h-100  border-dark">
                    <div className="row g-0">
                        <div className="col-3 d-flex align-items-stretch">
                            <img src={person.imgUrl} className="img-fluid rounded-start" alt={person.pirateName} style={{ height: '250px', objectFit: 'cover', width: '100%' }} />
                        </div>
                        <div className="col-9">
                            <div className="card-body d-flex flex-column justify-content-between">
                                <h1 className="card-title text-center">{person.pirateName}</h1>
                                <div className="d-flex justify-content-evenly my-5   align-items-center">
                                    
                                    <Link to={`/people/${person._id}`} className="btn btn-info btn-lg mb-2">
                                        View Pirate
                                    </Link>
                                    <button className="btn btn-danger btn-lg" onClick={() => deletePerson(person._id)}>
                                        Walk the Plank
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>
);
};

export default PiratesList