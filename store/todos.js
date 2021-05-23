import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const todosRef = db.collection('todos')

export const state = () => ({
    todos: []
})

export const actions = {
    init: firestoreAction(({ bindFirestoreRef }) => {
        bindFirestoreRef('todos', todosRef)
    }),
    add: firestoreAction((context, taskName) => {
        if (taskName.trim) {
            todosRef.add({
                name: taskName,
                isDone: false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
    }),
    changeStatus: firestoreAction((context, todo) => {
        todosRef.doc(todo.id).update({
            isDone: !todo.isDone
        })
    }),
    remove: firestoreAction((context, id) => {
        todosRef.doc(id).delete()
    }),
}