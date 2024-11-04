// https://freeimg.cn/page/api-docs.html
module.exports = (ctx) => {
  const register = () => {
	  ctx.helper.uploader.register('freeimg', {
      handle,
      config: config,
      name: 'freeimg'
    })
  }
  
  return {
    register,
	uploader: 'freeimg'
  }
}

// for user config
const config = ctx => {
  let userConfig = ctx.getConfig('picBed.freeimg');
  if (!userConfig) {
    userConfig = {};
  }
  return [{
    name: 'token',
    type: 'input',
    default: userConfig.token || '',
    required: true,
    message: '请输入freeimg token',
    alias: 'token'
  }, {
    name: 'strategies',
    type: 'list',
	choices: [1, 3],
    default: userConfig.strategies || 1,
    required: true,
    message: '请选择存储节点(1:国内节点，3:国外节点)',
    alias: '存储节点(1:国内节点，3:国外节点)'
  }, {
    name: 'permission',
    type: 'list',
	choices: [0, 1],
    default: userConfig.permission || 0,
    required: true,
    message: '请选择存储权限(1:公开，0:私有)',
    alias: '存储权限(1:公开，0:私有)'
  }];
}

const handle = async (ctx) => {
  let pluginConfig = ctx.getConfig('picBed.freeimg');
  if (!pluginConfig) {
    throw new Error("Load freeimg config failed.");
  }

  const token = pluginConfig.token;
  const permission = pluginConfig.permission;
  // 获取上传列表
  const imgList = ctx.output;
  for (let i in imgList) {
	 let img = imgList[i];
     if (img.fileName && img.buffer) {
			let image = img.buffer;
		    const postConfig = buildUploadPostOptions(ctx,  pluginConfig, image, img.fileName);
			try {
				const res = await ctx.request(postConfig)
				const body = JSON.parse(res)
				if (body.status === true) {
				  delete img.base64Image
				  delete img.buffer
				  img.imgUrl = body.data.links.url
				} else {
				  ctx.emit('notification', {
					title: '上传Freeimg图床出错!',
					body: body.message
				  })
				  throw new Error(body.message)
				}
			  } catch (e) {
				ctx.log.error(e)
				throw e
			  }
	   }
  }
  
  return ctx;
}

// 构建上传图片请求配置
const buildUploadPostOptions = (ctx, pluginConfig, image, imageName) => {
  // freeimg地址
  const helloproUrl = 'https://freeimg.cn/api/v1';
  return {
    method: 'POST',
    url: helloproUrl + '/upload',
    headers: {
	  'Authorization': 'Bearer ' + pluginConfig.token,
	  'Accept': 'application/json',
	  'contentType': 'multipart/form-data'
    },
    formData: {
      file: {
		  'value': image,
		  'options': {
			  'filename': imageName
		  }
	  },
	  strategy_id: pluginConfig.strategies,
	  permission: pluginConfig.permission
    }
  }
}