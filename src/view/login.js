import { View } from 'backbone';
import registrationTemplate from './registration.html';

var RegistrationView = View.extend({
  initialize: function() {},

  events: {
    "submit form": "validateFormValues",
  },

  validateFormValues: function (event) {

     function correctMail(str) {
         var regExp = new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$');
         return regExp.test(str);
       }

        const email = this.$el.find("#email").val();
        const pass =  this.$el.find('#password').val();
        const passConf =  this.$el.find('#confirm-password').val();
        var reg = new RegExp('[0-9]');
        console.log(reg.test(pass) , pass === passConf , pass.length >= 6 , correctMail(email))
        console.log(typeof email);
        if(reg.test(pass) && pass === passConf && pass.length >= 6 && correctMail(email)){
            event.preventDefault();
          fetch('http://tasks.smartjs.academy/validate/email',{
            method : 'post',
            body: JSON.stringify({email : email}),
            headers: {'Content-Type': 'application/json'}
          })
          .then(response => response.json())
          .then((response)=>{
            if(response.success){
              fetch('http://tasks.smartjs.academy/users',{
                method : 'post',
                body: JSON.stringify({email : email, password : pass}),
                headers: {'Content-Type': 'application/json'}
              })
            }
          })
        } else{
          if(!(reg.test(pass) && pass === passConf && pass.length >= 6)){
            $( ":password" ).css("outline","2px solid red")
            event.preventDefault();
          }
          if(!correctMail(this.$el.find("#email").val())){
            $( "input[name='email']" ).css("outline","2px solid red")
            event.preventDefault();
          }
        }


  },

    render: function() {
      this.$el.html(registrationTemplate);
      this.$el.find('#regform')
        .modal('show')
        .on('hide.bs.modal', () => this.remove())
      ;
   },
  });

export default RegistrationView;
