import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Platform, StatusBar, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react';
import Constants from 'expo-constants';


export default StickyHeader = ({ getData, todoMenu, setTodoMenu, completedTodos, onlyDelete, dataName }) => {
    const [delAnimation] = useState(new Animated.Value(0));
    const [complAnimation] = useState(new Animated.Value(0));

    const handleDelete = async () => {
        const todos = JSON.parse(await AsyncStorage.getItem(dataName));
        const newTodos = todos.filter(todo => !todoMenu.includes(todo.id));
        await AsyncStorage.setItem(dataName, JSON.stringify(newTodos));
        getData();
        setTodoMenu([]);
    }
    const handleComplete = async () => {
        const todos = JSON.parse(await AsyncStorage.getItem('todos'));
        const newTodos = todos.filter(todo => !todoMenu.includes(todo.id));
        const oldTodos = todos.filter(todo => todoMenu.includes(todo.id));
        await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
        await AsyncStorage.setItem('completedTodos', JSON.stringify([...oldTodos, ...completedTodos]));
        getData();
        setTodoMenu([]);
    }

    useEffect(() => {
        if (todoMenu.length > 0) {
            Animated.timing(delAnimation, {
                toValue: 100,
                duration: 200,
                useNativeDriver: true
            }).start();
            Animated.timing(complAnimation, {
                toValue: -100,
                duration: 200,
                useNativeDriver: true
            }).start();
        } else {
            Animated.timing(delAnimation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }).start();
            Animated.timing(complAnimation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }).start();
        }
    }
        , [todoMenu])




    return (
        <Animated.View style={{ ...styles.menu }}>
            <TouchableOpacity onPress={handleDelete} style={{ ...styles.delete, transform: [{ translateX: delAnimation }] }}>
                <Icon name="delete-empty" size={30} color="#E90800" style={styles.delIcon} />
            </TouchableOpacity>
            {onlyDelete ? null :
                <TouchableOpacity onPress={handleComplete} style={{ ...styles.complete, transform: [{ translateX: complAnimation }] }}>
                    <Icon name="checkbox-multiple-marked-circle-outline" size={30} color="#1ADC00" style={styles.completeIcon} />
                </TouchableOpacity>}
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    menu: {
        position: 'absolute',
        top: Platform.OS === 'android' ? StatusBar.currentHeight : Constants.statusBarHeight,
        left: 0,
        right: 0,
        zIndex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',

    },
    delete: {
        backgroundColor: '#430800',
        paddingRight: 20,
        height: 60,
        width: 100,
        marginLeft: -120,
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderRadius: 15,
    },
    complete: {
        backgroundColor: '#1A3600',
        height: 60,
        width: 100,
        marginRight: -120,
        paddingLeft: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 15,
    },
    delIcon: {
        borderColor: '#AF0701',
        textAlignVertical: 'center',
        textAlign: 'center',
        borderWidth: 2,
        borderRadius: 15,
        padding: 5,
    },
    completeIcon: {
        borderColor: '#019E1E',
        textAlignVertical: 'center',
        textAlign: 'center',
        borderWidth: 2,
        borderRadius: 15,
        padding: 5
    }

});