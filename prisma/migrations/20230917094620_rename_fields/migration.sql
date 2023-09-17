/*
  Warnings:

  - You are about to drop the column `request` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `response` on the `Survey` table. All the data in the column will be lost.
  - Added the required column `input` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result` to the `Survey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Survey" DROP COLUMN "request",
DROP COLUMN "response",
ADD COLUMN     "input" JSONB NOT NULL,
ADD COLUMN     "result" JSONB NOT NULL;
