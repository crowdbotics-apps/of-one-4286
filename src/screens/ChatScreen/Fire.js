import { store, auth, firebase } from "../../constants/database";
import moment from 'moment'

class Fire {
  constructor() {}
  get uid() {
    return (auth.currentUser || {}).uid;
  }

  get ref() {
    return store.collection("messages");
  }

  parse = snapshot => {
    let messages = [];
    // snapshot.docs.forEach(ss => {
    //   const { timestamp, text, user } = ss.data();
    //   const { key: _id } = ss;
    //   const message = {
    //     _id,
    //     timestamp,
    //     text,
    //     user
    //   };

    //   messages.push(message);
    // });

    snapshot.docChanges().forEach(change => {
      

      const { timestamp, text, user, createdAt } = change.doc.data();
      //const { key: _id } = change.doc;
      const message = {
        _id: timestamp,
        timestamp,
        text,
        user,
        createdAt: moment(timestamp, 'X').toDate(),
      };

      messages.push(message);
    });

    return messages;
  };

  on = callback => {
    this.unSub = this.ref.limit(50).orderBy('timestamp', 'desc').onSnapshot(snapshot => callback(this.parse(snapshot)));
  };

  get timestamp() {
    return Number(moment().format('X'))
  }
  // send the message to the Backend
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

  append = message => this.ref.add(message);

  // close the connection to the Backend
  off() {
    this.unSub()
  }
}

Fire.shared = new Fire();
export default Fire;
