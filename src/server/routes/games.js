const express = require( 'express' );
const router = express.Router( {
    mergeParams: true
} );
const environment = process.env.NODE_ENV || "development";
const knexConfig = require( '../../../knexfile' )[ environment ];
const knex = require( 'knex' )( knexConfig );

//=-=-=-==-=-=-=- ROUTE PREFIX -- '/users/:user_id/games/' =-=-=-=-==---

//     /users/:user_id/games/new (post, user creates game)...happens when user clicks "submit" on the last create game view page

router.post( '/new', function( req, res ) {
    //create a new game, designate creator as the admin
    console.log( req.body, 'req.body' );
    var reqBody = req.body;
    var gameWebsites = req.body.websites;
    console.log( gameWebsites, 'gameWebsites array from request' );
    //--make entry into games table
    knex( 'games' ).insert( {
            name: req.body.name,
            admin_user_id: req.params.user_id,
            active_game: true,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            game_type: req.body.game_type,
            first_place: null,
            second_place: null,
            third_place: null
        }, '*' )
        //make entry into game_player table
        .then( function( thisGame ) {
            console.log( thisGame, 'thisGame data after insert into games table' );
            knex( 'game_player' ).insert( {
                    game_id: thisGame.id,
                    player_id: req.body.user_id,
                    final_ranking: null
                }, '*' )
                //make entry for each website into game_website table
                .then( function( gamePlayer ) {
                    console.log( gamePlayer, 'gamePlayer info after insert into game_player table' );
                    //--create entries into game_websites for each designated URL
                    gameWebsites.forEach( function( site ) {
                        knex( 'game_website' ).insert( {
                            game_id: gamePlayer.id,
                            domain: site
                        }, '*' ).then( function( data ) {
                            console.log( data, 'data from the last knex call' );
                            res.json( {
                                games: data
                            } )
                        } )
                    } )
                } );
        } )
} )





router.post( '/join', function( req, res ) {
    //add user to an existing game
    knex( 'games' ).where( 'id', req.body.id )
        //--register player in game_player table
        //--fetch id for game_websites (for tracking this players score for this game)
        //--create entry in player_game_website for each ID above
} );

//admin can edit and existing game
router.patch( '/:game_id', function( req, res ) {

} );

//fetch details about all games that user belongs to
router.get( '/', function( req, res ) {
    console.log( req.headers.userid, 'req.headers.userId from games / get route' );
    knex( 'players' ).innerJoin( 'game_player', 'players.id', 'game_player.user_id' ).then( function( data ) {
        console.log( data );
    } )
} );


//fetch details about a single game
// router.get( '/:game_id', function( req, res ) {
//
// } );


module.exports = router;
