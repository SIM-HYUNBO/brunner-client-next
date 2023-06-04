`use strict`

import * as mysql from 'mysql2'
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host     : process.env.DATABASE_SERVER_IP,
  user     : process.env.DATABASE_USER_NAME,
  password : process.env.DATABASE_PASSWORD,
  database : process.env.DATABASE_SCHEMA_NAME
});

const promisePool = pool.promise();

export const querySQL = async (sql, params)=>{
  try{
    console.log(`
==================================================
SQL:\n${sql}
--------------------------------------------------
PARAMS:
    ${JSON.stringify(params)}`)
    
    const result = await promisePool.query(sql, params);
    return result;
  }
  catch(err){
    return err;
  }
};

export const executeSQL = async (sql, params)=>{
  try{
    console.log(`
==================================================
SQL:\n${sql}\n
--------------------------------------------------
PARAMS:\n
    ${JSON.stringify(params)}`)
    
    const result = await promisePool.execute(sql, params);
    return result;
  }
  catch(err){
    return err;
  }
};
