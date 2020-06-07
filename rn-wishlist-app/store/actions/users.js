export const ADD_CONTACT = 'ADD_CONTACT';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';

export const addContact = userId => {
    return {type: ADD_CONTACT, userId};
};

export const removeContact = userId => {
    return {type: REMOVE_CONTACT, userId}
};
