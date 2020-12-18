import React from 'react'

const Pokemon =( props )=> {

    const pokemon = props.pokemon

    return (
        <li>
            { `${ pokemon.nickname } (${ pokemon.species })` }
            <button className='release' onClick={ () => props.releasePokemon( pokemon ) } >
                Release
            </button>
        </li>
    )
}

export default Pokemon