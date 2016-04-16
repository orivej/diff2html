/*
 *
 * Utils (hoganjs-utils.js)
 * Author: rtfpessoa
 *
 */

(function() {

  var fs = require('fs');
  var path = require('path');

  var hogan = require('hogan.js');

  var templatesPath = path.resolve(__dirname, 'templates');
  var templatesCache = {};

  function HoganJsUtils() {
  }

  HoganJsUtils.prototype.render = function(namespace, view, params) {
    var templateKey = this._templateKey(namespace, view);

    var template = this._getTemplate(templateKey);
    if (template) {
      return template.render(params);
    }

    return null;
  };

  HoganJsUtils.prototype._getTemplate = function(templateKey) {
    var template = this._readFromCache(templateKey);

    if (!template && fs) {
      var templatePath = path.join(templatesPath, templateKey);
      var templateContent = fs.readFileSync(templatePath + '.mustache', 'utf8');
      template = hogan.compile(templateContent);
      this._addToCache(templateKey, template);
    }

    return template;
  };

  HoganJsUtils.prototype._addToCache = function(templateKey, template) {
    templatesCache[templateKey] = template;
  };

  HoganJsUtils.prototype._readFromCache = function(templateKey) {
    return global.browserTemplates && global.browserTemplates[templateKey] || templatesCache[templateKey];
  };

  HoganJsUtils.prototype._templateKey = function(namespace, view) {
    return namespace + '-' + view;
  };

  module.exports.HoganJsUtils = new HoganJsUtils();

})();