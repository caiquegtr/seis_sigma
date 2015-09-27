(function(){
	app.factory("guidGenerator", function () {
        var generatePart = function () {
            var guidPartNumber = (Math.random() * 0x10000) | 0;
            return (guidPartNumber + 0x10000).toString(16).substring(1).toUpperCase();
        };

        return function () {
            return generatePart()
                + generatePart()
                + "-"
                + generatePart()
                + "-"
                + generatePart()
                + "-"
                + generatePart()
                + "-"
                + generatePart()
                + generatePart()
                + generatePart();
        };
    })
	.factory('projetosFactory',['$q','$window', '$filter','guidGenerator',function($q,$window,$filter, guidGenerator){
		var localStorageKey = "projetos";

        var loadFromStorage = function () {
            return angular.fromJson($window.localStorage.getItem(localStorageKey)) || [];
        };
        
        var calcularRestante = function () {
            return 0;
        }

        var saveToStorage = function (items) {
            $window.localStorage.setItem(localStorageKey, angular.toJson(items));
        }

		return {
			getAll: function(){
				return loadFromStorage();
			},
			create: function(nome, prazo, inicio){
				var item = {
		            id:guidGenerator(),
		            projeto: nome,
		            prazo: prazo,
                    inicio: inicio,
                    restante: calcularRestante(inicio, prazo),
		            faseAtual: '1',
		            fases:[
		                {
		                    id:'1',
		                    nome:'Definir',
		                    itens: {
                                cliente: '',
                                pontoCritico: '',
                                escopo: '',
                                defeito: '',
                                valorReducao: '',
                                custoDefeito: '',
                                beneficios: '',
                                concluido:false
		                    },
		                        
		                }		                
		            ]
		        }
                var items = loadFromStorage();
                items.push(item);
                saveToStorage(items);
                return $q.when(item);

			},
			update: function(item){
				var items = loadFromStorage();
                for (var i = 0; i < items.length; i++) {
                    if (items[i].id === item.id) {
                        items[i] = item;
                        break;
                    }
                }

                saveToStorage(items);
                return $q.when(item);
			},
			//TODO: test
			delete: function(item){
				var items = loadFromStorage();
                for (var i = 0; i < items.length; i++) {
                    if (items[i].id === item.id) {
                        items.splice(i, 1);
                        break;
                    }
                }

                saveToStorage(items);
                return $q.when(item);
			}
		};
	}]);
	
	CCGestures.factory('ccUIFactory', function(){
		return {
			popup: function(message,title,callback){
				title = title || 'Atenção';
				callback = callback || function(){}
				$.UIPopup({
		            id: "warning",
		            title: title, 
		            cancelButton: 'Cancelar',
		            continueButton: 'OK', 
		            message: message,
		            callback: callback
		        });
			},
			simplePopup: function(message,title,callback){
				title = title || 'Atenção';
				callback = callback || function(){}
				$.UIPopup({
		            id: "warning",
		            title: title, 
		            continueButton: 'OK', 
		            message: message,
		            callback: callback
		        });
			},
			goToArticle: function(articleId){
				$.UIGoToArticle('#' + articleId);
			},
			goBackToArticle: function(articleId){
				$.UIGoBackToArticle('#' + articleId);
			}
		};
	});

})();