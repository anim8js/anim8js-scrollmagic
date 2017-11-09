![anim8js](https://github.com/anim8js/anim8js/blob/master/images/anim8js-logo.png)

[anim8](https://github.com/anim8js/anim8js) your [ScrollMagic](http://scrollmagic.io/) project.

### Installation

- Bower: `bower install anim8js-scrollmagic`
- Node: `npm install anim8js-scrollmagic`
- Download: [anim8js-scrollmagic](https://raw.githubusercontent.com/anim8js/anim8js-scrollmagic/master/build/anim8js-scrollmagic.js)

### Examples
```javascript
new ScrollMagic.Scene({triggerElement: '#trigger', duration: '100%'})
  .addTo( controller )
  // Triggered when transitioning from outside to inside scene
  .enter(function() {
    this.animator('#element', function() {
      this.play('tada'); // ANY functions on animator
    });
    // this.animators
    // this.movie
    // this.player
  })
  // Triggered when transitioning from inside to outside scene
  .exit(function() {
    this.animator('#element', function() {
      this.transition('2s', 'rollOut');
    });
  })
  // Triggered when going from inside scene to BEFORE scene
  .before(function() {
    this.animators('#letters', function() {
      this.sequence( 100 ).play('fadeIn'); // ANY functions on animators
    });
  })
  // Triggered when going from inside scene to AFTER scene
  .after(function() {
    this.movie( movie, function() {
      this.play(); // ANY functions on MoviePlayer
    });
  })
  // Triggered while in scene - the calls are interpolated while scrolling
  .during(function() {
    this.animator('#box', function() {
      this.play('wiggle');
    });
  })
  // A short cut to a single call
  .animate('during', 'animator', '#box', 'play', 'wiggle')
  // Switch the direction of the scene
  .setBackwards( true )
;
```
