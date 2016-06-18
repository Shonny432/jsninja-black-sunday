import {Collection} from 'backbone';
import api from '../api';


const UserCollection = Collection.extend({
    fetch: function () {
        api.getUsers()
            .then((response)=> {
                return response.json();
            }).then((responseJson)=> {
            this.reset(responseJson.page);
        })
    }
});


export default UserCollection;