var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'spalvinmuthesh@gmail.com',         //email ID
        pass: 'paflyzsjvfixizup'              //Password 
    }
});

function sendMail(email, password) {
    var details = {
        from: 'noreply@kai.com',
        to: email,
        subject: 'Your New Password is ' + password,
        html: ''
    };


    transporter.sendMail(details, function (error, data) {
        if (error)
            console.log(error)
        else
            console.log(data)
    });
}

function sendMessages(email, code) {
    var details = {
        from: 'noreply@kai.com',
        to: email,
        subject: 'New Coupon Code !!!',
        html: '',
        text: 'Your Coupon Code is ' + code
    };


    transporter.sendMail(details, function (error, data) {
        if (error)
            console.log(error)
        else
            console.log(data)
    });
}

function findDistance(lat1, lon1, lat2, lon2, unit = "K") {
    console.log(lat1, lon1, " AND ", lat2, lon2);
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}

module.exports = {
    sendMail,
    findDistance,
    sendMessages
}