(function ($) {
  'use strict';

  $.fn.tagsInput = function (options) {
    let settings = $.extend({
      tagClass: 'tag badge badge-primary ml-1',
      tagsContainerClass: 'form-control',
      tagTemplate: '<div class="{tagClass}"><span>{value}</span><i class="tag-remove">&#10006;</i></div>',
      tagsContainerTemplate: '<div class="tags-container {tagsContainerClass}"><input type="text" size="1"><div>',
      highlightColor: '#ffc107'
    }, options);

    const ATTR_RENDERED = 'data-rendered';
    const TRUE = 'true';
    const helpers = new Helpers();
    const tagTemplate = settings.tagTemplate.replace('{tagClass}', helpers.sanitizeText(settings.tagClass));
    const tagsContainerTemplate = settings.tagsContainerTemplate.replace('{tagsContainerClass}', helpers.sanitizeText(settings.tagsContainerClass));

    /** Render TagsInput elements */
    this.each(function () {
      if (this.hasAttribute(ATTR_RENDERED)) {
        return;
      }

      let $that = $(this);
      let tagElems = [];
      let hiddenValue = $that.val();
      if (hiddenValue) {
        $.each(hiddenValue.split(';'), function (index, value) {
          let v = value.trim();
          if (v.length > 0) {
            tagElems.unshift(jQuery(tagTemplate.replace('{value}', v)));
          }
        });
      }

      let tagsContainerElem = $(tagsContainerTemplate);
      $.each(tagElems, function (index, value) {
        tagsContainerElem.prepend(value);
      });
      $that.after(tagsContainerElem);
      $that.attr('hidden', TRUE);
      $that.attr(ATTR_RENDERED, TRUE);
    });

    /** Register events */
    $('i.tag-remove').click(helpers.removeTag);

    $('.tags-container').click(function (e) {
      $(this).children('input').focus();
    });

    $('.tags-container > input').bind('input', function (e) {
      helpers.resetSize(this);
    });

    $('.tags-container > input').keydown(function (e) {
      if (e.key === 'Enter' || e.key === ';') {
        e.preventDefault();
        let input = $(e.currentTarget);
        let value = input.val().trim();
        if (value) {
          value = helpers.sanitizeText(value);
          let existingSpan = input.siblings('div').filter(function () {
            return ($(this).find('span').text() === value);
          });
          if (existingSpan.length > 0) {
            if (!settings.hasOwnProperty('tagColor')) {
              settings.tagColor = existingSpan.css('background-color');
            }
            helpers.blink(existingSpan, settings.highlightColor, settings.tagColor);
          } else {
            let newTag = $(tagTemplate.replace('{value}', value));
            newTag.insertBefore(input);
            newTag.children('i').click(helpers.removeTag);

            let hiddenInput = $(this).parent().prev();
            let oValue = hiddenInput.val();
            if (oValue.length > 0 && oValue.charAt(oValue.length - 1) != ';') {
              oValue += ';';
            }
            input.val('');
            helpers.resetSize(input);
            hiddenInput.val(oValue.concat(value).concat(';'));
          }
        }
        return false;
      }
    });
  }

  /*** Helper functions declaration ***/
  function Helpers() {}

  Helpers.prototype.resetSize = function (target) {
    let $target = $(target);
    let len = $target.val().length;
    $target.attr('size', (len < 1) ? 1 : len);
  }

  Helpers.prototype.removeTag = function (e) {
    let parent = $(this).parent();
    let hiddenInput = parent.parent().prev();
    let text = parent.text();
    let hValue = hiddenInput.val();
    let pattern = '(^'.concat(text).concat(';)|(;').concat(text).concat(';)');
    let result = hValue.replace(new RegExp(pattern, 'u'), ';');
    hiddenInput.val(result);
    parent.remove();
  }

  Helpers.prototype.sanitizeText = function (raw) {
    return $('<div>').text(raw).html();
  }

  Helpers.prototype.blink = function (target, highlightColor, tagColor) {
    let $target = $(target);
    $target.stop().animate({
      backgroundColor: highlightColor
    }, 200).promise().done(function () {
      $target.animate({
        backgroundColor: tagColor
      }, 200);
    });
  }

})(jQuery);