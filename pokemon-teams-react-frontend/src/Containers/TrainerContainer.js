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
            releasePokemon = { releasePokemon }
        />
    )

    const alerts =( messages )=> messages.forEach( message => alert( message ) )

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
            else alerts( pokemonData.errors )
        })
    }

    const releasePokemon =( pokemon )=> {
        const id = pokemon.id
        fetch( pokemonUrl + id, { method: 'DELETE' } )
        .then( res => res.json() )
        .then( pokemonData => {
            if ( !pokemonData.errors ) {
                let updatedTrainers = trainers.map( trainer => {
                    if ( trainer.id === pokemon.trainer_id ) {
                        trainer.pokemons = trainer.pokemons.filter( pokemon => pokemon.id !== id )
                    }
                    return trainer
                })
                setTrainers( updatedTrainers )
                setTimeout(() => {
                    alerts( pokemonData.messages )
                }, 100 );
            }
            else alerts( pokemonData.errors )
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