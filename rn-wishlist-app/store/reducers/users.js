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
    /*switch(action.type) {
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== action.pid),
                availableProducts: state.availableProducts.filter(product => product.id !== action.pid)
            };
        case CREATE_PRODUCT:
            const newProduct = new Product(
                new Date().toString(),
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            };
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.pid);
            const updatedProduct = new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price
            );
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = updatedProduct;
            const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.pid);
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;
            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            };
        default:
            return state;
    }*/
};
