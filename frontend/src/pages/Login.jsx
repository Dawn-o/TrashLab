import Back from "../assets/svg/back.svg";
import Mail from "../assets/svg/mail.svg";
import Lock from "../assets/svg/lock.svg";

function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center relative">
      <a href="/" className="absolute top-4 left-2 cursor-pointer">
        <img src={Back} alt="back" />
      </a>
      <div className="flex flex-col w-full mx-10 lg:mx-0 lg:w-96">
        <p className="text-2xl font-semibold">Sign In</p>
        <p className="text-base font-medium">Please sign in to continue</p>
        <form action="" className="flex flex-col gap-2 mt-6">
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
          <button
            type="submit"
            className="bg-primary text-white p-2.5 mt-6 rounded-xl"
          >
            Sign In
          </button>
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
}

export default Login;
