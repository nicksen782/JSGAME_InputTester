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

        // CONFIG: _APP.game
        gameConfig: {
            enabled: true,
            debug  : false,
            
            // Used as the document root (For the JSGAME loader.)
            appRelPath: "JSGAME_InputTester", 

            // Used for display.
            appNameText: "JSGAME: Input Tester", 

            files:[
                // { f:"GAME/game.css"      , t:"css" },
                { "f":"inputTester_main.js"                , "t":"js", "n":"inputTester_main"      },
                { "f":"inputTester_SHARED.js"              , "t":"js", "n":"inputTester_SHARED"    },
                { "f":"gamestates/InputTester_gs_title0.js", "t":"js", "n":"inputTester_gs_title0" },
                { "f":"gamestates/InputTester_gs_tester.js", "t":"js", "n":"inputTester_gs_tester" },
                { "f":"inputTester_init.js"                , "t":"js", "n":"inputTester_init"    },
            ],
            debugFiles:[
                // { f:"GAME/debug.js" , t:"js"  },
                // { f:"GAME/debug.css", t:"css" },
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
    
            files:[
                { f:"/SHARED/VIDEO_A/videoModeA.css"     , t:"css" },
                { f:"/SHARED/VIDEO_A/videoModeA_core.js" , t:"js" },
                { f:"/SHARED/VIDEO_A/videoModeA_user.js" , t:"js" },
            ],
            debugFiles:[
                // { f:"/SHARED/VIDEO_A/videoModeA_debug.js"  , t:"js"  },
            ],
            debugFiles2:[
                // { f:"/SHARED/VIDEO_A/debug.html", t:"html", destId: "navView_gfx_debug" },
            ],
            webWorker: "/SHARED/VIDEO_A/videoModeA_webworker.js",

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
            
            // Element id to make full screen.
            // fullScreenElemId: "gameView",
            fullScreenElemId: "wrapper",
    
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
    
            files:[
                { f: "/SHARED/INPUT_A/inputModeA_core.js"      , t:"js"  },
                { f: "/SHARED/INPUT_A/inputModeA_user.js"      , t:"js"  },
                { f: "/SHARED/INPUT_A/inputModeA_mappings.js"  , t:"js"  },
                { f: "/SHARED/INPUT_A/inputModeA_web.js"       , t:"js"  },
                { f: "/SHARED/INPUT_A/inputModeA_web.css"      , t:"css" },
                { f: "/SHARED/INPUT_A/inputModeA_customized.js", t:"js"  },
            ],
            files2: [
                { f: "/SHARED/INPUT_A/inputModeA_web.html"     , t:"html", type:"webConfig" },
            ],
            debugFiles:[
                // { f: "INPUT_A/debug.js" , t:"js"  },
                // { f: "INPUT_A/debug.css", t:"css" },
            ],
            debugFiles2:[
            ],
    
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
    
            files:[
                // { f:"/SHARED//SOUND_B/soundModeB_core.js", t:"js"  },
                // { f:"/SHARED//SOUND_B/soundModeB_user.js", t:"js"  },
                // { f:"/SHARED//SOUND_B/soundModeB.css", t:"css"  },
            ],
            debugFiles:[
                // { f:"/SHARED//SOUND_B/debug.js" , t:"js"  },
                // { f:"/SHARED//SOUND_B/debug.css", t:"css" },
            ],
            debugFiles2:[
            ],
    
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
})();