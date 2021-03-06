$(function(){
    window.cc = new Github({
      "debug": true,
      "callback": mocha.run,
      "first_view": 'im',
      "enterprise": '',
      "debug_url": "https://github.com/codecov/codecov-python/commit/91acfd99a5103ab16ff183a117a76c0d492c68a7"
    });
});

describe('github compare', function(){
  after(function(){save_coverage('gh-compare');});
  it('should have accurate properties', function(){
      expect(window.cc.slug).to.equal('codecov/codecov-python');
      expect(window.cc.file).to.equal(null);
      expect(window.cc.ref).to.equal('91acfd99a5103ab16ff183a117a76c0d492c68a7');
  });
  it('should add coverage button', function(){
    var buttons = $('.file-actions .btn-group a.btn.codecov');
    expect(buttons.length).to.equal(3);
    var text = ["Not covered", "Coverage 90.80%", "Not covered"];
    buttons.each(function(){
      expect($(this).text()).to.equal(text.shift());
    });
  });
  it('should not be shown', function(){
    expect($('.codecov-on').length).to.equal(0);
    expect($('.codecov.btn.selected').length).to.equal(0);
    expect($('.blob-num-deletion:visible').length).to.not.equal(0);
  });
  it('click will toggle coverage', function(){
    var file = $('.file-header[data-path="codecov/__init__.py"]');
    expect($('.codecov.btn', file).hasClass('selected')).to.equal(false);
    click($('.codecov.btn', file)[0]);
    expect($('.codecov.btn', file).hasClass('selected')).to.equal(true);
    expect(file.next().find('.blob-num-deletion:visible').length).to.equal(0);
    expect(file.next().find('.codecov:not(.codecov-on)').length).to.equal(0);
  });
});
