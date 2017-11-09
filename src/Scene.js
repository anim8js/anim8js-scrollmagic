
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
    callback.call( instance, instance.state(), instance.progress() );
  };

  instance.on( 'progress.anim8js', invokeCallback );

  anim8.requestRun( invokeCallback );

  return this;
};
