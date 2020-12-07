import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  
  getUserInfo() {
    return { data: { userName: '吴绍峰', doctorId: 1006276702 } };
  }

  getHeroList({ pageNo = 0, pageSize = 0 }) {
    return { pageNo, pageSize, data: [{name: '韩信', age: 18},{name: '李白', age: 20},{name: '玄策', age: 25}] };
  }
}
