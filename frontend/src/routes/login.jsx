import React from 'react'
import styled from 'styled-components'
import { loginUtil } from '../utils/auth'
import { LoaderContext } from '../providers/fullLoader.provider'


const Component = styled.div`
.social-login img {
    width: 24px;
  }
  a {
    text-decoration: none;
  }
  
  .card {
    font-family: sans-serif;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 3em;
    margin-bottom:3em;
    border-radius: 10px;
    background-color: #ffff;
    padding: 1.8rem;
    box-shadow: 2px 5px 20px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    text-align: center;
    font-weight: bold;
    margin: 0;
  }
  .subtitle {
    text-align: center;
    font-weight: bold;
  }
  .btn-text {
    margin: 0;
  }
  
  .social-login {
    display: flex;
    justify-content: center;
    gap: 5px;
  }
  
  .google-btn {
    background: #fff;
    border: solid 2px rgb(245 239 239);
    border-radius: 8px;
    font-weight: bold;
    display: flex;
    padding: 10px 10px;
    flex: auto;
    align-items: center;
    gap: 5px;
    justify-content: center;
    margin-top:30px;
  }
  .fb-btn {
    background: #fff;
    border: solid 2px rgb(69, 69, 185);
    border-radius: 8px;
    padding: 10px;
    display: flex;
    align-items: center;
  }
  
  .or {
    text-align: center;
    font-weight: bold;
    border-bottom: 2px solid rgb(245 239 239);
    line-height: 0.1em;
    margin: 25px 0;
  }
  .or span {
    background: #fff;
    padding: 0 10px;
  }
  
  .email-login {
    display: flex;
    flex-direction: column;
  }
  .email-login label {
    color: rgb(170 166 166);
  }
 
  
  input[type="text"],
  input[type="password"] {
    padding: 15px 20px;
    margin-top: 8px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
    width: -webkit-fill-available;
    height: 40px;
  }
  
  .cta-btn {
    background-color: rgb(69, 69, 185);
    color: white;
    padding: 18px 20px;
    margin-top: 10px;
    margin-bottom: 20px;
    width: 100%;
    border-radius: 10px;
    border: none;
  }
  
  .forget-pass {
    text-align: center;
    display: block;
  }

  button{
    width: -webkit-fill-available;
    height: 40px;
  }
`

export default function Login() {


  const { setLoader } = LoaderContext()

  const handleLoginCall = async (email, password) => {
    await loginUtil(email, password)
  }

  return (
    <Component>
      <div class="card">
        <form onSubmit={async event => {
          event.preventDefault()
          //request for twitter token
          setLoader(true)
          event.preventDefault();
          const email = event.target.email.value
          const password = event.target.password.value
          await handleLoginCall(email, password)
          setLoader(false)


        }}>
          <h2 class="title"> Log in</h2>


          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />

          <button class="google-btn"   >
            <p class="btn-text">Sign in </p>
          </button>



        </form>
      </div>
    </Component>
  )
}