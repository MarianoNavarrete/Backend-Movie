create table actor
(
   id_actor             int not null auto_increment,
   name                 char(120),
   age                  int,
   image                char(255),
   primary key (id_actor)
);

/*==============================================================*/
/* Table: MOVIE                                                 */
/*==============================================================*/
create table movie
(
   id_movie             int not null auto_increment,
   name                 char(120),
   duration             int,
   genre                char(20),
   sinopsis             text,
   primary key (id_movie)
);

/*==============================================================*/
/* Table: MOVIE_ACTOR                                           */
/*==============================================================*/
create table movie_actor
(
   id_movie             int not null,
   id_actor             int not null,
   primary key (id_movie, id_actor)
);

alter table movie_actor add constraint FK_HAS foreign key (id_movie)
      references movie (id_movie) on delete restrict on update restrict;

alter table movie_actor add constraint FK_HAS2 foreign key (id_actor)
      references actor (id_actor) on delete restrict on update restrict;