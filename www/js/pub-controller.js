angular.module('PubModule', ['CrudServiceModule']) 

.controller('PubController', ['$scope', 'CrudService', '$routeParams', function($scope, CrudService, $routeParams) {

    $scope.url = 'http://localhost:8080/hasbeer/rest/';

    $scope.objeto = { Pub: 'pub' }; 
    $scope.resultados;
    $scope.idEdicao = $routeParams.id;

   
    $scope.consultar = function(id) {
        CrudService.consultar($scope.url, id, function(obj) {
            $scope.objeto = obj;
        });
    }
    
    if(angular.isDefined($scope.idEdicao)) {
        $scope.consultar($scope.idEdicao);
    }
    
     $scope.pesquisar = function() {
        CrudService.pesquisar($scope.url, $scope.objeto.pub, function(data) {
            $scope.resultados = data;
        });
    }
    
    $scope.adicionar = function (){
        CrudService.adicionar($scope.url, $scope.objeto.pub, function(data)){
            $scope.adicionar = data;
        }
    }


}]);
