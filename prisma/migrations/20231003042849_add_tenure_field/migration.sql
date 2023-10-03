-- CreateEnum
CREATE TYPE "Tenure" AS ENUM ('NEW_GRAD', 'MID_CAREER');

-- AlterTable
ALTER TABLE "Survey" ADD COLUMN     "tenure" "Tenure" NOT NULL DEFAULT 'NEW_GRAD';
