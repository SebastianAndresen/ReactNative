import React from 'react';
import {
    View,
    Text,
    Platform,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback, Alert,
} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import {useSelector, useDispatch} from "react-redux";
import {Ionicons} from "@expo/vector-icons";
import * as userActions from "../../store/actions/users";
import EmptyScreen from "../../components/UI/EmptyScreen";

const MyContactsScreen = props => {
    const users = useSelector(state => state.users.myUsers).sort((a, b) => a.name > b.name ? 1 : -1);

    if (users.length === 0 || !users) {
        return <EmptyScreen>
            <Text>Add some contacts.</Text>
        </EmptyScreen>;
    }

    const dispatch = useDispatch();

    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to remove this person from your contacts?', [
            {text: 'No', style: 'default'},
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(userActions.removeContact(id));
                }
            }
        ]);
    };

    return <FlatList
        data={users}
        renderItem={itemData =>
            <View style={{...styles.container, ...{backgroundColor: itemData.item.color}}}>
                <View style={styles.touchable}>
                    <TouchableCmp onLongPress={() => {
                        deleteHandler(itemData.item.id);
                    }} useForeground>
                        <View style={styles.information}>
                            <Text style={styles.name}>{itemData.item.name}</Text>
                            <View>
                                <Ionicons
                                    name={Platform.OS === 'android' ? 'md-remove-circle' : 'ios-remove-circle'}
                                    size={30}
                                    color='black'
                                />
                            </View>
                        </View>
                    </TouchableCmp>
                </View>
            </View>
        }
    />
};

MyContactsScreen.navigationOptions = navData => {
    return {
        headerTitle: "My Contacts",
        headerLeft: () => <HeaderButtons title='Menu' HeaderButtonComponent={HeaderButton}>
            <Item
                title='Menu'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}/>
        </HeaderButtons>,
        headerRight: () => <HeaderButtons title='NewContact' HeaderButtonComponent={HeaderButton}>
            <Item
                title='NewContact'
                iconName={Platform.OS === 'android' ? 'md-person-add' : 'ios-person-add'}
                onPress={() => {
                    navData.navigation.navigate('NewContact');
                }}/>
        </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderRadius: 10
    },
    touchable: {
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    information: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
    }
});

export default MyContactsScreen;
