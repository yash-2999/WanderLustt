const Joi = require("joi");
const review = require("./models/review");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().allow("", null),
        image: Joi.string().allow("", null),
        price: Joi.number().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),

        // ✅ ADD THIS
        category: Joi.string()
            .valid("mountains", "arctic", "deserts", "farms")
            .required(),

    }).required(),
});

module.exports.reviewSchema=Joi.object({

    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()

});