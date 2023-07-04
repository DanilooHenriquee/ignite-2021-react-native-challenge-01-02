import React, { useEffect, useRef, useState } from "react";
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import xIcon from '../assets/icons/x/x.png'

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

interface TaskItemProps {
    task: Task;
    index: number;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (taskId: number, newTaskTitle: string) => void;
  }

export function TaskItem({ task, index, toggleTaskDone, removeTask, editTask }: TaskItemProps) {

    console.log(`ola joao`, task);

    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setEditedText(task.title);
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        editTask(task.id, editedText);
        setIsEditing(false);
    }

    function handleRemoveTask() {
        removeTask(task.id);
    }

    useEffect(() => {
        if (isEditing)
            textInputRef.current?.focus();
        else
            textInputRef.current?.blur();
            
    }, [isEditing]);

    return (       
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    //TODO - use onPress (toggle task) prop
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        //TODO - use style prop
                        style={
                            task.done === false
                                ? styles.taskMarker
                                : styles.taskMarkerDone
                        }
                    >
                        {task.done && (
                            <Icon name="check" size={12} color="#FFF" />
                        )}
                    </View>

                    <TextInput
                        ref={textInputRef}
                        value={editedText}
                        onChangeText={setEditedText}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        style={
                            task.done === false
                                ? styles.taskText
                                : styles.taskTextDone
                        }                        
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>

                { !isEditing &&
                    <TouchableOpacity
                    testID={`edit-${index}`}
                    style={{paddingRight: 15}}
                    onPress={handleStartEditing}
                    >
                        <Image source={editIcon} />
                    </TouchableOpacity>            
                }

                { isEditing && 
                    <TouchableOpacity
                    testID={`x-${index}`}
                    style={{paddingRight: 22, paddingTop: 5}}
                    onPress={handleCancelEditing}
                    >
                        <Image source={xIcon} />
                    </TouchableOpacity>
                }

                <View style={styles.division} />

                <TouchableOpacity
                    testID={`trash-${index}`}                    
                    style={[ {paddingRight: 20}, isEditing ? {opacity: .3} : {opacity: 1} ]}
                    disabled={isEditing}                    
                    //TODO - use onPress (remove task) prop
                    onPress={handleRemoveTask}                    
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'        
    },
    division: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.50)',
        marginRight: 10,
        padding: 0
    }
})