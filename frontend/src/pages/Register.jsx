import Back from "../assets/svg/back.svg";
import User from "../assets/svg/user.svg";
import Mail from "../assets/svg/mail.svg";
import Lock from "../assets/svg/lock.svg";
import Lock2 from "../assets/svg/lock-waves.svg";

const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center relative">
      <a href="/" className="absolute top-4 left-2 cursor-pointer">
        <img src={Back} alt="back" />
      </a>{" "}
      <div className="flex flex-col w-full mx-10 lg:mx-0 lg:w-96">
        <p className="text-2xl font-semibold">Sign Up</p>
        <p className="text-base font-medium">Please sign up to continue</p>
        <form action="" className="flex flex-col gap-2 mt-6">
          <div className="relative">
            <img
              src={User}
              alt="mail"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="Username"
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
              placeholder="Confirm password"
              className="bg-white border border-grey-300 p-2.5 pl-10 rounded-xl placeholder:text-base placeholder:font-medium w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white p-2.5 mt-6 rounded-xl"
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
  );
}

export default Register;
