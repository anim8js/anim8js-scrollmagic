
Scene.after = function(getCalls)
{
  var builder = new CallEventBuilder(getCalls);
  var last = null;

  return this.onProgress(function(state, progress)
  {
    if (state !== last) {
      if (state === this.getAfter()) {
        builder.execute( state, last );
      }
      last = state;
    }
  });
};

Scene.before = function(getCalls)
{
  var builder = new CallEventBuilder(getCalls);
  var last = null;

  return this.onProgress(function(state, progress)
  {
    if (state !== last) {
      if (state === this.getBefore()) {
        builder.execute( state, last );
      }
      last = state;
    }
  });
};

Scene.enter = function(getCalls)
{
  var builder = new CallEventBuilder(getCalls);
  var last = null;

  return this.onProgress(function(state, progress)
  {
    if (state !== last) {
      if (state === Events.DURING) {
        builder.execute( state, last );
      }
      last = state;
    }
  });
};

Scene.exit = function(getCalls)
{
  var builder = new CallEventBuilder(getCalls);
  var last = null;

  return this.onProgress(function(state, progress)
  {
    if (state !== last) {
      if (last && state !== Events.DURING) {
        builder.execute( state, last );
      }
      last = state;
    }
  });
};

Scene.during = function(getCalls)
{
  var builder = new CallDuringBuilder(getCalls);
  var callCount = 0;

  return this.onProgress(function(state, progress)
  {
    builder.execute( progress, callCount );
    callCount++;
  });
};
