import React from 'react';
import {Text, View} from 'react-native';

const EditWishScreen = props => {
    return (<View><Text>Edit Wish Screen</Text></View>);
};

EditWishScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Edit Wish'
    }
};

export default EditWishScreen;
