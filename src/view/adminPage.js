import { View } from 'backbone';
import adminPageTemplate from './adminPage.html';
import adminItemTemplate from './adminItemTamplate.html';
import store from '../index'

const AdminPageView = View.extend({
    initialize: function() {
        this.getUsersList();
    },
    getUsersList: function(){
            fetch('http://tasks.smartjs.academy/users', {
                method: 'get',
                headers: {'Authorization': 'Bearer'+' '+store.token}
            })
                .then((response)=>{
                    return response.json();
                })
                .then((responseJson)=>
                    this.render(responseJson)
                    );
            // } else {
            //     this.showErrorFromServer(responseJson.errors);

    },
    render: function(data) {
        if(data){
            this.$el.html(adminPageTemplate);
            const userList = this.$el.find('#userList');
            const documentFragment = $(document.createDocumentFragment());
            data.forEach(item => {
                let itemTemplate = $(adminItemTemplate);
                itemTemplate.find('.userId').html(item.id);
                itemTemplate.find('.userEmail').html(item.email);
                itemTemplate.css('border','1px solid black');
                if(item.activated){
                    itemTemplate.css('background','#7FFF00');
                } else {
                    itemTemplate.css('background','red');
                }
                documentFragment.html(itemTemplate);
            });
            userList.html(documentFragment);
            return this;
        }
    },
    events:{

    }
});

export default AdminPageView;
