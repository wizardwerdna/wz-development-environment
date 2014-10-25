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
