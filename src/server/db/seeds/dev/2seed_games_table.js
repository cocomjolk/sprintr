const moment = require('moment');
var startdate = moment().format();
var new_date = moment(startdate, "DD-MM-YYYY").add(5, 'days').format();
const bcrypt = require('bcrypt');
const saltRounds = 4;
const passwordHash = bcrypt.hashSync('password1', saltRounds);

console.log(startdate);

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('games').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex.raw('ALTER SEQUENCE games_id_seq RESTART WITH 1'),
                knex('games').insert({
                    id: 1,
                    admin_user_id: '1',
                    active: true,
                    start_time: startdate,
                    end_time: new_date,
                    game_type: 'cash',
                    name: 'Learning React!',
                    game_password: passwordHash
                }),
                knex('games').insert({
                    id: 2,
                    admin_user_id: '1',
                    active: true,
                    start_time: startdate,
                    end_time: new_date,
                    game_type: 'cash',
                    name: 'Alpaca Breeding Club',
                    game_password: passwordHash
                }),
                knex('games').insert({
                    id: 3,
                    admin_user_id: '1',
                    active: true,
                    start_time: startdate,
                    end_time: new_date,
                    game_type: 'cash',
                    name: 'French Study Group',
                    game_password: passwordHash
                }),
                knex('games').insert({
                    id: 4,
                    admin_user_id: '1',
                    active: true,
                    start_time: startdate,
                    end_time: new_date,
                    game_type: 'cash',
                    name: 'Real Estate Investing',
                    game_password: passwordHash
                }),
            ]);
        });
};
