if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function list(search){
  //console.log(search);
  //const q=search.split('#');
  //search = q[0];
  //console.log(search);
  //let relative_count=0;
  const where = [];
  where.push(`'`);
  for(let i=0; i<search.length; i++){
      where.push(search[i]);
  }
  where.push(`'`);
  //console.log(where.join('%'));
  //${'WHERE '+where.join('%') +' OR ' +`name ILIKE '%` + search[search.length-1]+`%'`}
  const c2 = [];
  for(let i=0; i<search.length-1; i++){
    c2.push(`'%`+search.substring(i, i+2)+`%'`);
  }
  //console.log(c2.length>0);
  const sql_check_name = `
      SELECT *
      FROM fungi
      WHERE name ILIKE ${where.join('%')}
      OR '${search}' ILIKE CONCAT('%', REPLACE(fungi.name,'', '%'), '%')
      ${c2.length>0?' OR name ILIKE '+c2.join(' OR name ILIKE '):''}
      ${search[search.length-1]=='菇'?` OR name ILIKE '%菇%' `:''}
      OR _phylum ILIKE ${where.join('%')}
      OR _class ILIKE ${where.join('%')}
      OR _order ILIKE ${where.join('%')}
      OR _family ILIKE ${where.join('%')}
      OR _genus ILIKE ${where.join('%')}
      OR tag ILIKE ${where.join('%')}
      ORDER BY name ILIKE ${where.join('%')} DESC, '${search}' ILIKE CONCAT('%', REPLACE(fungi.name,'', '%'), '%') DESC,
      popularity DESC
  `;
  /*
  const sql_check_category = `
      SELECT *
      FROM fungi
      WHERE '${search}' ILIKE CONCAT('%', REPLACE(fungi._phylum,'', '%'), '%')
      OR '${search}' ILIKE CONCAT('%', REPLACE(fungi._class,'', '%'), '%')
      OR '${search}' ILIKE CONCAT('%', REPLACE(fungi._order,'', '%'), '%')
      OR '${search}' ILIKE CONCAT('%', REPLACE(fungi._family,'', '%'), '%')
      OR '${search}' ILIKE CONCAT('%', REPLACE(fungi._genus,'', '%'), '%')

  `;

  const sql_tag = `
      SELECT *
      FROM fungi
      WHERE '${search}' ILIKE CONCAT('%', REPLACE(fungi.tag1,'', '%'), '%')
      ORDER BY name ASC
  `;

  var byCategory = function(name_match){
      if(name_match.length>0){
        //console.log(name_match);
        return name_match;
      }else{

        return db.any(sql_check_category);
      }
  }
  var byTag = function(category_match){
      if(category_match.length>0){
        //console.log(category_match);
        return category_match;
      }else{

        return db.any(sql_tag);
      }
  }
  */
  return db.any(sql_check_name);/*.then(match => byTag(match)
  ).catch(err => {
    console.log(err);
  });*/
}

function listByCategory(category) {
      let sql='';
      if(category=='全部'){
        sql = `
            SELECT *
            FROM fungi
            ORDER BY popularity DESC
        `;
        return db.any(sql);
      }else if(category == '其他'){
        sql = `
            SELECT *
            FROM fungi
            WHERE _phylum!='子囊菌' AND _phylum!='擔子菌' AND _phylum!='接合菌'
            ORDER BY popularity DESC
        `;
        return db.any(sql);
      }else{
        sql = `
            SELECT *
            FROM fungi
            WHERE _phylum=$1
            ORDER BY popularity DESC
        `;
        return db.any(sql, [category]);
      }

}
function getByName(name){
  const sql=`
      SELECT *
      FROM fungi
      WHERE name=$1
  `
  return db.one(sql, [name]);
}
/*
function create(subject, content, answer, isMultipleChoice, choice) {

  if(isMultipleChoice){

    const sql = `


        INSERT INTO questions (subject, content, answer, "isMultipleChoice",
          "A", "B", "C", "D", "E")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
    `;
    return db.one(sql, [subject, content, answer, isMultipleChoice,
      choice.A, choice.B, choice.C, choice.D, choice.E]);
  }else{

    const sql = `
        INSERT INTO questions ($<this:name>)
        VALUES ($<subject>, $<content>, $<answer>)
        RETURNING *
    `;
    return db.one(sql, {subject, content, answer});
  }

}

function update(id, subject, content, answer, isMultipleChoice, choice, isAssign) {
      const sql = `
          UPDATE questions
          SET subject=$1, content=$2, answer=$3, "isMultipleChoice"=$4,
          "A"=$5, "B"=$6, "C"=$7, "D"=$8, "E"=$9, "isAssign"=$10

          WHERE id=${id}
          RETURNING *

      `;
      return db.one(sql, [subject, content, answer, isMultipleChoice,
        choice.A, choice.B, choice.C, choice.D, choice.E, isAssign]);
}

function del(id) {
      const sql = `
          DELETE FROM questions
          WHERE id=${id}
      `;
      return db.none(sql);
}
*/
module.exports = {
    list,
    listByCategory,
    getByName
};
