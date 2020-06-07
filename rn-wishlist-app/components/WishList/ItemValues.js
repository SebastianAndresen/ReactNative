import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

const ItemValues = props => {
    const priceIcons = (num) => {
        let iconCollection = [];
        for (let i = 0; i < num; i++) {
            iconCollection.push(
                <Ionicons
                    key={i}
                    name={'logo-usd'}
                    size={props.size}
                    color={props.color}
                />
            );
        }
        return iconCollection;
    };

    const joyIcons = (num) => {
        let iconCollection = [];
        for (let i = 0; i < num; i++) {
            iconCollection.push(
                <Ionicons
                    key={i}
                    name={Platform.OS === 'android' ? 'md-happy' : 'ios-happy'}
                    size={props.size}
                    color={props.color}
                />
            );
        }
        return iconCollection;
    };

    return (
        <View style={{...styles.icons, ...props.style}}>
            <View style={styles.price}>{priceIcons(props.price)}</View>
            <View style={styles.joy}>{joyIcons(props.joy)}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    icons: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    price: {
        flexDirection: 'row'
    },
    joy: {
        flexDirection: 'row'
    }
});

export default ItemValues;
