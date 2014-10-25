## WZ-DEVELOPMENT-ENVIRONMENT

Outlining the steps for a TDD development environment

Preqrequisites: 

(0) Open a directory for development: create directories app and test.

```bash
mkdir app test
```

(1) Install NodeJS
(2) Install globaly: bower

```bash
sudo npm install -g bower
```

##Setting up the Karma test runner


(1) Install: karma karama-jasmine and karma-phantomjs-

```bash
npm init 
npm install karma karma-jasmine karma-phantomjs-launcher
sudo npm -g install karma-cli
karma init
```

and choose the defaults, except use PhantomJS instead of Chrome.
Now let's test the environment.  Set karma.conf to read, in part:

```javascript
// list of files / patterns to load in the browser
files: [
  'app/*.js',
  'test/*.js'
],
```


Set test/features.js to read:

```javascript
'use strict';
describe('truth', function() {
  it('truth', function() {
    expect(1).toBe(1);
  });
  it('falsy', function(){
    expect(1).toNotBe(2);
  })
  it('result from app.js', function(){
    expect(result()).toBe(1);
  });
});
```

and app/app.js to read:

```javascript
'use strict';
function result(){
  return 1;
}
'use strict';
function result(){
  return 1;
}
```

and start the server, which should generate the following: 

```bash
➜ karma start
INFO [karma]: Karma v0.12.24 server started at http://localhost:9876/
INFO [launcher]: Starting browser PhantomJS
INFO [PhantomJS 1.9.7 (Mac OS X)]: Connected on socket FYnp23_hKDK-PLEfqADn with id 18841874
PhantomJS 1.9.7 (Mac OS X): Executed 3 of 3 SUCCESS (0.002 secs / 0.003 secs)
```
