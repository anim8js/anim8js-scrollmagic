
function CallEventBuilder(getCalls)
{
  this.init( getCalls );
}

Class.extend( CallEventBuilder, CallBuilder,
{
  animator: function(query, getCalls)
  {
    return this.callWith( ScrollMagic.getAnimator( query ), getCalls, createAnimatorInitial( getCalls ), createAnimatorFinal( getCalls ) );
  },
  animators: function(query, getCalls)
  {
    return this.callWith( ScrollMagic.getAnimators( query ), getCalls, createAnimatorInitial( getCalls ), createAnimatorFinal( getCalls ) );
  },
  player: function(player, getCalls)
  {
    return this.callWith( player, getCalls, createMovieInitial( getCalls ), createMovieFinal() );
  },
  movie: function(movie, getCalls)
  {
    return this.player( new anim8.MoviePlayer( movie ), getCalls );
  }
});


function createAnimatorInitial(getCalls)
{
  return function()
  {
    this.stop().restore();
    getCalls.apply( this, arguments );
    this.preupdate( 0 ).update( 0 ).apply().stop();
  };
}

function createAnimatorFinal(getCalls)
{
  return function()
  {
    this.stop().restore();
    getCalls.apply( this, arguments );
    this.preupdate( 0 ).update( 0 ).end().apply();
  };
}

function createMovieInitial(getCalls)
{
  return function()
  {
    getCalls.apply( this, arguments );

    this.pause().apply( this.time, true );
  };
}

function createMovieFinal()
{
  return function()
  {
    this.end( true, true );
  };
}
