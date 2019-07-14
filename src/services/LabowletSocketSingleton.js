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
    this.roomCode = roomCode; // server
    this._socketConnection = this.connect(configs.prod, LABOWLET_PATH);
  }
  
  connect(address, path){
    const socket = new SockJS(`${address}${path}`);
    const socketClient = STOMP.over(socket);
    socketClient.connect({}, function (frame) {

        // Make factory method that creates subsriptions with `/room/${this.roomCode}` prefix thus the params is the socket event.
        // socketClient.subscribe(`/room/${this.roomCode}/join`, function (payload) {
        //     console.log(payload);
        // });
    });
    
    return socketClient;
  }

  /**
   * @function addSubscription
   * @description factory function that creates subsription with `/room/code` prepended to the path.
   * All user has to input is the message
   * @param {String} message 
   * @param {Function} fn 
   */
  addSubscription(message, fn) {
    const socketPath = `/room/${this.roomCode}/${message}`
    this._socketConnection.subscribe(socketPath , fn);
  }

  get socketConnection() {
    return this._socketConnection;
  }
}

export default LabowletSocket;