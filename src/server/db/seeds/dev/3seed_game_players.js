exports.seed = function( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'game_player' ).del()
        .then( function() {
            return Promise.all( [
                // Inserts seed entries
                knex( 'game_player' ).insert( {
                    id: 1,
                    game_id: '1',
                    player_id: '1',
                    final_ranking: null
                } ),
                knex( 'game_player' ).insert( {
                    id: 2,
                    game_id: '2',
                    player_id: '2',
                    final_ranking: null
                } ),
                knex( 'game_player' ).insert( {
                    id: 3,
                    game_id: '1',
                    player_id: '2',
                    final_ranking: null
                } )
            ] );
        } );
};