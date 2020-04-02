import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView, FlatList} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess); // is only set the first time because of "detached handling" where react already knows we have a set state
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    // useRef is values that 'survive' re-renders
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver} = props; // pull userChoice and onGameOver out of props as constants with equal names

    // run function *after* every render
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]); // effect will only run of one if these dependencies has changed

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)) {
            Alert.alert('Don\' lie!', 'You know that this is wrong...', [{text: 'Sorry!', style: 'cancel'}]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    };

    return (
        <View style={styles.screen}>
            <BodyText>Opponent's Guess</BodyText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <AntDesign name="caretdown" size={24} color="white"/>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <AntDesign name="caretup" size={24} color="white"/>
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
            {/*<ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map(((guess, index) => renderListItem(guess, pastGuesses.length - index)))}
            </ScrollView>*/}
            <FlatList
                keyExtractor={item => item}
                data={pastGuesses}
                renderItem={renderListItem.bind(this, pastGuesses.length)}
                contentContainerStyle={styles.list} // style on flatlist and scrollview allows ex. setting margin but does not allow setting position of content. For this, we use contentContainerStyle instead
            />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        flex: 1,
        width: '60%'
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});

export default GameScreen;
