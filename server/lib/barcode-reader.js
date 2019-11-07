require('dotenv').config({ path: '../.env'});

const apiKey = 'SEM3571ACC0CCD2E22DD74DE5E0B55CCDFE5';
const apiSecret = process.env.SEMANTICS3_SECRET;
const sem3 = require('semantics3-node')(apiKey, apiSecret)


/**
 * Returns product information for a given UPC barcode
 * 
 * @param {string} barcode The UPC barcode for a product
 * @return {json} Product information
 */
const getProduct = (barcode, callback) => {
  const method = 'GET';
  const endpoint = 'products';
  const jsonStr = `{"upc" : "${barcode}"}`;
  sem3.run_query(endpoint, jsonStr, method, (err, products) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      const response = JSON.parse(products);
      if (response.results.length < 1) {
        callback({
          success: false,
          result: response.message
        })
      } else {
        const result = response.results[0];
        callback({
          success: true,
          result
        });
      }
      
    }
  })
}

module.exports = { getProduct }