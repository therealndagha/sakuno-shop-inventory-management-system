import { Request, Response } from "express";
import { prisma } from "../config/db";
import { calculateProfitOnRetail, calculateProfitOnWholeSale } from "../utilis/profit";

export async function addProduct(req: Request, res: Response){
    if(!req.body) return res.status(400).json({message: 'request body is undefined'});
     const {name, orderPrice, orderQuantity, sellingPriceOnRetail, sellingPriceOnWholeSale, quantityOnRetail, quantityOnWholeSale, profitRetail, profitWholeSale, expireDate} = req.body;
    if(!name || !orderPrice || !orderQuantity){
        return res.status(400).json({message: 'required fields not provided'})
    }    
        
        
  
     try {

           const newlyCreatedProduct = await prisma.product.upsert({where: {name}, update: {}, create:{name, orderPrice, orderQuantity, sellingPriceOnRetail: sellingPriceOnRetail || undefined, sellingPriceOnWholeSale: sellingPriceOnWholeSale || undefined, quantityOnRetail: quantityOnRetail || undefined, quantityOnWholeSale: quantityOnWholeSale || undefined, profitRetail: profitRetail || calculateProfitOnRetail(orderPrice, sellingPriceOnRetail, quantityOnRetail, orderQuantity), profitWholeSale :  profitWholeSale || calculateProfitOnWholeSale(orderPrice, sellingPriceOnWholeSale, quantityOnWholeSale, orderQuantity), expireDate: expireDate || undefined}});

           res.status(201).json({message: 'added new product', data: newlyCreatedProduct})

           
     } catch (error) {
           return res.status(500).json({message: 'something went wrong while attempting to a product'})
     }
}
