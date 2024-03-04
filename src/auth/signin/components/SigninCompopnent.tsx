interface SigninCompopnentProps {}

export function SigninCompopnent({}: SigninCompopnentProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <form
        action="/auth/test"
        method="POST"
        class="w-[95%] md:w-[60%] lg:w-[50%] flex flex-col items-center justify-center p-2 gap-2">
        <div class="w-full flex flex-col">
          <label for="emailOrUsername">Email or Username</label>
          <input
            placeholder="email or username"
            name="emailOrUsername"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5"
          />
        </div>
        <div class="w-full flex flex-col">
          <label for="password">Password</label>
          <input
            placeholder="password"
            name="password"
            type="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5"
          />
        </div>

        <button
          class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2 text-center"
          type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
