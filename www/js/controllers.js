angular.module('starter.controllers', ['ngMap'])
.controller('AppCtrl', AppCtrl)
.controller('mapController', mapController)
;

function AppCtrl($scope, $ionicModal, $timeout) {

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
    facebookConnectPlugin.login(["email"],
      function (response){
        console.log("THIS IS AN WIN FROM FB: " + JSON.stringify(response));
        if(response.status == "connected"){
          getPublishPerm();
        }
      },
      function (error) {
        console.log("THIS IS AN ERROR FROM FB: " + JSON.stringify(error));
      }
    );

    FB.login(function(response) {
      if (response.status === 'connected') {

      } else {
        // The person is not logged into this app or we are unable to tell.
      }
    });

    FB.logout(function(response) {
   // Person is now logged out
    });

    function checkLoginState() {
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    }
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
};

function mapController($scope, $filter, NgMap, $http){
  $scope.mapMarker = [
  {pos:[-30.2256212,-51.079219], name: "Sensor - Leste", type: "umidade"},
  {pos:[-30.2261193,-51.0785184], name: "Sensor - Oeste", type: "umidade"}
  ];

  $http({
    method: 'GET',
    url: 'http://localhost:3000/api/pub/fake'
  }).then(
    success => {
      $scope.mapMarker = success.data;
    },
    error => {
      console.log(error)
    }
  );

  $scope.options = {
    // mapTypeId: "SATELLITE",//"TERRAIN",
    enableHighAccuracy: true,
    scrollwheel: true,
    timeout: 5000,
    mapTypeControl: false,
    minZoom: 10,
    maximumAge: 0
  };
  NgMap.getMap().then(function(map) {
    $scope.map = map;
    // console.log(map.markers);
  });

  //centraliza o mapa no usuário
  $scope.position = new google.maps.LatLng($scope.mapMarker[0]['pos'][0],$scope.mapMarker[0]['pos'][1]);
  //pega a posição do usuário
  navigator.geolocation.getCurrentPosition(function(pos) {
  //userPosition guarda a posição do usuário no mapa
  $scope.userPosition = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
  // $scope.position =  $scope.userPosition;

},
function(error) {
  console.log('Unable to get location: ' + error.message);
}, $scope.options);

  //get user's city
  function getCity(lat,long){
    $http({
      method: 'GET',
      url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&sensor=true"
    }).then(function successCallback(response) {
      $scope.city = response.data.results[0].address_components[3].long_name;
      $scope.$emit('userCity',$scope.city);
    }, function errorCallback(response) {
      console.log("serviço google fora do ar");
    });
  };

  function setLocalName() {
    var lat = $scope.mapMarker.position.lat();
    var long = $scope.mapMarker.position.lng();
    $http({
      method: 'GET',
      url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&sensor=true"
    }).then(function successCallback(response) {
      document.getElementById('local').value = response.data.results[0].formatted_address;
      $scope.rua = response.data.results[0].formatted_address;
      $scope.$emit('rua',{rua:$scope.rua,street:$scope.street});
    }, function errorCallback(response) {
      console.log("serviço google fora do ar");
    });
  };

  $scope.infoMarker = function(event, sensors){
    console.log("chegou infoMarker");
    $scope.myMarker = sensors;
    $scope.map.showInfoWindow('myInfoWindow', this);
  };

  $scope.deleteMarker = function(){

    if($scope.mapMarker){
      $scope.mapMarker.setMap(null);
    }

  };
};
