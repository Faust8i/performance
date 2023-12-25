CREATE DATABASE performance;
\c performance;

CREATE TABLE public.articles (
	id serial4 NOT NULL,
	title varchar(255) NOT NULL,
	"content" text NULL,
	tags varchar(255) NULL,
	is_public bool NOT NULL DEFAULT false,
	creator_id int4 NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	deleted_at timestamp NULL,
	CONSTRAINT articles_pkey PRIMARY KEY (id)
);

ALTER TABLE public.articles OWNER TO postgres;
GRANT ALL ON TABLE public.articles TO postgres;


CREATE TABLE public.users (
	id serial4 NOT NULL,
	email varchar(100) NOT NULL,
	"password" varchar(1024) NOT NULL,
	creator_id int4 NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	deleted_at timestamp NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

ALTER TABLE public.users OWNER TO postgres;
GRANT ALL ON TABLE public.users TO postgres;


INSERT INTO public.users (email, "password", creator_id) 
VALUES ('qw@er.ty', '$2a$10$JkANRJWgG2qaRkDGRqy5vOjnCLGZVEPiFaF8FoKcq9dTA/nzhUyzq', 1);