const fs = require('fs'); //file system
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate'); // in require '.' refers to root folder

///////////////////////////////////////////////////////////////////////

// FILES

// sync
// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);

// const textOut = `This is what we know about avocado :\n ${textIn}\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('File written');


// async
// fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
//     if(err) return console.log('ERROR');
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
//             console.log(data3);
//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err=>{
//                 console.log('file has been written !!');
//             })
//         })
//     })
// })

///////////////////////////////////////////////////////////////////////

// SERVER
//  NODE FARM PROJECT



const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');


// __dirname->location of file   .->where the script is running
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8'); 
const dataObj = JSON.parse(data);

// const slugs = dataObj.map(ele=>slugify(ele.productName,{lower:true}));
// console.log(slugs);

const server = http.createServer((req,res)=>{

    // console.log(req.url);
    // const pathName = req.url;
    const {query,pathname} = url.parse(req.url,true);

    // overview page
    if(pathname === '/' || pathname === '/overview'){
        const cardData = dataObj.map(ele=>replaceTemplate(tempCard,ele)).join('');
        const output = tempOverview.replace(`{%PRODUCT_CARDS%}`,cardData);
        res.end(output);
    }

    //product page
    // M1
    // else if(pathName.startsWith('/product')){
    //     for(let i =0 ; i<5 ; i++){
    //         if(pathName===`/product?id=${i}`){
    //             const product = replaceTemplate(tempProduct,dataObj[i]);
    //             res.end(product);
    //         }
    //     }
    // }
    //M2
    else if(query.id){
        const product = replaceTemplate(tempProduct,dataObj[query.id]);
        res.end(product);
    }

    // API
    else if(pathname==='/api'){
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(data);
    }

    // Not found
    else {
        res.writeHead(404,{
            'Content-Type':'text/html', //browser expecting html
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
})

server.listen(8000,'127.0.0.1',()=>{
    console.log('Listening to requests on port 8000');
})