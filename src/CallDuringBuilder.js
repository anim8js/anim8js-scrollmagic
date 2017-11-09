
function CallDuringBuilder(getCalls)
{
  this.init( getCalls );
}

Class.extend( CallDuringBuilder, CallBuilder,
{
  callless: {
    player: true,
    movie: true
  },
  arguments: {
    callWith: 1,
    animator: 1,
    animators: 1,
    player: 3,
    movie: 3
  },
  addProgressAnimator: function(animator)
  {
    var attrimatorMap = animator.attrimators;
    var attrimators = attrimatorMap.values;
    var properties = attrimatorMap.keys;
    var duration = attrimatorMap.timeRemaining();

    animator.attrimators = new AttrimatorMap();

    this.call(function(progress, callCount)
    {
      var now = progress * duration;

      if (callCount === 0) {
        animator.preupdate( now );
      }

      for (var i = 0; i < attrimators.length; i++) {
        var attrimator = attrimators[ i ];
        var prop = properties[ i ];
        var value = attrimator.valueAtSearch( now, animator.frame[ prop ] );
        if (value === false) {
          var last = attrimator;
          var lastTime = now;
          while (last.next) {
            lastTime -= last.totalTime();
            last = last.next;
          }
          value = last.valueAt( lastTime, animator.frame[ prop ] );
        }
        if (value !== false) {
          animator.updated[ prop ] = true;
          animator.frame[ prop ] = value;
        }
      }

      animator.apply();
    });
  },
  animator: function(query, getCalls)
  {
    var animator = ScrollMagic.getAnimator(query);

    if (animator)
    {
      getCalls.call( animator );

      this.addProgressAnimator( animator );
    }

    return this;
  },
  animators: function(query, getCalls)
  {
    var animators = ScrollMagic.getAnimators(query);

    if (animators)
    {
      getCalls.call( animators );

      animators.each( this.addProgressAnimator, this );
    }

    return this;
  },
  player: function(player, overrideDuration, overrideOffset)
  {
    var offset = anim8.coalesce( overrideOffset, 0 );
    var duration = anim8.coalesce( overrideDuration, player.movie.duration() );

    return this.call(function(progress)
    {
      player.apply( progress * duration + offset, true );
    });
  },
  movie: function(movie, overrideDuration, overrideOffset)
  {
    return this.player( new anim8.MoviePlayer( movie ), overrideDuration, overrideOffset );
  }
});
