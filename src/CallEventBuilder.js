
function CallEventBuilder(getCalls)
{
  this.init( getCalls );
}

Class.extend( CallEventBuilder, CallBuilder,
{
  animator: function(query, getCalls)
  {
    return this.callWith( ScrollMagic.getAnimator( query ), getCalls );
  },
  animators: function(query, getCalls)
  {
    return this.callWith( ScrollMagic.getAnimators( query ), getCalls );
  },
  player: function(player, getCalls)
  {
    return this.callWith( player, getCalls );
  },
  movie: function(movie, getCalls)
  {
    return this.player( new anim8.MoviePlayer( movie ), getCalls );
  }
});
