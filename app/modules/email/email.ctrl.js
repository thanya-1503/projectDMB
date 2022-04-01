
'use strict';
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

exports.sentemail = async function (req, res) {
  const password = '123456'
  const username = req.body.username
  const Html = sentemailHtml(password,username);
  const transporter = nodemailer.createTransport(smtpTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: "noreply.destinyMyBoo@gmail.com",
      pass: "nun123456", 
    },
    tls: {
        rejectUnauthorized: false
        }
  }));
  let mailOptions = {
    from: 'noreply.destinyMyBoo@gmail.com',         
    to: `${username}`,           
    subject: 'รหัสผ่านเข้าสู่ระบบ Destiny My Boo ของคุณ',             
    html: Html
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      console.log(err)
      res.end("error")
    } 
    else
    
      console.log(info);
 });
}



exports.sentemailOtp = async function (req, res)  {
  const username = req.body.username
  const otp = req.body.otp
  const htmlTemplete = resetpasswoedHtml(otp);
  const transporter = nodemailer.createTransport(smtpTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: "noreply.destinyMyBoo@gmail.com",
      pass: "nun123456", 
    },
    tls: {
        rejectUnauthorized: false
        }
  }));
  let mailOptions = {
    from: 'noreply.destinyMyBoo@gmail.com',         
    to: `${username}`,      
    subject: 'Forgot Password',              
    html:  htmlTemplete 
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      console.log(err)
      res.end("error")
    } 
    else
      console.log(info);
 });
};

