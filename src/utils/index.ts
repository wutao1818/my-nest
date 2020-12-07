import connection from '../configs/mysql';

// 定义通用的promise的sql方法
export const sqlPromise = ( sql: string ) => {
  return new Promise(( resolve, reject ) => {
    connection.query(sql, (error: object, results: any, fields: any) => {
      if (error) {
        reject(error);
        throw error;
      }else{
        resolve(results);
      }
    });
    // connection.end();
  })
} 

export const responseFunc = (code: number, data: any, msg: string) => {
  return { code, data, msg } 
}