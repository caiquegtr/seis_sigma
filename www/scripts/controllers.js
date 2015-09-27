app.controller('ProjetosController', ['$scope','$filter','projetosFactory','ccUIFactory','$cordovaFile',function($scope, $filter, projetosFactory, ccUIFactory, $cordovaFile){
    
    $scope.init = function(){
        $scope.projetos = projetosFactory.getAll();        
    };
    
    $scope.projetos = [];
    $scope.nomeProjeto = '';
    $scope.prazoProjeto = '0';

    $scope.selectProjeto = function(projeto_id){
        var found = $filter('filter')($scope.projetos, {id: projeto_id}, true);
        if (found.length) {
            $scope.projeto = found[0];
        } else {
            $scope.projeto = 'Not found';
        }
    };

    $scope.selectFase = function(fase_id){
        var found = $filter('filter')($scope.projeto.fases, {id: fase_id}, true);
        if (found.length) {
            $scope.fase = found[0];
        } else {
            $scope.fase = 'Not found';
        }
    };

    $scope.selectItemCategoria = function(item_id){
        var found = $filter('filter')($scope.categoria.itens, {id: item_id}, true);
        if (found.length) {
            $scope.itemCategoria = found[0];
        } else {
            $scope.itemCategoria = 'Not found';
        }
    };

    var isValidProjeto = function() {
        return $scope.nomeProjeto.length > 0; 
    }

    $scope.inserirProjeto = function() {
        console.log('inserir projeto - inicio');
        if ($scope.formInserirProjeto.$valid) {            
            projetosFactory.create($scope.nomeProjeto, $scope.prazoProjeto);
            $scope.projetos = projetosFactory.getAll();
            ccUIFactory.simplePopup('Projeto inserido com o nome: ' + $scope.nomeProjeto + '.','Sucesso');
            console.log('inserir projeto - projeto inserido para ' + $scope.nomeProjeto + '.');            
            $scope.nomeProjeto= '';
            $scope.formInsertExame.$setPristine();
            ccUIFactory.goBackToArticle('projetos');
        }else{
            console.log('inserir projeto - form invalido');
        }
        console.log('inserir projeto - fim');
    };
    
    $scope.enviarRespostas = function() {
    }

    function updateExame(){
        projetosFactory.update($scope.exame);
    }

    function resetItemPoints(categoria_id, item_id){
        $scope.selectCategoria(categoria_id);
        $scope.selectItemCategoria(item_id);

        if($scope.itemCategoria.concluido) 
            return;
        
        //reset item lost points
        $scope.exame.nota += $scope.itemCategoria.pontosPerdidos;
        //update overall score
        $scope.itemCategoria.pontosPerdidos = 0;
        //TODO: persist in database
        updateExame();
    }

    function toogleItemCompleted(categoria_id, item_id){
        $scope.selectCategoria(categoria_id);
        $scope.selectItemCategoria(item_id);
        //toogle item completed
        
        $scope.itemCategoria.concluido = !$scope.itemCategoria.concluido;
        //TODO: persist in database
        updateExame();
    }

    $scope.saveExame = function(){
        var mailBody = JSON.stringify($scope.exames);
        console.log('save exame - saving file...');
        //get current date
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "-"
                        + (currentdate.getMonth()+1)  + "-" 
                        + currentdate.getFullYear() + "_"  
                        + currentdate.getHours() + "-"  
                        + currentdate.getMinutes() + "-" 
                        + currentdate.getSeconds();
        var fileName = "exames_"+datetime+".txt";
        console.log('save exame - full file path: ' + cordova.file.dataDirectory + fileName);
        // WRITE
        $cordovaFile.writeFile(cordova.file.dataDirectory, fileName, mailBody, true)
            .then(function (success) {
                // success
                console.log('save exame - success');
                ccUIFactory.popup('Exames salvos!','Sucesso');
            }, function (error) {
                // error
                console.log('save exame - error:' + error.message);
            });
    }

    $scope.deleteExame = function(exame){
        $scope.exame = exame;
        ccUIFactory.popup(
            'Este exame será deletado.', 
            'Deletar: ' + exame.aluno,
            function(){
                console.log('deletar exame: ' + $scope.exame.aluno);
                //delete exame
                projetosFactory.delete($scope.exame);
                //refresh model
                $scope.exames = projetosFactory.getAll();
                $scope.exame = {}
                console.log('deletar exame: done.');
            });
    }

    $scope.init();

}]);