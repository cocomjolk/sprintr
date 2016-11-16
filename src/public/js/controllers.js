app.controller('homeController', ['$scope', '$http', '$location', '$window',
  function($scope, $http, $location, $window) {

    $scope.view = {};

    // $scope.login = function() {
    //   var data = {
    //     username: $scope.view.username,
    //     password: $scope.view.password
    //   };
    //   $http.post('/login', data).then(function successCallback(response) {
    //     console.log('response', response);
    //     $window.localStorage.setItem('token', response.data.token);
    //     $location.path('/dashboard');
    //   });
    // }

  }
]);

app.controller('signupController', ['$scope', '$http', '$location',
  '$window',
  function($scope, $http, $location, $window) {

    $scope.view = {};
    $scope.view.signupFormInfo = {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      email: ""
    }

    $scope.submitSignupForm = function(event) {
      event.preventDefault();

      console.log($scope.view.signupFormInfo,
        'signupFormInfo from controller');

      $http.post('/signup', $scope.view.signupFormInfo)
        .then(function(response) {
          console.log(response, 'response in dot then function');
          $window.localStorage.setItem('token', response.data.token);
          var userId = response.data.id;
          $location.path('/dashboard')
        })
    }
  }
]);

app.controller('loginController', ['$scope', '$http', '$location',
  '$window',
  function($scope, $http, $location, $window) {

    $scope.view = {}

    $scope.view.loginFormInfo = {
      username: "",
      password: ""
    }

    $scope.submitLoginForm = function(event) {
      event.preventDefault();
      console.log($scope.view.loginFormInfo);
      $http.post('/login', $scope.view.loginFormInfo).then(function(
        response) {
        console.log(response, 'response in dot then function login');
        $window.localStorage.setItem('token', response.data.token);
        var userId = response.data.id;
        $location.path('/dashboard')
      })
    };

  }
]);

app.controller('dashboardController', ['$scope', '$http', '$location',
  '$window', 'currentUser', '$routeParams',
  function($scope, $http, $location, $window, currentUser, $routeParams) {

    $scope.view = {};
    $scope.currentUser = currentUser;

    // only render this part of the page if the user is using a valid token
    if ($scope.currentUser) {
      console.log($scope.currentUser, '$scope.currentUser');
      $scope.view.hi = "You have a valid token";
      $http.get('users/' + $scope.currentUser.id + '/games').then(function(
        response) {
        console.log(response.data,
          'response.data from controller dashboard after knex calls')
        $scope.view.player = response.data.user;
        console.log($scope.view.player);
        $scope.view.games = response.data.games;
        console.log($scope.view.games);

      });

    } else {
      $location.path('/')
    }

    $scope.singleGameClicked = function(gameId) {
      console.log(gameId, 'gameId from single clicked game funct');
      $http.get('users/' + $scope.currentUser.id + '/games/' + gameId).then(
        function(response) {
          console.log(response,
            'response from singleGameClicked function in dash controller'
          );
        })
    }
  }
]);


app.controller('newgameController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $scope.view = {};
    $scope.view.newgameFormInfo = {};
    $scope.view.newgameFormInfo.websites = [];


    $scope.view.newWebsite = function(site) {
      if (site) {
        if ($scope.view.newgameFormInfo.websites.indexOf(site) === -1) {
          $scope.view.newgameFormInfo.websites.push(site)
          $scope.website.name = ''
          console.log($scope.view.newgameFormInfo.websites,
            '$scope.view.newgameFormInfo.websites');
        }
      }
    }
    $scope.removeWebsite = function() {
      var indexInArray = $scope.view.newgameFormInfo.websites.indexOf(
        this.site);
      $scope.view.newgameFormInfo.websites.splice(indexInArray, 1)
    }

    $scope.editWebsite = function() {
      this.editShow = false;
      this.editShow = !this.editShow;
      $scope.editIndex = $scope.view.newgameFormInfo.websites.indexOf(
        this.site);
      console.log($scope.editIndex);
      console.log(this, 'this');
    }

    $scope.updateSite = function(siteItself) {
      let siteIndex = this.$index;
      this.site = siteItself;
      $scope.view.newgameFormInfo.websites[siteIndex] = siteItself;
      console.log($scope.view.newgameFormInfo.websites,
        'updated websites');
    }

    $scope.submitNewgameForm = function(event, gameInfo) {
      event.preventDefault();
      console.log(gameInfo, 'gameInfo inside submitNewgameForm funct');
      // console.log(event, 'event from submit new game form funct');

      // $http.get('/')
    }
  }
]);
