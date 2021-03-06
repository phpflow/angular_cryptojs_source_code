TestApp = angular.module('TestApp', ['TestApp.controllers', 'angularjs-crypto']);

TestApp.run(function(cfCryptoHttpInterceptor, $rootScope) {
    $rootScope.base64Key = CryptoJS.enc.Base64.parse("2b7e151738aed2a6abf7158809cf4f3c");
	$rootScope.iv = CryptoJS.enc.Base64.parse("3ad77bb90d7a3770a89ecaf32466ef97");
})
	
angular.module('TestApp.controllers', []).controller('testController', function($scope, $rootScope) {
			$scope.source_string = 'parvez.alam';
			
			console.log('source String = ' + $scope.source_string);
			var encrypted = CryptoJS.AES.encrypt(
							  $scope.source_string,
							  $rootScope.base64Key,
							  { iv: $rootScope.iv });
			console.log('encrypted = ' + encrypted);
			
			 $scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
			 console.log('ciphertext = ' + $scope.ciphertext);
			 
			 var cipherParams = CryptoJS.lib.CipherParams.create({
								ciphertext: CryptoJS.enc.Base64.parse($scope.ciphertext)
							  });
			 var decrypted = CryptoJS.AES.decrypt(
								  cipherParams,
								  $rootScope.base64Key,
								  { iv: $rootScope.iv });
								  $scope.descrString = decrypted.toString(CryptoJS.enc.Utf8);
			console.log('decrypted='+$scope.descrString);
});