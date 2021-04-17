/*
* Isoftbet flash launcher
*/

var LaunchSWF =  {

	dim_vars : {
		b_height			: 750,
		top_ref				: 40,
		height_ref			: 600,
		width_ref 			: 800,
		background 			: false
	},

	launch_params : {},

	bg : [],

	/*
	* Load the game
	*/

	loadGame : function(launch_params, backgrounds) {

		var thisLauncher = this;
		var dim_vars = this.dim_vars;

		this.launch_params = launch_params;

		if(undefined != backgrounds) {
			thisLauncher.loadBackgrounds(backgrounds);
			dim_vars.background = true;
		} else {
			dim_vars.background = false;
		}

		var swf_width = (dim_vars.background ? 800 : "100%");
		var swf_height = (dim_vars.background ? 600 : "100%");

		swfobject.embedSWF(launch_params.game_swf_path,"game", swf_width, swf_height,"0", launch_params.flash_params.customExpressInstall, launch_params.flash_vars, launch_params.flash_params, null, function(e) {
			
			thisLauncher.resizeGameFrame(dim_vars);

		});


	},

	/*
	* Load custom backgrounds
	*/

	loadBackgrounds: function(backgrounds) {

		this.bg = backgrounds;
		var dim_vars = this.dim_vars;
		var thisLauncher = this;

		thisLauncher.resizeGameFrame(dim_vars);

		$(window).resize(function() {
			thisLauncher.resizeGameFrame(dim_vars);
		});

		//load first image

		thisLauncher.loadImage(thisLauncher.launch_params.game_bg_host + this.bg[0].url, function(elem) {

			$(elem).addClass("custom_background").prependTo($("body")).fadeIn(3000);

		});

	},

	changeBackground: function(name) {

		var image = false;

		for(var i = 0; i < this.bg.length; i++) {

			if(this.bg[i].name == name) image = this.bg[i];

		}

		if(image) {

			this.loadImage(this.launch_params.game_bg_host + image.url, function(elem) {

				$(".custom_background").fadeOut(3000, function() {
					$(this).remove();
				});

				$(elem).addClass("custom_background").prependTo($("body")).fadeIn(3000);

			});

		}

	},

	loadImage: function(img, callback) {

		var image = new Image;

		image.onload = function() {
			callback(this);
		};

		image.src = img;

	},

	/*
	* Resize game frame for custom backgrounds
	*/

	resizeGameFrame: function(dim_vars) {

		if(dim_vars.background) {

			var w_height = $(window).height(), w_width = $(window).width();
			var g_top = (w_height / dim_vars.b_height) * dim_vars.top_ref;
			var g_height = w_height - (g_top * 2);
			var g_width = (g_height * (dim_vars.width_ref / dim_vars.height_ref));

			$("#game").css({ height : g_height, width : g_width, top: g_top, left: (w_width - g_width) / 2});

		}

	},

	/*
	* Handle a game command
	*/

	gameCommand: function(command) {

		console.log("Command: " + command);

		switch(command) {
			case 'chat':
				// open chat window
			break;
			case 'rules':
				window.open(this.launch_params.game_rules);
			break;
			case 'deposit':
				// open deposit form
			break;
			case 'withdraw':
				//open withdrawal form
			break;
            case 'reload':
			case 'close':
				//close the game
				console.log("game closing");

                if (typeof this.launch_params.flash_vars.lobby !== 'undefined' && this.launch_params.flash_vars.lobby !== '') {//redirect to lobby

                    if (window.self !== window.top) {
                        parent.window.location.href = this.launch_params.flash_vars.lobby;
                    } else {
                        window.location.href = this.launch_params.flash_vars.lobby;
                    }

                } else {//send post message or close the game

                    if (window.self !== window.top) {
                        window.parent.postMessage('closeGame','*');
                    } else {
                        self.close();
                    }

                }

			    break;
			case 'playforreal':
				// invite the player to get serious
			break;
			case 'history':

                if (window.self !== window.top && this.launch_params.flash_vars.tcd == 1)  {
                    window.top.postMessage('showHistory', '*');
                } else {
                    if (this.launch_params.game_history != "" && this.launch_params.game_history_random === 1) {
                        window.open(this.launch_params.game_history+"&rnd="+Math.random().toString().replace("0.",""));
                    } else if (this.launch_params.game_history != "") {
                        window.open(this.launch_params.game_history);
                    }
                }

			break;
			default:
				
		}

	}


};

function game_action(command) { LaunchSWF.gameCommand(command); };

function changeBackground(name){ LaunchSWF.changeBackground(name); }
