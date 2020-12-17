import React, { useState, useEffect } from 'react'
import TrainerCard from '../Components/TrainerCard'

const baseUrl = 'http://localhost:3000/'
const trainersUrl = baseUrl + 'trainers/'
const pokemonUrl = baseUrl + 'pokemons/'

const TrainerContainer =( )=> {

    const [ trainers, setTrainers ] = useState( [] )
    
    useEffect( () => fetchTrainers(), [] )

    const fetchTrainers =( )=> {
        fetch( trainersUrl )
         .then( res => res.json() )
         .then( trainersData => setTrainers( trainersData) )
    }

    const createTrainerCards =( )=> trainers.map( trainer =>
        <TrainerCard
            trainer = { trainer }
            key = { trainer.id }
            addPokemon = { addPokemon }
        />
    )

    const addPokemon =( trainer )=> {
        const id = trainer.id
        const postRequest = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Accepts: 'application/json'
            },
            body: JSON.stringify( { trainer_id: id } )
        }

        fetch( pokemonUrl, postRequest )
        .then( res => res.json() )
        .then( pokemonData => {
            if ( !pokemonData.errors )
                setTrainers( trainers.map( trainer => {
                    if ( trainer.id === id )
                        trainer.pokemons.push( pokemonData )
                    return trainer
                }))
            else pokemonData.errors.forEach( error => alert( error ) )
        })
    }


    return (
        <div>
            <main id='main'>
                { createTrainerCards() }
            </main>
        </div>
    )
}

export default TrainerContainer