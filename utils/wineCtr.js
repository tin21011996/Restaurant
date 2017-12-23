/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/

'use strict';

class WineCtr{

	constructor(){

		this.Mongodb = require("./db");
	}

	getWines(callback){
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('wines').find().toArray( (err, result) => {
				callback(result);
				db.close();
			});
		});
	}


	addWine(data,callback){

		var response = {};

		delete data['_id'];

		console.log(data);

		this.Mongodb.onConnect( (db,ObjectID) => {

			/* Checking if wines Existsin DB starts */

			db.collection('wines').findOne(data,function(err, result){

				if(err){

					response.error = true;
					response.isWineExists = false;
					response.message = `Something went Wrong,try after sometime.`;
					callback(response);

				}else{

					if(result != null ){

						response.error = true;
						response.isWineExists = true;
						response.message = `Wine already exists.`;

						callback(response);

					}else{

						/* Inserting data into DB starts */

						db.collection('wines').insertOne(data, (err, result) => {

							if(err){
								response.error = true;
								response.isWineExists = false;
								response.message = `Something went Wrong,try after sometime.`;
							}else{
								response.error = false;
								response.isWineExists = false;
								response.isWineAdded = true;
								response.id=result.ops[0]._id;
								response.message = `Wine added.`;
							}

							callback(response);
						});

						/* Inserting data into DB ends */

					}
				}
			});

			/* Checking if wines Existsin DB ends */
		});
	}



	removeWines( wineID, callback ){

		this.Mongodb.onConnect( (db,ObjectID) => {

			db.collection('wines').deleteOne(
				{
					_id : new ObjectID(wineID)
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

	updateWine( wineID , data , callback){

		this.Mongodb.onConnect( (db,ObjectID) => {

			db.collection('wines').updateOne(
				{
					_id: new ObjectID(wineID)
				},
				{
					$set : {
						name:data.name,
						price:data.price,
            description:data.description,
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

module.exports = new WineCtr();
