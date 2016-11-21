'use strict';

var AnimationFrameController = function () {

	/* Private variables */

	var functions = [],
	    animationFrame = false,
	    paused = false,
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
					AF.remove(functions[f].id);
					f--;
				}
			}
		}

		time = newTime;

		if (animationFrame && functions.length) {
			animationFrame = window.requestAnimationFrame(loop);
		}
	}

	/* Interface */

	var AF = {
		start: function start() {
			if (!animationFrame) {
				animationFrame = window.requestAnimationFrame(loop);
			}
		},
		stop: function stop() {
			if (animationFrame) {
				animationFrame = !!(window.cancelAnimationFrame(loop) && false);
			}
		},

		get paused() {
			return !!animationFrame;
		},
		autostart: true,
		add: function add() {
			for (var _len = arguments.length, handlers = Array(_len), _key = 0; _key < _len; _key++) {
				handlers[_key] = arguments[_key];
			}

			for (var h = 0; h < handlers.length; h++) {
				functions.unshift({
					'time': -1,
					'handler': handlers[h],
					'id': id++
				});
				handlers[h] = id;
			}
			if (this.autostart && functions.length) {
				this.start();
			}
			return handlers;
		},
		remove: function remove() {
			for (var _len2 = arguments.length, handlers = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				handlers[_key2] = arguments[_key2];
			}

			for (var h = 0; h < handlers.length; h++) {
				for (var f = 0; f < functions.length; f++) {
					if (functions[f].id === handlers[h] || functions[f].handler === handlers[h]) {
						handlers[h] = functions[f].handler;
						functions.splice(f, 1);
						f--;
					}
				}
				if (this.autostart && functions.length === 0) {
					this.stop();
				}
			}
			return handlers;
		},
		debug: function debug() {
			return {
				'functions': functions,
				'animationFrame': animationFrame,
				'paused': paused,
				'time': time
			};
		}
	};

	return AF;
}();