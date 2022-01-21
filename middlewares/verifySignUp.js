const Admin=require('../models/admin');


// function for check if email exist or not for admin

checkDuplicateAdminEmail = (req, res, next) => {
  
      // Email
      Admin.findOne({
        email: req.body.email
      }).exec((err, Admin) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (Admin) {
          res.status(400).send({ message: "Failed! Email is already in use!" });
          return;
        }
  
        next();
      });
    
  };

  const verifySignUp = {
    checkDuplicateAdminEmail  };
  