import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1791660553636 implements MigrationInterface {
  name = 'InitialMigration1791660553636';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "review" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "rating" integer NOT NULL, "comment" varchar NOT NULL, "date" varchar NOT NULL, "status" varchar NOT NULL, "userId" integer NOT NULL, "restaurantId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "restaurant" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "address" varchar NOT NULL, "city" varchar NOT NULL, "category" varchar NOT NULL, "openingTime" varchar NOT NULL, "closingTime" varchar NOT NULL, "imageUrl" varchar NOT NULL, "latitude" float NOT NULL, "longitude" float NOT NULL, "adminId" integer, CONSTRAINT "REL_246ead78533d13679670ff8a8d" UNIQUE ("adminId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "role" varchar NOT NULL, "restaurantId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "reservation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" varchar NOT NULL, "time" varchar NOT NULL, "numberOfPeople" integer NOT NULL, "status" varchar NOT NULL, "specialRequest" varchar NOT NULL, "userId" integer NOT NULL, "restaurantId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_review" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "rating" integer NOT NULL, "comment" varchar NOT NULL, "date" varchar NOT NULL, "status" varchar NOT NULL, "userId" integer NOT NULL, "restaurantId" integer NOT NULL, CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_209aeb49a7aebc856b84b940a41" FOREIGN KEY ("restaurantId") REFERENCES "restaurant" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_review"("id", "rating", "comment", "date", "status", "userId", "restaurantId") SELECT "id", "rating", "comment", "date", "status", "userId", "restaurantId" FROM "review"`,
    );
    await queryRunner.query(`DROP TABLE "review"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_review" RENAME TO "review"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_restaurant" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "address" varchar NOT NULL, "city" varchar NOT NULL, "category" varchar NOT NULL, "openingTime" varchar NOT NULL, "closingTime" varchar NOT NULL, "imageUrl" varchar NOT NULL, "latitude" float NOT NULL, "longitude" float NOT NULL, "adminId" integer, CONSTRAINT "REL_246ead78533d13679670ff8a8d" UNIQUE ("adminId"), CONSTRAINT "FK_246ead78533d13679670ff8a8df" FOREIGN KEY ("adminId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_restaurant"("id", "name", "description", "address", "city", "category", "openingTime", "closingTime", "imageUrl", "latitude", "longitude", "adminId") SELECT "id", "name", "description", "address", "city", "category", "openingTime", "closingTime", "imageUrl", "latitude", "longitude", "adminId" FROM "restaurant"`,
    );
    await queryRunner.query(`DROP TABLE "restaurant"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_restaurant" RENAME TO "restaurant"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_reservation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" varchar NOT NULL, "time" varchar NOT NULL, "numberOfPeople" integer NOT NULL, "status" varchar NOT NULL, "specialRequest" varchar NOT NULL, "userId" integer NOT NULL, "restaurantId" integer NOT NULL, CONSTRAINT "FK_529dceb01ef681127fef04d755d" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_2a2d6c09d1469e65c347513256a" FOREIGN KEY ("restaurantId") REFERENCES "restaurant" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_reservation"("id", "date", "time", "numberOfPeople", "status", "specialRequest", "userId", "restaurantId") SELECT "id", "date", "time", "numberOfPeople", "status", "specialRequest", "userId", "restaurantId" FROM "reservation"`,
    );
    await queryRunner.query(`DROP TABLE "reservation"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_reservation" RENAME TO "reservation"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservation" RENAME TO "temporary_reservation"`,
    );
    await queryRunner.query(
      `CREATE TABLE "reservation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" varchar NOT NULL, "time" varchar NOT NULL, "numberOfPeople" integer NOT NULL, "status" varchar NOT NULL, "specialRequest" varchar NOT NULL, "userId" integer NOT NULL, "restaurantId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "reservation"("id", "date", "time", "numberOfPeople", "status", "specialRequest", "userId", "restaurantId") SELECT "id", "date", "time", "numberOfPeople", "status", "specialRequest", "userId", "restaurantId" FROM "temporary_reservation"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_reservation"`);
    await queryRunner.query(
      `ALTER TABLE "restaurant" RENAME TO "temporary_restaurant"`,
    );
    await queryRunner.query(
      `CREATE TABLE "restaurant" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "address" varchar NOT NULL, "city" varchar NOT NULL, "category" varchar NOT NULL, "openingTime" varchar NOT NULL, "closingTime" varchar NOT NULL, "imageUrl" varchar NOT NULL, "latitude" float NOT NULL, "longitude" float NOT NULL, "adminId" integer, CONSTRAINT "REL_246ead78533d13679670ff8a8d" UNIQUE ("adminId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "restaurant"("id", "name", "description", "address", "city", "category", "openingTime", "closingTime", "imageUrl", "latitude", "longitude", "adminId") SELECT "id", "name", "description", "address", "city", "category", "openingTime", "closingTime", "imageUrl", "latitude", "longitude", "adminId" FROM "temporary_restaurant"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_restaurant"`);
    await queryRunner.query(
      `ALTER TABLE "review" RENAME TO "temporary_review"`,
    );
    await queryRunner.query(
      `CREATE TABLE "review" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "rating" integer NOT NULL, "comment" varchar NOT NULL, "date" varchar NOT NULL, "status" varchar NOT NULL, "userId" integer NOT NULL, "restaurantId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "review"("id", "rating", "comment", "date", "status", "userId", "restaurantId") SELECT "id", "rating", "comment", "date", "status", "userId", "restaurantId" FROM "temporary_review"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_review"`);
    await queryRunner.query(`DROP TABLE "reservation"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "restaurant"`);
    await queryRunner.query(`DROP TABLE "review"`);
  }
}
