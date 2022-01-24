// logout  for user

exports.signout = async (req, res) => {
    try {
      req.session = null;
      return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {

      logger.error(err.message);

    }
  };

  // function for send email 

  exports.sendEmail=async(password,email)=>{



    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testcoding975@gmail.com',
        pass: 'testCoding1998'
      }
    });    
    var mailOptions = {
      from: 'testcoding975@gmail.com',
      to: email,
      subject: 'Voila votre nouveau compte, avec le password',
      text:'Votre password est : '+  password
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (err) {
            return log('Error occurs');
        }
    });
  }