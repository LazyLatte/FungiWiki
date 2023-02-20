require('../../config.js');


const pgp = require("pg-promise")();
const db = pgp(process.env.DB_URL);




const schemaSql = `
    -- Extensions
    CREATE EXTENSION IF NOT EXISTS pg_trgm;

    -- Drop (droppable only when no dependency)
    DROP TABLE IF EXISTS fungi;

    -- Create



    CREATE TABLE fungi (
        id              serial PRIMARY KEY NOT NULL,
        name            text NOT NULL,
        scientific_name text NOT NULL,
        imgsrc          text NOT NULL,
        content1         text NOT NULL,
        content2         text NOT NULL,
        content3         text NOT NULL,
        _phylum         text NOT NULL,
        _class          text NOT NULL,
        _order          text NOT NULL,
        _family         text NOT NULL,
        _genus          text NOT NULL,
        popularity      int NOT NULL,
        tag             text default NULL
    );

`;

const dataSql = `
    -- Populate dummy fungi data
    COPY fungi (name, scientific_name, imgsrc, _phylum, _class, _order, _family, _genus, content1, content2, content3, popularity, tag)
    FROM '/Users/henry/Desktop/Fungi/client/dist/fungi_database.csv'
    DELIMITER ',' CSV HEADER;
`;
/*
psql --host=database-fungi.cnvrofpgcvlj.us-west-2.rds.amazonaws.com --port=5432 --username=postgres --password --dbname=Fungi-wiki

-c 
"\COPY fungi (name, scientific_name, imgsrc, _phylum, _class, _order, _family, _genus, content1, content2, content3, popularity, tag)
FROM '/Users/henry/Desktop/Fungi/client/dist/fungi_database.csv'
DELIMITER ',' CSV HEADER;"
*/
db.none(schemaSql).then(() => {

    console.log('Schema created');
    db.none(dataSql).then(() => {
        console.log('Data populated');
        pgp.end();
    });
}).catch(err => {
    console.log('Error creating schema', err);
});
