-- CreateTable
CREATE TABLE "Album" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" UUID,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlbumFav" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "albumId" UUID NOT NULL,

    CONSTRAINT "AlbumFav_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtistFav" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "artistId" UUID NOT NULL,

    CONSTRAINT "ArtistFav_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "artistId" UUID,
    "name" VARCHAR(255) NOT NULL,
    "duration" INTEGER NOT NULL,
    "albumId" UUID,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackFav" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "trackId" UUID NOT NULL,

    CONSTRAINT "TrackFav_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "login" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AlbumFav_albumId_key" ON "AlbumFav"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "ArtistFav_artistId_key" ON "ArtistFav"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "TrackFav_trackId_key" ON "TrackFav"("trackId");

-- AddForeignKey
ALTER TABLE "AlbumFav" ADD CONSTRAINT "AlbumFav_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistFav" ADD CONSTRAINT "ArtistFav_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackFav" ADD CONSTRAINT "TrackFav_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
