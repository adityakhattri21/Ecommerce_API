class ApiFeatures{
    constructor(query,queryString){
        this.query = query; // it contains the model on which we have to perform the query.
        this.queryString = queryString;

    }
   
    search() {
        
        const keyword = this.queryString.keyword ? {
            name:{
                $regex:this.queryString.keyword, //search with the keyword in it.
                $options:'i' //means search is now case in-sensitive . Both of these are a part of MongoDB
            },
        } : {}
        this.query = this.query.find({...keyword});
        return this; //we have returned this class here.
    }

    filter(){
        const queryCopy = {...this.queryString};
        //removing some fields from the query
        const removeFields = ["keyword","page","limit"]
        removeFields.forEach(key=> delete queryCopy[key]);
        //converting queryString into string to give it a feature of less than and greater than.
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g , (replace)=>`$${replace}`) //since mongoDB uses
        // $gt,$gte,$lt,$lte to search the database.
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resultPerPage *(currentPage-1) ;
         this.query = this.query.limit(resultPerPage).skip(skip);
         return this;
    }
}

module.exports = ApiFeatures;