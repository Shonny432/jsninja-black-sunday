import RegistrationView from '../view/registration';
import SuccessView from '../view/successPopup';


export function openRegistrationPopUp(container = 'body'){
    const regPopup = new RegistrationView();
    $(container).append(regPopup.$el);
    regPopup.render();
    return regPopup.promise;
}

export function openSuccessPopUp(container = 'body'){
    const successPopUp = new SuccessView();
    $(container).append(successPopUp.$el);
    successPopUp.render();
    return successPopUp.promise;
}


// const popUpManager = {
//     openRegistrationPopUp: function (container = 'body') {
//         const regPopup = new RegistrationView();
//         $(container).append(regPopup.$el);
//         regPopup.render();
//         return regPopup.promise;
//     },
//     openSuccessPopUp: function (container = 'body') {
//         const regPopup = new RegistrationView();
//         $(container).append(regPopup.$el);
//         regPopup.render();
//         return regPopup.promise;
//     }


