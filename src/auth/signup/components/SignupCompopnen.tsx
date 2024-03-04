interface SignupCompopnenProps {

}

export function SignupCompopnen({}:SignupCompopnenProps){
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <form class="w-full flex items-center justify-center p-2 gap-2">
      <div class="w-full flex items-center justify-center p-2 gap-2">
        <input
          name="email"
          type="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5"
        />
        <input
          name="username"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5"
        />
        <input
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
