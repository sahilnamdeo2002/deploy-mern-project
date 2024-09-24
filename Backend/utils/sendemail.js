const nodeMailer=require("nodemailer");

const sendEmail=async(options)=>{
    const SMTP_SERVICE="gmail";
    const SMTP_MAIL="exampleemail476@gmail.com";
    const SMTP_PASSWORD="ibmn hffs tneg rdku";
    const SMTP_HOST="smtp.gmail.com";
    const SMTP_PORT=587;
    
    const transporter=nodeMailer.createTransport({
        
        host:SMTP_HOST,
        port:SMTP_PORT,
        service:SMTP_SERVICE,
        auth:{
            user:SMTP_MAIL,
            pass:SMTP_PASSWORD,
        },
    });
    
    const mailoptions={
        from:SMTP_SERVICE,
        to:options.email,
        subject:options.subject,
        text:options.message,
    };
 
    await transporter.sendMail(mailoptions);
};
module.exports=sendEmail;
