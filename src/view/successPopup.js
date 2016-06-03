import {View} from 'backbone';
import successTemplate from './successPopup.html';


var SuccessView = View.extend({
    render: function () {
        this.$el.html(successTemplate);
        this.$el.find('#succes')
            .modal('show')
            .on('hide.bs.modal', () => this.remove())
    }
});

export default SuccessView;