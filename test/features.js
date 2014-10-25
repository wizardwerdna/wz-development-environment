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
