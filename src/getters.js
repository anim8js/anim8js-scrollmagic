
ScrollMagic.getAnimator = function(query)
{
  var elements = ScrollMagic._util.get.elements( query );

  if (elements.length === 0)
  {
    if (anim8.log)
    {
      anim8.log('could not create animator for ', query);
    }

    return null;
  }

  return anim8( elements[ 0 ] );
};

ScrollMagic.getAnimators = function(query)
{
  var elements = ScrollMagic._util.get.elements( query );

  if (elements.length === 0)
  {
    if (anim8.log)
    {
      anim8.log('could not create animators for ', query);
    }

    return null;
  }

  return anim8s( elements );
};
