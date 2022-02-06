/*
  Warnings:

  - You are about to drop the column `eventId` on the `EventObject` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventObjectId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventObjectId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventObject" DROP CONSTRAINT "EventObject_eventId_fkey";

-- DropIndex
DROP INDEX "EventObject_eventId_key";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "eventObjectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "EventObject" DROP COLUMN "eventId";

-- CreateIndex
CREATE UNIQUE INDEX "Event_eventObjectId_key" ON "Event"("eventObjectId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eventObjectId_fkey" FOREIGN KEY ("eventObjectId") REFERENCES "EventObject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
