# AnimationFrameController
Controller for `requestAnimationFrame`.

## Usage
Adding this to your page will create a constant named `AnimationFrameController`. Because it is a mouthful, I will assign it to the shorthand `AF`:

    const AF = new AnimationFrameController;

The controller will start executing your handlers as soon you add one to the controller using:

    var functionId = AF.add( myFunction );

The return value of `add()` is an array of _identifiers_. To remove a function, simply pass back in the function itself or its identifier:

    AF.remove( myFunction );	

or

	AF.remove( functionId );

On top of that, the function can explicitly return the bool `false` if it is done:

	function myFunction( delta, progress ){
		count++;
		if( count >= 100 ){ return false; }
	}
	
As you can see above, your function receives two arguments: the `delta`, representing the delta time since the last call, and `progress`, which represents the time since your function was added, both in milliseconds.

You can stop and start the animationFrameController by using the `.stop()` and `.start()` methods. The AnimationFrameController will start running animation frames as soon as a function gets added, and will stop when all functions have been removed.

## Debug

The `.debug()` method will tell you what handlers are currently set, as well as the current time and id index. This is useful for debugging to see if a function was added or not. It will return a copy of the value, and editing the data will have no effect on the animationFrameController.

_(Improvements in this 1.1.0 version helpfully pointed out by @Blindman67 at Code Review:
http://codereview.stackexchange.com/questions/147104/animationframecontroller-requestanimationframe-made-easy/147195#147195 - thanks!)_