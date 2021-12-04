class APIFeatures {

  constructor (query, queryStr) {

    this.query = query;
    this.queryStr = queryStr;
  }

  //Search
  search()
  {
  const keyword = this.queryStr.keyword ? {
    name: {
      $regex: this.queryStr.keyword,    //Search product by name // using regex so it will help to search by
                                        //one word or multiple word
      $options: 'i'                     //using 'i' for case insensitive
    } 


  } : {}

    console.log(keyword);

  this.query = this.query.find ( {...keyword });
  return this;
}

    filter()
    {
       const queryCopy = {...this.queryStr};

       
       //Removing fields from the query 

       // removing keyword because for search we dont have any keyword obj in database so we remove it 

       const removeFields = ['keyword', 'limit', 'page']
       removeFields.forEach(el => delete queryCopy[el]);
      
       

       //Advance filtering for price and rating 
       //query copy is in object so we have to convert it to string by using stringify in order to run function on it.
       let queryStr = JSON.stringify(queryCopy)

       // gt|gte etc are mongo operator so mongo operator start with $ sign so we have to add $ sign.
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

      

       this.query = this.query.find(JSON.parse(queryStr));
       return this;
    }

    pagination(resPerPage)
    {
      const currentPage = Number(this.queryStr.page) || 1;
      
      //suppose user click on 2 page so we have to skip first 10 product and show next 10 product so we use skip.
      const skip = resPerPage * (currentPage - 1);

      this.query = this.query.limit(resPerPage).skip(skip);
      return this;
    }
}

module.exports = APIFeatures