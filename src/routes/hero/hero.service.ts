import { Injectable } from '@nestjs/common';
import { responseFunc, sqlPromise } from '../../utils';

const TABLE_HERO_USER = `hero_user`;

@Injectable()
export class HeroService {
  /**
   * @description: 根据heroCode查询人物
   * @param {*} heroCode
   */
  async getHero( heroCode: string ) {
    try {
      const res = await sqlPromise(`SELECT * FROM ${TABLE_HERO_USER} WHERE hero_code = ${heroCode};`).catch(err => {
        return responseFunc(500, null, `service error: ${err}`);
      });
      // console.log(` ========= getHero ========= `, res);
      return responseFunc(200, res[0] || '', 'success');
    } catch(err) {
      return responseFunc(503, null, `service error: ${err}`);
    };
  }



  /**
   * @description: 查询所有人物列表
   * @param {*} pageNo
   * @param {*} pageSize
   */
  async getHerosList({ pageNo = 0, pageSize = 0 }) {
    try {
      const res = await sqlPromise(`SELECT * FROM ${TABLE_HERO_USER}`).catch(err => {
        return responseFunc(500, null, `service error: ${err}`);
      });
      // console.log(` ========= getHerosList ========= `, res);
      return responseFunc(200, res || '', 'success');
    } catch(err) {
      return responseFunc(503, null, `service error: ${err}`);
    };
  }

  

  /**
   * @description: 新增一个新人物
   * @param {*} heroName
   * @param {*} heroJob
   * @return {*} 
   */  
  async addHero({ heroName, heroJob }) {
    try {
      const resall = await sqlPromise(`SELECT * FROM ${TABLE_HERO_USER}`);
      const heroList = JSON.parse(JSON.stringify(resall));
      const heroCode = String(parseInt(heroList[heroList.length-1].hero_code) + 1);
      const sql = `INSERT INTO ${TABLE_HERO_USER} (hero_name, hero_code, hero_job) VALUES ('${heroName}', '${heroCode}' , '${heroJob}')`;
      await sqlPromise(sql).catch(err => {
        return responseFunc(500, null, `service error: ${err}`);
      });

      return responseFunc(200, true, 'success');
    } catch(err) {
      return responseFunc(503, null, `service error: ${err}`);
    };
  }


  
  /**
   * @description: 修改人物数据
   * @param {*} body
   * @return {*}
   */
  async updateHero({ heroName, heroJob, heroCode }) {
    try {
      // if(!heroCode) return responseFunc(400, `heroCode不能为空`, 'fail');
      const sqlheroName = heroName ? `hero_name='${heroName}',` : '';
      const sqlheroJob = heroJob ? `hero_job='${heroJob}'` : '';
      const sqlStr = `${sqlheroName}${sqlheroJob}`;
      const sql = `UPDATE ${TABLE_HERO_USER} set ${sqlStr} WHERE hero_code=${heroCode}`;
      await sqlPromise(sql).catch(err => {
        return responseFunc(500, null, `service error: ${err}`);
      });
      // console.log(` ========= updateHero ========= `, res);

      return responseFunc(200, true, 'success');
    } catch(err) {
      return responseFunc(503, null, `service error: ${err}`);
    };
  }



  /**
   * @description: 根据heroCode删除人物
   * @param {*} heroCode
   * @return {*}
   */ 
  async deleteHero({ heroCode }){
    try {
      // if(!heroCode) return responseFunc(400, `heroCode不能为空`, 'fail');
      const sql = `DELETE FROM ${TABLE_HERO_USER} WHERE hero_code=${heroCode}`;
      await sqlPromise(sql).catch(err => {
        return responseFunc(500, null, `service error: ${err}`);
      });
      // console.log(` ========= deleteHero ========= `, res);

      return responseFunc(200, true, 'success');
    } catch(err) {
      return responseFunc(503, null, `service error: ${err}`);
    };
  }

 
}
