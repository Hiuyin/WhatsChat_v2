import firebase from 'firebase'; // 4.8.1

class Fire2 {
  constructor() {
    this.init();
    this.observeAuth();
  }

  init = () =>
  firebase.initializeApp({
    apiKey: "AIzaSyAzSnKoY0EDFNGws0we8P7r8F1XAtUFJgs",
    authDomain: "testechat-f5707.firebaseapp.com",
    databaseURL: "https://testechat-f5707.firebaseio.com",
    projectId: "testechat-f5707",
    storageBucket: "",
    messagingSenderId: "621647665094"
  });

  observeAuth = () => {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
    console.log(firebase.auth().signInAnonymously._id);
  };

  
  
  onAuthStateChanged = user => {
    console.log("usuario "+firebase.auth().currentUser)
    if (!user) {
      try {
        console.log("entrou");
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };


  get uid() {
    console.log((firebase.auth().currentUser || {}).uid);
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    console.log(firebase.database().ref('messages'))
    return firebase.database().ref('messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));


  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  off() {
    this.ref.off();
  }
}

Fire2.shared = new Fire2();
export default Fire2;
