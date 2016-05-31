import { View } from 'backbone';
import registrationTemplate from './registration.html';
import {checkValidation, errors } from '../helpers/handleErrors'

var RegistrationView = View.extend({
  initialize: function() {

    this.promise = new Promise((resolve, reject) => {
      console.log("aaaa");
      this.resolve = resolve;
      this.reject = reject;

   });
  },

  events: {
    "submit form": "validateFormValues",
    "blur input": "handleEvent"
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
              .then((response) =>{
                  this.resolve();
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


  handleEvent:function(event){
    console.log("d")
    const flagErorr = checkValidation(event.target.name,event.target.value);
    if(!flagErorr){
      this.showError(event.target.name)
    }
  },
  showError:function(name){
    console.log(this.$el.find('span[data-'+name+']'));
    this.$el.find('span[data-'+name+']').html(errors[name]).fadeIn();
  },
    render: function() {
      this.$el.html(registrationTemplate);
      console.log(this.$el);
      this.$el.find('#regform')
        .modal('show')
        .on('hide.bs.modal', () => this.remove())
      ;
   },

  });

export default RegistrationView;
