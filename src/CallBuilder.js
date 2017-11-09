
function CallBuilder()
{
}

Class.define( CallBuilder,
{
  callless: {},
  arguments: {
    callWith: 1
  },
  init: function(getCalls)
  {
    this.calls = [];

    getCalls.call( this, this );
  },
  execute: function()
  {
    var calls = this.calls;

    for (var i = 0; i < calls.length; i++)
    {
      calls[ i ].apply( this, arguments );
    }
  },
  call: function(callback)
  {
    this.calls.push( callback );

    return this;
  },
  callWith: function(context, getCalls)
  {
    if (context)
    {
      this.call(function()
      {
        getCalls.apply( context, arguments );
      });
    }

    return this;
  }
});