const resetpasswoedHtml = function(data) {
  return `
  <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="date=no" />
    <meta name="format-detection" content="address=no" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Muli:400,400i,700,700i" rel="stylesheet" />
    <!--<![endif]-->
    <title>Email Template</title>
    <!--[if gte mso 9]>
    <style type="text/css" media="all">
      sup { font-size: 100% !important; }
    </style>
    <![endif]-->
  
  
    <style type="text/css" media="screen">
      /* Linked Styles */
      body {
        padding: 0 !important;
        margin: 0 !important;
        display: block !important;
        min-width: 100% !important;
        width: 100% !important;
        background: #e0e0e0;
        -webkit-text-size-adjust: none
      }
  
      a {
        color: #66c7ff;
        text-decoration: none
      }
  
      p {
        padding: 0 !important;
        margin: 0 !important
      }
  
      img {
        -ms-interpolation-mode: bicubic;
        /* Allow smoother rendering of resized image in Internet Explorer */
      }
  
      .mcnPreviewText {
        display: none !important;
      }
  
  
      /* Mobile styles */
      @media only screen and (max-device-width: 480px),
      only screen and (max-width: 480px) {
        .mobile-shell {
          width: 100% !important;
          min-width: 100% !important;
        }
  
        .bg {
          background-size: 100% auto !important;
          -webkit-background-size: 100% auto !important;
        }
  
        .text-header,
        .m-center {
          text-align: center !important;
        }
  
        .center {
          margin: 0 auto !important;
        }
  
        .container {
          padding: 20px 10px !important
        }
  
        .td {
          width: 100% !important;
          min-width: 100% !important;
        }
  
        .m-br-15 {
          height: 15px !important;
        }
  
        .p30-15 {
          padding: 30px 15px !important;
        }
  
        .m-td,
        .m-hide {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          font-size: 0 !important;
          line-height: 0 !important;
          min-height: 0 !important;
        }
  
        .m-block {
          display: block !important;
        }
  
        .fluid-img img {
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
        }
  
        .column,
        .column-top,
        .column-empty,
        .column-empty2,
        .column-dir-top {
          float: left !important;
          width: 100% !important;
          display: block !important;
        }
  
        .column-empty {
          padding-bottom: 10px !important;
        }
  
        .column-empty2 {
          padding-bottom: 30px !important;
        }
  
        .content-spacing {
          width: 15px !important;
        }
      }
    </style>
  </head>
  
  <body class="body"
    style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#e0e0e0; -webkit-text-size-adjust:none;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#e0e0e0">
      <tr>
        <td align="center" valign="top">
          <table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
            <tr>
              <td class="td container"
                style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:55px 0px;">
  
  
                <!-- Intro -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding-bottom: 10px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td class="tbrr p30-15"
                            style="padding: 60px 30px; border-radius:26px 26px 0px 0px;"
                            bgcolor="#ffffff">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td class="h1 pb25"
                                  style="color:#000000; font-family:'Muli', Arial,sans-serif; font-size:40px; line-height:46px; text-align:center; padding-bottom:25px;">
                                  Reset Password</td>
                              </tr>
                              <tr>
                                <td class="h1 pb25"
                                  style="text-align:center; padding-bottom:25px;">
                                  <img width="150" height="150" src="https://pics.freeicons.io/uploads/icons/png/1337705811557740359-512.png">
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center pb25"
                                  style="color:#000000; font-family:'Muli', Arial,sans-serif; font-size:16px; line-height:30px; text-align:center; padding-bottom:25px;">
                                  OTP สำหรับการตั้งค่ารหัสผ่านใหม่ของคุณคือ <b>${data}</b></span>
                                </td>
                              </tr>
                              <!-- Button -->
                              <tr>
                                <td align="center">
                                  <table class="center" border="0" cellspacing="0"
                                    cellpadding="0" style="text-align:center;">
                                   
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <!-- END Button -->
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <!-- END Intro -->
  
               </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}


const sentemailHtml = function(pass,user) {
  return `
  <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="date=no" />
    <meta name="format-detection" content="address=no" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Muli:400,400i,700,700i" rel="stylesheet" />
    <!--<![endif]-->
    <title>Email Template</title>
    <!--[if gte mso 9]>
    <style type="text/css" media="all">
      sup { font-size: 100% !important; }
    </style>
    <![endif]-->
  
  
    <style type="text/css" media="screen">
      /* Linked Styles */
      body {
        padding: 0 !important;
        margin: 0 !important;
        display: block !important;
        min-width: 100% !important;
        width: 100% !important;
        background: #e0e0e0;
        -webkit-text-size-adjust: none
      }
  
      a {
        color: #66c7ff;
        text-decoration: none
      }
  
      p {
        padding: 0 !important;
        margin: 0 !important
      }
  
      img {
        -ms-interpolation-mode: bicubic;
        /* Allow smoother rendering of resized image in Internet Explorer */
      }
  
      .mcnPreviewText {
        display: none !important;
      }
  
  
      /* Mobile styles */
      @media only screen and (max-device-width: 480px),
      only screen and (max-width: 480px) {
        .mobile-shell {
          width: 100% !important;
          min-width: 100% !important;
        }
  
        .bg {
          background-size: 100% auto !important;
          -webkit-background-size: 100% auto !important;
        }
  
        .text-header,
        .m-center {
          text-align: center !important;
        }
  
        .center {
          margin: 0 auto !important;
        }
  
        .container {
          padding: 20px 10px !important
        }
  
        .td {
          width: 100% !important;
          min-width: 100% !important;
        }
  
        .m-br-15 {
          height: 15px !important;
        }
  
        .p30-15 {
          padding: 30px 15px !important;
        }
  
        .m-td,
        .m-hide {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          font-size: 0 !important;
          line-height: 0 !important;
          min-height: 0 !important;
        }
  
        .m-block {
          display: block !important;
        }
  
        .fluid-img img {
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
        }
  
        .column,
        .column-top,
        .column-empty,
        .column-empty2,
        .column-dir-top {
          float: left !important;
          width: 100% !important;
          display: block !important;
        }
  
        .column-empty {
          padding-bottom: 10px !important;
        }
  
        .column-empty2 {
          padding-bottom: 30px !important;
        }
  
        .content-spacing {
          width: 15px !important;
        }
      }
    </style>
  </head>
  
  <body class="body"
    style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#e0e0e0; -webkit-text-size-adjust:none;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#e0e0e0">
      <tr>
        <td align="center" valign="top">
          <table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
            <tr>
              <td class="td container"
                style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:55px 0px;">
  
  
                <!-- Intro -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding-bottom: 10px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td class="tbrr p30-15"
                            style="padding: 60px 30px; border-radius:26px 26px 0px 0px;"
                            bgcolor="#ffffff">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td class="h1 pb25"
                                  style="color:#000000; font-family:'Muli', Arial,sans-serif; font-size:40px; line-height:46px; text-align:center; padding-bottom:25px;">
                                  Destiny My Boo</td>
                              </tr>
                              <tr>
                                <td class="h1 pb25"
                                  style="text-align:center; padding-bottom:25px;">
                                  <img width="150" height="150" src="https://pics.freeicons.io/uploads/icons/png/1811517341549346208-512.png">
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center pb25"
                                  style="color:#000000; font-family:'Muli', Arial,sans-serif; font-size:16px; line-height:30px; text-align:center; padding-bottom:25px;">
                                  คุณได้ลงทะเบียน ${user} เป็น ADMIN รหัสผ่านของคุณคือ ${pass}</span>
                                </td>
                              </tr>
                              <!-- Button -->
                              <tr>
                                <td align="center">
                                  <table class="center" border="0" cellspacing="0"
                                    cellpadding="0" style="text-align:center;">
                                   
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <!-- END Button -->
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <!-- END Intro -->
  
             
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}
