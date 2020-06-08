import USERS from '../../data/dummyUsers';

import {ADD_CONTACT, REMOVE_CONTACT} from "../actions/users";

const initialState = {
    users: USERS,
    myUsers: USERS.filter(user => USERS.find(user_ => user_.id === 'u4').contacts.find(userId => userId === user.id))
};

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_CONTACT:
            // add id to my list of contacts
            const myUserIndexAdd = state.users.findIndex(user => user.id === 'u4');
            const updatedUsersAdd = [...state.users];
            updatedUsersAdd[myUserIndexAdd].contacts.push(action.userId);

            // add user to my list of contact-users
            const userToAdd = state.users.find(user => user.id === action.userId);
            const updatedMyUsersAdd = [...state.myUsers];
            updatedMyUsersAdd.push(userToAdd);

            return {
                ...state,
                users: updatedUsersAdd,
                myUsers: updatedMyUsersAdd
            };
        case REMOVE_CONTACT:
            const myUserIndexRemove = state.users.findIndex(user => user.id === 'u4');
            const updatedUsersRemove = [...state.users];
            updatedUsersRemove[myUserIndexRemove].contacts.filter(id => id !== action.userId);

            return {
                ...state,
                users: updatedUsersRemove,
                myUsers: state.myUsers.filter(user => user.id !== action.userId)
            };
        default:
            return state;
    }
};
