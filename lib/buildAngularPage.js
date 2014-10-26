'use strict';
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
