import * as z from "zod";

export const signUpSchema = z.object({
    fname : z.string()
    .min(2, 'First Name is too short')
    .max(40, 'First Name is too long')
    .regex(/^[a-zA-Z\s\-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
    
    lname : z.string()
    .min(2, 'Last Name is too short')
    .max(40, 'Last Name is too long')
    .regex(/^[a-zA-Z\s\-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
    
    email : z.email(),

    password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password is too long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

    phoneNo: z.string()
    .regex(/^\+?[\d\s\-\(\)]{7,20}$/, 'Please provide a valid phone number')
    .optional(),
});

export type SignUpInput = z.infer<typeof signUpSchema>;