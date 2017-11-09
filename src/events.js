
// .transition('*', 'DURING')     "enter"
// .transition('*', 'AFTER')     "enter"
// .transition(null, 'DURING')    "start on during"
// .transition('AFTER', 'DURING') "enter from after"
Scene.transition = function(expectedPrevious, expectedCurrent, getCalls)
{
  var builder = new CallEventBuilder(getCalls);
  var previous = null;
  var listener = expectedPrevious === Events.INITIAL ? 'onStart' : 'onProgress';

  return this[ listener ](function(current, progress)
  {
    if (previous !== current)
    {
      if (this.isEventMatch( previous, expectedPrevious ) &&
          this.isEventMatch( current, expectedCurrent ))
      {
        builder.execute( current, progress );
      }

      previous = current;
    }
  });
};

Scene.after = function(getCalls)
{
  return this.transition( Events.ANY, Events.AFTER, getCalls );
};

Scene.fromAfter = function(getCalls)
{
  return this.transition( Events.AFTER, Events.ANY, getCalls );
};

Scene.before = function(getCalls)
{
  return this.transition( Events.ANY, Events.BEFORE, getCalls );
};

Scene.fromBefore = function(getCalls)
{
  return this.transition( Events.BEFORE, Events.ANY, getCalls );
};

Scene.enter = function(getCalls)
{
  return this.transition( Events.ANY, Events.DURING, getCalls );
};

Scene.exit = function(getCalls)
{
  return this.transition( Events.DURING, Events.ANY, getCalls );
};

Scene.any = function(getCalls)
{
  return this.transition( Events.ANY, Events.ANY, getCalls );
};

Scene.start = function(getCalls)
{
  return this.transition( Events.INITIAL, Events.ANY, getCalls );
};

Scene.startBefore = function(getCalls)
{
  return this.transition( Events.INITIAL, Events.BEFORE, getCalls );
};

Scene.startAfter = function(getCalls)
{
  return this.transition( Events.INITIAL, Events.AFTER, getCalls );
};

Scene.startDuring = function(getCalls)
{
  return this.transition( Events.INITIAL, Events.DURING, getCalls );
};

// Special During Event
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

// Multiple Events
Scene.REGEX_SPLIT = /\s+/g;
Scene.REGEX_TRANSITION = /(|DURING|AFTER|\*)>(|DURING|AFTER|\*)/i;

Scene.listen = function(events, getCalls)
{
  if (events.split)
  {
    events = events.split( this.REGEX_SPLIT );
  }

  for (var i = 0; i < events.length; i++)
  {
    var eventMethod = events[ i ];

    if (eventMethod in this)
    {
      this[ eventMethod ]( getCalls );
    }
    else
    {
      var matches = this.REGEX_TRANSITION.exec( eventMethod.toUpperCase() );

      if (matches)
      {
        this.transition( matches[1], matches[2], getCalls );
      }
    }
  }

  return this;
};
