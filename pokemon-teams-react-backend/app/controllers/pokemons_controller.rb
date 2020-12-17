class PokemonsController < ApplicationController

    def create
        @trainer = Trainer.find_by( id: pokemon_params[:trainer_id] )
        if @trainer and @trainer.pokemons.length < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            @pokemon = Pokemon.new( nickname: name, species: species, trainer_id: @trainer.id )
            if @pokemon.save
                render json: @pokemon, status: :ok
            else
                render json: { errors: ['Could not catch pokemon! Try again!'] }, status: :not_acceptable
            end
        elsif @trainer and @trainer.pokemons.length >= 6
            render json: { errors: ["#{ @trainer.name } has too many pokemon already! Please release one then try again."] }, status: :method_not_allowed
        else
            render json: { errors: ['Could not find trainer.'] }, status: :not_found
        end
    end

    private

    def pokemon_params
        params.require( :pokemon ).permit( :trainer_id )
    end
end
