# Implementation of query a mongoose model instances by property , search , sort , select and by value of the provided property 
## eg (price > 50)

## to run : npm run start,
## The app will run on localhost:3000
## development data is in utils/products.json
## error handling packages : http-errors , http-status-codes

# file/folder structure
<img src="/utils/store.png" />

## product.controller.js 

1. implementation of querying by property : line(30-34)
2. implementation of search : (line:34-36)
3. implementation of sort : (line:40-49)
   <p>
    if sorting = price -rating then output will follow  <br/> 
    if price is equal then arrange products in descending order
   </p>
4. implementation of fields :(line:51-58)
5. implementation of querying the data by value with >,>=,<,<= operators : line:(60-89)
6. implementation of pagination : line(93-97)

## wrapper.js
This file contains the implementation of wrapper function which helps to avoid the try-catch block



