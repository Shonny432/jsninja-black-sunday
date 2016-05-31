import HomePageView from './view/homePage';
import { Router, history } from 'backbone';


const AppRouter = Router.extend({
  routes: {
    '': 'createHomePage',
  },

  createHomePage: function () {

      const homePage = new HomePageView();
      $("body").append(homePage.$el);
      homePage.render();

  },


});


const app = new AppRouter();
history.start();
