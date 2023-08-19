document.addEventListener('DOMContentLoaded', function () {
    const app = firebase.app();

    const db = firebase.firestore();

    const myNote = db.collection('notes').doc('firstnote');

    myNote.get()
        .then(doc => {
            if (doc.exists) {
                const data = doc.data();
                document.write(data.title + '<br>');
            } else {
                document.write('No such document!');
            }
        })
});

const googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.write(`Hello ${user.displayName}`);
            console.log(user);
        })
        .catch(console.log)
}