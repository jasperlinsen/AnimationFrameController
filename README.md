# AnimationFrameController
Controller for `requestAnimationFrame`.

## Usage
Adding this to your page will create a constant named `AnimationFrameController`. Because it is a mouthful, I will assign it to the shorthand `AF`:

    const AF = new AnimationFrameController;

The controller will start executing your handlers as soon you add one to the controller using:

    var functionId = AF.add( myFunction );

The return value of add is an array of _identifiers_. To remove a function, simply pass back in the function itself or its identifier:

    AF.remove( myFunction );	

or

	AF.remove( functionId );

On top of that, the function can explicitly return the bool `false` if it is done:

	function myFunction(){
		count++;
		if( count >= 100 ){ return false; }
	}

You can stop and start the animationFrameController by using the `AF.stop()` and `AF.start()` methods. The AnimationFrameController will start running animation frames as soon as a function gets added, and will stop when all functions have been removed.

## Debug

The `.debug()` method will tell you what handlers are currently set, as well as the current time and id index. This is useful for debugging to see if a function was added or not. It will return a copy of the value, and editing the data will have no effect on the animationFrameController.

_(Improvements in this 1.1.0 version helpfully pointed out by @Blindman67 at Code Review:
http://codereview.stackexchange.com/questions/147104/animationframecontroller-requestanimationframe-made-easy/147195#147195 - thanks!)_