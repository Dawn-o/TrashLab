import Back from "../assets/svg/back.svg";
import Mail from "../assets/svg/mail.svg";
import Lock from "../assets/svg/lock.svg";
import axios from '../api/AxiosInstance.jsx';
import { useState } from "react";
import { loginUser } from "../services/apiServices.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", {
        email,
        password
      });

      const token = response.data.token;
      const user = response.data.user;

      localStorage.setItem('authToken', token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log('Login berhasil! Token: ', token);
      window.location.href = '/home';
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Server mati apa gimana nih? 😅');
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center relative">
      <a href="/" className="absolute top-4 left-2 cursor-pointer">
        <img src={Back} alt="back" />
      </a>
      <div className="flex flex-col w-full mx-10 lg:mx-0 lg:w-96">
        <p className="text-2xl font-semibold">Sign In</p>
        <p className="text-base font-medium">Please sign in to continue</p>
        <form action="" onSubmit={handleLogin} className="flex flex-col gap-2 mt-6">
          <div className="relative">
            <img
              src={Mail}
              alt="mail"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border border-grey-300 p-2.5 pl-10 rounded-xl placeholder:text-base placeholder:font-medium w-full"
            />
          </div>
          <div className="relative">
            <img
              src={Lock}
              alt="lock"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white border border-grey-300 p-2.5 pl-10 rounded-xl placeholder:text-base placeholder:font-medium w-full"
            />
          </div>
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
          <button
            type="submit"
            className="bg-primary text-white p-2.5 mt-6 rounded-xl"
          >
            Sign In
          </button>

          <div className="flex flex-col-reverse gap-2 fixed bottom-4 right-4">

            <div className="flex px-4 justify-start items-center border-l-4 bg-[#dc2626] py-2 border-[#b91c1c]">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_266_2123)">
                  <path d="M16 32C20.2435 32 24.3131 30.3143 27.3137 27.3137C30.3143 24.3131 32 20.2435 32 16C32 11.7565 30.3143 7.68687 27.3137 4.68629C24.3131 1.68571 20.2435 0 16 0C11.7565 0 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 0 11.7565 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C7.68687 30.3143 11.7565 32 16 32ZM16 8C16.8312 8 17.5 8.66875 17.5 9.5V16.5C17.5 17.3312 16.8312 18 16 18C15.1687 18 14.5 17.3312 14.5 16.5V9.5C14.5 8.66875 15.1687 8 16 8ZM14 22C14 21.4696 14.2107 20.9609 14.5858 20.5858C14.9609 20.2107 15.4696 20 16 20C16.5304 20 17.0391 20.2107 17.4142 20.5858C17.7893 20.9609 18 21.4696 18 22C18 22.5304 17.7893 23.0391 17.4142 23.4142C17.0391 23.7893 16.5304 24 16 24C15.4696 24 14.9609 23.7893 14.5858 23.4142C14.2107 23.0391 14 22.5304 14 22Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_266_2123">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div className="flex flex-col gap-1">
                <p className="text-white text-[17px] font-medium ml-4">Peringatan</p>
                <p className="text-white text-[15px] font-normal ml-4">Mohon lakukan log in terlebih dahulu!</p>
              </div>
            </div>

            <div className="flex px-4 justify-start items-center border-l-4 bg-secondary py-2 border-primary">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_266_2123)">
                  <path d="M16 32C20.2435 32 24.3131 30.3143 27.3137 27.3137C30.3143 24.3131 32 20.2435 32 16C32 11.7565 30.3143 7.68687 27.3137 4.68629C24.3131 1.68571 20.2435 0 16 0C11.7565 0 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 0 11.7565 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C7.68687 30.3143 11.7565 32 16 32ZM16 8C16.8312 8 17.5 8.66875 17.5 9.5V16.5C17.5 17.3312 16.8312 18 16 18C15.1687 18 14.5 17.3312 14.5 16.5V9.5C14.5 8.66875 15.1687 8 16 8ZM14 22C14 21.4696 14.2107 20.9609 14.5858 20.5858C14.9609 20.2107 15.4696 20 16 20C16.5304 20 17.0391 20.2107 17.4142 20.5858C17.7893 20.9609 18 21.4696 18 22C18 22.5304 17.7893 23.0391 17.4142 23.4142C17.0391 23.7893 16.5304 24 16 24C15.4696 24 14.9609 23.7893 14.5858 23.4142C14.2107 23.0391 14 22.5304 14 22Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_266_2123">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div className="flex flex-col gap-1">
                <p className="text-white text-[17px] font-medium ml-4">Sign in berhasil</p>
                <p className="text-white text-[15px] font-normal ml-4">Anda telah berhasil Sign in!</p>
              </div>
            </div>

            <div className="flex px-4 justify-start items-center border-l-4 bg-secondary py-2 border-primary">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_266_2123)">
                  <path d="M16 32C20.2435 32 24.3131 30.3143 27.3137 27.3137C30.3143 24.3131 32 20.2435 32 16C32 11.7565 30.3143 7.68687 27.3137 4.68629C24.3131 1.68571 20.2435 0 16 0C11.7565 0 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 0 11.7565 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C7.68687 30.3143 11.7565 32 16 32ZM16 8C16.8312 8 17.5 8.66875 17.5 9.5V16.5C17.5 17.3312 16.8312 18 16 18C15.1687 18 14.5 17.3312 14.5 16.5V9.5C14.5 8.66875 15.1687 8 16 8ZM14 22C14 21.4696 14.2107 20.9609 14.5858 20.5858C14.9609 20.2107 15.4696 20 16 20C16.5304 20 17.0391 20.2107 17.4142 20.5858C17.7893 20.9609 18 21.4696 18 22C18 22.5304 17.7893 23.0391 17.4142 23.4142C17.0391 23.7893 16.5304 24 16 24C15.4696 24 14.9609 23.7893 14.5858 23.4142C14.2107 23.0391 14 22.5304 14 22Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_266_2123">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div className="flex flex-col gap-1">
                <p className="text-white text-[17px] font-medium ml-4">Signed out berhasil</p>
                <p className="text-white text-[15px] font-normal ml-4">Anda telah signed out!</p>
              </div>
            </div>

            <div className="flex px-4 justify-start items-center border-l-4 bg-secondary py-2 border-primary">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_266_2123)">
                  <path d="M16 32C20.2435 32 24.3131 30.3143 27.3137 27.3137C30.3143 24.3131 32 20.2435 32 16C32 11.7565 30.3143 7.68687 27.3137 4.68629C24.3131 1.68571 20.2435 0 16 0C11.7565 0 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 0 11.7565 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C7.68687 30.3143 11.7565 32 16 32ZM16 8C16.8312 8 17.5 8.66875 17.5 9.5V16.5C17.5 17.3312 16.8312 18 16 18C15.1687 18 14.5 17.3312 14.5 16.5V9.5C14.5 8.66875 15.1687 8 16 8ZM14 22C14 21.4696 14.2107 20.9609 14.5858 20.5858C14.9609 20.2107 15.4696 20 16 20C16.5304 20 17.0391 20.2107 17.4142 20.5858C17.7893 20.9609 18 21.4696 18 22C18 22.5304 17.7893 23.0391 17.4142 23.4142C17.0391 23.7893 16.5304 24 16 24C15.4696 24 14.9609 23.7893 14.5858 23.4142C14.2107 23.0391 14 22.5304 14 22Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_266_2123">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div className="flex flex-col gap-1">
                <p className="text-white text-[17px] font-medium ml-4">Sign up berhasil</p>
                <p className="text-white text-[15px] font-normal ml-4">Anda telah berhasil Sign up!</p>
              </div>
            </div>

          </div>

          <div className="flex gap-2 text-base font-medium items-center justify-center mt-4">
            <p>Haven't signed up yet?</p>
            <a
              href="/register"
              className="text-primary text-base font-medium no-underline"
            >
              Sign up here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
