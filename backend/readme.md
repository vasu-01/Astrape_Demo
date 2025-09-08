# API Documentation

## User APIs

```

POST /user/signup -> Create new user

POST /user/login -> Authenticate user

```

## Product APIs

```

POST /home/addProduct -> Add new product

GET /home/products -> Get product details

GET /home/products/:id -> Get particular product details

```

```
{
    id: ObjectId,
    firstName: String,
    lastName: String,
    userName: Number,
    email: String,
    password: String,
    avatar: String,

}


```

```
{
    id: ObjectId,
    productCode: String,
    name: String,
    price: Number,
    category: String,
    bannerImg: String,
    galleryImg: [String],
    eco: Number,
    year: String,
    location: String,
    description: String,
    features: [String],
    date: String,
}


```
