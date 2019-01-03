import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    login:Mock.Random.name(),
    password:Mock.Random.name(),
    username: Mock.Random.cname(),
    groupId:100061,
    groupName:'文思海辉',
    email: Mock.mock('@EMAIL()'),
    'mobile|1':['13531544954','13632250649','15820292420','15999905612'],
    sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users };
