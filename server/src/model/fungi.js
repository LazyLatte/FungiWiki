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

module.exports = {
    list,
    listByCategory,
    getByName
};
