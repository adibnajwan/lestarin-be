-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "benefits" TEXT[],
    "conservationStatus" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Plant_region_idx" ON "Plant"("region");
