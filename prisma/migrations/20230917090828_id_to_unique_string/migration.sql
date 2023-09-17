/*
  Warnings:

  - The primary key for the `Survey` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Survey" DROP CONSTRAINT "Survey_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Survey_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Survey_id_seq";
