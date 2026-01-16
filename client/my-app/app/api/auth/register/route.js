import connectDB from "../../../lib/databaseConnection";
import { SignJWT } from "jose";
import { zodSchema } from "../../../lib/zodSchema";
import { catchError, response } from "../../../lib/helperFunction";
import  UserModel  from "../../../../models/User.model";
import { sendMail } from "../../../lib/sendMail";
import { emailVerificationLink } from "../../../../email/emailVerificationLink";


export async function POST(request) {
    try {
        await connectDB();
        // validation schema
        const validationSchema = zodSchema.pick({
            name: true,
            email: true,
            password: true,
        })

        const payload = await request.json();

        const validatedData = validationSchema.safeParse(payload);
        
        if(!validatedData.success){
            return response(false, 400, 'Invalid or missing input field.', 
                validatedData.error)
        }

          const {name, email, password} = validatedData.data;

        //   check already registered user
          const checkUser = await UserModel.exists({email})
          if(checkUser){
            return response(false, 409, 'User already registered with this email.');
          }

          // new user creation

          const NewRegistration = new UserModel({
            name,
            email,
            password,
          })

          await NewRegistration.save();

         const secret = new TextEncoder().encode(process.env.SECRET_KEY);
         const token = await new SignJWT({ userId: NewRegistration._id })
         .setIssuedAt()
         .setExpirationTime("1h")
         .setProtectedHeader({ alg: "HS256" })
         .sign(secret);

         await sendMail(
            "Email verification request from Developer's Goswami",
            email, emailVerificationLink(`${process.env.SPORT_SHOES_WEBSITE_URL}/auth/verify-email/${token}`));


         return response(true, 200, 'Registration success, please verify your email address.', { token });

        } catch (error){
           catchError(error)
        }
}
