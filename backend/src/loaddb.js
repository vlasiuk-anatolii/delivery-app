const products = [
    {
      id: 1,
      idShop: 1,
      name: "BurgerBig",
      price: 2.4,
      discount: 5,
      imageUrl: "images/products/Screenshot_1.jpg"
    },
    {
      id: 2,
      idShop: 2,
      name: "BurgerCooL",
      price: 2.34,
      discount: 2,
      imageUrl: "images/products/Screenshot_2.jpg"
    },
    {
      id: 3,
      idShop: 3,
      name: "BurgerTop",
      price: 2.17,
      discount: 1,
      imageUrl: "images/products/Screenshot_3.jpg"
    },
    {
      id: 4,
      idShop: 4,
      name: "BurgerSmall",
      price: 2.23,
      discount: 2,
      imageUrl: "images/products/Screenshot_4.jpg"
    },
    {
      id: 5,
      idShop: 1,
      name: "BurgerBob",
      price: 2.38,
      discount: 5,
      imageUrl: "images/products/Screenshot_5.jpg"
    },
    {
      id: 6,
      idShop: 2,
      name: "BurgerCoOoL",
      price: 2.38,
      discount: 2,
      imageUrl: "images/products/Screenshot_6.jpg"
    },
    {
      id: 7,
      idShop: 3,
      name: "BurgerTor",
      price: 2.17,
      discount: 1,
      imageUrl: "images/products/Screenshot_7.jpg"
    },
    {
      id: 8,
      idShop: 4,
      name: "BurgerSS",
      price: 2.22,
      discount: 2,
      imageUrl: "images/products/Screenshot_8.jpg"
    },
    {
      id: 9,
      idShop: 4,
      name: "Burger12Small",
      price: 2.33,
      discount: 2,
      imageUrl: "images/products/Screenshot_9.jpg"
    },
    {
      id: 10,
      idShop: 1,
      name: "BurgerJhon",
      price: 2.44,
      discount: 5,
      imageUrl: "images/products/Screenshot_10.jpg"
    },
    {
      id: 11,
      idShop: 2,
      name: "BurgerDDD",
      price: 2.54,
      discount: 2,
      imageUrl: "images/products/Screenshot_11.jpg"
    },
    {
      id: 12,
      idShop: 3,
      name: "BurgerTorrr",
      price: 2.67,
      discount: 1,
      imageUrl: "images/products/Screenshot_12.jpg"
    },
    {
      id: 13,
      idShop: 4,
      name: "BurgerSSun",
      price: 2.73,
      discount: 2,
      imageUrl: "images/products/Screenshot_13.jpg"
    },
    {
      id: 14,
      idShop: 1,
      name: "BurgerJhonDeer",
      price: 2.8,
      discount: 4,
      imageUrl: "images/products/Screenshot_14.jpg"
    },
    {
      id: 15,
      idShop: 2,
      name: "BurgerDog",
      price: 1.94,
      discount: 1,
      imageUrl: "images/products/Screenshot_15.jpg"
    },
    {
      id: 16,
      idShop: 3,
      name: "BurgerToy",
      price: 2.07,
      discount: 1,
      imageUrl: "images/products/Screenshot_16.jpg"
    },
    {
      id: 17,
      idShop: 4,
      name: "BurgerSom",
      price: 2.73,
      discount: 1,
      imageUrl: "images/products/Screenshot_17.jpg"
    },
    {
      id: 18,
      idShop: 1,
      name: "BurgerJek",
      price: 2.65,
      discount: 3,
      imageUrl: "images/products/Screenshot_18.jpg"
    },
    {
      id: 19,
      idShop: 2,
      name: "BurgerDark",
      price: 2.54,
      discount: 1,
      imageUrl: "images/products/Screenshot_19.jpg"
    },
    {
      id: 20,
      idShop: 3,
      name: "BurgerTresh",
      price: 2.97,
      discount: 1,
      imageUrl: "images/products/Screenshot_20.jpg"
    }
  ];

  const shops = [
    { 
      id: 1,
      name: "Myastoriya", 
      description: "М'ясторія - мережа Steak and Grill. Територія відбірних українських стейків! Можна замовити стейки, м'ясо і готові м'ясні страви. М'ясторія - справжнього м'яса територія!", 
      href: "https://myastoriya.com.ua/ua/", 
      iconurl: "https://myastoriya.com.ua/local/templates/new/img/fav/favicon-32x32.png",
      lat: 50.4299540620848, 
      lng: 30.48681073538455, 
    },
    { 
      id: 2,
      name: "Frozenfood UA", 
      description: "Frozenfood UA – надійний виробник і постачальник гамбургерів і чизбургеров для роздрібних магазинів і каналу HORECA.", 
      href: "https://frozenfood.com.ua/", 
      iconurl: "https://frozenfood.com.ua/wp-content/uploads/2019/12/favic.png",
      lat: 50.3967261782231, 
      lng: 30.478711089256752,  
    },
    { 
      id: 3,
      name: "Auchan", 
      description: "У гіпермаркеті Ашан ви знайдете широкий вибір продуктів харчування, включно зі свіжими овочами та фруктами, молочними продуктами, м'ясом і рибою, солодощами та закусками, а також алкогольними напоями.", 
      href: "https://auchan.zakaz.ua/uk/", 
      iconurl: "https://auchan.zakaz.ua/i/favicon/favicon-32x32.png" ,
      lat: 50.41225870265747, 
      lng: 30.522155121854574,  
    },
    { 
      id: 4,
      name: "MrGrill", 
      description: "Mr.Grill — відомий український бренд хот-догів зі справжнього м‘яса. Це смачний та зручний перекус у шаленому ритмі міста. Саме Mr.Grill впровадив культуру споживання хот-догів в Україні.", 
      href: "https://mrgrill.ua/", 
      iconurl: "https://mrgrill.ua/favicons/favicon-32x32.png?v=3",
      lat: 50.45100458987734, 
      lng: 30.52600993044236, 
    },
   { 
      id: 5,
      name: "McDonald's", 
      description: "McDonald's — всесвітньовідомий бренд, який забезпечує смачний, швидкий і зручний перекус у шаленому ритмі міста.", 
      href: "https://www.mcdonalds.com/ua/uk-ua.html", 
      iconurl: "https://www.mcdonalds.com/content/dam/sites/ua/nfl/icons/apppageCornerLogo.png",
      lat: 50.75608955603963, 
      lng: 25.358397397490076, 
    }
  ]
  





import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: '1711',
  database:'Products'
});

client.connect();

async function insertProduct(id, idShop, name, price, discount, imageUrl) {
    const query = {
      text: 'INSERT INTO products (id, idshop, name, price, discount, imageurl) VALUES ($1, $2, $3, $4, $5, $6)',
      values: [id, idShop, name, price, discount, imageUrl]
    };
  
    await client.query(query);
  };

  async function insertShop(id, name, description, href, iconurl, lat, lng ) {
    const query = {
      text: 'INSERT INTO shops (id, name, description, href, iconurl, lat, lng) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      values: [id, name, description, href, iconurl, lat, lng]
    };
  
    await client.query(query);
  };


// products.forEach(item => insertProduct(item.id, item.idShop, item.name, item.price, item.discount, item.imageUrl));
shops.forEach(item => insertShop(item.id, item.name, item.description, item.href, item.iconurl, item.lat, item.lng));