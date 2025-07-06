/*
  Warnings:

  - You are about to drop the column `fbPage` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `igHandle` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Availability" ALTER COLUMN "dayOfWeek" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "fbPage",
DROP COLUMN "igHandle",
DROP COLUMN "website",
ADD COLUMN     "socialLinks" JSONB;

-- AlterTable
ALTER TABLE "Stylist" ADD COLUMN     "brandName" TEXT;
