[![Build Status](https://travis-ci.org/holgergp/soccerRedux.svg?branch=master)](https://travis-ci.org/holgergp/soccerRedux)
# soccerRedux

This is my attempt of porting my soccerReact app to Redux.
As a first attempt this might seem a bit naive, I will try to take this some steps further

TODO:

- Introduce container components
- introduce mapDispatch
- port tests to redux
  - partially done, but needs some more love
  - flesh out reducer test (should be trivial)
  - find a proper way to unit test unconnected stateless components
    - for now I test a connected component with an injected store, a store should not be needed here.
