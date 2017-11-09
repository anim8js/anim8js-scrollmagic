
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
    this.initials = [];
    this.finals = [];

    getCalls.call( this, this );
  },
  execute: function()
  {
    this.executeList( this.calls, arguments );
  },
  executeInitials: function()
  {
    this.executeList( this.initials, arguments );
  },
  executeFinals: function()
  {
    this.executeList( this.finals, arguments );
  },
  executeList: function(list, args)
  {
    for (var i = 0; i < list.length; i++)
    {
      list[ i ].apply( this, args );
    }
  },
  call: function(callback)
  {
    this.calls.push( callback );

    return this;
  },
  initial: function(callback)
  {
    this.initials.push( callback );

    return this;
  },
  final: function(callback)
  {
    this.finals.push( callback );

    return this;
  },
  callWith: function(context, getCalls, getInitial, getFinal)
  {
    if (context)
    {
      this.call(function()
      {
        getCalls.apply( context, arguments );
      });

      if (getInitial)
      {
        this.initial(function()
        {
          getInitial.apply( context, arguments );
        });
      }

      if (getFinal)
      {
        this.final(function()
        {
          getFinal.apply( context, arguments );
        });
      }
    }

    return this;
  }
});
