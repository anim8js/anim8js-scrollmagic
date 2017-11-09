
Scene.animate = function(type, target, subject, method, a1, a2, a3, a4)
{
  var args = Array.prototype.slice.call( arguments );
  var type = args.shift();

  var getCalls = function() {
    var target = args.shift();
    var targetArgCount = anim8.coalesce( this.arguments[ target ], 1 );
    var targetArgs = args.splice( 0, targetArgCount );

    if (!this.callless[ target ]) {
      var method = args.shift();
      targetArgs.push(function() {
        this[ method ].apply( this, args );
      });
    }

    this[ target ].apply( this, targetArgs );
  };

  return this[ type ]( getCalls );
};
