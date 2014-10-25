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

##Connecting to angular and the $templateCache

First we install angular, angular-mocks and jquery

```bash
bower install angular --save
bower install jquery angular-mocks --save-dev
```

we will use jquery as a convenience for testing.  Once these libraries are
installed, we can add them to our karma.conf.js files, and use the "app"
directory as our new basePath:

```javascript
// base path that will be used to resolve all patterns (eg. files, exclude)
basePath: 'app',
```

```javascript

// list of files / patterns to load in the browser
 files: [
   'bower_components/jquery/dist/jquery.js',
   'bower_components/angular/angular.js',
   'bower_components/angular-mocks/angular-mocks.js',
   '*.js',
   '../test/*.js'
 ],
```

and drive out a walking angularjs skeleton with TDD (file: test/angular.js):

```javascript
'use strict';

describe('build an angular-driven page', function(){
  var page;
  var html = '<div>\
    <input ng-model="result">\
    <div class="output">{{result}}</div>\
  </div>';
  beforeEach(function(){
    inject(function($compile, $rootScope){
      page = $compile(html)($rootScope);
      $rootScope.$digest();
    });
  });
  it('should display "test" when "test" is input', function(){
    page.find('input').val('test').trigger('input');
    expect(page.find('.output').text()).toBe('test');
  });
  it('should display "test2" when "test2" is input', function(){
    page.find('input').val('test2').trigger('input');
    expect(page.find('.output').text()).toBe('test2');
  });
});
```

# Loading templates from $templateCache

Refactoring to load the template from a $templateCache. First we load up the
ng2html angular preprocessor:

```bash
npm install karma-ng-html2js-preprocessor --save-dev
```

update the karma.conf.js to use the preprocessor and to load html files

```javascript
files: [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-mocks/angular-mocks.js',
  '**/*.html',
  '*.js',
  '../test/*.js'
],
```

```javascript
preprocessors: {
  '**/*.html': ['ng-html2js']
},
```

restart the karma test runner, and build out the test:

```javascript
'use strict';

describe('build an angular-driven page', function(){
  var page;

  beforeEach(function(){
    var html;

    module('index.html');

    inject(function($templateCache){
      html = $templateCache.get('index.html');
    });

    inject(function($compile, $rootScope){
      page = $compile(html)($rootScope);
      $rootScope.$digest();
    });
  });

  it('should display "test" when "test" is input', function(){
    page.find('input').val('test').trigger('input');
    expect(page.find('.output').text()).toBe('test');
  });

  it('should display "test2" when "test2" is input', function(){
    page.find('input').val('test2').trigger('input');
    expect(page.find('.output').text()).toBe('test2');
  });

});
```

And refactoring a bit so we can extract some useful utilities:

```javascript
'use strict';

describe('build an angular-driven page', function(){
  var page;

  beforeEach(function(){ page = buildPage(); });

  it('should display "test" when "test" is input', function(){
    page.find('input').val('test').trigger('input');
    expect(page.find('.output').text()).toBe('test');
  });

  it('should display "test2" when "test2" is input', function(){
    page.find('input').val('test2').trigger('input');
    expect(page.find('.output').text()).toBe('test2');
  });

  function buildPage(){
    module('index.html');
    return ngFrom('index.html');
  }

  function loadHtmlFrom(templateName){
    var html;
    inject(function($templateCache){
      html = $templateCache.get('index.html');
    });
    return html;
  }

  function ngFromHtml(html){
    var page;
    inject(function($compile, $rootScope){
      page = $compile(html)($rootScope);
      $rootScope.$digest();
    });
    return page;
  };

  function ngFrom(templateName){
    return ngFromHtml(loadHtmlFrom(templateName));
  };
});
```

And finally refactoring to use the page object pattern:

```javascript
'use strict';

describe('build an angular-driven page', function(){
  var page;

  beforeEach(function(){ page = buildPage(); });

  it('should display "test" when "test" is input', function(){
    page.input = 'test';
    expect(page.output).toBe('test');
  });

  it('should display "test2" when "test2" is input', function(){
    page.input = 'test2';
    expect(page.output).toBe('test2');
  });

  function buildPage(){
    var spa;
    module('index.html');
    spa = ngFrom('index.html');
    return {
      set input(string){ spa.find('input').val(string).trigger('input'); },
      get output(){return spa.find('.output').text();}
    };
  }

  ...
});
```
