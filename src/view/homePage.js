import { View } from 'backbone';
import homePageTemplate from './homePage.html'
import popUpManager from '../helpers/popupManager'

const homePageView = View.extend({
  initialize: function() {
    // this.render();
  },
  render: function() {
    this.$el.html(homePageTemplate);
    return this;
  },
  events:{
    "click #registration":'openRegPopUp',
    "click #login":'openLogPopUp'
  },
  openRegPopUp: function(){
    popUpManager('body');

  },
  });

export default homePageView;
