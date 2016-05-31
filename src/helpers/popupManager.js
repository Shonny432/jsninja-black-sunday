import RegistrationView from '../view/registration';

function popUpManager(element){

    const regPopup = new RegistrationView();
    $(element).append(regPopup.$el);
    regPopup.render();
    console.log(regPopup.promise);
  return regPopup.promise;
};



export default popUpManager;
