_APP = {
    // canvas       : undefined,
    // ctx          : undefined,
    // sprite_canvas: undefined,
    // sprite_ctx   : undefined,
    // fade_canvas  : undefined,
    // fade_ctx     : undefined,

    // Create Canvas And Event Listeners.
    init_createCanvasAndEventListeners: function(){
        this.DOM["gameContDiv"].setAttribute('tabindex','0');
        this.DOM["app_game"].setAttribute('tabindex','0');

        _JSG.loadingDiv.addMessageChangeStatus(`  ${_JSG.loadedAppKey}: init_createCanvasAndEventListeners: Add event listeners.`, "loading");
        // Add the keydown input handler.
        // this.DOM["gameContDiv"].addEventListener("keydown", (ev)=>{game.getInput(ev);}, false);
        
        // Add focus/blur event to the canvas.
        this.DOM["gameContDiv"].addEventListener("focus", (ev)=>{ this.DOM["gameContDiv"].classList.add("focused"); }, false);
        this.DOM["gameContDiv"].addEventListener("blur" , (ev)=>{ this.DOM["gameContDiv"].classList.remove("focused"); }, false);
        this.DOM["app_game"].addEventListener("focus", (ev)=>{ this.DOM["app_game"].classList.add("focused"); }, false);
        this.DOM["app_game"].addEventListener("blur" , (ev)=>{ this.DOM["app_game"].classList.remove("focused"); }, false);
    },

    // Draws the preload message to the preload_canvas.
    drawPreload: function(){
        obj = {};
        obj.canvas = this.DOM["preload_canvas"];
        obj.ctx    = this.DOM["preload_canvas"].getContext("2d");
        obj.fontSize        = "20"; 
        obj.font            = `${obj.fontSize}px monospace`; 
        obj.textAlign       = "center";
        obj.backgroundColor = "rgba(255, 0, 0, 0.60)";
        obj.fontColor       = "white";
        obj.text            = "- CLICK HERE TO START -";
        obj.textBaseline    = "middle";

        // Parse fontsize, set fontsize, get ctx, textAlign.
        obj.ctx.font      = obj.font;
        obj.ctx.textAlign = obj.textAlign;
        
        // Dimensions and coordinates for the rectangle.
        var rectX = 0;
        var rectY = (obj.canvas.height / 2) - obj.fontSize * 1.5;
        var rectW = Math.floor(obj.canvas.width);
        var rectH = obj.fontSize * 2.25;
        
        // Draw the background. 
        obj.ctx.fillStyle = "#111";
        obj.ctx.fillRect(0, 0, obj.canvas.width, obj.canvas.height);

        // Draw the rectangle.
        obj.ctx.fillStyle = obj.backgroundColor;
        obj.ctx.fillRect(rectX, rectY, rectW, rectH);

        // Draw the text.
        obj.ctx.textBaseline=obj.textBaseline;
        obj.ctx.fillStyle = obj.fontColor;
        obj.ctx.fillText(obj.text , rectX+(rectW/2),rectY+(rectH/2));
    },

    init: async function(){
        return new Promise(async (resolve, reject)=>{
            // appConfig overrides.
            if(_JSG.params.debug){
                if(_JSG.params.debug=="0"){ _JSG.loadedConfig.meta.debug = false; }
                else if(_JSG.params.debug=="1"){ _JSG.loadedConfig.meta.debug = true; }
            }

            // Load in the DOM from meta.
            _JSG.loadingDiv.addMessageChangeStatus(`  ${_JSG.loadedAppKey}: Init.`, "loading");
            _APP.DOM = _JSG.loadedConfig.meta.DOM;
            await _JSG.shared.parseObjectStringDOM(_APP.DOM, false);
            _APP.DOM["gameDiv"].innerHTML = this.files["inputTester_html"]; 
            await _JSG.shared.parseObjectStringDOM(_APP.DOM, true);

            // Create Canvas And Event Listeners.
            this.init_createCanvasAndEventListeners();
            
            // Graphics init.
            _JSG.loadingDiv.addMessageChangeStatus(`  ${_JSG.loadedAppKey}: Init: Graphics.`, "loading");
            await _GFX.init();
            
            // Input init.
            _JSG.loadingDiv.addMessageChangeStatus(`  ${_JSG.loadedAppKey}: Init: Input.`, "loading");
            await _INPUT.init( [_APP.DOM["app_game"], _APP.DOM["gameContDiv"] ] );

            // Gameloop init.
            await _APP.game.gameLoop.init(this);

            // Add the _GFX-generated canvas layers.
            for(let i=0, l= _GFX.canvasLayers.length; i<l; i+=1){
                this.DOM["app_game"].append(_GFX.canvasLayers[i].canvas);
            }

            // DEBUG? Unhide the div, init and switch to the debug tab if debug is active.
            if(_JSG.loadedConfig.meta.debug == true){
                // // Move the game's debugDiv to the JSGAME lobby debug div. (debug tab.)
                // this.DOM["lobby_nav_view_debug"].append(this.DOM["app_debugDiv"]);
                
                // // Unhide the app_debugDiv.
                // this.DOM["app_debugDiv"].classList.remove("hide");

                // // Increase the width of the lobby div. 
                // this.DOM["lobbyDiv"].style.width = "800px";

                // await _APP.debug.init(this);
                // if(_JSG.loadedConfig.meta.autoSwitchToLobbyDebugTab){ _JSG.lobby.nav.showOneView("debug"); }
                // resolve();
            }
            
            // Otherwise, switch to some other default lobby tab if so specified.
            else if(_JSG.loadedConfig.meta.defaultLobbyTab){
                _JSG.lobby.nav.showOneView(_JSG.loadedConfig.meta.defaultLobbyTab);
                // resolve();
            }
            // else{ resolve(); }

            // Start the gameLoop after a short delay.
            await new Promise((res,rej)=>{ setTimeout(()=>{res();}, 500); });

            // Hide all canvases except the InputTester_app_game_preload canvas.
            // let canvases = this.DOM["app_game"].querySelectorAll(`canvas:not(#${this.DOM["preload_canvas"].id})`);
            // for(let i=0, l=canvases.length; i<l; i+=1){
            //     canvases[i].style.display = "none";
            // }
            // this.DOM["preload_canvas"].width = canvases[0].width; 
            // this.DOM["preload_canvas"].height = canvases[0].height; 
            // this.DOM["preload_canvas"].classList.add("active"); 

            // Draw the preload message to the preload_canvas.
            // this.drawPreload();

            // Start the gameLoop after a click the preload canvas. 
            // this.DOM["preload_canvas"].onclick = async ()=>{
                // this.DOM["preload_canvas"].onclick = null;
                // this.DOM["preload_canvas"].classList.remove("active");

                // for(let i=0, l=canvases.length; i<l; i+=1){
                    // canvases[i].style.display = "unset";
                // }

                // Run post-init tasks before starting the gameLoop.
                await this.postInit();

                // Request the first frame.
                console.log("GAMELOOP START");
                console.log("");
                _APP.game.gameLoop.loop_start();
                
                setTimeout(()=>{ 
                    _JSG.shared.setVisibility(_JSG.DOM["jsgame_menu_toggleLoading"], false, false);
                    _INPUT.web.mainView.showInput_hideOthers(true);
                    resolve();
                }, 500);

            // };

            // setTimeout(()=>{ this.DOM["preload_canvas"].click(); }, 500);
        });
    },

    // Process init tasks (Ex: sound) that can only be done after a user-gesture.
    postInit: function(){
        return new Promise( async (resolve,reject)=>{
            await this.game.acceptNewInput( await _INPUT.util.getStatesForPlayers() );
            resolve();
        });
    },
};