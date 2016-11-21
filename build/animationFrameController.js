'use strict';

var AnimationFrameController = function () {

	/* Private variables */

	var functions = [],
	    animationFrame = false,
	    time = -1,
	    id = 0;

	/* Main function loop */

	function loop(newTime) {

		for (var f = 0; f < functions.length; f++) {
			if (functions[f].time === -1) {
				functions[f].time = newTime;
			} else {
				var result = functions[f].handler(newTime - time, newTime - functions[f].time);
				if (result === false) {
					AF.remove([functions[f].id]);
					f--;
				}
			}
		}

		time = newTime;

		if (animationFrame && functions.length) {
			animationFrame = window.requestAnimationFrame(loop);
		} else {
			AF.stop();
		}
	}

	/* Interface */

	var AF = {
		start: function start() {
			animationFrame = window.requestAnimationFrame(loop);
		},
		stop: function stop() {
			animationFrame = !!(window.cancelAnimationFrame(animationFrame) && false);
		},

		get paused() {
			return !!animationFrame;
		},
		autostart: true,
		add: function add(handler) {
			id++;
			functions.unshift({
				'time': -1,
				'handler': handler,
				'id': id
			});
			if (this.autostart && functions.length) {
				this.start();
			}
			return id;
		},
		remove: function remove(handler) {
			var returnFunction;
			for (var f = 0; f < functions.length; f++) {
				if (functions[f].id === handler || functions[f].handler === handler) {
					returnFunction = functions[f].handler;
					functions.splice(f, 1);
					f--;
				}
			}
			if (this.autostart && functions.length === 0) {
				this.stop();
			}
			return returnFunction;
		},
		debug: function debug() {
			return {
				'functions': functions.slice(),
				'animationFrame': animationFrame || false,
				'time': time
			};
		}
	};

	return AF;
}();