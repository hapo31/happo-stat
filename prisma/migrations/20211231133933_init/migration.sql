-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemperatureStat" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TemperatureStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HumidityStat" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "HumidityStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LightStat" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "light" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LightStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotionStat" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MotionStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_name_key" ON "Room"("name");

-- CreateIndex
CREATE INDEX "TemperatureStat_roomId_index" ON "TemperatureStat"("roomId");

-- CreateIndex
CREATE INDEX "Thermostat_roomId_index" ON "HumidityStat"("roomId");

-- CreateIndex
CREATE INDEX "LightStat_roomId_index" ON "LightStat"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "MotionStat_created_at_key" ON "MotionStat"("created_at");

-- CreateIndex
CREATE INDEX "MotionStat_roomId_index" ON "MotionStat"("roomId");

-- AddForeignKey
ALTER TABLE "TemperatureStat" ADD CONSTRAINT "TemperatureStat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HumidityStat" ADD CONSTRAINT "HumidityStat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LightStat" ADD CONSTRAINT "LightStat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotionStat" ADD CONSTRAINT "MotionStat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
