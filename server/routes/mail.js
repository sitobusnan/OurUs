require('dotenv').config();

const nodemailer = require('nodemailer');
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Family = require("../models/Family");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
let userId = '';


let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAILUSER,
    pass: process.env.MAILPASS 
  }
});

router.post("/sendMail", (req, res) => {
  email =req.body.mail;
  token = req.body.token;
  // res.status(200).json({message: "TPM"})
  transporter.sendMail({
    from: '"Sito Porno Star 👻" <sito.ironhack@gmail.com>',
    to: email, 
    subject: `Invitation to ${email} Canguro Hippie`, 
    text: "Esquilame",
    html: `
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <title>
          
        </title>
        <!--[if !mso]><!-- -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
          #outlook a { padding:0; }
          .ReadMsgBody { width:100%; }
          .ExternalClass { width:100%; }
          .ExternalClass * { line-height:100%; }
          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
          p { display:block;margin:13px 0; }
        </style>
        <!--[if !mso]><!-->
        <style type="text/css">
          @media only screen and (max-width:480px) {
            @-ms-viewport { width:320px; }
            @viewport { width:320px; }
          }
        </style>
        <!--<![endif]-->
        <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <!--[if lte mso 11]>
        <style type="text/css">
          .outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
        
        
    <style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
      }
    </style>
    
  
        <style type="text/css">
        
        

    @media only screen and (max-width:480px) {
      table.full-width-mobile { width: 100% !important; }
      td.full-width-mobile { width: auto !important; }
    }
  
        </style>
        
      </head>
      <body style="background-color:#bedae6;">
        
        
      <div style="background-color:#bedae6;">
        
      
      <!--[if mso | IE]>
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    
      
      <div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;vertical-align:top;">
                <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
            
      <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
        <tbody>
          <tr>
            <td style="vertical-align:top;padding:0px;">
              
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
        
            <tr>
              <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
                
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
        <tbody>
          <tr>
            <td style="width:600px;">
              
      <img alt="header image" height="auto" src="https://i.ytimg.com/vi/WZj3ail_rIY/hqdefault.jpg" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="600">
    
            </td>
          </tr>
        </tbody>
      </table>
    
              </td>
            </tr>
          
      </table>
    
            </td>
          </tr>
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    
      
      <div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:0px;padding-bottom:20px;padding-top:10px;text-align:center;vertical-align:top;">
                <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
            
      <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
        <tbody>
          <tr>
            <td style="vertical-align:top;padding:0px;">
              
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
        
            <tr>
              <td align="center" vertical-align="middle" style="font-size:0px;padding:20px 0 0 0;word-break:break-word;">
                
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
        <tr>
          <td align="center" bgcolor="#dbdbdb" role="presentation" style="border:none;border-radius:3px;cursor:auto;padding:10px 25px;" valign="middle">
            <a href="http://localhost:3000/mail/confirm/${token}" style="background: #dbdbdb; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; line-height: 120%; Margin: 0; text-transform: none; text-decoration: none; color: inherit;" target="_blank">
              ESQUILAME JODERRR!!!
            </a>
          </td>
        </tr>
      </table>
    
              </td>
            </tr>
          
            <tr>
              <td align="center" style="font-size:0px;padding:0 25px;padding-top:40px;word-break:break-word;">
                
      <div style="font-family:Arial, sans-serif;font-size:14px;line-height:1;text-align:center;color:#000000;">
        <br>
      </div>
    
              </td>
            </tr>
          
      </table>
    
            </td>
          </tr>
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]>
            </td>
          
        </tr>
                  </table>
                <![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      <![endif]-->
    
    
      </div>
    
      </body>
    </html>
   `
    // html: `<b>http://localhost:3000/auth/confirm/${token}</b>`
  })
  .then(()=>console.log('todo bien'))
  .catch(error => console.log(error));
});


router.post("/confirm/:token", (req, res) => {
  let token = req.body.user.token;
  let rol = token.charAt(0);
  token = token.substring(1, token.length);
  if(rol === 'A'){
    rol = 'Admin'
  }else{
    rol = 'Nany'
  }
  
  Family.findOne({ token : token })
  .then((family)=> {
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(req.body.user.password, salt);

    const newUser = new User({
      username : req.body.user.username,
      password: hashPass,
      rol: rol,
      email: req.body.user.email,
      family: family.name,
      photo: "noProfile"
    })
    newUser.save()
    .then((user)=>{
      Family.findOneAndUpdate({token : token},{$push:{tutors:user._id}}, {new: true})
      .then((family)=>{
        res.status(200).json({user})

      })
    })
    .catch((err)=>console.log(err))

    
    
  })
  .catch((err)=> console.log(err))


})




module.exports = router;