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
                            perguntas: [
                                {
                                    pergunta: 'Quem é o meu cliente?',
                                    categoria: 'cliente',
                                    model: ''
                                },
                                {
                                    pergunta: 'O que é crítico para o cliente (CTQ)?',
                                    categoria: 'pontoCritico',
                                    model: ''
                                },
                                {
                                    pergunta: 'Qual é o escopo?',                                    
                                    categoria: 'escopo',
                                    model: ''
                                },
                                {
                                    pergunta: 'Qual defeito estou tentando reduzir?',
                                    categoria: 'defeito',
                                    model: ''
                                },
                                {
                                    pergunta: 'Em quanto? (meta realista e apropriada)',
                                    categoria: 'valorReducao',
                                    model: ''
                                },
                                {
                                    pergunta: 'Qual é o custo atual dos defeitos (baixa qualidade)?',
                                    categoria: 'custoDefeito',
                                    model: ''
                                },
                                {
                                    pergunta: 'Quais benefícios serão obtidos com a redução dos defeitos?',
                                    categoria: 'beneficios',
                                    model: ''
                                }
                            ],
		                        
		                },
                        {
		                    id:'2',
		                    nome:'Medir',
		                    itens: {
                                y: '',
                                relcionamnetoYCliente: '',
                                limites: '',
                                definicaoDefeito: '',
                                relDefeitoCliente: '',
                                dadosNecessarios: '',
                                habilidadeParaMedir: '',
                                possiveisX: '',
                                plano: '',
                                dadosObtidos: '',
                                desempenhoAtual: '',
                                visaoDetalhadaProcesso: '',
                                metaMelhoria: '',
                                apostaFinanceira: '',
                                concluido:false
		                    }, 
                            perguntas: [
                                {
                                    pergunta: 'Quem é o Y do projeto?',
                                    categoria: 'y',
                                    model: ''
                                },
                                {
                                    pergunta: 'Como ele está relacionado com o Y do cliente?',
                                    categoria: 'relcionamnetoYCliente',
                                    model: ''
                                },
                                {
                                    pergunta: 'Quais são os limites da especificação e o alvo?',                                    
                                    categoria: 'limites',
                                    model: ''
                                },
                                {
                                    pergunta: 'Definir o Defeito, Unidade e Oportunidade.',
                                    categoria: 'definicaoDefeito',
                                    model: ''
                                },
                                {
                                    pergunta: 'Como ele se relaciona com a exigencias do cliente?',
                                    categoria: 'relDefeitoCliente',
                                    model: ''
                                },
                                {
                                    pergunta: 'Quais dados eu preciso para meu Y, onde, como, quando e com quem serão coletados?',
                                    categoria: 'dadosNecessarios',
                                    model: ''
                                },
                                {
                                    pergunta: 'A minha habilidade para medir / detectar é boa o suficiente?',
                                    categoria: 'habilidadeParaMedir',
                                    model: ''
                                },                               
                                {
                                    pergunta: 'Quais são meus possiveis X. Onde, quando, como e com quem coleto esses dados?',
                                    categoria: 'possiveisX',
                                    model: ''
                                },
                                {
                                    pergunta: 'Existe um plano para obter os dados?',
                                    categoria: 'plano',
                                    model: ''
                                },
                                {
                                    pergunta: 'Obter dados!',
                                    categoria: 'dadosObtidos',
                                    model: ''
                                },
                                {
                                    pergunta: 'Qual é o desempenho atual?',
                                    categoria: 'desempenhoAtual',
                                    model: ''
                                },
                                {
                                    pergunta: 'Como o processo realmente funciona?',
                                    categoria: 'visaoDetalhadaProcesso',
                                    model: ''
                                },
                                {
                                    pergunta: 'Qual é a meta de melhoria?',
                                    categoria: 'metaMelhoria',
                                    model: ''
                                },
                                {
                                    pergunta: 'Qual é a aposta financeira?',
                                    categoria: 'apostaFinanceira',
                                    model: ''
                                }                                
                            ],
		                        
		                },
                        {
		                    id:'3',
		                    nome:'Analisar',
		                    itens: {
                                variabilidadey: '',
                                consertoRapido: '',
                                xPrincipais: '',
                                testeEstratrgico: '',
                                problemaDefinido: '',
                                aprimoramentos: '',
                                continuarProjeto: ''                                
                                concluido:false
		                    }, 
                            perguntas: [
                                {
                                    pergunta: 'Quem é o Y do projeto?',
                                    categoria: 'y',
                                    model: ''
                                },
                                {
                                    pergunta: 'Como ele está relacionado com o Y do cliente?',
                                    categoria: 'relcionamnetoYCliente',
                                    model: ''
                                },
                                {
                                    pergunta: 'Quais são os limites da especificação e o alvo?',                                    
                                    categoria: 'limites',
                                    model: ''
                                },
                                {
                                    pergunta: 'Definir o Defeito, Unidade e Oportunidade.',
                                    categoria: 'definicaoDefeito',
                                    model: ''
                                },
                                {
                                    pergunta: 'Como ele se relaciona com a exigencias do cliente?',
                                    categoria: 'relDefeitoCliente',
                                    model: ''
                                },
                                {
                                    pergunta: 'Quais dados eu preciso para meu Y, onde, como, quando e com quem serão coletados?',
                                    categoria: 'dadosNecessarios',
                                    model: ''
                                },
                                {
                                    pergunta: 'A minha habilidade para medir / detectar é boa o suficiente?',
                                    categoria: 'habilidadeParaMedir',
                                    model: ''
                                }                                
                            ],
		                        
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