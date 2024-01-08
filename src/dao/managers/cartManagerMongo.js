import { cartModel } from '../models/carts.js'

export default class cartManager {
    getCarts = async () => {
        try {
            const carts = await cartModel.find()
            return carts
        } catch (error) {
            return error
        }
    }

    getCartById = async (id) => {
        try {
            const cart = await cartModel.findById(id).populate("products._id").lean()
            return cart
        } catch (error) {
            return error
        }
    }

    addOnlyCart = async () => {
        try {
            const products = {
                products: []
            }
            const cart = await cartModel.create(products)
            console.log(cart)
            return cart
        } catch (error) {
            return error
        }
    }

    addCart = async (products) => {
        try {
            let cartData = {}
            if (products && products.length > 0) {
                cartData.products = products;
            }
            console.log(cartData)

            const cart = await cartModel.create(cartData)
            return cart
        } catch (error) {
            return error
        }
    }

    // addProductInCart = async (cartId, product) => {
    //     try {
    //         const filter = { _id: cartId, "products._id": product._id }
    //         const cart = await cartModel.findById(cartId)
    //         const findProduct = cart.products.some((product) => product._id.toString() === product._id)

    //         if (findProduct) {
    //             const update = { $inc: { "products.$.quantity": product.quantity } };
    //             await cartModel.updateOne(filter, update)
    //         } else {
    //             const update = { $push: { products: { _id: product._id, quantity: product.quantity } } };
    //             await cartModel.updateOne({ _id: cartId }, update)
    //         }

    //         return await cartModel.findById(cartId)
    //     } catch (error) {
    //         return error
    //     }
    // }

    addProductInCart = async (cartId, product) => {
        try {
            const filter = { _id: cartId, "products._id": product._id };
            const cart = await cartModel.findById(cartId);

            const existingProduct = cart.products.find(
                (prod) => prod._id.toString() === product._id.toString()
            );

            if (existingProduct) {
                existingProduct.quantity += product.quantity;
                await cart.save();
            } else {
                cart.products.push({ _id: product._id, quantity: product.quantity });
                await cart.save();
            }

            return await cartModel.findById(cartId);
        } catch (error) {
            return error;
        }
    };

    deleteProductInCart = async (cid, pid) => {
        try {
            const cart = await cartModel.findOneAndUpdate(
                { _id: cid },
                { $pull: { products: { _id: pid } } },
                { new: true }
            );

            return cart;
        } catch (err) {
            return err;
        }
    }

    updateOneProduct = async (cid, products) => {

        await cartModel.updateOne(
            { _id: cid },
            { products })
        return await cartModel.findOne({ _id: cid })
    }

    updateQuantity = async (cid, pid, newQuantity) => {
        try {
            const filter = { _id: cid, "products._id": pid }
            const update = {
                $set: { 'products.$.quantity': newQuantity }
            }
            await cartModel.updateOne(filter, update)
            return cartModel.findOne({ _id: cid })
        } catch (error) {
            console.log(error)
        }
    }
}