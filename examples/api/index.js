export const getTableBasicList = (params) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        content: [
          {
            id: 1,
            name: '测试名字过长测试名字过长测试名字过长测试名字过长测试名字过长测试名字过长测试名字过长测试名字过长',
            createDate: '2010-02-02',
            checkbox: true,
            no: 2,
            type: '区域',
            ajax: 1,
            project: 1362,
            projectName: 'HH',
            orgCode: 'S000030',
            orgName: '烟台',
            caseName: '烟台基地',
            caseCode: 'S000030',
            userCode: 'code',
            userName: 'name',
            userList: [
              { name: 'name', code: 'code' },
              { name: 'name', code: 'code2' }
            ],
            switch: true,
            checkBox: true
          },
        ],
        page: 0,
        size: 10,
        totalPages: 2,
        totalElements: 16
      })
    }, 1000)
  ).then((res) => {
    return { data: res }
  })
}
