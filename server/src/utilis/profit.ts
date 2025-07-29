

/*

 to calculate profit on retail say you bought one box of verox at 92,000. in a box of verox we have 12 bottles of verox

 in this case orderPrice is 92,000, quantityOnRetail is 12, orderQuantity is 1 for that one box , the cost price is 92,000/12, the selling price say is 8500 and you would calculate the profit in the way described below.

*/

export const calculateProfitOnRetail = ( orderPrice: number | undefined, sellingPriceOnRetail: number | undefined, quantityOnRetail:number | undefined, orderQuantity: number | undefined ):number | undefined =>{
    if(!orderPrice || !sellingPriceOnRetail || !quantityOnRetail || !orderQuantity ) return undefined;
    let costPrice: number = orderPrice/quantityOnRetail;
    let sellingPrice: number = sellingPriceOnRetail;
    let profit = (sellingPrice - costPrice) * quantityOnRetail;
    let grossProfit = profit * orderQuantity;

    return grossProfit;
}

/*

 now to calculate the profit for an item on wholesale say you bought one pack of creamit at 36000, it has 200 packets but we sale a unit(10 packets) at 2000 then we sell a unit (10) at 2000

*/

export const calculateProfitOnWholeSale = (orderPrice: number | undefined , sellingPriceOnWholeSale: number | undefined , quantityOnWholeSale: number | undefined, orderQuantity: number | undefined): number | undefined=>{

      if(!orderPrice || !sellingPriceOnWholeSale || !quantityOnWholeSale || !orderQuantity) return undefined;
      let costPrice:number = orderPrice/quantityOnWholeSale;
      let sellingPrice:number = sellingPriceOnWholeSale;
    
      let profit:number = (sellingPrice-costPrice)*orderQuantity;

      return profit;


}
const VeroxRetailProfit = calculateProfitOnRetail(92000, 8500, 12, 1)

console.log('verox profit', VeroxRetailProfit)

