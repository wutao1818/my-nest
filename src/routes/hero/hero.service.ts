import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { responseFunc, sqlPromise } from '../../utils';
import { Response } from './interfaces/index';
import { TABLE_HERO_USER } from '../../configs/tables';


@Injectable()
export class HeroService {

  /**
   * @description: 根据heroCode查询人物
   * @param {*} heroCode
   */
  async getHero( heroCode ): Promise<Response> {
    const res = await sqlPromise(`SELECT * FROM ${TABLE_HERO_USER} WHERE hero_code = ${heroCode};`);

    return responseFunc(200, res[0] || '', 'success');
  }



  /**
   * @description: 根据输入的姓名查询英雄
   * @param {*} heroName
   */
  async queryHeroByName( heroName ): Promise<Response> {
    const val = heroName.trim();
    const data = await sqlPromise(`SELECT * FROM ${TABLE_HERO_USER}`);
    const heroList = JSON.parse(JSON.stringify(data)); // 获取英雄列表
    const arr = heroList.filter(item => {
      if(item.hero_name.includes(val)){
        return item;
      }
    });

    return responseFunc(200, arr, 'success');
  }



  /**
   * @description: 查询所有人物列表
   * @param {*} pageNo
   * @param {*} pageSize
   */
  async queryHerosList({ pageNo = 0, pageSize = 0 }): Promise<Response> {
    const res = await sqlPromise(`SELECT * FROM ${TABLE_HERO_USER}`);

    return responseFunc(200, res || '', 'success');
  }
  


  /**
   * @description: 根据职业查询列表
   * @param {*} jobType
   */
  async queryHeroByJobtype( jobType ): Promise<Response> {
    const res = await sqlPromise(`SELECT * FROM ${TABLE_HERO_USER} WHERE job_type = ${jobType}`);

    return responseFunc(200, res || '', 'success');
  }



  /**
   * @description: 新增一个新人物
   * @param {*} heroName
   * @param {*} heroJob
   * @return {*} 
   */  
  async addHero({ heroName, heroJob }): Promise<Response> {
    const resall = await sqlPromise(`SELECT * FROM ${TABLE_HERO_USER}`);
    const heroList = JSON.parse(JSON.stringify(resall));
    const heroCode = String(parseInt(heroList[heroList.length-1].hero_code) + 1);
    const sql = `INSERT INTO ${TABLE_HERO_USER} (hero_name, hero_code, hero_job) VALUES ('${heroName}', '${heroCode}' , '${heroJob}')`;
    await sqlPromise(sql);

    return responseFunc(200, true, 'success');
  }


  
  /**
   * @description: 修改人物数据
   * @param {*} body
   */
  async updateHero({ heroName, heroJob, heroCode }): Promise<Response> {
    const sqlheroName = heroName ? `hero_name='${heroName}',` : '';
    const sqlheroJob = heroJob ? `hero_job='${heroJob}'` : '';
    const sqlStr = `${sqlheroName}${sqlheroJob}`;
    const sql = `UPDATE ${TABLE_HERO_USER} set ${sqlStr} WHERE hero_code=${heroCode}`;
    await sqlPromise(sql);

    return responseFunc(200, true, 'success');
  }



  /**
   * @description: 根据heroCode删除人物
   * @param {*} heroCode
   */ 
  async deleteHero( heroCode ): Promise<Response> {
    const sql = `DELETE FROM ${TABLE_HERO_USER} WHERE hero_code=${heroCode}`;
    await sqlPromise(sql);
    
    return responseFunc(200, true, 'success');
  }

 
}
