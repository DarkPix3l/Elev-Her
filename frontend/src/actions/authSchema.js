import { z } from "zod";
import { addYears, isBefore } from "date-fns";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const minAge = 16;
const minBirthDateAllowed = addYears(new Date(), -minAge);

export const signupSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .nonempty({ message: "Email is required." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .nonempty({ message: "Password is required." }),
  birthDate: z
    .date({
      required_error: "Date of birth is required.",
    })
    .refine(
      (date) => {
        // If date is undefined (e.g., if required_error handles it), just pass
        if (!date) return true;
        // Check if the selected date is BEFORE the minBirthDateAllowed
        return isBefore(date, minBirthDateAllowed);
      },
      {
        message: `You must be at least ${minAge} years old.`,
      }
    ),

  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(20, { message: "Username must be at most 20 characters." })
    .nonempty({ message: "Username is required." }),
});
