$(function(){
    //$.UISlideout();

    var mailRecipient = 'caique355@gmail.com';
    var mailSubject = 'Seis Sigma - Projetos';

    /////////////////////////////////////
    //Projetos - inicio                //
    /////////////////////////////////////
    $('#btnInserirProjeto').on('singletap', function() {

    	$.UIGoToArticle('#inserirProjeto');
    });
    
    $('#va-para-fase').on('singletap', function() {

    	$.UIGoToArticle('#fase');
    });

    var currentArticleId = '';
    var previousArticleId = '';
    var isExitPopupOpened = false;

    //Hardware Back Button events
    document.addEventListener('backbutton', function(event){
        event.preventDefault(); // EDIT
        console.log('physical back button pressed.');

        isExitPopupOpened = $('#warning').hasClass('opened');

        if (isExitPopupOpened) {
            return;
        }
        
        //check if current article allows user to exit
        var isArticleExitable = $('article.current').hasClass('exitable');

        //if article is exitable and popup is closed, then show exit popup
        if (isArticleExitable) {
            console.log('showing exit popup');
            $.UIPopup({
                id: "warning",
                title: 'Sair', 
                continueButton: 'OK',
                cancelButton: 'Cancelar', 
                message: 'Deseja sair?',
                callback: function(){
                    console.log('user pressed OK. Exiting...');
                    navigator.app.exitApp(); // exit the app
                }
            });
        } else if($('article.previous').length) {
            var previousArticleId = $('article.previous').prop('id');
            console.log('navigating back to article ' + previousArticleId);
            $.UIGoBackToArticle('#' + previousArticleId);
        }
        
    });

    //Navigation events
    // Function for revealing article:
    var subscribeArticleEnter = function(topic, id) {
        //var article = $('#' + id).prev().find('h1').text();
        currentArticleId = id;
        //alert('You just entered ' + article);
        console.log('entered article ' + id);
    }
    // Function for leaving article:
    var subscribeArticleLeave = function(topic, id) {
        //var article = $('#' + id).prev().find('h1').text();
        previousArticleId = id;
        //alert('You are leaving  ' + article);
        console.log('leaved article ' + id);
    };

    // Handle entering a article:
    var enterArticleSubscription = $.subscribe('chui/navigate/enter', subscribeArticleEnter);
    // Handle leaving a article:
    var leaveArticleSubscription = $.subscribe('chui/navigate/leave', subscribeArticleLeave);
    //handle going back to article
    var enterArticleSubscription = $.subscribe('chui/navigateBack/enter', subscribeArticleEnter);

})