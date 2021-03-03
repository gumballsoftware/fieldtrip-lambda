'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION || 'us-east-1' })


const sendSMS = async function (params) {
	const pinpoint = new AWS.Pinpoint()
	console.log('sendSMS called: ', params)

	return new Promise((resolve, reject) => {
		pinpoint.sendMessages(params, function(err, data) {
			if(err) {
				console.error(err)
				reject(err)
			} else {
				console.log("Message sent. Data: ", data)
				resolve(data)
			}
		})
	})
}

const receiveSMS = async (event) => {

    const msg = JSON.parse(event.Sns.Message);
    const tn = msg.originationNumber;

    // use the tn to figure out what is expected in msg.
    return smsReceivePIN(tn, msg);
}

const smsReceivePIN = async (tn, msg) => {

    const msgWords = msg.messageBody.split(" ");
    const pin = msgWords[0];

    const message = 'mobile number: ' + tn;
    console.log(message);

	// Send the SMS response
	const params = {
		ApplicationId: process.env.ApplicationId,
		MessageRequest: {
			Addresses: {
				[msg.originationNumber]: {
					ChannelType: 'SMS'
				}
			},
			MessageConfiguration: {
				SMSMessage: {
					Body: message,
					MessageType: 'PROMOTIONAL',
					OriginationNumber: msg.destinationNumber
				}
			}
		}
	}

	return sendSMS(params)
}

module.exports = { receiveSMS }

