import { View } from 'backbone';
import homePageTemplate from './homePage.html'
import { openRegistrationPopUp, openSuccessPopUp } from '../helpers/popupManager'

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
    openRegistrationPopUp()
        .then((popupReg)=>{
          console.log(this);
          popupReg.remove();
        })
        .then(()=>{
          openSuccessPopUp()
          });
        //.catch(function(){alert(123)});
  }
  });

export default homePageView;
