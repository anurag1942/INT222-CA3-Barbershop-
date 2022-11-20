const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const Shop = mongoose.model("Shop");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require("bcrypt");



router.post('/signup', async (req, res) => {
    const { email, phone, address, pincode, password } = req.body;
    if (!email || !password || !phone || !address || !pincode) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    else {
        const user = new User({
            email,
            password,
            phone,
            address,
            pincode
        })

        try {
            await user.save();
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            return res.status(200).json({ message: "User Registered Successfully", token });

        }
        catch (err) {
            console.log(err);
            return res.status(422).json({ error: "User Not Registered" });
        }
    }
})



// forgot password


router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    else {
        User.findOne({ email: email })
            .then(savedUser => {
                if (!savedUser) {
                    return res.status(422).json({ error: "Invalid Credentials" });
                }
                else {
                    console.log(savedUser);
                    bcrypt.compare(password, savedUser.password)
                        .then(
                            doMatch => {
                                if (doMatch) {
                                    const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);

                                    const { _id, username, email } = savedUser;
                                    res.cookie("jwt", token, {
                                        expires: new Date(Date.now() + 2592000000),
                                    })
                                    res.json({ message: "Successfully Signed In", token, user: { _id, username, email } });
                                }
                                else {
                                    return res.status(422).json({ error: "Invalid Credentials" });
                                }
                            }
                        )
                    // res.status(200).json({ message: "User Logged In Successfully", savedUser });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
})




router.post('/userdata', (req, res) => {
    const { authorization } = req.headers;
    //    authorization = "Bearer afasgsdgsdgdafas"
    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in, token not given" });
    }
    const token = authorization.replace("Bearer ", "");
    console.log(token);

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must be logged in, token invalid" });
        }
        const { _id } = payload;
        User.findById(_id).then(userdata => {
            res.status(200).send({
                message: "User Found",
                user: {
                    _id: userdata._id,
                    email: userdata.email,
                    phone: userdata.phone,
                    address: userdata.address,
                    pincode: userdata.pincode,
                }
            });
        })

    })
})

router.post('/addshop', (req, res) => {
    const { shopname, shopaddress, shoppincode, shopphone, shopemail, shopdescription, shopimage, shopowner } = req.body;
    if (!shopname || !shopaddress || !shoppincode || !shopphone || !shopemail || !shopdescription || !shopimage || !shopowner) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    else {
        const shop = new Shop({
            shopname,
            shopaddress,
            shoppincode,
            shopphone,
            shopemail,
            shopdescription,
            shopimage,
            shopowner
        })
        shop.save()
            .then(result => {
                console.log(result);
                res.status(200).json({ message: "Shop Added Successfully", result });
            })
            .catch(err => {
                console.log(err);
            })
    }
})

router.get ('/getallshops', (req, res) => {
    Shop.find()
        .then(shop => {
            res.status(200).json({ message: "All Shops", shop });
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = router;


// $2b$08$1Hkn50MGDJSrwBt024DySerDtuFrDzFIDY8bkev83PS7RWC3m67lC
// $2b$08$znPHy0v.QmmESyqTruTXuu2DER6Y5wmXk6Y/W9sIZw4bRqgsZpGyS