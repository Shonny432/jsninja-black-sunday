import { View } from 'backbone';
import loginTemplate from './login.html';
import store from '../index'


var LoginView = View.extend({
  initialize: function() {},
  events: {
    "submit form": "checkLoginData",
  },
    navigateRoute: function (response) {
        if(response.user.isAdmin){
            window.app.navigate("admin", {trigger: true});
        } else {
            window.app.navigate("user", {trigger: true});
        }
    },
    checkLoginData: function (event) {
        event.preventDefault();
        const email = this.$el.find("#email").val();
        const pass = this.$el.find('#password').val();
        fetch('http://tasks.smartjs.academy/login', {
            method: 'post',
            body: JSON.stringify({email: email, password: pass}),
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => {
                return response.json()})
            .then((responseJson)=> {
                store.token = responseJson.token;
                this.navigateRoute(responseJson);
            });
    },
    render: function() {
      this.$el.html(loginTemplate);
      this.$el.find('#loginform')
        .modal('show')
        .on('hide.bs.modal', () => this.remove())
      ;
   },
  });

export default LoginView;
