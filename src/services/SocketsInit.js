import configs from '../config/RESTurl.json';
import SockJS from 'sockjs-client';
import STOMP from 'stompjs';
//const multichannelClient = require('sockjs-rooms').client;
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
    const socket = new SockJS(`${address}${path}`);
    console.log(socket)
    const socketClient = STOMP.over(socket);
    socketClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        // Make factory method that creates subsriptions with `/room/${this.roomCode}` prefix thus the params is the socket event.
        socketClient.subscribe(`/room/${this.roomCode}/join`, function (payload) {
            console.log('fuck yea');
            console.log(payload);
        });
    });
    // const socketClient = socket.channel(`/room/${this.roomCode}`, (data) => {
    //   console.log(data)
    // });

    // const socket = io(address, {
    //   path,
    // });

    // console.log(socket);

    // socket.on('connect', (mySocket) => {
    //   mySocket.join(`/room/${this.roomCode}`, (data) => {
    //     console.log(data);
    //   });
    //   console.log('yay connected!'); // true
    //   console.log(socket.connected); // true
    // });

    // //Add events here...
    // socket.on(``, (payload) => {
    //   console.log('wtf is this', payload);
    // })
    
    return socketClient;
  }

  get socketConnection() {
    return this._socketConnection;
  }
}

export default LabowletSocket;