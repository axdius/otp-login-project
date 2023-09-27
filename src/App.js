import React from 'react';
import OTPInput from 'otp-input-react'
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import './App.css'
import { useState } from 'react';
import { auth }  from './firebase.config';
import { RecaptchaVerifier,signInWithPhoneNumber } from 'firebase/auth'
import { Toaster , toast } from 'react-hot-toast';



const App = () => {
  const [otp, setOtp] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [showOtp, setShowOtp] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(null)
 
  function onCaptchVerify() {
    if (!window.recaptchaVerifier){
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          onSignUp()
        },
        'expired-callback': () => {
          
        }
      });
    }
  }

  function onSignUp() {
    onCaptchVerify()
    const appVerifier = window.recaptchaVerifier

    const formatPh = '+' + phoneNo

    signInWithPhoneNumber(auth, formatPh, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setShowOtp(true)
      toast.success('OTP sent successfully')
    }).catch((error) => {
      console.log(error)
    });

  }

  function onOtpVerify() {
    window.confirmationResult.confirm(otp).then(async(res)=>{
      console.log(res)
      setLoginSuccess(res.user)
    }).catch((error) => {
      console.log(error)
    })
  }

  return <>
  <div>
  <Toaster toastOptions={{duration: 4000}} />
    <div id='recaptcha-container'></div>
    {loginSuccess ? (
      <div className="bg-container">
        <p className='success'>Login Success...</p>
        <h1 className="heading">Welcone to AdmitKard</h1>
        <p className="text">In order to provide you with a custom experience,<br/> <span className="span">we need to ask you a few questions.</span></p>
        <div className="button-container">
          <button className="button">Get Started</button>
          <p className="text-2" >This will only take 5 min.</p>
        </div>
      </div>
    ) : (
      <div>
  {showOtp ? (
    <div className="bg-container p-4">
      <h1 className="heading">Please varify mobile number</h1>
      <p className="text">A OTP is send to Phone No.</p>
      <div className="container">
        <label className='lable' htmlFor="otp">Enter OTP...</label>
        <OTPInput value={otp} onChange={setOtp} autoFocus OTPLength={6} otpType='number' disabled={false} />
      </div>
      <p className="text-2" >Didn't recive the code.  <span className="span">Resend</span></p>
      <button  onClick={onOtpVerify} className="button">
        <span>Verify OTP</span>
      </button>
    </div>
    ) : (
    <div className="bg-container">
      <div className="image-container">
        <img src="https://s3-alpha-sig.figma.com/img/7c57/0253/4c9a2bf05f0667bf6e8cbb07918363fd?Expires=1696809600&Signature=WB~4PQpyHYfEzY-YxSihM6HnJZfsvdRZmaNcwsH-SqmV0X1EOgkF1Zp2LPPhiP8CQEVyNO0A5JbjrKfjImi09JynqlK~0sKnt11eWaniO2k3i5iGXXJyR0QDhwz1e6Vpev6GRP2imRWHxc17u9YhYSYAN7NuzzEpcC75otOW03nBlNwcHm96uUa0YeJ0lWM6SjmC1ZM25AJnDAqRPX9uPBwwBhS5vMmMdDmRry~kdYTUE--YVMwkmsgvJAhLImghH36sNT8IUoB1-sqCv30~QKzcrYwVsoEDKvABYprK8iosdEUXHuCMvbdD00zKkvJ46uHELtAF47DDpkGWP1a8xg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" className="image" alt="Admit Card"/>
      </div>
      <div className="text-conatiner">
        <h1 className="heading">Welcome Back</h1>
        <p className="text">Please sing in to your account</p>
      </div>
      <div className="input-container">
        <lable className='lable'>Enter Phone No...</lable>
        <PhoneInput country={"in"} value={phoneNo} onChange={setPhoneNo}/>
      </div>
      <div className="description-container">
        <p className="text-2">We will send you a one time SMS message.</p>
        <p className="text-2" >Charges may apply</p>
      </div>
      <div className="button-container" >
        <button onClick={onSignUp} className="button">Sent OTP</button>
      </div>
    </div>
  )}
  
  </div>
    )}
  </div>
</>
}

export default App;
