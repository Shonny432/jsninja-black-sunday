import HomePageView from './view/homePage';
import AdminPageView from './view/adminPage';
import { Router, history } from 'backbone';
import  Store from './store/store'

 const store = new Store();

const AppRouter = Router.extend({
  routes: {
    '': 'createHomePage',
    'admin': 'createAdminPage', 
      'user': 'createUserPage',
  },
  body: $("body"),

  createHomePage: function () {

      const homePage = new HomePageView();
      this.body.css("overflow","auto");
      this.body.append(homePage.$el);
      homePage.render();

  },
    createAdminPage: function (){
        const adminPage = new AdminPageView();
        this.body.html(adminPage.$el);
        adminPage.render();
    }


});


window.app = new AppRouter();

export default store;
history.start();
