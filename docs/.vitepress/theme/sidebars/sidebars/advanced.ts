const buildChapter = {
  text: '构建工具',
  collapsed: false,
  items: [
    { text: '构建工具基础', link: '/src/dev/advanced/builder/build-base' },
  ],
}

const conceptChapter = {
  text: '概念',
  collapsed: true,
  items: [
    { text: '库？框架？', link: '/src/dev/advanced/fw-library' },
    { text: '设计模式', link: '/src/dev/advanced/design-mode' },
    { text: 'SOLID', link: '/src/dev/advanced/solid' },
    { text: 'MVVM、MVP和MVC', link: '/src/dev/advanced/mvvm' },
    { text: '纯函数与副作用', link: '/src/dev/advanced/pure-function' },
    { text: '函数式编程', link: '/src/dev/advanced/functional-program' },
  ],
}

const serverChapter = {
  text: '💻',
  collapsed: false,
  items: [
    { text: 'Linux', link: '/src/dev/advanced/linux' },
    { text: 'Chrome插件开发', link: '/src/dev/advanced/dev-chrome-extension' },
    { text: 'Electron', link: '/src/dev/advanced/electron' },
    { text: 'MySQL', link: '/src/dev/advanced/mysql' },
    { text: 'NodeJS持久化', link: '/src/dev/advanced/node-persistence.md' },
    { text: 'TypeORM', link: '/src/dev/advanced/typeorm.md' },
    { text: 'NestJS基础', link: '/src/dev/advanced/nest/nest-base.md' },
    { text: 'NestJS进阶', link: '/src/dev/advanced/nest/nest-advanced.md' },
    { text: 'NestJS实战', link: '/src/dev/advanced/nest/nest-usage.md' },
  ],
}

const toolsChapter = {
  text: '开发工具',
  collapsed: false,
  items: [
    { text: 'ESLint', link: '/src/dev/solutions/eslint' },
    { text: 'Git Commit Lint', link: '/src/dev/solutions/git-commit-lint' },
  ],
}

const configChapter = {
  text: '配置',
  collapsed: true,
  items: [
    { text: 'Typora Github主题', link: '/src/dev/solutions/typora-theme-github' },
  ],
}

const browserChapter = {
  text: '浏览器',
  collapsed: false,
  items: [

  ],
}

const networkChapter = {
  text: '网络',
  collapsed: true,
  items: [

  ],
}

const awsChapter = {
  text: 'AWS',
  collapsed: true,
  items: [
    { text: 'IAM', link: '/src/dev/advanced/aws/iam' },
    { text: 'EC2', link: '/src/dev/advanced/aws/ec2' },
    { text: 'CloudFront', link: '/src/dev/advanced/aws/cloud-front' },
    { text: 'RDS', link: '/src/dev/advanced/aws/rds' },
    { text: 'Route53', link: '/src/dev/advanced/aws/route53' },
    { text: 'S3', link: '/src/dev/advanced/aws/S3' },
    { text: 'Integration & Messaging', link: '/src/dev/advanced/aws/integration-messaging' },
    { text: 'Storage Extras', link: '/src/dev/advanced/aws/storage-extras' },
  ],
}

const dockerChapter = {
  text: 'Docker',
  collapsed: false,
  items: [
    { text: 'Docker基础', link: '/src/dev/advanced/docker/docker-base.md' },
    { text: 'Docker进阶', link: '/src/dev/advanced/docker/docker-compose.md' },
    { text: 'Docker实战', link: '/src/dev/advanced/docker/docker-usage.md' },
  ],
}


export default {
  "/src/dev/advanced/": [
    browserChapter,
    networkChapter,
    buildChapter,
    serverChapter,
    dockerChapter,
    conceptChapter,
    toolsChapter,
    awsChapter,
    configChapter,
  ]
}