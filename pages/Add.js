import React from 'react'
import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

const alert = () => {
    Alert.alert(
        "Todo added!",
        "",
        [
            { text: "OK" }
        ]
    );
}

const Add = ({ getData }) => {
    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);
    const addTodo = () => {
        if (title.length <= 0) return setError(true);
        AsyncStorage.getItem('todos').then(todos => {
            const newTodos = todos ? JSON.parse(todos) : [];
            newTodos.push({
                id: uuid.v4(),
                title,
                completed: false
            });
            AsyncStorage.setItem('todos', JSON.stringify(newTodos));
            setTitle('');
            setError(false);
            alert()
            getData();
            navigation.navigate('Todos');
        })
    }

    const handleTitle = (e) => setTitle(e.nativeEvent.text);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Todo title</Text>
            <TextInput
                selectionColor='black'
                outlineColor='gray'
                activeOutlineColor='navy'
                mode='outlined'
                placeholder='Todo'
                onChange={handleTitle}
                value={title}
                error={error}
            />
            <View style={styles.buttons}>
                <Button mode='contained' icon='cancel' contentStyle={styles.btn} style={styles.clearButton} onPress={() => setTitle('')}>Clear</Button>
                <Button mode='contained' icon='check' contentStyle={styles.btn} style={styles.addButton} onPress={addTodo}>Add</Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
    },
    container: {
        padding: 10,
        backgroundColor: 'lightgray',
        flex: 1,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    addButton: {
        backgroundColor: 'green',
        marginLeft: 10,
        flex: 1,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'darkgreen',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 1,
        fontSize: 50,
    },
    clearButton: {
        backgroundColor: '#A31914',
        flex: 1,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#761914',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 1,
    },
    btn: {
        height: 50,

    }
})

export default Add;