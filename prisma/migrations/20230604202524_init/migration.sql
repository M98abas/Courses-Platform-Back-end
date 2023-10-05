-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Constractors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "otp" INTEGER NOT NULL,
    "nickName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "brokerage_firm_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "isVerfy" BOOLEAN NOT NULL DEFAULT false,
    "ipAddress" TEXT NOT NULL,

    CONSTRAINT "Constractors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseConstractor" (
    "id" SERIAL NOT NULL,
    "constractorId" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "finished" TIMESTAMP(3) NOT NULL,
    "repeated" INTEGER NOT NULL,

    CONSTRAINT "CourseConstractor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "videoURL" TEXT NOT NULL,
    "isFree" BOOLEAN NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "courseId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentConstractor" (
    "id" SERIAL NOT NULL,
    "constractorId" INTEGER NOT NULL,
    "contentId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "repeated" INTEGER NOT NULL,
    "constractorsId" TEXT,

    CONSTRAINT "ContentConstractor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "content_constracotrId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseConstractor" ADD CONSTRAINT "CourseConstractor_constractorId_fkey" FOREIGN KEY ("constractorId") REFERENCES "Constractors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseConstractor" ADD CONSTRAINT "CourseConstractor_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentConstractor" ADD CONSTRAINT "ContentConstractor_constractorsId_fkey" FOREIGN KEY ("constractorsId") REFERENCES "Constractors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentConstractor" ADD CONSTRAINT "ContentConstractor_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_content_constracotrId_fkey" FOREIGN KEY ("content_constracotrId") REFERENCES "ContentConstractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
