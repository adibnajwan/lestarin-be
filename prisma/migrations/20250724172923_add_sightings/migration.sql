-- CreateTable
CREATE TABLE "Sighting" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "plantId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sighting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Sighting_userId_idx" ON "Sighting"("userId");

-- CreateIndex
CREATE INDEX "Sighting_plantId_idx" ON "Sighting"("plantId");

-- CreateIndex
CREATE INDEX "Sighting_status_idx" ON "Sighting"("status");

-- AddForeignKey
ALTER TABLE "Sighting" ADD CONSTRAINT "Sighting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sighting" ADD CONSTRAINT "Sighting_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
