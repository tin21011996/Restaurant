/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/

'use strict';

class CategoryCtr{

	constructor(){

		this.Mongodb = require("./db");
	}

	getCategories(callback){
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('categories').find().toArray( (err, result) => {
				callback(result);
				db.close();
			});
		});
	}


	addCategory(data,callback){

		var response = {};

		delete data['_id'];

		console.log(data);

		this.Mongodb.onConnect( (db,ObjectID) => {

			/* Checking if categories Existsin DB starts */

			db.collection('categories').findOne(data,function(err, result){

				if(err){

					response.error = true;
					response.isCategoryExists = false;
					response.message = `Something went Wrong,try after sometime.`;
					callback(response);

				}else{

					if(result != null ){

						response.error = true;
						response.isCategoryExists = true;
						response.message = `Category already exists.`;

						callback(response);

					}else{

						/* Inserting data into DB starts */

						db.collection('categories').insertOne(data, (err, result) => {

							if(err){
								response.error = true;
								response.isCategoryExists = false;
								response.message = `Something went Wrong,try after sometime.`;
							}else{
								response.error = false;
								response.isCategoryExists = false;
								response.isCategoryAdded = true;
								response.id=result.ops[0]._id;
								response.message = `Category added.`;
							}

							callback(response);
						});

						/* Inserting data into DB ends */

					}
				}
			});

			/* Checking if categories Existsin DB ends */
		});
	}



	removeCategories( categoryID, callback ){

		this.Mongodb.onConnect( (db,ObjectID) => {

			db.collection('categories').deleteOne(
				{
					_id : new ObjectID(categoryID)
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

	updateCategory( categoryID , data , callback){

		this.Mongodb.onConnect( (db,ObjectID) => {

			db.collection('categories').updateOne(
				{
					_id: new ObjectID(categoryID)
				},
				{
					$set : {
						name:data.name,
						parent_id:data.parent_id,
            sort_order:data.sort_order,
            href: data.href
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

module.exports = new CategoryCtr();
