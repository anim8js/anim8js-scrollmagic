
var Events = {
  BEFORE: 'BEFORE',
  DURING: 'DURING',
  AFTER: 'AFTER'
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

Scene.onProgress = function(callback)
{
  var instance = this;
  var invokeCallback = function()
  {
    var state = instance.state();
    var progress = instance.progress();

    if (instance.backwards)
    {
      progress = 1.0 - progress;
    }

    callback.call( instance, state, progress );
  };

  instance.on( 'progress.anim8js', invokeCallback );

  anim8.requestRun( invokeCallback );

  return this;
};
