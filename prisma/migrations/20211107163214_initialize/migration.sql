-- CreateTable
CREATE TABLE "Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TemperatureStat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roomId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL,
    "temperature" REAL NOT NULL,
    CONSTRAINT "TemperatureStat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HumidityStat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roomId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL,
    "humidity" REAL NOT NULL,
    CONSTRAINT "HumidityStat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LightStat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roomId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL,
    "light" REAL NOT NULL,
    CONSTRAINT "LightStat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MotionStat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roomId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "MotionStat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_name_key" ON "Room"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TemperatureStat_created_at_key" ON "TemperatureStat"("created_at");

-- CreateIndex
CREATE INDEX "TemperatureStat_roomId_index" ON "TemperatureStat"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "HumidityStat_created_at_key" ON "HumidityStat"("created_at");

-- CreateIndex
CREATE INDEX "Thermostat_roomId_index" ON "HumidityStat"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "LightStat_created_at_key" ON "LightStat"("created_at");

-- CreateIndex
CREATE INDEX "LightStat_roomId_index" ON "LightStat"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "MotionStat_created_at_key" ON "MotionStat"("created_at");

-- CreateIndex
CREATE INDEX "MotionStat_roomId_index" ON "MotionStat"("roomId");
