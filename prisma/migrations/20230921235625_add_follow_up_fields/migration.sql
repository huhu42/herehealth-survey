-- AlterTable
ALTER TABLE "Survey" ADD COLUMN     "requestMatches" BOOLEAN,
ALTER COLUMN "email" DROP NOT NULL;
