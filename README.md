![anim8js](https://github.com/anim8js/anim8js/blob/master/images/anim8js-logo.png)

[anim8](https://github.com/anim8js/anim8js) your [ScrollMagic](http://scrollmagic.io/) project.

### Installation

- Bower: `bower install anim8js-scrollmagic`
- Node: `npm install anim8js-scrollmagic`
- Download: [anim8js-scrollmagic](https://raw.githubusercontent.com/anim8js/anim8js-scrollmagic/master/build/anim8js-scrollmagic.js)

### Index
- [Examples](#examples)
- [Documentation](#documentation)

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
  // Generic Transitioning (any state to AFTER scene)
  .transition('*', 'AFTER', function() {
    this.animator('#element', function() {
      this.queue('wiggle inf');
    });
  })
  // Multiple
  listen('enter before *>AFTER', function() {
    // Execute on enter, when we go before the scene, and when we go after the scene
  })
  // A short cut to a single call
  .animate('during', 'animator', '#box', 'play', 'wiggle')
  // Switch the direction of the scene
  .setBackwards( true )
;
```

### Documentation

This plugin works by detecting events relative to the current scene, and invoking
a function which builds commands to play when the event is triggered.

**Events (occurs when you...)**

- `after`: go from inside the scene to AFTER, or if you land on the page AFTER the scene.
- `fromAfter`: go from AFTER the scene to anywhere else
- `before`: go from inside the scene to BEFORE or if you land on the page BEFORE the scene.
- `fromBefore`: go from BEFORE the scene to anywhere else
- `enter`: go from outside the scene to inside or if you land on the page in the scene
- `exit`: go from inside the scene to outside
- `any`: go from any state to another
- `start`: land on the page
- `startBefore`: land on the page before the scene
- `startAfter`: land on the page after the scene
- `startDuring`: land on the page inside the scene
- `intro`: same as enter except it applies the initial state of the animations if the user lands on the page BEFORE the scene
- `outro`: same as exit except it applies the final state of the animations if the user lands on the page AFTER the scene
- `during`: are scrolling through the scene. animations are interpolated from start to finish over the duration of the scene

You can listen for events by using the event name as a function and passing a function, or by using the following functions:

- `listen`: animate on multiple events specified in a space-delimited string or array of strings
- `transition`: animate when from one state to another - the events above use this function

**Build Commands**

- `animator( subject or query, function which makes animator calls )`
- `animators( subjects or query, function which makes animators calls )`
- `movie( movie, function which makes movie player calls )`
- `player( player, function which makes movie player calls )`

**Quick Animate**

This allows you to add animations in a shorthand manner:
- `animate( event, build, subject, subject method, subject arguments... )`

**Backwards**

ScrollMagic works by having the user scroll down or to the right of a page. If
you set a scene to backwards with `setBackwards( true )` then the BEFORE/AFTER and
progress through a scene is swapped for anim8js functions. This allows you to have
scroll up and scroll left pages (make sure to set the scrollbar the whole way to the bottom/right when you initialize your scenes)
