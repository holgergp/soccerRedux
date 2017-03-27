[![Build Status](https://travis-ci.org/holgergp/soccerRedux.svg?branch=master)](https://travis-ci.org/holgergp/soccerRedux)
# soccerRedux

This is my attempt of porting my [soccerReact] (https://github.com/holgergp/soccerReact) app to Redux.
As a first attempt this might seem a bit naive, I will try to take this some steps further

Notes to the tests
- Testing stateless components works by wrapping in a statefull component (for now thats the way to go)
- Direct invocation does not work properly by now, probably needs some Selector Lib
- To make the tests more unittestish I need to flesh out that DND stuff, but that's the way it worked before, so I leave this for now
- Testing with a injected store works as well

TODO:

- port tests to redux
  - partially done, but needs some more love
  - flesh out reducer test (should be trivial)
  
