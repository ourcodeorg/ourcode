-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(240) NOT NULL,
    "description" VARCHAR(5000),
    "skills" TEXT[],
    "progress" TEXT NOT NULL,
    "peopleRequired" INTEGER NOT NULL,
    "experience" TEXT NOT NULL,
    "photo" TEXT,
    "link" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");
