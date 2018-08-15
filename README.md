### 项目开发记录

1. 利用create-react-app初始化了项目模板，安装必要的包

  react-router-dom ,redux, react-redux, redux-thunk

  axios, antd

  node-sass, sass-loader

2. 初步搭建项目环境后，建立远端仓库，并且将代码push到了远端仓库

3. 集中抽离路由配置

4. 利用redux结构，来创建登录状态

  在根组件App中判断路由切换的情况以及是否登录，App组件不是路由组件，无法检查到路由变化，所以使用withRouter对其处理

  使用封装好的connect函数对其处理后使其可以使用到登录状态

  在组件切换的时候已经刚刚进入路由的时候所对应的钩子函数componentWillReceiveProps/componentWillMount中判断是否登录


5. 在App中全局的配置好了我们封装好的加载spin，准备全局的进行管理，只要有请求，我们就会弹出小图标

  我们就对axios做出了二次的封装，在封装的过程中，我们把数据成功、失败的判断都一并封装起来

  并且我们在封装的axios方法中全局管控App中的Spin， 利用了事件绑定和触发机制，封装了类似于vue中bus的模块，在App中给bus绑定事件用于更改状态，在封装的axios方法中触发事件即可。