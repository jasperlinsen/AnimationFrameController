/*
 * AnimationFrameController 1.0
 */

class AnimationFrameController {
	
	constructor( autostart = true ){
		
		this.autostart = true;
		this.paused = true;
		this.time = 0;
		this.fps = 0;
		
		this.callees = [];
		this.calleesTime = [];
		
	}
	
	get time(){
		return this._time;
	}
	
	set time(v){
		this.fps = (v - this.time) / 1000;
		this._time = v;
		return this._time;
	}
	
	get paused(){
		return this._paused;
	}
	
	set paused(v){
		this._paused = v;
		if( this._paused === false ){
			this.loop( this.time );
		} 
	}
	
	add( ...handlers ){
	
		handlers.forEach( handler => {
			if(handler instanceof Function){
				this.callees.unshift( handler );
				this.calleesTime.unshift( this.time );
			}
		});
		if(this.callees.length && this.autostart && this.paused) this.paused = false;
		
	}
	
	remove( ...handlers ){
	
		handlers.forEach( handler => {
			let index = -1;
			while((index = this.callees.lastIndexOf( handler )) >= 0){
				this.callees.splice( index, 1 );
				this.calleesTime.splice( index, 1 );
			}
		});
		if(this.callees.length <= 0) this.paused = true;
		
	}
	
	loop( time ){
		
		try {
		
			if( !this.paused ){
		
				window.requestAnimationFrame( this.loop.bind(this) );
			
				let delta = time - this.time;
				this.time = time;
			
				this.callees.map(( handler, index ) => {
					let progress = time - this.calleesTime[index];
					return handler( delta, progress ) === false ? handler : true; 
				}).forEach(handler => {
					return handler !== true ? this.remove(handler) : 0; 
				});
			
				if( typeof this.lastCall == 'function' ) this.lastCall( delta );
			
			}
		
		} catch(e) {
		
			this.paused = true;
			console.warn('An error has occurred while running the AnimationFrame.', e);
			
		}
		
	}
	
	
}