import express from 'express';
import multer from "multer";

class PermitRouter {
	constructor(permitController, authService, env) {
		this.permitController = permitController;
		this.authService = authService;
		this.storage = multer.diskStorage({
			destination: function (req, file, cb) {
			  cb(null, env.fileUploadPath)
			},
			filename: function (req, file, cb) {
				const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
				cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').at(-1)) //Appending extension
			}
		  })
		this.multer = multer({ storage: this.storage });
	}

	getRouter() {
		const router = express.Router();
		router.route('/').get(this.authService.authorizeStudent, this.permitController.getPermits);
		router.route('/').post([this.authService.authorizeStudent, this.multer.single('img_file')], this.permitController.createPermit);
		router.route('/').put([this.authService.authorizeStudent, this.multer.single('img_file')], this.permitController.updatePermit);
		router.route('/').delete(this.authService.authorizeStudent, this.permitController.deletePermit);
		return router; 
	}
}

export default PermitRouter;