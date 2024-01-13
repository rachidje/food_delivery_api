// Send Email

import { ACCOUNT_SID, AUTH_TOKEN, PHONE_NUMBER } from "../config/twilio";


// Notifications

// OTP
export const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000)
    let otp_expiry = new Date();
    otp_expiry.setTime(new Date().getTime() + (30 * 60 * 1000))

    return {otp, otp_expiry}
}

export const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
    const client = require('twilio')(process.env.ACCOUNT_SID || ACCOUNT_SID, process.env.AUTH_TOKEN || AUTH_TOKEN)
    const response = await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: process.env.PHONE_NUMBER || PHONE_NUMBER,
        to: `+33${toPhoneNumber}`
    })

    return response;
}

// Payment notification or emails