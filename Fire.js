import firebase from "firebase/compat";


class Fire {
    constructor() {
        this.init();
        this.checkAuth()
    }


    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyD-paaw-e3ONiXNDrD7cmUaOVNOCQFrIHE",
                authDomain: "chatappreactnative-2e574.firebaseapp.com",
                projectId: "chatappreactnative-2e574",
                storageBucket: "chatappreactnative-2e574.appspot.com",
                messagingSenderId: "977061759552",
                appId: "1:977061759552:web:ff022bb037907ce663eda5",
                measurementId: "G-Q57VB51CGW"
            })
        }
    }

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        })
    }

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user,
            }
            this.db.push(message);
        })
    }

    parse = message => {
        const {user, text, timestamp} = message.val();
        const {ket: _id} = message
        const createdAt = new Date(timestamp);
        return {
            _id,
            createdAt,
            text,
            user
        }
    }

    get = callback => {
        this.db.on("child_added", snapshot => callback(this.parse(snapshot)))
    }

    off() {
        this.db.off();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }

    get db() {
        return firebase.database.ref("messages");
    }
}


export default new Fire();


