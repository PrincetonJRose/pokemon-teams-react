import React, { useState, useEffect } from 'react'
import TrainerCard from '../Components/TrainerCard'

const baseUrl = 'http://localhost:3000/'
const trainersUrl = baseUrl + 'trainers/'

const TrainerContainer =( )=> {

    const [ trainers, setTrainers ] = useState( [] )
    
    useEffect( () => {
         fetch( trainersUrl )
         .then( res => res.json() )
         .then( trainersData => setTrainers( trainersData) )
     }, [] )

    const createTrainerCards =( )=> trainers.map( trainer =>
        <TrainerCard
            trainer = { trainer }
            key = { trainer.id }
        />
    )

    return (
        <div>
            <main id='main'>
                { createTrainerCards() }
            </main>
        </div>
    )
}

export default TrainerContainer