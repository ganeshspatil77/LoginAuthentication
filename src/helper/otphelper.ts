const generateOTP = () =>{
    const otpLength = 6;
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp
}

export { generateOTP }