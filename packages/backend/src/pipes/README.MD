### This folder contains custom pipes to validate specific type of data

Reference: https://docs.nestjs.com/pipes

Definition: Pipe is a class that validate and transform the input coming from `req.body`, `req.param` or `req.query`

Example: http://localhost:5500/nft/:id
We can use the `ParseIntPipe` already built by Nest (exported from `@nestjs/common`) to validate this id:

1. To make sure it is a numberic string (everything we get from `req.param` or `req.query` is type `string`).
2. If it is not, throw `Bad Request Exception`.
3. If is is, transform it into number.
4. `Controller` and `Service` can now use it directly as a number.
