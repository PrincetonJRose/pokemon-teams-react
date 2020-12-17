import React from 'react'
import Pokemon from './Pokemon'

const TrainerCard =( props )=> {

    const trainer = props.trainer
    const pokemon = props.trainer.pokemons

    const pokemonLis = pokemon.map( pokemon =>
        <Pokemon
            key = { pokemon.id }
            pokemon = { pokemon }
        />
    )

    return (
        <div className='card'>
            <p>
                { trainer.name }
            </p>
            <button onClick = { ()=> props.addPokemon( trainer ) }>
                Add Pokemon
            </button>
            <ul>
                { pokemonLis }
            </ul>
        </div>
    )
}

export default TrainerCard