document.addEventListener('DOMContentLoaded', function () {
    const app = firebase.app();
    const db = firebase.firestore();
    const myNote = db.collection('notes').doc('firstnote');

    appendToBody(`
        <h1>Hello Firebase World</h1>
        <button onclick="googleLogin()">Login with Google</button>
    `);
    
    myNote.get()
        .then(doc => {
            if (doc.exists) {
                const data = doc.data();
                appendToBody(data.title + '<br>');
            } else {
                appendToBody('No such document!');
            }
        });
});

const googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            appendToBody(`Hello ${user.displayName}`);
            console.log(user);
        })
        .catch(console.log)
}

function appendToBody(content) {
    const div = document.createElement('div');
    div.innerHTML = content;
    document.body.appendChild(div);
}
