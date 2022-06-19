import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';


const Todo = ({ todo, index, todoMenu, setTodoMenu, checkColor, ...customStyles }) => {
    const { id, title } = todo;

    const [checked, setChecked] = useState(false);

    const handlePress = () => {
        if (checked) {
            setChecked(false);
            setTodoMenu(todoMenu.filter(item => item !== id));
        } else {
            setChecked(true);
            setTodoMenu([...todoMenu, id]);
        }
    }

    return (
        <TouchableOpacity style={{ ...styles.box, ...customStyles }} onPress={handlePress}>
            {checked ?
                <View style={styles.container}>
                    <Text style={styles.text}>{index + 1}. {title} </Text>
                    <Icon name="check-square-o" size={20} color={checkColor} />
                </View>
                :
                <Text style={styles.text}>{index + 1}. {title}</Text>}
        </TouchableOpacity>
    )
}

export default Todo

const styles = StyleSheet.create({
    box: {
        width: '80%',
        backgroundColor: '#2B0802',
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'red',
        marginBottom: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 1,
    },
    text: {
        fontSize: 20,
        color: 'white',
        width: '90%',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})


