
var Events = {
  BEFORE: 'BEFORE',
  DURING: 'DURING',
  AFTER: 'AFTER',
  ANY: '*',
  INITIAL: null
};

Scene.setBackwards = function(backwards)
{
  this.backwards = backwards;

  return this;
};

Scene.getAfter = function()
{
  return this.backwards ? Events.BEFORE : Events.AFTER;
};

Scene.getBefore = function()
{
  return this.backwards ? Events.AFTER : Events.BEFORE;
};

Scene.isEventMatch = function(actual, expected)
{
  switch (expected)
  {
    case Events.ANY:
      return true;
    case Events.BEFORE:
      expected = this.getBefore();
      break;
    case Events.AFTER:
      expected = this.getAfter();
      break;
  }

  return actual == expected; // jshint ignore:line
};

Scene.onProgress = function(callback)
{
  var invokeCallback = this.getInvokeCallback( callback );

  this.on( 'progress.anim8js', invokeCallback );

  anim8.requestRun( invokeCallback );

  return this;
};

Scene.onStart = function(callback)
{
  var invokeCallback = this.getInvokeCallback( callback );

  anim8.requestRun( invokeCallback );

  return this;
};

Scene.getInvokeCallback = function(callback)
{
  var instance = this;

  return function()
  {
    var state = instance.state();
    var progress = instance.progress();

    if (instance.backwards)
    {
      progress = 1.0 - progress;
    }

    callback.call( instance, state, progress );
  };
};
