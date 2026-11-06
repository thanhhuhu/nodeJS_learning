import { Request, Response } from "express";
import { getProductById } from "../services/product.service";

export const getProductPage = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).send("Invalid product ID");
    }
    const product = await getProductById(id);
    if (!product) {
        return res.status(404).send("Product not found");
    }
    return res.render("client/product/detail.ejs", { product });
};