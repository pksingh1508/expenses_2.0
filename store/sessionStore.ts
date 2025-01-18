import { create } from "zustand";

// Define the structure of the details to be added
interface AddDetailsProps {
  user_id: string;
  email: string;
  name: string;
}

// Define the shape of your session state
interface SessionProps {
  user_id: string;
  email: string;
  name: string;
  addDetails: (details: AddDetailsProps) => void; // Correctly typed parameter
  clearSession: () => void; // Added for logging out
}

// Create the Zustand store with persistence
export const useSessionStore = create<SessionProps>((set) => ({
  user_id: "",
  email: "",
  name: "",
  addDetails: ({ user_id, email, name }: AddDetailsProps) =>
    set({
      user_id,
      email,
      name
    }),
  clearSession: () =>
    set({
      user_id: "",
      email: "",
      name: ""
    })
}));
