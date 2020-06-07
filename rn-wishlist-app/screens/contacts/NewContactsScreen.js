import React from 'react';
import {View, Text, Platform, TouchableOpacity, TouchableNativeFeedback, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import * as userActions from "../../store/actions/users";
import {Ionicons} from "@expo/vector-icons";
import EmptyScreen from "../../components/UI/EmptyScreen";

const NewContactsScreen = props => {
    const myUsers = useSelector(state => state.users.myUsers);
    const notMyUsers = useSelector(state => state.users.users).filter(user => !myUsers.find(user_ => user.id === user_.id) && user.id !== 'u4').sort((a, b) => a.name > b.name ? 1 : -1);

    if (notMyUsers.length === 0 || !notMyUsers) {
        return <EmptyScreen>
            <Text>There are no contacts to add.</Text>
        </EmptyScreen>;
    }

    const dispatch = useDispatch();

    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return <FlatList
        data={notMyUsers}
        renderItem={itemData =>
            <View style={{...styles.container, ...{backgroundColor: itemData.item.color}}}>
                <View style={styles.touchable}>
                    <TouchableCmp onPress={() => {
                        dispatch(userActions.addContact(itemData.item.id));
                    }} useForeground>
                        <View style={styles.information}>
                            <Text style={styles.name}>{itemData.item.name}</Text>
                            <View>
                                <Ionicons
                                    name={Platform.OS === 'android' ? 'md-add-circle' : 'ios-add-circle'}
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

NewContactsScreen.navigationOptions = navData => {
    return {
        headerTitle: "Browse People"
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

export default NewContactsScreen;
