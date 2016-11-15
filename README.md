# AnimationFrameController
Controller for `requestAnimationFrame`.

## Usage
Start a new instance of the animationFrameController, you only need one per page.

    const AF = new AnimationFrameController;

The controller will start executing your handlers as soon you add one to the controller using:

    AF.add( myFunction );

You can pass a `bool` to the constructor to disable automatically starting the animationFrame. You can then start it using `AF.paused = false`. The handler will be called every frame until it gets removed:

    AF.remove( myFunction );
    
The handler itself can also cancel itself out of the animationFrame by explicitly returning `false`:

    let myFunction = function(){ return false; };

Every handler, when called, gets passed two variables: `delta` and `progress`. The delta represents the change (in milliseconds) since the last frame was called. Progress contains the the amount of time since the handler was added to the animationFrame.

The most useful aspect is to use it to animate something. Here is an example:
	
    let duration = 5000;
    let aNode = document.getElementById('myNode');
    let moveLeftFiveSeconds = ( delta, progress ) => {
    	let now = progress / duration;
    	if( now >= 1 ){
    		aNode.style.left = '100%';
    		return false;
    	} else {
    		aNode.style.left = (progress * 100).toFixed(2) + '%';
    	}
    }

`return false` will remove the function from the animation frame when its done and it will get cleaned up by the garbage collection later.