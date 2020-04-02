import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';

const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The Game is Over!</TitleText>
                <View style={styles.imageContainer}>
                    <Image
                        fadeDuration={1000} // once downloaded, the image is cached. Fading is only for first-times
                        // source={require('../assets/success.png')} local image
                        source={{uri: 'https://lh3.googleusercontent.com/proxy/uexrsbzrXHwZ7Bw-thp8Ey-TygCvtxrDBkmtjoaZ6cGjE5mVfOZiy_cRCrV92sVDQ54rbkUkM2ZQhbMTPESFl9_kG0kB3YjUz5PamjWDR0KTy5dCENbY9oSqOwL9HkgtXWU'}} //online image
                        style={styles.image}
                        resizeMode="cover" //cover (default): crop, contain: fits inside
                    />
                </View>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.resultText}>Your phone needed <Text
                        style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text
                        style={styles.highlight}>{props.userNumber}</Text></BodyText>
                </View>
                <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7, //width and height should be the same for round images
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    },
    highlight: { // nested text components will inherit styles from its parent text component
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;
