﻿import {LayoutView} from 'marionette';
import ListItemButton from 'foreground/view/behavior/listItemButton';
import VideoActions from 'foreground/model/video/videoActions';
import {listItemButton_saveListItemButton as SaveListItemButtonTemplate} from 'common/templates';
import {icon_saveIcon_18 as SaveIconTemplate} from 'common/templates';

var SaveVideoButtonView = LayoutView.extend({
  template: SaveListItemButtonTemplate,
  templateHelpers: {
    saveIcon: SaveIconTemplate()
  },

  behaviors: {
    ListItemButton: {
      behaviorClass: ListItemButton
    }
  },

  signInManager: null,
  video: null,

  initialize: function(options) {
    this.video = options.video;
    this.signInManager = options.signInManager;
    this.listenTo(this.signInManager, 'change:signedInUser', this._onSignInManagerChangeSignedInUser);
  },

  onRender: function() {
    this._setState();
  },

  onClick: function() {
    var videoActions = new VideoActions();
    var offset = this.$el.offset();
    var playlists = this.signInManager.get('signedInUser').get('playlists');

    videoActions.showSaveMenu(this.video, offset.top, offset.left, playlists);
  },

  _onSignInManagerChangeSignedInUser: function() {
    this._setState();
  },

  _setState: function() {
    var signedIn = this.signInManager.has('signedInUser');

    var tooltipText = signedIn ? chrome.i18n.getMessage('save') : chrome.i18n.getMessage('notSignedIn');
    this.$el.attr('data-tooltip-text', tooltipText).toggleClass('is-disabled', !signedIn);
    this.model.set('enabled', signedIn);
  }
});

export default SaveVideoButtonView;