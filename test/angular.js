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
