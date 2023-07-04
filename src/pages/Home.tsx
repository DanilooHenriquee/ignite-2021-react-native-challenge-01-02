import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    console.log('clicou em addTask: ', newTaskTitle);

    const taskExists = tasks.find(task => task.title === newTaskTitle);    

    if (taskExists)
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome',
        [
          { text: 'OK' }        
        ]
      );

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, data]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists

    const newTasks = tasks.map(task => {
      if (task.id === id)
        return {...task, done: !task.done }
      
      return task;      
    })

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state

    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item ?', 
      [
        { text: 'SIM',
          onPress: () => { 
            setTasks(tasks => tasks.filter(
              task => task.id !== id
            ));
          }
        },
        { text: 'NÃO' }
      ]
    );
  }

  function handleEditTask(taskId: number, newTaskTitle: string) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId)
        return {...task, title: newTaskTitle }
      
      return task;      
    })

    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})