import React from 'react';
import {Platform, Text, View} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import EmptyScreen from "../../components/UI/EmptyScreen";

const SettingsScreen = props => {
    return <EmptyScreen>
        <Text>Coming Feature: Change language.</Text>
    </EmptyScreen>;
};

SettingsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Settings',
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

export default SettingsScreen;
