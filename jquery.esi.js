/**
 * jQuery ESI Plugin v1.0
 * http://github.com/manarth/jquery_esi
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Usage:
 * $().esiTags().handleESI();
 */

(function ($) {

  // Fetch all ESI tags.
  $.fn.esiTags = function() {
    // Initialise a jQuery collection to return.
    esi_tags = $();

    // The handler can be called as $().esiTags, or $('foo').esiTags().
    // Ensure we have an iterable collection in either instance.
    if (this.length == 0) {
      collection = $('html');
    }
    else {
      collection = this;
    }

    collection.each(function() {
      // Retrieve the base DOM element, in order to access the DOM method
      // getElementsByTagName.
      base_element = $(this).get(0);
      // Discover the <esi:include> tags.
      jQuery.each(base_element.getElementsByTagName('esi:include'), function(i, val) {
        // Some DOMs fail to recognise that the ESI include tag is self-
        // closing, so they treat following tags as child nodes.
        if ($(this).children().length > 0) {
          // Move the child nodes to become siblings.
          children = $(this).children().detach();
          $(this).after(children);
        }
        esi_tags = esi_tags.add($(this));
      });
      // Discover the <esi:remove> tags.
      jQuery.each(base_element.getElementsByTagName('esi:remove'), function(i, val) {
        // ESI remove tags are not self-closing, so no special treatment for
        // child nodes is needed.
        esi_tags = esi_tags.add($(this));
      });
    });
    return esi_tags;
  };

  // Move child nodes to siblings.
  $.fn.handleESIChildren = function() {
    $(this).each(function() {
    });
    return this;
  }

  // Handle ESI tags.
  // Delegates to either .handleESIInclude() or .handleESIRemove() as needed.
  $.fn.handleESI = function() {
    $(this).each(function() {
      switch (this.nodeName.toLowerCase()) {
        case 'esi:include':
          $(this).handleESIInclude();
          break;
      
        case 'esi:remove':
          $(this).handleESIRemove();
          break;
      }
    });

    return this;
  }

  // Handle a single ESI Include tag.
  $.fn.handleESIInclude = function() {
    src = $(this).attr('src');
    jQuery.ajax({
      context: this,
      url: src,
      success: function(data, textStatus, jqXHR) {
        esiElement = $(this);
        esiElement.replaceWith(data);
      }
    });
  }

  // Handle a single ESI Remove tag.
  $.fn.handleESIRemove = function() {
    $(this).replaceWith('');
  }

})(jQuery);
