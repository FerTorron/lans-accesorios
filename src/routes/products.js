import { Router } from "express";
import ProductManager from "../dao/managers/productManagerMongo.js";
import { checkRole } from "../middlewares/auth.js";

import CustomError from '../services/errors/CustomError.js'
import EErrors from "../services/errors/enums.js"
import { newProductErrorInfo, deleteProductErrorInfo, editProductErrorInfo } from "../services/errors/info.js"
const router = Router()
const pManager = new ProductManager()
import { sendDeleteProduct } from "../utils/email.js";
import config from "../config/config.js"

import { uploaderProduct } from "../utils.js";

router.get("/", async (req, res) => {
    const products = await pManager.getProducts()
    if (products.length === 0) {
        res.send("No hay productos en la tienda")
    }
    else {
        res.send({ status: "success", payload: { products } })
    }
})

router.get('/:pId', async (req, res) => {
    const idProduct = req.params.pId
    const productFind = await pManager.getProductById(idProduct)
    res.send({ status: 'success', productFind })
})

router.post("/", uploaderProduct.single("thumbnail"), checkRole(["admin", "premium"]), async (req, res) => {
    const { title, description, price, category, code, stock } = req.body
    const owner = req.session.user.email
    if (req.session.user.email === "adminCoder@coder.com") {
        owner = "admin"
    }
    const thumbnail = `https://lans-accesorios.up.railway.app/img/products/${req.file.filename}`;
    const product = { title, description, price, thumbnail, category, code, stock, owner }
    if (!title || !description || !price || !category || !code || !stock) {
        CustomError.createError({
            name: "Error al Crear el Producto",
            cause: newProductErrorInfo({ title, description, price, category, code, stock }),
            message: "Se ha encontrado un error al crear el producto",
            code: EErrors.INVALID_TYPES_ERROR
        })
    }
    const newProduct = await pManager.addProduct(product)
    res.send({ status: 'sucess', newProduct })
})

router.put('/:pId', checkRole(["admin", "premium"]), async (req, res) => {
    const newData = req.body
    const idProduct = req.params.pId
    if (!newData || !idProduct) {
        CustomError.createError({
            name: "Error al Editar el Producto",
            cause: editProductErrorInfo({ idProduct, newData }),
            message: "Se ha encontrado un error al editar el producto",
            code: EErrors.INVALID_TYPES_ERROR
        })
    }
    const updatedProduct = await pManager.updateProduct(idProduct, newData)
    res.send({ status: 'sucess', updatedProduct })
})

router.delete('/:pId', checkRole(["admin", "premium"]), async (req, res) => {
    const idProduct = req.params.pId
    if (!idProduct) {
        CustomError.createError({
            name: "Error al Eliminar el Producto",
            cause: deleteProductErrorInfo({ idProduct }),
            message: "Se ha encontrado un error al eliminar el producto",
            code: EErrors.INVALID_TYPES_ERROR
        })
    }

    const product = await pManager.getProductById(idProduct)
    await sendDeleteProduct(product.owner, product.title);
    if (product.owner == req.session.user.email || req.session.user.role == "admin") {
        const deletedProduct = await pManager.deleteProduct(idProduct)
        res.send({ status: 'sucess', deletedProduct })
    } else {
        CustomError.createError({
            name: "Error al Eliminar el Producto",
            cause: deleteProductErrorInfo({ idProduct }),
            message: "Se ha encontrado un error al eliminar el producto",
            code: EErrors.INVALID_TYPES_ERROR
        })
        res.send({ status: 'error', message: "Error al eliminar el producto" })
    }
})

export default router