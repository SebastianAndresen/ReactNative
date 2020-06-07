import React from 'react';
import {View, StyleSheet} from 'react-native';

const EmptyScreen = props => {
    return <View style={{...styles.content, ...props.style}}>
        {props.children}
    </View>
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EmptyScreen;
