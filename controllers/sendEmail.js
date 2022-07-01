const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const sendEmail = async (email, uniqueString) => {

    const myOAuth2Client = new OAuth2(
        process.env.GOOGLE_CLIENTID,
        process.env.GOOGLE_CLIENTSECRET,
        'https://developers.google.com/oauthplayground'
    )

    myOAuth2Client.setCredentials({refresh_token:process.env.GOOGLE_REFRESHTOKEN})

    const accessToken = myOAuth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'francocaspani.dev@gmail.com',
            type: 'OAuth2',
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENTSECRET,
            refreshToken: process.env.GOOGLE_REFRESHTOKEN,
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    let mailOptions = {
        from: 'francocaspani.dev@gmail.com',
        to: email,
        subject: 'Account verification',
        html: `
        <a href=http://localhost:4000/api/verify/${uniqueString}>CLICK!</a>
        <h3> to confiirm! </h3>`
    }

    await transporter.sendMail(mailOptions, function(error, response){
        if (error){
            console.log(error);
        } else {
            console.log(`ckeck ${email} to confirm your account`);
        }
    })
}

module.exports = sendEmail