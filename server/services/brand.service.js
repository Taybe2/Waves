const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const { Brand } = require("../models/brand");

const createBrand = async(brandname) => {
    try {
        const brand = await Brand.findOne({name: brandname});

        if(brand) throw new ApiError(httpStatus.BAD_REQUEST, "Brand already exists");

        const newBrand = new Brand({
            name: brandname
        });
        await newBrand.save();
        return newBrand;
    } catch(error) {
        throw error;
    }
};

const getBrandById = async (id) => {
    try {
        const brand = await Brand.findById(id);

        if(!brand) throw new ApiError(httpStatus.NOT_FOUND, "Brand not found");

        return brand;
    } catch(error) {
        throw error;
    }
}

const deleteBrandById = async (id) => {
    try {
        const brand = await Brand.findByIdAndRemove(id);

        if(!brand) throw new ApiError(httpStatus.NOT_FOUND, "Brand not found");

        return brand;
    } catch(error) {
        throw error;
    }
}

const getBrands = async (args) => {
    try {
        let order = args.order ? args.order : "asc";
        let limit = args.limit ? args.limit : "10";

        const brands = await Brand
        .find({})
        .sort([
            ["_id", order]
        ])
        .limit(limit);

        if(!brands) throw new ApiError(httpStatus.NOT_FOUND, "No brands found");

        return brands;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    createBrand,
    getBrandById,
    deleteBrandById,
    getBrands
}