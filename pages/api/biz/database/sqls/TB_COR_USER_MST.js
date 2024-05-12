`use strict`

export const select_TB_COR_USER_MST_01 =
  `SELECT SYSTEM_CODE, 
          USER_ID, 
          PASSWORD, 
          USER_NAME
     FROM BRUNNER.TB_COR_USER_MST
    WHERE USER_ID = $1
 ;`;

export const select_TB_COR_USER_MST_02 =
  `SELECT USER_TOKEN
     FROM BRUNNER.TB_COR_USER_MST
    WHERE USER_ID IN ($1)
 ;`;

export const update_TB_COR_USER_MST_01 =
  `UPDATE BRUNNER.TB_COR_USER_MST 
      SET PASSWORD = $1
    WHERE USER_ID = $2
      AND REGISTER_NO = $3
      AND PHONE_NUMBER = $4
      AND PASSWORD != $5
   ;`;


export const insert_TB_COR_USER_MST_01 =
  `INSERT INTO BRUNNER.TB_COR_USER_MST
   (SYSTEM_CODE, 
    USER_ID, 
    PASSWORD, 
    USER_NAME, 
    ADDRESS, 
    PHONE_NUMBER, 
    EMAIL_ID, 
    USE_FLAG, 
    CREATE_USER_ID, 
    CREATE_TIME, 
    UPDATE_USER_ID, 
    UPDATE_TIME,
    REGISTER_NO 
    )
   VALUES
    ($1, 
     $2, 
     $3, 
     $4, 
     $5,
     $6, 
     $7, 
     $8, 
     $9, 
     NOW(), 
     NULL, 
     NULL,
     $10
     )
   ;`;  