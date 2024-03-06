module.exports = function(temp,data){
    let output = temp.replace(/{%PRICE%}/g,data.price);
    output = output.replaceAll(`{%PRODUCTNAME%}`,data.productName);
    output = output.replaceAll(`{%QUANTITY%}`,data.quantity);
    output = output.replaceAll(`{%FROM%}`,data.from);
    output = output.replaceAll(`{%IMAGE%}`,data.image);
    output = output.replaceAll(`{%DESCRIPTION%}`,data.description);
    output = output.replaceAll(`{%NUTRIENTS%}`,data.nutrients);
    output = output.replaceAll(`{%ID%}`,data.id);
    if(!data.organic) output = output.replaceAll(`{%NOT_ORGANIC%}`,'not-organic');
    return output;
}