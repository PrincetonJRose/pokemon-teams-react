import React from 'react'

const Pokemon =( props )=> {

    const pokemon = props.pokemon

    return (
        <li>
            { `${ pokemon.nickname } (${ pokemon.species })` }
            <button className='release' >
                Release
            </button>
        </li>
    )
}

export default Pokemon