/* Controllers */

function IndexCtrl($scope, $http) {
  $http.get('/api/publications').
    success(function(data, status, headers, config) {
      $scope.publications = data.publications;
    });
};

function ImportMemberCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.importMember = function() {
    $http.post('/api/importMembers', $scope.form).
      success(function(data) {
        $location.path('/')
      });
  };
};

function MembersCtrl($scope, $http, $location) {
  $scope.form = {};
  $http.get('/api/members', $scope.form).
    success(function(data) {
      $scope.members = data;
    });
};

function PublicationsCtrl($scope, $http, $location) {
  $scope.form = {};
  $http.get('/api/publications', $scope.form).
    success(function(data) {
      $scope.publications = data;
      $scope.publicationsHeader = "There " + ( data.length == 1 ? "is " : "are ") + (data.length > 0 ? data.length : "no") + " publication" + (data.length != 1 ? "s." : ".");
    });
};

function EditMemberCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $scope.editingNewPub = false;
  $http.get('/api/editMember/' + $routeParams.id).
    success(function(data) {
      $scope.member = data.member;
      $scope.pubMedia = data.pubMedia;
      $scope.isEditing = false;
    });

  $scope.editMember = function() {
    $http.put('/api/editMember/' + $routeParams.id, $scope.member).
      success(function(data) {
        $location.path('/viewMembers');
      });
  };

  $scope.editPub = function(publication) {
    $scope.isEditingPub = true;
    publication.isEditing = true;
  }
  $scope.addPublication = function() {
    if ($scope.isEditingPub) {
      return;
    }
    $scope.isEditingPub = true;
    var newPublication = {
      pubTitle: '',
      pubYear: '',
      pubNotes: '',
      _id: 0,
      isEditing: true
    }
    if ($scope.member.publications == null) {
      $scope.member.publications = [];
    }
    $scope.member.publications.push(newPublication);
  }
  $scope.cancelPublication = function(publication) {
    $http.get('/api/editMember/' + $routeParams.id).
      success(function(data) {
        $scope.member = data.member;
        $scope.pubMedia = data.pubMedia;
        $scope.isEditingPub = false;
      });
  }
};