/*
  Warnings:

  - Added the required column `updated_at` to the `chat_rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat_rooms" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "last_message" TEXT,
ADD COLUMN     "room_profile_color" TEXT,
ADD COLUMN     "room_profile_image_url" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
