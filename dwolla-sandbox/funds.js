var express = require('express');
var app = express();
var dwolla = require('dwolla-v2');

var client = new dwolla.Client({
    id: 'GFZgliT3KeVdD63qpeyqujF9WSyjy49zMk55Ipk4D13TItFG16',
    secret: "9dkp1WIhBu25nh7rI911BspQ39Dl54xucQlhLNmObUlQUSQ7S0",
    environment: 'sandbox',
});


var auth = new client.Auth({
    redirect_uri: 'http://localhost:8000/callback',
    scope: 'Send|Funding|Transactions',
    verified_account: true, // optional
    dwolla_landing: 'register', // optional
});


app.get('/', function(req, res) {
    return res.send('To begin the OAuth process, send the user off to <a href="' + auth.url + '">' + auth.url + '</a>');
});




app.get('/callback', function(req, res) {


    var userToken;

    var appRootUrl; //this is what i set as the destination for a payment
    var userRootUrl; //this is the first half of the source link for a payment
    var userFundId; //this is the second half of the source link for a payment

    auth.callback(req.query).then(function(accountToken) {

        userToken = accountToken;

        //fetch an application token to get my own credentials
        client.auth.client().then(function(appToken) {

            appToken.get('/').then(function(response) {
                appRootUrl = response.body._links.account.href;

                accountToken.get('/').then(function(response) {
                    userRootUrl = response.body._links.account.href;

                    accountToken.get(`${userRootUrl}/funding-sources`).then(function(response) {
                        userFundId = response.body._embedded['funding-sources'][0].id;

                        var requestBody = {
                            _links: {
                                source: {
                                    href: 'https://api.dwolla.com/funding-sources/' + userFundId
                                },
                                destination: {
                                    href: appRootUrl
                                }
                            },
                            amount: {
                                currency: 'USD',
                                value: '225.00'
                            },
                            metadata: {
                                foo: 'bar',
                                baz: 'boo'
                            }
                        };

                        accountToken.post('transfers', requestBody).then(function(data) {
                                console.log(data);
                                var transferUrl = data.headers.get('location');

                                accountToken.get(transferUrl).then(function(response) {
                                    res.send(response.body.status);
                                  });

                            });


                    })
                });
            })
        });







    })




});





app.listen(8000);