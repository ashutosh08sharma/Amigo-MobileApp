import Auth from '../../../Auth/Auth.js';
import Backend from '../../../Backend';
var config = {
  headers: { 'Authorization': 'basic' + Auth.getToken('user') }
};


export default class Backend {


  constructor() {
    super();
  }

  getMessage(callback) {
    return axios.get('http://10.0.0.230//api/v1.0/cmd/response/', {
      params: {
        ID: Auth.getToken('messageId')
      },
      config
    })
      .then(function (response) {
        callback({
          _id: response._id,
          text: repsonse.resp,
          createdAt: new Date(response.startTime),
          user: {
            _id: response.resp.userId,
            name: response.resp.userName
          }
        })
        console.log(response);

      })
      .catch(function (error) {
        console.log(error);
      });

  }

  // sendMessage(message) {
  //   axios.post("http://10.0.0.230/api/v1.0/chat"), config, JSON.stringify(msg)
  //     .then(function (response) {
  //       console.log(response);
  //       if (response.status == 202)
  //         // get result by response.request_id 
  //         Auth.authenticateUser('messageId', response._id);
  //       getMessage(response);
  //       alert("Successful");
  //       self.setState({ message: { text: 'Message Sent', styles: ToastStyles.success } });
  //       self.props.navigator.push({
  //         component: 'Chat'
  //       });
  //     }).catch(function (error) {
  //       console.log(error);
  //       self.setState({ message: { text: 'Message failed', styles: ToastStyles.error } });
  //     })
  // };


}