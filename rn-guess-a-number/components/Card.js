import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = props => {
    return (
        // take every component from the card styling
        // distribute it into a new object
        // merge every component from the props style
        // this way, new styling is added and same styling is overwritten from outside
        <View style={{...styles.card, ...props.style}}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        // shadow only on iOS
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        // shadow only on android
        elevation: 10
    }
});

export default Card;
