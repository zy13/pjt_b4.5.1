------------------
##评鉴通企业管理后台触屏版

> 简要需求

供评鉴通企业用户在pc端以外，可便利地完成一些基本功能，如项目管理、账户管理、测评结果管理等，可供app直接访问。

> 项目范围

独立项目，架构重新搭建，相关环境搭建与配置（开发，测试，预生产，生产），约30-40页面，页面复杂度中等，交互难度中等，联调难度较难。

> 项目周期

共16周，每2周一次迭代，人均每周2-3个页面（含交互）的产出。

> 项目质量

每2周的迭代包含测试与发布，进行修正和控制；前4周为基础构建，不以可视化结果为产出，包含2周方案讨论，会议间隔2-3天，2周架构搭建；而后每2周进行部分功能上线，上线内容依后续安排；

> 前端概要设计

	技术选用考量因素

	1）适用性：适合产品使用场景，利于需求及开发团队目标的实现；
	2）可用性：技术成熟，参考文档详实可用，疑难较易解决；
	3）低成本：团队学习成本适中，维护成本适中，无需额外成本；
	4）创新性：保持新技术主流，基于已有项目经验的改进；

1.	前后端分离技术架构，以node作为站点服务器和静态资源服务器，与基于java架构的api服务器对接；

	```
		适用性：★★★★☆
		可用性：★★★
		低成本：★★★☆
		创新性：★★★★★
	```

2.	静态资源打包技术，gulp环境配置，webpack依赖构建及代码压缩等；

	```
		适用性：★★★★★
		可用性：★★★★
		低成本：★★★★☆
		创新性：★★★★☆
	```
3.	最大程度利用react：采用react+node实现同构及组件化；最小程度利用react：为了能使用cui及旧jade公用模板而放弃react同构，但新组件开发仍可使用；建议同构只做尝试性使用，如页面头尾，组件化使用react；

	`
		适用性：★★★★
		可用性：★★★★
		低成本：★★★★
		创新性：★★★★
	`
4. 后续优化可选技术：memCache缓存部分请求数据，减小对api服务器的压力及提升请求效率；cdn服务器处理静态资源的请求，将静态资源服务器从站点分离，减小对node服务器压力并提升页面性能；分布式主机的引用，进一步提升站点性能，服务器在memCache中共享数据；



> 周期安排

- Phase 1（前4周）：细化方案并实施

	项目结构

		|-- app
			|-- core
			|-- dal
			|-- dataSet
			|-- vm
			|-- service
		|-- routes
		|-- views
			|-- main
			|-- user
			|--	error
			|-- accountCenter
			|-- reportCenter 
		|-- static
			|-- app
				|-- src
					|-- pages
						|-- main
						|-- user
						|-- error
						|-- accountCenter
						|-- reportCenter
					|-- components
					|-- dal
					|-- dataSet
					|-- core
				|-- img
				|-- lib
		|-- tools
			|-- config
		app.js
		staticDevServer.js

	部署结构

		|-- current --> source
		|-- share
		|-- source
			|-- 项目结构

	逻辑结构

		访问路径规划与本地页面映射
		1. 站点路径最长为3，路径不含企业个性域名可进一步缩短；
		2. 按照功能及模块划分；
		3. 主入口为项目管理首页(main)，用户上下文涉及个人中心(user)，项目管理可进入账户管理(accountCenter)、测评结果管理(reportCenter)；

		|-- /
			-->  /main/index

			|-- /user
				-->  /user/login

				|-- /user/login
					-->  /user/login

				|-- /user/info
					-->  /user/info

				|-- /user/about
					-->  /user/about

			|-- /:domain
				-->  /main/index

				|-- /:domain/index
					-->  /main/index

				|-- /:domain/accountCenter
					-->  /accountCenter/index

					|-- /:domain/accountCenter/sub
						-->  /accountCenter/subPage

				|-- /:domain/reportCenter
					-->  /reportCenter/index

					|-- /:domain/reportCenter/sub
						-->  /reportCenter/subPage

		静态资源引用逻辑
		1. 静态资源实际路径由koa-static开放，引用路径生成在assets.json中，由webpack完成映射；
		2. 以页面为单位，页面与每个打包后生成的静态资源一一对应，静态资源内部依赖由webpack关联打包；

			|-- /assets/page.min.[hash].js
				-->  /static/assets/page.min.[hash].js
  
			|-- /assets/page.min.[hash].css
				-->  /static/assets/page.min.[hash].css

			|-- /assets/img.[hash].jpg
				--> /static/assets/img.[hash].jpg

	其逻辑结构决定了项目可进一步分离成两部分，其一负责服务器搭建、站点路由、数据通信、首屏渲染、会话管理、日志管理等，是为服务器端程序，简称“服务端”；另一负责页面静态资源依赖构建、编译打包等，是为客户端程序，简称“客户端”。
					

	服务端：node框架koa，底层（http通信、log日志、session管理、辅助工具等），数据层(dal，dataSet)，视图模型层，服务层，视图层，路由，中间件，静态资源服务器等。服务端项目结构如下：

		|-- app
			|--	底层相关 core
			|-- 数据层相关 dal，dataSet
			|-- 视图模型层相关 vm
			|-- 服务层相关 service
		|-- routes
		|-- views
		app.js
		staticDevServer.js
		

	客户端：以页面为入口打包静态资源，输出静态资源类型：css，js，img；页面级js关心业务流程，组件级js实现有限功能；页面及组件都依赖于客户端的数据通信及底层工具。客户端项目结构如下：

		|-- src
			|-- 页面相关 pages
			|-- 组件相关 components
			|-- 底层相关 core
			|-- 数据相关 dal，dataSet
		|-- img
		|-- lib

	环境搭建：部署项目到对应服务器，npm部署管理，pm2发布管理

	P.S：
	
	1）针对技术点1的补充，接口对接规则

		i. 考虑到安全性，客户端接口调用不直接请求api服务器，而通过node隔离，是否需要独立的node服务器尚待决定；
		   若不独立，则服务端app需增加一层gate层；客户端dal -> gate -> 服务端dal -> api；
		ii. 以RAP书写的规则为准；

	2）针对技术点3的补充，React介绍

		i. React是典型MVVM框架，作用于MVC架构的View，革命性模板引擎；
		ii. 可以实现的技术目标，同构：服务端与客户端复用模板，维持架构的简洁与统一，提高开发与维护效率；组件化：同构与模块化的基础，提高复用性；
		iii. 技术优势，双向数据绑定（props,state），单项数据流保证数据与视图的逻辑顺序，虚拟DOM以减少无谓的DOM操作。
	 

- Phase 2（中8周）：功能及流程实现

	以分期发布的功能为准，2周更新，包含切图、交互、联调与测试。

	考虑到频繁发布的需要，充分利用git flow的工作流，主干分支=master，开发分支=develop，同时开发多个新功能需从develp开feature分支，修复问题需从master开hotfix分支，周期上线需从develop开release分支；如果只上测试，公用develop分支即可。

	期间含架构优化，尽量避免重构。

- Phase 3（后4周）：残留问题修复与统一测试

	上一阶段每期残留bug应该限制在3级以下且维持在较低数目（2-4）；

	本阶段对bug优先级及类别进行划分，流程 > 功能 > 样式 > 文案；


	---
	***6/30/2016 5:34:03 PM*** 