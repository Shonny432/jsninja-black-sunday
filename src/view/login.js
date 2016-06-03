import { View } from 'backbone';
import loginTemplate from './login.html';

var LoginView = View.extend({
  initialize: function() {},
  events: {
    "submit form": "",
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
