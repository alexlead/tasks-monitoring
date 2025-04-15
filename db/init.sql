CREATE TABLE IF NOT EXISTS "task_boards" (
	"id" serial NOT NULL UNIQUE,
	"board_title" varchar(200) NOT NULL,
	"board_link" varchar(300) NOT NULL,
	"parent_id" bigint NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "task_boardmeta" (
	"id" serial NOT NULL UNIQUE,
	"board_id" bigint NOT NULL,
	"meta_key" varchar(255) NOT NULL,
	"meta_value" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "task_requests" (
	"id" serial NOT NULL UNIQUE,
	"request_title" varchar(200) NOT NULL,
	"request_link" varchar(300) NOT NULL,
	"request_description" varchar(255) NOT NULL,
	"request_status" bigint,
	"request_type" varchar(20) NOT NULL,
	"parent_id" bigint NOT NULL,
	"created_date" timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"changed_date" timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "task_requestmeta" (
	"id" serial NOT NULL UNIQUE,
	"request_id" bigint NOT NULL,
	"meta_key" varchar(255) NOT NULL,
	"meta_value" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "statuses" (
	"id" serial NOT NULL UNIQUE,
	"title" varchar(30) NOT NULL,
	PRIMARY KEY ("id")
);


ALTER TABLE "task_boardmeta" ADD CONSTRAINT "task_boardmeta_fk1" FOREIGN KEY ("board_id") REFERENCES "task_boards"("id") ON DELETE CASCADE;
ALTER TABLE "task_requestmeta" ADD CONSTRAINT "task_requestmeta_fk1" FOREIGN KEY ("request_id") REFERENCES "task_requests"("id") ON DELETE CASCADE;


INSERT INTO statuses (id, title)
VALUES 
    (1, 'NewTask'),
    (2, 'InProgress'),
    (3, 'SuccessProgress'),
    (4, 'Rejected'),
    (5, 'Complete') 
	ON CONFLICT (id) DO NOTHING;;

ALTER TABLE "task_requests" ADD CONSTRAINT "task_requests_fk4" FOREIGN KEY ("request_status") REFERENCES "statuses"("id");