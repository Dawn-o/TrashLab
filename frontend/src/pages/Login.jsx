function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col w-full mx-10 lg:mx-0 lg:w-96">
        <p className="text-2xl font-semibold">Sign In</p>
        <p className="text-base font-medium">Please sign in to continue</p>
        <form action="" className="flex flex-col gap-4 mt-8">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              width="14"
              height="11"
              viewBox="0 0 14 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.10938 0C1.54993 0 1.01341 0.222237 0.617822 0.617822C0.222237 1.01341 0 1.54993 0 2.10938V8.20312C0 8.76257 0.222237 9.29909 0.617822 9.69468C1.01341 10.0903 1.54993 10.3125 2.10938 10.3125H11.0156C11.5751 10.3125 12.1116 10.0903 12.5072 9.69468C12.9028 9.29909 13.125 8.76257 13.125 8.20312V2.10938C13.125 1.54993 12.9028 1.01341 12.5072 0.617822C12.1116 0.222237 11.5751 0 11.0156 0H2.10938ZM12.1875 2.53266L6.5625 5.56125L0.9375 2.53266V2.10938C0.9375 1.79857 1.06097 1.5005 1.28073 1.28073C1.5005 1.06097 1.79857 0.9375 2.10938 0.9375H11.0156C11.3264 0.9375 11.6245 1.06097 11.8443 1.28073C12.064 1.5005 12.1875 1.79857 12.1875 2.10938V2.53266ZM0.9375 3.59719L6.34031 6.50672C6.4086 6.54348 6.48494 6.56272 6.5625 6.56272C6.64006 6.56272 6.7164 6.54348 6.78469 6.50672L12.1875 3.59719V8.20312C12.1875 8.51393 12.064 8.812 11.8443 9.03177C11.6245 9.25153 11.3264 9.375 11.0156 9.375H2.10938C1.79857 9.375 1.5005 9.25153 1.28073 9.03177C1.06097 8.812 0.9375 8.51393 0.9375 8.20312V3.59719Z"
                fill="#68A36F"
              />
            </svg>
            <input
              type="text"
              placeholder="E-mail address"
              className="bg-white border border-grey-300 p-2.5 pl-10 rounded-xl placeholder:text-base placeholder:font-medium w-full"
            />
          </div>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 6.25V5C5 3.27438 5.77438 1.875 7.5 1.875C8.80875 1.875 9.57062 2.68 9.8625 3.82125M7.5 9.84375V9.53125M10 9.84375V9.53125M5 9.84375V9.53125M2.1875 11.125V8.25C2.1875 7.55 2.1875 7.2 2.32375 6.93313C2.44348 6.6977 2.63471 6.50625 2.87 6.38625C3.1375 6.25063 3.4875 6.25063 4.1875 6.25063H10.8125C11.5125 6.25063 11.8625 6.25063 12.13 6.38625C12.3652 6.50609 12.5564 6.69731 12.6762 6.9325C12.8125 7.2 12.8125 7.55 12.8125 8.25V11.125C12.8125 11.825 12.8125 12.175 12.6762 12.4425C12.5564 12.6777 12.3652 12.8689 12.13 12.9887C11.8625 13.125 11.5125 13.125 10.8125 13.125H4.1875C3.4875 13.125 3.1375 13.125 2.87 12.9887C2.63481 12.8689 2.44359 12.6777 2.32375 12.4425C2.1875 12.1756 2.1875 11.8256 2.1875 11.125Z"
                stroke="#68A36F"
                stroke-width="0.9375"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
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
