import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, TextInput, ScrollView, Alert, StyleSheet, Slider} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import * as wishesActions from "../../store/actions/wishes";
import Colors from "../../constants/Colors";
import ItemValues from "../../components/WishList/ItemValues";

const EditWishScreen = props => {
    const wishId = props.navigation.getParam('wishId');
    const wishTitle = props.navigation.getParam('wishTitle');
    const editedWish = useSelector(state => state.wishes.allWishes.find(wish => wish.id === wishId));

    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [titleIsValid, setTitleIsValid] = useState(false);
    const [description, setDescription] = useState(editedWish ? editedWish.description : '');
    const [imageUrl, setImageUrl] = useState(editedWish ? editedWish.imageUrl : '');
    const [price, setPrice] = useState(editedWish ? editedWish.price : 1);
    const [joy, setJoy] = useState(editedWish ? editedWish.joy : 1);

    const submitHandler = useCallback(() => {
        if (editedWish) {
            dispatch(wishesActions.updateWish(wishId, description, imageUrl, +price, +joy));
            props.navigation.goBack();
        } else {
            if (!titleIsValid) {
                Alert.alert('Wrong input!', 'Please check the errors in the form.', [{text: 'Okay'}]);
                return;
            }
            Alert.alert('Are you sure you want to save?', "You can't change the title later.", [
                {text: 'No', style: 'default'},
                {
                    text: 'Yes', style: 'destructive', onPress: () => {
                        dispatch(wishesActions.createWish(title, description, imageUrl, +price, +joy));
                        props.navigation.goBack();
                    }
                }
            ]);
        }
    }, [dispatch, wishId, title, description, imageUrl, price, joy, titleIsValid]);

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler});
    }, [submitHandler]);

    const titleChangeHandler = text => {
        if (text.trim().length === 0) {
            setTitleIsValid(false);
        } else {
            setTitleIsValid(true);
        }
        setTitle(text);
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                {editedWish && <View style={styles.editWishTitleContainer}>
                    <Text style={styles.editWishTitle}>{wishTitle}</Text>
                </View>}
                {editedWish ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={titleChangeHandler}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                    />
                    {!titleIsValid && <Text style={styles.formError}>Please enter a valid title!</Text>}
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)}
                    />
                </View>
                <View style={styles.itemValues}>
                    <ItemValues
                        price={price}
                        joy={joy}
                        color={Colors.primary}
                        size={40}
                    />
                </View>
                <View style={styles.sliderContainer}>
                    <View style={styles.slider}>
                        <Slider
                            value={price}
                            minimumValue={0}
                            maximumValue={3}
                            step={1}
                            onValueChange={value => setPrice(value)}
                            thumbTintColor={Colors.primary}
                            minimumTrackTintColor={Colors.primary}
                        />
                        <Text style={styles.sliderText}>What is the price range of the item?</Text>
                    </View>
                    <View style={styles.slider}>
                        <Slider
                            value={joy}
                            minimumValue={0}
                            maximumValue={3}
                            step={1}
                            onValueChange={value => setJoy(value)}
                            thumbTintColor={Colors.primary}
                            minimumTrackTintColor={Colors.primary}
                        />
                        <Text style={styles.sliderText}>How much joy would this give you?</Text>
                    </View>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                    <Text style={styles.descriptionDescription}>Describe what it is and where to get it. Maybe tell about what it can be used for or why you want this. Add some links if the item can be bought online.</Text>
                </View>
            </View>
        </ScrollView>
    );
};

EditWishScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('wishId') ? 'Edit Wish' : 'New Wish',
        headerRight: () => <HeaderButtons title='Save' HeaderButtonComponent={HeaderButton}>
            <Item
                title='Save'
                iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                onPress={submitFn}/>
        </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    editWishTitleContainer: {
        marginBottom: 12
    },
    editWishTitle: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        borderColor: Colors.primary,
        borderBottomWidth: 4,
    },
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#CCC',
        borderBottomWidth: 1
    },
    itemValues: {
        height: 50,
        marginHorizontal: 14,
        marginTop: 14
    },
    sliderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    slider: {
        width: '50%',
        color: 'red'
    },
    sliderText: {
        marginHorizontal: 16,
        textAlign: 'center'
    },
    descriptionDescription: {
        color: Colors.toned,
        margin: 10
    },
    formError: {
        color: 'red'
    }
});

export default EditWishScreen;
