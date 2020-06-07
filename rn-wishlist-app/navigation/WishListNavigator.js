import React from 'react';
import {Platform, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import WishlistPeopleScreen from "../screens/wishlist/WishlistPeopleScreen";
import WishlistScreen from "../screens/wishlist/WishlistScreen";
import WishDetailScreen from "../screens/wishlist/WishDetailScreen";
import ShoppingListScreen from "../screens/user/ShoppingListScreen";
import UserWishlistScreen from "../screens/user/UserWishlistScreen";
import EditWishScreen from "../screens/user/EditWishScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import MyContactsScreen from "../screens/contacts/MyContactsScreen";
import NewContactsScreen from "../screens/contacts/NewContactsScreen";
import Colors from '../constants/Colors';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const WishlistNavigator = createStackNavigator({
    People: WishlistPeopleScreen,
    Wishlist: WishlistScreen,
    WishDetails: WishDetailScreen,
    GiftList: ShoppingListScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
});

const AdminNavigator = createStackNavigator({
    UserWishlist: UserWishlistScreen,
    EditWish: EditWishScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
});

const ContactsNavigator = createStackNavigator({
    MyContacts: MyContactsScreen,
    NewContact: NewContactsScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-people' : 'ios-people'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
});

const SettingsNavigator = createStackNavigator({
    Settings: SettingsScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-settings' : 'ios-settings'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
});

const AppNavigator = createDrawerNavigator({
    Wishlist: {
        screen: WishlistNavigator,
        navigationOptions: () => ({
            title: "Wish Lists"
        })
    },
    Admin: {
        screen: AdminNavigator,
        navigationOptions: () => ({
            title: "My Wish List"
        })
    },
    Contacts: {
        screen: ContactsNavigator,
        navigationOptions: () => ({
            title: "Contacts"
        })
    },
    Settings: {
        screen: SettingsNavigator,
        navigationOptions: () => ({
            title: "Settings"
        })
    }
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
});

export default createAppContainer(AppNavigator);
