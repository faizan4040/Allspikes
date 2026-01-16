import nodemailer from "nodemailer";

export const sendMail = async (subject, receiver, content) => {
    const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    })

    const mailOptions = {
        from: "BrandEmail <${process.env.NODEMAILER_EMAIL}>",
        to: receiver,
        subject: subject,
        html: content,
    }
    try {
        await transporter.sendMail(mailOptions);
        return {success: true, message: "Email sent successfully."};
    } 
    catch (error){
        return {success: false, message: error.message};
    }
}