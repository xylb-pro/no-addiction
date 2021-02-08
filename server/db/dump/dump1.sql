--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: NoAddiction; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "NoAddiction" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';


ALTER DATABASE "NoAddiction" OWNER TO postgres;

\connect "NoAddiction"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE "NoAddiction"; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE "NoAddiction" IS 'DB for NA app';


--
-- Name: NoAddiction; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA "NoAddiction";


ALTER SCHEMA "NoAddiction" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: NoAddiction; Owner: postgres
--

CREATE TABLE "NoAddiction".categories (
    _id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE "NoAddiction".categories OWNER TO postgres;

--
-- Name: categories__id_seq; Type: SEQUENCE; Schema: NoAddiction; Owner: postgres
--

CREATE SEQUENCE "NoAddiction".categories__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "NoAddiction".categories__id_seq OWNER TO postgres;

--
-- Name: categories__id_seq; Type: SEQUENCE OWNED BY; Schema: NoAddiction; Owner: postgres
--

ALTER SEQUENCE "NoAddiction".categories__id_seq OWNED BY "NoAddiction".categories._id;


--
-- Name: timers; Type: TABLE; Schema: NoAddiction; Owner: postgres
--

CREATE TABLE "NoAddiction".timers (
    _id integer NOT NULL,
    begin_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone,
    user_id integer NOT NULL,
    category_id integer
);


ALTER TABLE "NoAddiction".timers OWNER TO postgres;

--
-- Name: timers__id_seq; Type: SEQUENCE; Schema: NoAddiction; Owner: postgres
--

CREATE SEQUENCE "NoAddiction".timers__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "NoAddiction".timers__id_seq OWNER TO postgres;

--
-- Name: timers__id_seq; Type: SEQUENCE OWNED BY; Schema: NoAddiction; Owner: postgres
--

ALTER SEQUENCE "NoAddiction".timers__id_seq OWNED BY "NoAddiction".timers._id;


--
-- Name: timers_user_id_seq; Type: SEQUENCE; Schema: NoAddiction; Owner: postgres
--

CREATE SEQUENCE "NoAddiction".timers_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "NoAddiction".timers_user_id_seq OWNER TO postgres;

--
-- Name: timers_user_id_seq; Type: SEQUENCE OWNED BY; Schema: NoAddiction; Owner: postgres
--

ALTER SEQUENCE "NoAddiction".timers_user_id_seq OWNED BY "NoAddiction".timers.user_id;


--
-- Name: users; Type: TABLE; Schema: NoAddiction; Owner: postgres
--

CREATE TABLE "NoAddiction".users (
    _id bigint NOT NULL,
    username text NOT NULL,
    email text NOT NULL
);


ALTER TABLE "NoAddiction".users OWNER TO postgres;

--
-- Name: users__id_seq; Type: SEQUENCE; Schema: NoAddiction; Owner: postgres
--

CREATE SEQUENCE "NoAddiction".users__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "NoAddiction".users__id_seq OWNER TO postgres;

--
-- Name: users__id_seq; Type: SEQUENCE OWNED BY; Schema: NoAddiction; Owner: postgres
--

ALTER SEQUENCE "NoAddiction".users__id_seq OWNED BY "NoAddiction".users._id;


--
-- Name: categories _id; Type: DEFAULT; Schema: NoAddiction; Owner: postgres
--

ALTER TABLE ONLY "NoAddiction".categories ALTER COLUMN _id SET DEFAULT nextval('"NoAddiction".categories__id_seq'::regclass);


--
-- Name: timers _id; Type: DEFAULT; Schema: NoAddiction; Owner: postgres
--

ALTER TABLE ONLY "NoAddiction".timers ALTER COLUMN _id SET DEFAULT nextval('"NoAddiction".timers__id_seq'::regclass);


--
-- Name: timers user_id; Type: DEFAULT; Schema: NoAddiction; Owner: postgres
--

ALTER TABLE ONLY "NoAddiction".timers ALTER COLUMN user_id SET DEFAULT nextval('"NoAddiction".timers_user_id_seq'::regclass);


--
-- Name: users _id; Type: DEFAULT; Schema: NoAddiction; Owner: postgres
--

ALTER TABLE ONLY "NoAddiction".users ALTER COLUMN _id SET DEFAULT nextval('"NoAddiction".users__id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: NoAddiction; Owner: postgres
--

COPY "NoAddiction".categories (_id, name) FROM stdin;
1	Alcohol
\.


--
-- Data for Name: timers; Type: TABLE DATA; Schema: NoAddiction; Owner: postgres
--

COPY "NoAddiction".timers (_id, begin_date, end_date, user_id, category_id) FROM stdin;
2	2018-01-01 01:00:00	2018-01-17 12:34:00	0	1
3	2018-02-01 01:00:00	2018-02-17 17:34:00	0	1
4	2018-05-01 12:00:00	2018-06-10 17:34:00	0	1
5	2019-10-01 12:00:00	2019-12-31 14:34:00	0	1
1	2020-01-01 01:00:00	\N	0	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: NoAddiction; Owner: postgres
--

COPY "NoAddiction".users (_id, username, email) FROM stdin;
0	vlad99902ipad	vlad99902ipad@ya.ru
\.


--
-- Name: categories__id_seq; Type: SEQUENCE SET; Schema: NoAddiction; Owner: postgres
--

SELECT pg_catalog.setval('"NoAddiction".categories__id_seq', 1, false);


--
-- Name: timers__id_seq; Type: SEQUENCE SET; Schema: NoAddiction; Owner: postgres
--

SELECT pg_catalog.setval('"NoAddiction".timers__id_seq', 1, false);


--
-- Name: timers_user_id_seq; Type: SEQUENCE SET; Schema: NoAddiction; Owner: postgres
--

SELECT pg_catalog.setval('"NoAddiction".timers_user_id_seq', 1, false);


--
-- Name: users__id_seq; Type: SEQUENCE SET; Schema: NoAddiction; Owner: postgres
--

SELECT pg_catalog.setval('"NoAddiction".users__id_seq', 1, false);


--
-- Name: categories categories_pk; Type: CONSTRAINT; Schema: NoAddiction; Owner: postgres
--

ALTER TABLE ONLY "NoAddiction".categories
    ADD CONSTRAINT categories_pk PRIMARY KEY (_id);


--
-- Name: timers timers_pk; Type: CONSTRAINT; Schema: NoAddiction; Owner: postgres
--

ALTER TABLE ONLY "NoAddiction".timers
    ADD CONSTRAINT timers_pk PRIMARY KEY (_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: NoAddiction; Owner: postgres
--

ALTER TABLE ONLY "NoAddiction".users
    ADD CONSTRAINT users_pkey PRIMARY KEY (_id);


--
-- Name: categories__id_uindex; Type: INDEX; Schema: NoAddiction; Owner: postgres
--

CREATE UNIQUE INDEX categories__id_uindex ON "NoAddiction".categories USING btree (_id);


--
-- Name: timers__id_uindex; Type: INDEX; Schema: NoAddiction; Owner: postgres
--

CREATE UNIQUE INDEX timers__id_uindex ON "NoAddiction".timers USING btree (_id);


--
-- Name: timers timers_categories__id_fk; Type: FK CONSTRAINT; Schema: NoAddiction; Owner: postgres
--

ALTER TABLE ONLY "NoAddiction".timers
    ADD CONSTRAINT timers_categories__id_fk FOREIGN KEY (category_id) REFERENCES "NoAddiction".categories(_id);


--
-- Name: timers timers_users__id_fk; Type: FK CONSTRAINT; Schema: NoAddiction; Owner: postgres
--

ALTER TABLE ONLY "NoAddiction".timers
    ADD CONSTRAINT timers_users__id_fk FOREIGN KEY (user_id) REFERENCES "NoAddiction".users(_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA "NoAddiction"; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA "NoAddiction" TO PUBLIC;


--
-- PostgreSQL database dump complete
--

