"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * AnimationFrameController 1.0
 */

var AnimationFrameController = function () {
	function AnimationFrameController() {
		var autostart = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

		_classCallCheck(this, AnimationFrameController);

		this.autostart = true;
		this.paused = true;
		this.time = 0;
		this.fps = 0;

		this.callees = [];
		this.calleesTime = [];
	}

	_createClass(AnimationFrameController, [{
		key: "add",
		value: function add() {
			var _this = this;

			for (var _len = arguments.length, handlers = Array(_len), _key = 0; _key < _len; _key++) {
				handlers[_key] = arguments[_key];
			}

			handlers.forEach(function (handler) {
				if (handler instanceof Function) {
					_this.callees.unshift(handler);
					_this.calleesTime.unshift(_this.time);
				}
			});
			if (this.callees.length && this.autostart && this.paused) this.paused = false;
		}
	}, {
		key: "remove",
		value: function remove() {
			var _this2 = this;

			for (var _len2 = arguments.length, handlers = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				handlers[_key2] = arguments[_key2];
			}

			handlers.forEach(function (handler) {
				var index = -1;
				while ((index = _this2.callees.lastIndexOf(handler)) >= 0) {
					_this2.callees.splice(index, 1);
					_this2.calleesTime.splice(index, 1);
				}
			});
			if (this.callees.length <= 0) this.paused = true;
		}
	}, {
		key: "loop",
		value: function loop(time) {
			var _this3 = this;

			if (!this.paused) {

				window.requestAnimationFrame(this.loop.bind(this));

				this.time = time;

				this.callees.map(function (handler, index) {
					var delta = time - _this3.calleesTime[index];
					return handler(time, delta) === false ? handler : true;
				}).forEach(function (handler) {
					return handler !== true ? _this3.remove(handler) : 0;
				});
			}
		}
	}, {
		key: "time",
		get: function get() {
			return this._time;
		},
		set: function set(v) {
			this.fps = (v - this.time) / 1000;
			this._time = v;
			return this._time;
		}
	}, {
		key: "paused",
		get: function get() {
			return this._paused;
		},
		set: function set(v) {
			this._paused = v;
			if (this._paused === false) {
				this.loop(this.time);
			}
		}
	}]);

	return AnimationFrameController;
}();