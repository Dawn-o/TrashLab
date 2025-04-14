import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Back from "../assets/svg/back.svg";
import User from "../assets/svg/user.svg";
import Mail from "../assets/svg/mail.svg";
import Lock from "../assets/svg/lock.svg";
import Lock2 from "../assets/svg/lock-waves.svg";
import AuthLayout from "../layouts/AuthLayout.jsx";
import { RegisterUser } from '../services/apiServices.jsx';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [, setErrorMsg] = useState("");

  const [notifSlug, setNotifSlug] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    // Ambil query param notif
    const params = new URLSearchParams(location.search);
    const notif = params.get("notif");
    if (notif) {
      setNotifSlug(notif);

      // Hapus query param biar gak muncul pas reload
      params.delete("notif");
      navigate({
        pathname: location.pathname,
        search: params.toString()
      }, { replace: true });
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const response = await RegisterUser(name, email, password, rePassword);
  
      // Cek manual kalau ada user dan email di response
      if (response && response.user && response.user.email) {
        window.location.href = '/login?notif=success-sign-up';
      } else {
        // Kalau ternyata response gak lengkap / aneh
        setErrorMsg("Registrasi gagal, data tidak lengkap!");
        console.error("Invalid response from server:", response);
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
        setErrorMsg(error.response.data.message || "Registrasi gagal.");
        
      } else {
        console.error("Network/server error:", error);
        setErrorMsg("Server error atau tidak bisa dihubungi.");
        window.location.href = '/register?notif=failed-server';
      }
    }
  }

  return (
    <AuthLayout notifSlug={notifSlug}>
      <div className="flex min-h-screen items-center justify-center relative">
        <div className="flex flex-col w-full mx-10 lg:mx-0 lg:w-96">
          <p className="text-2xl font-semibold">Sign Up</p>
          <p className="text-base font-medium">Please sign up to continue</p>
          <form action="" onSubmit={handleRegister} className="flex flex-col gap-2 mt-6">
            <div className="relative">
              <img
                src={User}
                alt="mail"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white border border-grey-300 p-2.5 pl-10 rounded-xl placeholder:text-base placeholder:font-medium w-full"
              />
            </div>
            <div className="relative">
              <img
                src={Mail}
                alt="mail"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail address"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-white border border-grey-300 p-2.5 pl-10 rounded-xl placeholder:text-base placeholder:font-medium w-full"
              />
            </div>
            <div className="relative">
              <img
                src={Lock2}
                alt="lock"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                placeholder="Confirm password"
                className="bg-white border border-grey-300 p-2.5 pl-10 rounded-xl placeholder:text-base placeholder:font-medium w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-primary cursor-pointer text-white p-2.5 mt-6 rounded-xl"
            >
              Sign Up
            </button>
            <div className="flex gap-2 text-base font-medium items-center justify-center mt-4">
              <p>Already have an account?</p>
              <a
                href="/login"
                className="text-primary text-base font-medium no-underline"
              >
                Click here
              </a>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Register;
