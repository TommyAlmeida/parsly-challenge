-- CreateEnum
CREATE TYPE "EventSeverity" AS ENUM ('Critical', 'Error', 'Warning');

-- CreateEnum
CREATE TYPE "EventObjectType" AS ENUM ('ApiGateway', 'SupplierManagement', 'UserManagement', 'Esign', 'StorageManagement', 'StorageClient', 'Notifier');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "severity" "EventSeverity" NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventObject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EventObjectType" NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "EventObject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EventObject_eventId_key" ON "EventObject"("eventId");

-- AddForeignKey
ALTER TABLE "EventObject" ADD CONSTRAINT "EventObject_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
