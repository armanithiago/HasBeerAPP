angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Create the pub modal that we will use later
  $ionicModal.fromTemplateUrl('templates/pubModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalMap = modal;
  });

  // Triggered in the close modal to close it
  $scope.closeMapModal = function() {
    $scope.modalMap.hide();
  };

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('MapaCtrl', function($scope) {
  //$scope.map = { center: { latitude: -30, longitude: -51 }, zoom: 8 };
  $scope.myLocation = {
    lng : '',
    lat: ''
  }

  $scope.options = {
    enableHighAccuracy: true,
    timeout: 50000,
    maximumAge: 0
  };

  $scope.drawMap = function(position) {

    //$scope.$apply is needed to trigger the digest cycle when the geolocation arrives and to update all the watchers
    $scope.$apply(function() {
      $scope.myLocation.lng = position.coords.longitude;
      $scope.myLocation.lat = position.coords.latitude;

      $scope.map = {
        center: {
          latitude: $scope.myLocation.lat,
          longitude: $scope.myLocation.lng
        },
        zoom: 14,
        pan: 1
      };

      $scope.marker = {
        id: 0,
        coords: {
          latitude: $scope.myLocation.lat,
          longitude: $scope.myLocation.lng
        },
        events: {
          click: function(marker, eventName, model) {
            $scope.modalMap.show();
          }
        }

      };
      $scope.marker.options = {
        draggable: false,
        clickable: true,
        labelContent: "lat: " + $scope.marker.coords.latitude + '<br/> ' + 'lon: ' + $scope.marker.coords.longitude,
        //		labelContent: "lat: -30" + '<br/> ' + 'lon: -51 '
        //labelAnchor: "80 120",
        //labelClass: "marker-labels",
        visible: true
      };
    });

    /* TypeError: $scope.markers.push is not a function */
    // $scope.markers.push({
    //   id: 1,
    //   coords: {
    //     latitude: -30,
    //     longitude: -51
    //   },
    //   title: "markerfoo",
    //   dizi_id: 1,
    //   markerOptions: { visible: true }
    // });
  }

  $scope.handleError = function(error) {
    console.warn('ERROR(' + error.code + '): ' + error.message);
  }

  navigator.geolocation.getCurrentPosition($scope.drawMap, $scope.handleError, $scope.options);
})


.controller('HomeCtrl', function($scope) {

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
