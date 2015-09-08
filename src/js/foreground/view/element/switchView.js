﻿import {LayoutView} from 'marionette';
import {element_switch as SwitchTemplate} from 'common/templates';

var SwitchView = LayoutView.extend({
  tagName: 'switch',
  template: SwitchTemplate,

  ui: {
    icon: 'icon'
  },

  events: {
    'click': '_onClick'
  },

  modelEvents: {
    'change:checked': '_onChangeChecked'
  },

  onRender: function() {
    var checked = this.model.get('checked');
    this._setCheckedState(checked);
  },

  _onClick: function() {
    this.model.set('checked', !this.model.get('checked'));
  },

  _onChangeChecked: function(model, checked) {
    this._setCheckedState(checked);
  },

  _setCheckedState: function(checked) {
    this.$el.toggleClass('is-checked', checked);
    this.$el.toggleClass('is-unchecked', !checked);
    this.ui.icon.toggleClass('is-checked', checked);
    this.ui.icon.toggleClass('is-unchecked', !checked);
  }
});

export default SwitchView;