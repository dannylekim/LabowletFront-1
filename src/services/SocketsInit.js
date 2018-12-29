import io from 'socket.io-client';
import configs from '../config/RESTurl.json';

const LABOWLET_PATH = '/labowlet/'

/**
 * @description Singleton class describing the socket events of user's action
 * This includes
 *  - Create room
 *  - Join room
 *  - Room changes (settings were changed, changing team)
 *  - Game state
 *  - tbd...
 */
class LabowletSocket {
  constructor(roomCode){
    this.roomCode = roomCode;
    this._socketConnection = this.connect(configs.sk, LABOWLET_PATH);
  }
  
  connect(address, path){
    const socket = io(address, {
      path,
    });

    socket.on('connection', (mySocket) => {
      mySocket.join(`/room/${this.roomCode}`);
      console.log(socket.connected); // true
    });
        
    //Add events here...
    socket.on(``, (payload) => {
      console.log('wtf is this', payload);
    })
    
    return socket;
  }

  get socketConnection() {
    return this._socketConnection;
  }
}

export default LabowletSocket;