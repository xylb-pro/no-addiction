create table "NoAddiction".quotes
(
	"_id" int4 default nextval('"NoAddiction".quotes__id_seq'::regclass) not null,
	quote varchar(2000) not null,
	author varchar(150),
	is_bad bool not null,
	category_id int4 default nextval('"NoAddiction".quotes_category_id_seq'::regclass) not null
		constraint quotes_categories__id_fk
			references "NoAddiction".categories
);

create unique index quotes__id_uindex
	on "NoAddiction".quotes ("_id");

create unique index quotes_pk
	on "NoAddiction".quotes ("_id");

alter table "NoAddiction".quotes
	add constraint quotes_pk
		primary key ("_id");

