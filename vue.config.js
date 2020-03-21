module.exports={
	devServer: {
	    proxy:{
	        '/api':{
	            target:'http://localhost:8080',
	            pathRewrite:{
	                '^/api':'src/common/data'
	            }
	        }
    	}
    }

}
