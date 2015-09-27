
 var CCGestures = angular.module('CCGestures',[]);
 var app = angular.module('seisSigmaManager', ['CCGestures','ngCordova']);

 //cordova events

var cordovaApp = {
    // Application Constructor
    initialize: function() {
    	console.log('initializing...');
	    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
	        //document.addEventListener("deviceready", onDeviceReady, false);
	        this.bindEvents();
	        console.log('mobile...');
	    } else {
	        this.onDeviceReady();
	        console.log('desktop...');
	    }
        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        cordovaApp.receivedEvent('deviceready');
        //Physical Back Button events
        document.addEventListener('backbutton', cordovaApp.onBackKeyDown);
    },
    
    onBackKeyDown: function(event){
        //prevent the default back button event
        event.preventDefault();

        console.log('physical back button pressed.');

        //check if the exit popup is opened.
        var isExitPopupOpened = $('#warning').hasClass('opened');

        if (isExitPopupOpened) {
            return;
        }
        
        //Check if current article allows user to exit.
        //If you want your app to close when the user presses the back button from a specific article,
        //you just need to set a class 'exitable' on it. Example:
        //
        //<article id='home' class='current exitable'>
        //    <section>....</section>
        //</article>
        //
        var isArticleExitable = $('article.current').hasClass('exitable');

        //if article is exitable and popup is closed, then show the exit popup
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
                    // exit the app
                    navigator.app.exitApp(); 
                }
            });
        }
        //When you navigate to an article, Chocolatechip-ui will always set the .previous class to the
        //previous article.
        //Thus, it is easy to determine if there is a backwards navigable article.
        //If there is one, just navigate back to it.
        else if($('article.previous').length) {
            //get the id of the previous article
            var previousArticleId = $('article.previous').prop('id');
            console.log('navigating back to article ' + previousArticleId);
            //call ChUI native navigation method, passing the article id
            $.UIGoBackToArticle('#' + previousArticleId);
        }
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id);
    }
};

cordovaApp.initialize();