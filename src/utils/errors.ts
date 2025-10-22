import { FirebaseError } from "firebase/app";

export function formatError(error: unknown): string {
  if (error instanceof FirebaseError) {
    const errors: { [key: string]: string } = {
      "auth/network-request-failed":
        "Please check your connection and try again.",
      "auth/email-already-in-use": "This email address is already in use.",
      "auth/invalid-credential": "Invalid Credentials.",
    };
    return errors[error.code] ?? "An unknown error occurred.";
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return `${error}`;
  }
}
