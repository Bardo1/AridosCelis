/* Copyright (c) 2009 José Joaquín Núñez (josejnv@gmail.com) http://joaquinnunez.cl/blog/
 * Licensed under GPL (http://www.opensource.org/licenses/gpl-2.0.php)
 * Use only for non-commercial usage.
 *
 * Version : 0.1
 *
 * Requires: jQuery 1.2+
 */

(function($)
{
  jQuery.fn.capitalize = function(options)
  {
    var defaults = {
      capitalize_on: 'keyup'
    };

    var opts = $.extend(defaults, options);

    return this.each(function(){
      jQuery(this).bind(defaults.capitalize_on, function(){
        jQuery(this).val(jQuery.cap(jQuery(this).val()));
      });
    });
  }
})(jQuery);



jQuery.cap = function capitalizeTxt(txt)
{
  txt = txt.toLowerCase();
  var split_txt = txt.split(' ');
  var result = '';

  for(var i=0;i<split_txt.length;i++)
  {
    result = result.concat(' '+split_txt[i].substring(0,1).toUpperCase()+split_txt[i].substring(1,split_txt[i].length));
  }
  return result.substring(1,result.length);
};
