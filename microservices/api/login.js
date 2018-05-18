import { https } from 'https';

const apiLogin = (req, res) => {
    const options = {
      hostname: 
        `https://gearscore-firebase.firebaseapp.com/auth/password?
        &email=${req.query.email}
        &password=${req.query.password}
        &v=js-2.2.2
        &transport=json
        &suppress_status_codes=true`,
      port: 443,
      path: '/',
      method: 'GET'
    };
    
    https.request(options, (res) => {
      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);
    
      res.on('data', (d) => {
        process.stdout.write(d);
      });
    });
};