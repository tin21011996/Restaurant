/*
* Angular 2 CRUD application using Nodejs
* @autthor Shashank Tiwari
*/

'use strict';
const controller = require("./Controller");
const wineCtr = require("./wineCtr");
const categoryCtr = require("./CategoryCtr");

class Routes{

	constructor(app){
		this.app = app;
	}

	/* creating app Routes starts */
	appRoutes(){
    /* Route to add new product starts*/
		this.app.get('/api/products/:page',(request,response) =>{
      controller.getProductsPage( request.params.page, (result) => {
        if (result) {
          response.status(200).json({
          products:result
        });
      }else{
        response.status(404).json({
          message:`No usres found.`
        });
      }
    });
  });
  /* Route to add new product ends*/


  /* Route to get all products starts*/
  this.app.get('/api/categories/',(request,response) =>{

          categoryCtr.getCategories( (result) => {
            if (result) {
              response.status(200).json({
                products:result
              });
            }else{
              response.status(404).json({
                message:`No usres found.`
              });
            }
          });
        });
        /* Route to get all products ends*/

    /* Route to add new category starts*/
		this.app.post('/api/categories/',(request,response) =>{


      categoryCtr.addCategory( request.body , (result)=>{

                if (result.error) {

                  response.status(403).json({
                    error : true,
                    message : `Error.`
                  });

                } else{

                  categoryCtr.getCategories( (result) => {
                    if (result) {
                      response.status(200).json({
                        error : false,
                        categories:result
                      });
                    }else{
                      response.status(404).json({
                        error : true,
                        message:`No usres found.`
                      });
                    }
                  });
                };
              });
          });
    /* Route to add new category ends*/

    /* Route to delete category starts*/
		this.app.delete('/api/categories/:id',(request,response) =>{

            if (request.params.id && request.params.id!='') {

              categoryCtr.removeCategories( request.params.id, (result)=>{

                if (result.error) {

                  response.status(403).json({
                    error : true,
                    message : `Error.`
                  });

                } else{

                  categoryCtr.getCategories( (result) => {
                    if (result) {
                      response.status(200).json({
                        error : false,
                        categories:result
                      });
                    }else{
                      response.status(404).json({
                        error : true,
                        message:`No usres found.`
                      });
                    }
                  });


                };

              });

            }else{
              response.status(403).json({
                error : true,
                message : `Invalid category Id.`
              });
            }
          });
    /* Route to delete category ends*/

    /* Route to update category starts*/
		this.app.put('/api/categories/:id',(request,response) =>{


            if (request.params.id && request.params.id!='') {

              categoryCtr.updateCategory( request.params.id, request.body , (result)=>{

                if (result.error) {

                  response.status(403).json({
                    error : true,
                    message : `Error.`
                  });

                } else{


                  categoryCtr.getCategories( (result) => {
                    if (result) {
                      response.status(200).json({
                        error : false,
                        categories:result
                      });
                    }else{
                      response.status(404).json({
                        error : true,
                        message:`No usres found.`
                      });
                    }
                  });


                };

              });

            }else{
              response.status(403).json({
                error : true,
                message : `Invalid category Id.`
              });
            }
          });
    /* Route to update category ends*/

		/* Route to get all products starts*/
		this.app.get('/api/products',(request,response) =>{

			controller.getProducts( (result) => {
				if (result) {
					response.status(200).json({
						products:result
					});
				}else{
					response.status(404).json({
						message:`No usres found.`
					});
				}
			});
		});
		/* Route to get all products ends*/


		/* Route to add new product starts*/
		this.app.post('/api/products/',(request,response) =>{


				controller.addProduct( request.body , (result)=>{

					if (result.error) {

						response.status(403).json({
							error : true,
							message : `Error.`
						});

					} else{

						controller.getProducts( (result) => {
							if (result) {
								response.status(200).json({
									error : false,
									products:result
								});
							}else{
								response.status(404).json({
									error : true,
									message:`No usres found.`
								});
							}
						});
					};
				});
		});
		/* Route to add new product ends*/


		/* Route to delete product starts*/
		this.app.delete('/api/products/:id',(request,response) =>{

			if (request.params.id && request.params.id!='') {

				controller.removeProducts( request.params.id, (result)=>{

					if (result.error) {

						response.status(403).json({
							error : true,
							message : `Error.`
						});

					} else{

						controller.getProducts( (result) => {
							if (result) {
								response.status(200).json({
									error : false,
									products:result
								});
							}else{
								response.status(404).json({
									error : true,
									message:`No usres found.`
								});
							}
						});


					};

				});

			}else{
				response.status(403).json({
					error : true,
					message : `Invalid product Id.`
				});
			}
		});
		/* Route to delete product ends*/


		/* Route to update product starts*/
		this.app.put('/api/products/:id',(request,response) =>{


			if (request.params.id && request.params.id!='') {

				controller.updateProduct( request.params.id, request.body , (result)=>{

					if (result.error) {

						response.status(403).json({
							error : true,
							message : `Error.`
						});

					} else{


						controller.getProducts( (result) => {
							if (result) {
								response.status(200).json({
									error : false,
									products:result
								});
							}else{
								response.status(404).json({
									error : true,
									message:`No usres found.`
								});
							}
						});


					};

				});

			}else{
				response.status(403).json({
					error : true,
					message : `Invalid product Id.`
				});
			}
		});
		/* Route to update product ends*/

    /* Route to get all wines starts*/
		this.app.get('/api/wines',(request,response) =>{

            wineCtr.getWines( (result) => {
              if (result) {
                response.status(200).json({
                  wines:result
                });
              }else{
                response.status(404).json({
                  message:`No usres found.`
                });
              }
            });
          });
          /* Route to get all wines ends*/


          /* Route to add new wine starts*/
          this.app.post('/api/wines/',(request,response) =>{


              wineCtr.addWine( request.body , (result)=>{

                if (result.error) {

                  response.status(403).json({
                    error : true,
                    message : `Error.`
                  });

                } else{

                  wineCtr.getWines( (result) => {
                    if (result) {
                      response.status(200).json({
                        error : false,
                        wines:result
                      });
                    }else{
                      response.status(404).json({
                        error : true,
                        message:`No usres found.`
                      });
                    }
                  });
                };
              });
          });
          /* Route to add new wine ends*/


          /* Route to delete wine starts*/
          this.app.delete('/api/wines/:id',(request,response) =>{

            if (request.params.id && request.params.id!='') {

              wineCtr.removeWines( request.params.id, (result)=>{

                if (result.error) {

                  response.status(403).json({
                    error : true,
                    message : `Error.`
                  });

                } else{

                  wineCtr.getWines( (result) => {
                    if (result) {
                      response.status(200).json({
                        error : false,
                        wines:result
                      });
                    }else{
                      response.status(404).json({
                        error : true,
                        message:`No usres found.`
                      });
                    }
                  });


                };

              });

            }else{
              response.status(403).json({
                error : true,
                message : `Invalid wine Id.`
              });
            }
          });
          /* Route to delete wine ends*/


          /* Route to update wine starts*/
          this.app.put('/api/wines/:id',(request,response) =>{


            if (request.params.id && request.params.id!='') {

              wineCtr.updateWine( request.params.id, request.body , (result)=>{

                if (result.error) {

                  response.status(403).json({
                    error : true,
                    message : `Error.`
                  });

                } else{


                  wineCtr.getWines( (result) => {
                    if (result) {
                      response.status(200).json({
                        error : false,
                        wines:result
                      });
                    }else{
                      response.status(404).json({
                        error : true,
                        message:`No usres found.`
                      });
                    }
                  });


                };

              });

            }else{
              response.status(403).json({
                error : true,
                message : `Invalid wine Id.`
              });
            }
          });
          /* Route to update wine ends*/
	}

	routesConfig(){
		this.appRoutes();
	}
}
module.exports = Routes;
