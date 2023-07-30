// This is the main config file for the game and any plug-ins. 
( async function(){
    // "DOM": {
    //     "gameDiv"             : "jsgame_app",
    //     "lobbyDiv"            : "jsgame_lobby",
    //     "gameContDiv"         : "InputTester_app",
    //     "app_game"            : "InputTester_app_game",
    //     "preload_canvas"      : "InputTester_app_game_preload"
    // },

    _APP.configObj = {
        // INFO: _APP.game
        gameInfo: {
            "repo":{
                "author_title" : "JSGAME_InputTester",
                "author_C"     : true,
                "author_year"  : "2023",
                "author_name"  : "Nickolas Andersen",
                "author_handle": "(nicksen782)",
                "repoType"     : "Github",
                "repoHref"     : "https://github.com/nicksen782/JSGAME_InputTester",
                "repoText"     : "nicksen782/JSGAME_InputTester"
            }
        },
        OLDCONFIG: {
            "meta":{
                "debug": false,
                
                "DOM": {
                    "gameDiv"             : "jsgame_app",
                    "lobbyDiv"            : "jsgame_lobby",
                    "gameContDiv"         : "InputTester_app",
                    "app_game"            : "InputTester_app_game",
                    "preload_canvas"      : "InputTester_app_game_preload"
                },
            },
        },

        // CONFIG: Full screen.
        fullScreenConfig: {
            listenOnId        : "gameView",
            idToMakeFullscreen: "wrapper",
        },

        // CONFIG: _APP.game
        gameConfig: {
            enabled: true,
            debug  : false,
            
            // Used as the document root (For the JSGAME loader.)
            appRelPath: "JSGAME_InputTester", 

            // Used for display.
            appNameText: "JSGAME: Input Tester", 

            useSharedPluginLoader: "GAME",
            files:[
                // { f:"GAME/game.css"      , t:"css" },
                { "f":"inputTester_main.js"                , "t":"js", "n":"inputTester_main"     , syncType: "sync" },
                { "f":"inputTester_SHARED.js"              , "t":"js", "n":"inputTester_SHARED"   , syncType: "async" },
                { "f":"gamestates/InputTester_gs_title0.js", "t":"js", "n":"inputTester_gs_title0", syncType: "async" },
                { "f":"gamestates/InputTester_gs_tester.js", "t":"js", "n":"inputTester_gs_tester", syncType: "async" },
                { "f":"inputTester_init.js"                , "t":"js", "n":"inputTester_init"     , syncType: "async" },
            ],
            debugFiles:[
                // { f:"GAME/debug.js" , t:"js", syncType: "async" },
                // { f:"GAME/debug.css", t:"css, syncType: "async" },
            ],
    
            // First gamestate1.
            // firstGamestate1:"gs_JSG",
            firstGamestate1:"gs_tester",
    
            // First gamestate2.
            firstGamestate2:"",
        },
    
        // CONFIG: _GFX
        gfxConfig: {
            enabled: true,
            debug  : false,
    
            useSharedPluginLoader: "VIDEO_A",
            files      : _APP.sharedPlugins.VIDEO_A.files,
            files2     : _APP.sharedPlugins.VIDEO_A.files2,
            debugFiles : _APP.sharedPlugins.VIDEO_A.debugFiles,
            debugFiles2: _APP.sharedPlugins.VIDEO_A.debugFiles2,
            webWorker  : _APP.sharedPlugins.VIDEO_A.webWorker,

            // Shared dimensions for each layer.
            "dimensions":{
                "pointersSize" : 8,
                "tileWidth" : 8,
                "tileHeight": 8,
                "rows":42, 
                "cols":42
            },
    
            // Layer config.
            "layers":[
                { "name": "BG1" , "canvasOptions": { "alpha": true }, "bg_color":"#111" },
                { "name": "SP1" , "canvasOptions": { "alpha": true }, "bg_color":"" },
                { "name": "TEXT", "canvasOptions": { "alpha": true }, "bg_color":"" }
            ],

            // Container for the canvas layers.
            outputDiv: "gameView",
            
            "jsgame_shared_plugins_config":{
                "videoModeA": {
                    "fadeCreateAtStart": true,
                    "debugGFX":{
                        "generateAndReturnFadedTiles": false,
                        "recordPrevChanges"          : true,
                        "returnInitTimes":  true,
                    }
                },
            },

            // Relative paths need to be relative to the appRoot. The WebWorker will resolve the path correctly.
            tilesets: [
                "tilesBG1",
                "tilesTX1",
            ],
            tilesetFiles: [
                "UAM/JSON/tilesBG1.json",
                "UAM/JSON/tilesTX1.json",
                // "UAM/JSON/combined1.json",
            ],
            
    
            tabConfig: {
                destTabs   : "mainNavMenu_ul",
                destViews  : "mainNavMenuViews",
            //     destTabId  : "navTab_inputConfig",
            //     destViewId : "navView_inputConfig",
            //     destTabId2 : "navTab_input",
            //     destViewId2: "navView_input",
            },
        },
    
        // CONFIG: _INPUT
        inputConfig: {
            enabled: true,
            debug  : false,
    
            useSharedPluginLoader: "INPUT_A",
            files      : _APP.sharedPlugins.INPUT_A.files,
            files2     : _APP.sharedPlugins.INPUT_A.files2,
            debugFiles : _APP.sharedPlugins.INPUT_A.debugFiles,
            debugFiles2: _APP.sharedPlugins.INPUT_A.debugFiles2,
            webWorker  : _APP.sharedPlugins.INPUT_A.webWorker,

            useKeyboard   : true, 
            useGamepads   : true,
            listeningElems: ["gameView", "navView_input"],
            webElem       : "navView_inputConfig",
            liveGamepadsDestId: "navView_input",
            tabConfig: {
                destTabs   : "mainNavMenu_ul",
                destViews  : "mainNavMenuViews",
                destTabId  : "navTab_inputConfig",
                destViewId : "navView_inputConfig",
                destTabId2 : "navTab_input",
                destViewId2: "navView_input",
            },
        },
    
        // CONFIG: _SND
        soundConfig: {
            enabled: false,
            debug  : false,
    
            useSharedPluginLoader: "SOUND_B",
            files      : _APP.sharedPlugins.SOUND_B.files,
            files2     : _APP.sharedPlugins.SOUND_B.files2,
            debugFiles : _APP.sharedPlugins.SOUND_B.debugFiles,
            debugFiles2: _APP.sharedPlugins.SOUND_B.debugFiles2,
            webWorker  : _APP.sharedPlugins.SOUND_B.webWorker,
    
            interActionNeededId      : "audio_userInputNeeded_container",
            blockLoopIfSoundNotLoaded: false,
        },

        // Detects little or big endianness for the browser.
        endianness : {
            isBigEndian    : new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x12 ? true : false, // ARM?
            isLittleEndian : new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x78 ? true : false, // x86
        },

        // List of config keys.
        configKeys: ["gfxConfig", "inputConfig", "soundConfig", "gameConfig"],
    };


    // Custom game file loader.
    _APP.sharedPlugins.GAME.fileLoadFunc =  async function(){
        // console.log("CUSTOM");
        await _APP.sharedPlugins.__util.fileLoadFunc1(_APP.configObj["gameConfig"], _APP.configObj["gameConfig"]);
    };
})();