import z from "zod";
export const Userschema = new z.object({
    Name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
    }).min(3).max(50),
    Email: z.string({
        required_error: "E-mail is required",
        invalid_type_error: "E-mail is not valid"
    }).email(),
    Password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password in not valid"
    }).min(8, 'The password must be at least 8 characters long')
        .max(32, 'The password must be a maximun 32 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A- Za-z\d!@#$%&*-]{8,}$/),
    picturePath: z.string(),
    university: z.string(),
    signaturPath: z.string(),
    languagepreffered: z.string().array().nonempty({
        message: "Can't be empty!",
    }),
    resumepath: z.string(),
    specialist: z.string(),
    cityname: z.string(),
})