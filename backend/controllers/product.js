import Product from "../models/product.js";
import fs from "fs";
import slugify from "slugify";
import braintree from 'braintree';
import dotenv from 'dotenv';
import Order from '../models/order.js';


dotenv.config();

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const create = async(req, res) => {
    try {

        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // validation
        switch (true) {
            case !name.trim():
                return res.json({ error: "El nombre es requerido" });
            case !description.trim():
                return res.json({ error: "La descripción es requerida" });
            case !price.trim():
                return res.json({ error: "El precio es requerido" });
            case !category.trim():
                return res.json({ error: "La categoría es requerida" });
            case !quantity.trim():
                return res.json({ error: "La cantidad es requerida" });
            case !shipping.trim():
               return  res.json({ error: "El envío es requerido" });
            case photo && photo.size > 1000000:
                return res.json({ error: "La imagen debe ser menor a 1MB" });
        }

        // create product
        const product = new Product({...req.fields, slug: slugify(name) });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.json(product);

    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

export const list = async(req, res) => {
    try {
        const products = await Product.find({})
            .populate("category")
            .select("-photo")
            .limit(12)
            .sort({ createAt: -1 });

        res.json(products);
    } catch (err) {

    }
};

export const read = async(req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug })
            .populate("category")
            .select("-photo");

        res.json(product);
    } catch (err) {
        console.log(err);
    }
};

export const photo = async(req, res) => {
    try {
        const product = await Product.findById(req.params.productId).select("photo");
        if (product.photo.data) {
            res.set("Content-Type", product.photo.contentType);
            return res.send(product.photo.data);
        }
    } catch (err) {
        console.log(err);
    }
};


export const remove = async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId).select("-photo");
        res.json(product);
    } catch (err) {
        console.log(err);
    }
};



export const update = async(req, res) => {
    try {

        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // validation
        switch (true) {
            case !name.trim():
                res.json({ error: "El nombre es requerido" });
            case !description.trim():
                res.json({ error: "La descripción es requerida" });
            case !price.trim():
                res.json({ error: "El precio es requerido" });
            case !category.trim():
                res.json({ error: "La categoría es requerida" });
            case !quantity.trim():
                res.json({ error: "La cantidad es requerida" });
            case !shipping.trim():
                res.json({ error: "El envío es requerido" });
            case photo && photo.size > 1000000:
                res.json({ error: "La imagen debe ser menor a 1MB" });
        }

        // update product
        const product = await Product.findByIdAndUpdate(req.params.productId, {
            ...req.fields,
            slug: slugify(name),
        }, { new: true });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.json(product);

    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }

};

export const filteredProducts = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {}; 
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

        console.log('args => ', args );

        const products = await Product.find(args);
        console.log('consulta de productos filtrados', products.length);
        res.json(products);


    } catch (err) {
        console.log(err)
    }
};


export const productsCount = async (req, res) => {
    try {
        const total = await Product.find({}).estimatedDocumentCount();
        res.json(total);
    } catch (err) {
        console.log(err);
    }
};

export const listProducts = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;

        const products = await Product.find({})
        .select("-photo")
        .skip((page -1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1});

        res.json(products);
    } catch(err) {
        console.log(err);
    }
};


export const productsSearch = async (req, res) => {
    try{
        const { keyword } = req.params;
        const results = await Product.find({
            $or: [
                { name: { $regex: keyword, $options: "i"}},
                { description: { $regex: keyword, $options: "i"}},
            ],
        }).select("-photo");

        res.json(results);
    } catch(err) {
        console.log(err)
    }
};


export const relatedProducts = async (req, res) => {
    try {
        const { productId, categoryId } = req.params;
        const related = await Product.find({
            category: categoryId,
            _id: { $ne: productId },
        })
        .select("-photo")
        .populate("category")
        .limit(3);

        res.json(related);
    } catch(err) {
        console.log(err);
    }

};


export const getToken = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response){
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    } catch (err){
        console.log(err)
    }
};


export const processPayment = async (req, res) => {
    try {



        const {nonce, cart} = req.body;

        let total=0;
        cart.map((i) => {
            total += i.price;
        });




        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true,
            },

        }, 
        function (error, result){
            if(result){
                const order = new Order({
                    products: cart,
                    payment: result,
                    buyer: req.user._id,
                }).save();
                // decrece la cantidad de productos cuando se compra
                decrementQuantity(cart)
                res.json({ok:true});
            } else {
                res.status(500).send(error);
            }
        });
    } catch(err) {
        console.log(err)
    }
};


const decrementQuantity = async (cart) => {
    try {
        // mongodb consulta
        const bulkOps = cart.map ((item) => {
            return {
                updateOne: {
                    filter: { _id: item._id},
                    update: { $inc: {quantity: -0, sold:+1}},
                },
            };
        });
        const update = await Product.bulkWrite(bulkOps, {});
        console.log('culk updated', updated);

    } catch (err){
        console.log(err)
    }
};

