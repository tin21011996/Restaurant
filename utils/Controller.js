/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/

'use strict';

class Controller{

	constructor(){

		this.Mongodb = require("./db");
	}

  getProductsPage(page, callback){
    var page = parseInt(page);
    var countItems = 3;
    var from = (page - 1) * countItems;
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('products').find().skip(from).limit(countItems).toArray( (err, result) => {
				callback(result);
				db.close();
			});
		});
	}

	getProducts(callback){
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('products').find().toArray( (err, result) => {
				callback(result);
				db.close();
			});
		});
	}


	addProduct(data,callback){

		var response = {};

		delete data['_id'];

		console.log(data);

		this.Mongodb.onConnect( (db,ObjectID) => {

			/* Checking if products Existsin DB starts */

			db.collection('products').findOne(data,function(err, result){

				if(err){

					response.error = true;
					response.isProductExists = false;
					response.message = `Something went Wrong,try after sometime.`;
					callback(response);

				}else{

					if(result != null ){

						response.error = true;
						response.isProductExists = true;
						response.message = `Product already exists.`;

						callback(response);

					}else{

						/* Inserting data into DB starts */

						db.collection('products').insertOne(data, (err, result) => {

							if(err){
								response.error = true;
								response.isProductExists = false;
								response.message = `Something went Wrong,try after sometime.`;
							}else{
								response.error = false;
								response.isProductExists = false;
								response.isProductAdded = true;
								response.id=result.ops[0]._id;
								response.message = `Product added.`;
							}

							callback(response);
						});

						/* Inserting data into DB ends */

					}
				}
			});

			/* Checking if products Existsin DB ends */
		});
	}



	removeProducts( productID, callback ){

		this.Mongodb.onConnect( (db,ObjectID) => {

			db.collection('products').deleteOne(
				{
					_id : new ObjectID(productID)
				},
				(err, results) => {
					if(err){
						callback({
							error : true
						});
					}else{
						callback({
							error : false
						});
					}
				}
			);

		});

	}

	updateProduct( productID , data , callback){

		this.Mongodb.onConnect( (db,ObjectID) => {

			db.collection('products').updateOne(
				{
					_id: new ObjectID(productID)
				},
				{
					$set : {
						name:data.name,
						price:data.price,
            description:data.description,
            sort_order:data.sort_order,
            urlimage:data.urlimage
					}
				}, (err, results) => {


					if(err){
						callback({
							error : true
						});
					}else{
						callback({
							error : false
						});
					}

				}
			);
		});
	}
}

module.exports = new Controller();
