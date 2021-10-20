class APIFeatures {

  constructor (query, queryStr) {

    this.query = query;
    this.queryStr = queryStr;
  }

  //Search
  Search()
  {
  const Keyword = this.queryStr.Keyword ? {
    name: {
      $regex: this.queryStr.keyword,
      $options: 'i'

    }


  } : {}

  console.log(Keyword);

  this.query = this.query.find ( {...Keyword });
  return this;
}
}

module.exports = APIFeatures