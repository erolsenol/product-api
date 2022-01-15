import {
    GetProductsHref,
    PageNext,
    SearchDB,
    InsertProductDB,
    GetDetail,
    GetProductsHrefThen,
    SearchDBAll,
    getAxios,
} from "./src/lib/epey.js";

import jsdom from "jsdom";
const { JSDOM } = jsdom;

// (() => {
//  getAxios();
// })();

async function GetProducts(Url, catID) {


            do {
      let nowUrl = Url;
        const productsHres = await GetProductsHrefThen(Url);
        for (let a = 0; a < productsHres.length; a++) {
            if (await SearchDB(productsHres[a])) {
                console.log(productsHres[a].substr(21));
                const productDetails = await GetDetail(productsHres[a]);
                productDetails.catid = catID;
                await InsertProductDB(productDetails);
            }
        }
        console.log("if over");
        const nextPage = await PageNext(Url);
        Url = nextPage.url;
    } while (await nextPage.isThere);
}
(async () => {
  await GetProducts("https://www.epey.com/bulasik-makinesi/", 64);
})();


// GetProducts("https://www.epey.com/akilli-telefonlar/", 1);

   //GetProducts("https://www.epey.com/sanal-gerceklik/", 51);
   //GetProducts("https://www.epey.com/camasir-makinesi/", 65);
   //GetProducts("https://www.epey.com/kurutma-makinesi/", 66);
   //GetProducts("https://www.epey.com/buzdolabi/", 68);
   //GetProducts("https://www.epey.com/derin-dondurucu/", 69);
   //GetProducts("https://www.epey.com/su-sebili/", 70);
   //GetProducts("https://www.epey.com/ocak/", 72);
   //GetProducts("https://www.epey.com/firin/", 73);
   
   //GetProducts("https://www.epey.com/mini-firin/", 74);
   //GetProducts("https://www.epey.com/mikrodalga-firin/", 75);
   //GetProducts("https://www.epey.com/davlumbaz-aspirator/", 76);
   //GetProducts("https://www.epey.com/klima/klima-tipi/duvar-tipi/", 80);
   //GetProducts("https://www.epey.com/klima/klima-tipi/salon-tipi/", 81);
   //GetProducts("https://www.epey.com/vantilator/", 82);
   //GetProducts("https://www.epey.com/kombi/", 84);
   //GetProducts("https://www.epey.com/isitici/", 85);
   //GetProducts("https://www.epey.com/sofben/", 86);
   //GetProducts("https://www.epey.com/oda-termostati/", 87);
   //GetProducts("https://www.epey.com/blender/", 91);
   //GetProducts("https://www.epey.com/kati-meyve-sikacagi/", 92);
   //GetProducts("https://www.epey.com/kiyma-makinesi/", 93);
   //GetProducts("https://www.epey.com/mikser/", 94);
   //GetProducts("https://www.epey.com/mutfak-robotu/", 95);
   //GetProducts("https://www.epey.com/narenciye-sikacagi/", 96);
   //GetProducts("https://www.epey.com/rondo/", 97);
   //GetProducts("https://www.epey.com/kahve-makinesi/", 98);
   //GetProducts("https://www.epey.com/cay-makinesi/", 100);
   //GetProducts("https://www.epey.com/su-isiticisi/", 101);
   //GetProducts("https://www.epey.com/caydanlik/", 102);
   //GetProducts("https://www.epey.com/cok-amacli-pirisici/", 105);
   //GetProducts("https://www.epey.com/buharli-pisirici/", 106);
   //GetProducts("https://www.epey.com/fritoz/", 107);
   //GetProducts("https://www.epey.com/elektrikli-tava/", 108);
   //GetProducts("https://www.epey.com/yumurta-pisirme-makinesi/", 109);
   //GetProducts("https://www.epey.com/misir-patlatma-makinesi/", 110);
   //GetProducts("https://www.epey.com/elektrikli-izgara/", 112);
   //GetProducts("https://www.epey.com/tost-makinesi/", 113);
   //GetProducts("https://www.epey.com/waffle-makinesi/", 114);
   //GetProducts("https://www.epey.com/tencere-ve-tava/", 115);
   //GetProducts("https://www.epey.com/duduklu-tencere/", 116);
   //GetProducts("https://www.epey.com/davul-firin/", 117);
   //GetProducts("https://www.epey.com/ekmek-kizartma-makinesi/", 118);
   //GetProducts("https://www.epey.com/ekmek-yapma-makinesi/", 119);
   //GetProducts("https://www.epey.com/yemek-takimi/", 120);
   //GetProducts("https://www.epey.com/kahvalti-takimi/", 121);
   //GetProducts("https://www.epey.com/catal-kasik-bicak-takimi/", 122);
   //GetProducts("https://www.epey.com/bicak/", 123);
   //GetProducts("https://www.epey.com/yogurt-makinesi/", 124);
   //GetProducts("https://www.epey.com/kahve-ve-baharat-ogutucu/", 125);
   //GetProducts("https://www.epey.com/mutfak-terazisi/", 126);
   //GetProducts("https://www.epey.com/termos/", 127);
