'use strict';

const AnimationFrameController = function(){
	
	/* Private variables */
	
	var functions = [],
		animationFrame = false,
		paused = false,
		time = -1,
		id = 0;
	
	/* Main function loop */
	
	function loop( newTime ){
		
		for( let f = 0; f < functions.length; f++ ){
			if( functions[f].time === -1 ){
				functions[f].time = newTime;
			} else {
				let result = functions[f].handler( newTime - time, newTime - functions[f].time );
				if( result === false ){
					AF.remove( functions[f].id );
					f--;
				}
			}
		}
		
		time = newTime;
		
		if( animationFrame && functions.length ){
			animationFrame = window.requestAnimationFrame( loop );
		}
		
	}
	
	/* Interface */
	
	var AF = {
		start(){
			if( !animationFrame ){
				animationFrame = window.requestAnimationFrame( loop );
			}
		},
		stop(){
			if( animationFrame ){
				animationFrame = !!( window.cancelAnimationFrame( loop ) && false );
			}
		},
		get paused(){
			return !!animationFrame;
		},
		autostart: true,
		add( ...handlers ){
			for( let h = 0; h < handlers.length; h++ ){
				functions.unshift({
					'time': -1,
					'handler': handlers[h],
					'id': id++
				});
				handlers[h] = id;
			}
			if( this.autostart && functions.length ){
				this.start();
			}
			return handlers;
		},
		remove( ...handlers ){
			for( let h = 0; h < handlers.length; h++ ){
				for( let f = 0; f < functions.length; f++ ){
					if( functions[f].id === handlers[h] || functions[f].handler === handlers[h] ){
						handlers[h] = functions[f].handler;
						functions.splice( f, 1 );
						f--;
					}
				}
				if( this.autostart && functions.length === 0 ){
					this.stop();
				}
			}
			return handlers;
		},
		debug(){
			return {
				'functions': functions.slice(),
				'animationFrame': animationFrame,
				'paused': paused,
				'time': time
			}
		}
	};
	
	return AF;
	
}();