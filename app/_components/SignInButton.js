import { signInAction } from "../_lib/actions";

function SignInButton() {
  // We create a server aciton to add interactivity also to server components, and usually to forms. And again, once the button will be clicked, then the form will automatically get submitted. And what will happen once that submission is happening is what we pass into the action prop here. So here we can now pass in a special function which is called a server action.
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <img src="https://authjs.dev/img/providers/google.svg" alt="Google logo" height="24" width="24" />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
