const express = require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js")
const ExpressError= require("../utils/ExpressError.js");
const Listing =require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js")


const listingController = require("../controllers/listing.js")

const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage })


// these routes start withe the / (index and create route)
router
    .route("/")
       .get(wrapAsync(listingController.index))
       .post(isLoggedIn,upload.single("listing[image]"),validateListing, wrapAsync(listingController.createListing ))
        
        
//New route
router.get("/new",isLoggedIn,listingController.renderNewForm)

//category 
router.get("/category/:category", async (req, res) => {
    const listings = await Listing.find({ category: req.params.category });
    res.render("listings/index", { allListings: listings });
});
//Search route
router.get("/search", async (req, res) => {
    let { q } = req.query;

    if (!q || q.trim() === "") {
        return res.redirect("/listings");
    }

    const listings = await Listing.find({
        $or: [
            { title: { $regex: q, $options: "i" } },
            { location: { $regex: q, $options: "i" } }
        ]
    });

    res.render("listings/index", { allListings: listings });
});

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));








//we write all routes in the above section

//Index Route
//router.get("/",wrapAsync(listingController.index));

//show route
//router.get("/:id",wrapAsync(listingController.showListing));

//create route
//router.post("/",isLoggedIn,validateListing, wrapAsync(listingController.createListing )
//);

//Edit route
//router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

//update route
// router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));

//Delete 
// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

module.exports=router;