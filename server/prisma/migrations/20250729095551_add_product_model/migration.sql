-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "orderPrice" DOUBLE PRECISION NOT NULL,
    "orderQuantity" INTEGER NOT NULL,
    "sellingPriceOnRetail" INTEGER NOT NULL,
    "sellingPriceOnWholeSale" INTEGER NOT NULL,
    "quantityOnRetail" INTEGER NOT NULL,
    "quantityOnWholeSale" INTEGER NOT NULL,
    "profit" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expireDate" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
