describe('Tags-Input', function () {
  beforeEach(function () {
    let fixture = '<input type="text" data-role="tags-input" value="first;second;third;" id="fixture">';

    jQuery('body').prepend(jQuery(fixture));
  });

  beforeEach(function () {
    /* Add id attribute to Tag element to ease the jQuery selector query.
     * (e.g: fixture, fixture-tags-container and fixture-input) */
    jQuery('#fixture').tagsInput({
      tagsContainerTemplate: '<div id="fixture-tags-container" class="tags-container {tagsContainerClass}"><input id="fixture-input" type="text" size="1"><div>',
      tagTemplate: '<div class="{tagClass}"><span>{value}</span><i class="tag-remove"></i></div>',
    });
  });

  afterEach(function () {
    jQuery('#fixture').remove();
  });

  it('should render tags-input DIV container right after target element.', function () {
    expect(jQuery('#fixture').next().is('div')).toBe(true);
  });

  it('should make target element hidden.', function () {
    expect(jQuery('#fixture')[0].hasAttribute('hidden')).toBe(true);
  });

  it('should mark target element rendered to avoid multiple initialization.', function () {
    expect(jQuery('#fixture')[0].hasAttribute('data-rendered')).toBe(true);
  });

  it('should render tags (div element) based on the value of the target element during initialization.', function () {
    let $fixture = jQuery('#fixture');
    let sValue = $fixture.val();

    let tValue = (jQuery('#fixture-tags-container').find('span').map(function () {
      return jQuery(this).text();
    }).toArray().join(';')).concat(';');

    expect(sValue == tValue).toBe(true);
  });

  it('should add new tag when press ENTER in the tags input field.', function () {
    let $tagsContainer = jQuery('#fixture-tags-container');
    let $tagsInput = jQuery('#fixture-input');
    $tagsInput.val('fourth').trigger(jQuery.Event('keydown', {
      key: 'Enter'
    }));

    let len = ($tagsContainer.find('span').filter(function () {
      return jQuery(this).text() == 'fourth';
    })).length;

    expect(len).toBe(1);
  });

  it('should add new tag when press colon(;) the tags input field.', function () {
    let $tagsContainer = jQuery('#fixture-tags-container');
    let $tagsInput = jQuery('#fixture-input');
    $tagsInput.val('fourth').trigger(jQuery.Event('keydown', {
      key: ';'
    }));

    let len = ($tagsContainer.find('span').filter(function () {
      return jQuery(this).text() == 'fourth';
    })).length;

    expect(len).toBe(1);
  });

  it('should add new tag value to the hidden input field.', function () {
    let $tagsContainer = jQuery('#fixture-tags-container');
    let $tagsInput = jQuery('#fixture-input');
    $tagsInput.val('fourth').trigger(jQuery.Event('keydown', {
      key: ';'
    }));
    let value = jQuery('#fixture').val();
    expect(value.includes('fourth')).toBe(true);
  });

  it('should remove selected tag when click the cross "x" of the tag.', function () {
    let $tagsContainer = jQuery('#fixture-tags-container');
    let $spanThird = $tagsContainer.find('span').filter(function () {
      return jQuery(this).text() == 'third';
    });
    $spanThird.siblings('i').click();

    expect($spanThird.closest('body').length == 0).toBe(true);
  });

  it('should remove tag value from hidden input field when click the cross "x" of the tag.', function () {
    let $tagsContainer = jQuery('#fixture-tags-container');
    let $spanThird = $tagsContainer.find('span').filter(function () {
      return jQuery(this).text() == 'third';
    });
    $spanThird.siblings('i').click();

    let value = jQuery('#fixture').val();
    expect(value.includes('third')).toBe(false);
  });

  it('should prevent same tag value creation', function () {
    let $tagsInput = jQuery('#fixture-input');
    $tagsInput.val('second').click();

    let value = jQuery('#fixture').val();
    let count = (value.match(/second;/g) || []).length;
    expect(count).toBe(1);
  });
});