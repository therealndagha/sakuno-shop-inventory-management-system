-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "sellingPriceOnRetail" DROP NOT NULL,
ALTER COLUMN "sellingPriceOnWholeSale" DROP NOT NULL,
ALTER COLUMN "quantityOnRetail" DROP NOT NULL,
ALTER COLUMN "quantityOnWholeSale" DROP NOT NULL;
