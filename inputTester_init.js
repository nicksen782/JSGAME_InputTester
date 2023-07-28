// This should run AFTER the _APP.game.gameLoop.init.
_APP.game.init = async function(){
    // Show the inputConfig tab.
    // Need to repeatedly check the state of _APP.navBarMAIN.inited.
    let id = setInterval(function(){
        if(_APP.navBarMAIN.inited){
            clearTimeout(id);
            _APP.navBarMAIN.showOne("inputConfig");
        }
    }, 250);
};