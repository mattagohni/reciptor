create table if not exists "user"
(
    id  bigserial
        primary key,
    username varchar(255),
    password varchar(255),
    enabled boolean,
    roles varchar(255)[]
);
