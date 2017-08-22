// This file was automatically generated from paper.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace paper.
 */

goog.provide('paper');

goog.require('soy');
goog.require('soydata');


paper.toast = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '<div' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="' + goog.getCssName('paper-toast') + ((opt_data.opened) ? ' ' + goog.getCssName('paper-toast-open') : '') + ((opt_data.fitBottom) ? ' ' + goog.getCssName('paper-toast-fit-bottom') : '') + ((opt_data.capsule) ? ' ' + goog.getCssName('paper-toast-capsule') : '') + '"' + ((opt_data.duration >= 0) ? ' duration="' + soy.$$escapeHtml(opt_data.duration) + '"' : '') + '>' + ((opt_data.content) ? soy.$$filterNoAutoescape(opt_data.content) : '') + '</div>';
};
if (goog.DEBUG) {
  paper.toast.soyTemplateName = 'paper.toast';
}
