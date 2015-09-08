﻿import {CollectionView} from 'marionette';
import ActivePaneType from 'foreground/enum/activePaneType';
import ActivePaneView from 'foreground/view/activePane/activePaneView';
import ViewEntityContainer from 'foreground/view/behavior/viewEntityContainer';
import {activePane_activePanes as ActivePanesTemplate} from 'common/templates';

// TODO: Show a sign-in view.
var ActivePanesView = CollectionView.extend({
  className: 'activePanes flexRow',
  childView: ActivePaneView,
  template: ActivePanesTemplate,

  childViewOptions: function() {
    return {
      streamItems: StreamusFG.backgroundProperties.stream.get('items')
    };
  },

  behaviors: {
    ViewEntityContainer: {
      behaviorClass: ViewEntityContainer,
      viewEntityNames: ['collection']
    }
  },

  // Sort the panes such that the stream appears on the right side.
  viewComparator: function(activePane) {
    return activePane.get('type') === ActivePaneType.Stream ? 1 : 0;
  }
});

export default ActivePanesView;