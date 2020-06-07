import React from 'react';
import {Button, FlatList, Platform, Text, View} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";

const UserWishlistScreen = props => {
    return <View><Text>MY WISH LIST</Text></View>
};

UserWishlistScreen.navigationOptions = navData => {
    return {
        headerTitle: 'My Wish List',
        headerLeft: () => <HeaderButtons title='Menu' HeaderButtonComponent={HeaderButton}>
            <Item
                title='Menu'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}/>
        </HeaderButtons>
    }
};

export default UserWishlistScreen;
