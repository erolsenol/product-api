import sql from "mssql";
import download from "image-downloader";
import axios from "axios";
import got from "got";
//import fs from "fs;"
import jsdom from "jsdom";
import path from "path";
//image npm packed import Jimp from 'jimp';
const { JSDOM } = jsdom;



let config = {
    method: 'get',
    url: 'https://www.epey.com/',
    headers: { 
      'Cookie': '__cfduid=d5e0f89a51c8a838465e72192c7c9b32b1618991511; PHPSESSID=3b78d364e3815c42c3618f22865de71a'
    },
    timeout: 2000
  };

let dbConfig = {
    server: "localhost",
    database: "productdb",
    user: "sa",
    password: "123",
    options: {
      "encrypt": true,
      "enableArithAbort": true
    }
  };

  export const getAxios = async function () {
    console.log(await got.get("https://www.epey.com/"));
       
  }

  export const GetProductsHrefThen = function (url) {
    console.log(config);
    config.url = url;
    console.log("axi hrefs then");
    console.log(config);
    return axios(config).then((res) => {
        console.log("Dom hrefs");
        const dom =  new JSDOM(res.data);
        console.log("Hrefs[]");
        const elmHref =  dom.window.document.querySelector("a.urunadi");
        const Href = [];
        for (let a = 0; a < elmHref.length; a++) {
            Href.push(elmHref[a].href);
        }
        return Href;
    })
    .catch((error) => {
        console.log(error);
      });
}

export const GetProductsHref = async function (url) {
    console.log(config);
    config.url = url;
    console.log(config);
    const res = await axios(config);
    console.log("Dom hrefs");
    const dom = await new JSDOM(res.data);

    console.log("Hrefs[]");
    const elmHref = await dom.window.document.querySelector("a.urunadi");
    const Href = [];
    for (let a = 0; a < elmHref.length; a++) {
        Href.push(elmHref[a].href);
    }
    return Href;
}

export const PageNext = async function (url) {
    config.url = url;
    const res = await axios.get(url, {withCredentials: true});
    const dom = new JSDOM(res.data);

    const elmNextPage = dom.window.document.querySelector("a.ileri");
    var isNextPage = {
        isThere: false,
        url: null
    };
    if(elmNextPage != null){
        isNextPage.url = elmNextPage.href;
        isNextPage.isThere = true;
    }
    return isNextPage;
}

export const SearchDB = function (product_url){
    const con = sql.connect(dbConfig);

    const selectSql = `select id from product where link = '${product_url}'`
    const result = con.request().query(selectSql);

    if(result.rowsAffected[0] < 1){
        return true;
    }else { 
      return false;
    }
}

export const SearchDBAll = function (){
    const con = sql.connect(dbConfig);

    const selectSql = `select * from product`;
    const result = con.request().query(selectSql);
    console.log(result);

    if(result.rowsAffected[0] < 1){
        return true;
    }else { 
      return false;
    }
}

export const DownloadImage = function (imageUrl){
    const options = {
        url: imageUrl,
        dest: '../photos/'
    };

    let name, ext;
     download.image(options)
      .then(({ filename }) => {
        let fullName = filename;
        name = fullName.split('.').slice(0, -1).join('.');
        ext = fullName.substr(fullName.lastIndexOf('.') + 1);
      })
      .catch((err) => console.error(err));
      //return name.replace(/[^a-zA-Z0-9--]/g, '/') + "." + ext;
      return name+"."+ext;
}

export const GetDetail = async function (url) {
    config.url = url;
    const res = await axios.get(url, {withCredentials: true});
    const dom = new JSDOM(res.data);

    const productName = dom.window.document.querySelector("a[href='url']").title.replaceAll("'", "\"");

    const elmCode = dom.window.document.querySelector("span[class='kod']");
    const productCode = null;
    if(elmCode != null){
        productCode = elmCode.innerText.substr(1,elmCode.innerText.length - 2);
    }

    const productBrand = dom.window.document.querySelector("div[class='yol']").children[2].innerText;

    const elmPoint = dom.window.document.querySelector("span[class='circle-text']");
    const productPoint = null;
    if(elmPoint != null){
        productPoint = elmPoint.innerText;
    }

    const productUrl = url;

    /* const elmImageUrl = dom.window.document.querySelector("ul[class='galerik']").querySelectorAll("img");
    const productImageUrl = [];
    if(elmImageUrl != null){
        for (let a = 0; a < elmImageUrl.length; a++) {
            productImageUrl = elmImageUrl[a].src;
        }
    } */
    const elmImageUrl = dom.window.document.querySelector("div[class='buyuk row']").querySelector('img');
    const productImageUrl = [];
    if(elmImageUrl != null){
        productImageUrl = elmImageUrl.src;
    }

    const productGetDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const elmProductDetail = dom.window.document.querySelectorAll("li[class='cls0']");
    const productDetail = [];
    for (let a = 0; a < elmProductDetail.length; a++) {
        const spec = {
            name: elmProductDetail[a].children[0].innerText.replaceAll(" ", "_"),
            value: elmProductDetail[a].children[1].children[0].children[0].innerText.replaceAll(" ", "_")
        }
        productDetail.push(spec);
    }
    const productValue = {
        "long_name": productName,
        "brand": productBrand,
        "point": productPoint,
        "link": productUrl,
        "image": productImageUrl,
        "date": productGetDate,
        "json": productDetail,
        "code": productCode
    };
    return productValue;
}

export const InsertProductDB = function (product){
    const con = sql.connect(dbConfig);

    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const imagePath = DownloadImage(product.image);

    const insertSql = `insert into product (long_name, brand, point, link, image, date, json, code, category_id)
    values(
        '${product.long_name}',
        '${product.brand}',
        '${product.point}',
        '${product.link}',
        '${product.imagePath}',
        '${product.date}',
        '${product.json}',
        '${product.code}',
        '${product.cadID}'
    )`;
    con.request().query(insertSql);
}