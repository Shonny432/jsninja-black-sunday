import {View} from 'backbone';
import adminPageTemplate from './adminPage.html';
import adminItemTemplate from './adminItemTamplate.html';
import {openConfirmPopUp} from '../helpers/popupManager'
import api from '../api';
import getUser from '../helpers/getUser';
import logout from '../helpers/logout';
import UsersCollection from '../collection/usersCollection';



const AdminPageView = View.extend({
    initialize: function () {
        const user = getUser();
        if (!user) {
            window.app.navigate("", {trigger: true});
        } else if (!user.user.isAdmin) {
            window.app.navigate("user", {trigger: true});
        }
        this.getUsersList();

    },
    getUsersList: function () {
        this.collection = new UsersCollection();
        this.collection.fetch();
        this.collection.on('reset', this.render, this);
    },
    render: function (data) {
        this.$el.html(adminPageTemplate);
        const userList = this.$el.find('#userList');
        const documentFragment = $(document.createDocumentFragment());
        data.forEach(i => {
            const item = i.attributes;
            let itemTemplate = $(adminItemTemplate);
            itemTemplate.find('.userEmail').html(item.email);
            itemTemplate.find('.btn').data('userData', {id: item.id, activated: item.activated,});
            itemTemplate.css('border', '1px solid black');
            if (item.activated) {
                itemTemplate.find('input[type=checkbox]').prop('checked', true);
                itemTemplate.css('background', '#7FFF00');
            } else {
                itemTemplate.css('background', 'red');
            }
            documentFragment.html(itemTemplate);
        });
        userList.html(documentFragment);
        return this;

    },
    changeUserActivation: function (event) {
        let activatedId = $(event.target).data('userData').id;
        openConfirmPopUp()
            .then(()=> {
                api.activate(activatedId)
            })
    },
    logout: function(){
        logout();
        this.$el.remove();
    },
    events: {
        "click #logout": 'logout',
        "click .btn": 'changeUserActivation',
    }
});

export default AdminPageView;
