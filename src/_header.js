// UMD (Universal Module Definition)
(function (root, factory)
{
  if (typeof define === 'function' && define.amd) // jshint ignore:line
  {
    // AMD. Register as an anonymous module.
    define(['anim8', 'scrollmagic'], function(anim8, ScrollMagic) { // jshint ignore:line
      return factory(anim8, ScrollMagic, root);
    });
  }
  else if (typeof module === 'object' && module.exports)  // jshint ignore:line
  {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('anim8'), require('scrollmagic'), global);  // jshint ignore:line
  }
  else
  {
    // Browser globals (root is window)
    factory(root.anim8, root.ScrollMagic, root);
  }
}(this, function(anim8, ScrollMagic, window)
{

  var anim8s = anim8.anim8s;
  var Class = anim8.Class;
  var AttrimatorMap = anim8.AttrimatorMap;

  var $animation = anim8.animation;

  var Scene = ScrollMagic.Scene.prototype;
