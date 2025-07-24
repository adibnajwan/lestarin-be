/*
  Warnings:

  - You are about to drop the column `status` on the `Sighting` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Sighting_status_idx";

-- AlterTable
ALTER TABLE "Sighting" DROP COLUMN "status";
