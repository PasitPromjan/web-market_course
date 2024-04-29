var product =[{
    id:0,
    img:'https://f4.bcbits.com/img/a0544875558_65',
    name:'vessels' ,
    price:5000,
    descript:'vessels Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium, quod? Quas eius alias incidunt dolorum aliquid aliquam, omnis odio quibusdam doloremque vitae aspernatur id veritatis facilis sint temporibus dolor doloribus.'

},{
    id:1,
    img:'https://lastfm.freetls.fastly.net/i/u/ar0/0770b1d19ae14aa0cad1c1c3bd185dee.jpg' ,
    name:'tranmissions',
    price:6000,
    descript:'transmissions Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium, quod? Quas eius alias incidunt dolorum aliquid aliquam, omnis odio quibusdam doloremque vitae aspernatur id veritatis facilis sint temporibus dolor doloribus.' 
},{
    id:2,
    img:'https://images.genius.com/0b0928d1d739038a0cb9bdf8138ab422.1000x1000x1.png',
    name:'divisions',
    price:7000,
    descript:'divisions Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium, quod? Quas eius alias incidunt dolorum aliquid aliquam, omnis odio quibusdam doloremque vitae aspernatur id veritatis facilis sint temporibus dolor doloribus.'
}];

$(document).ready(() => {
    var box ='';
    for(let i=0;i<product.length; i++){
        box+= `<div  class="product-items">
        <div class="face face3">
            <div class="product-up">
                <p class="product-name">${product[i].name}</p>
                <p class="product-price">${numberwithComma(product[i].price)}</p>
            </div>    
        </div>
        <div class="face face1">
            <img class="product-img" src="${product[i].img}">
            
        </div>   
        <div class="face face2">
            <div class="product-down">
                <button onclick="checkindex(${i}); addtoCart();" class="button-17" role="button">ใส่ตะกร้า</button>
                <button onclick="openProductDetail(${i})" class="button-17" role="button" style="margin-left: 2vw;">รายละเอียด</button>
            </div>
        </div>
    </div>`;
    }
    $("#productlist").html(box);
})

function numberwithComma(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)){
        x = x.replace(pattern,"$1,$2");
    }
    return x;
}


var productindex = 0 ;
function openProductDetail(index){
    productindex = index;
    console.log(productindex);
    $("#productDesc").css('display', 'flex');
    $("#pd-img").attr('src', product[index].img);
    $("#pd-name").text(product[index].name);
    $("#pd-price").text( numberwithComma(product[index].price) +' THB');
    $("#pd-desc").text(product[index].descript);
}

function closeDetail() {
    $("#productDesc").css('display', 'none');
}

function checkindex(indexx){
    productindex = indexx;
}

var cart = [];
function addtoCart() {
    var pass = true;

    for(let i = 0;i<cart.length; i++){
        if(productindex == cart[i].index){
            cart[i].count++;
            pass = false;
        }
    }

    if(pass) {
        var obj ={
            index: productindex,
            id: product[productindex].id,
            img: product[productindex].img,
            name:product[productindex].name,
            price:product[productindex].price,
            count: 1
        };
        cart.push(obj)
    }
    console.log(cart)

    Swal.fire({
        icon: 'success',
        title: 'Add To Cart'
    })

    $("#cartcount").css('display','flex').text(cart.length)
    closeDetail();
    rendercart();
}

var checkCart = false; 
function checkcart(){
    if(checkCart == true){
        closecart();
        checkCart = false
    }
    else{
        opencart();
        checkCart = true
    }
}

function opencart(){
    $('.modalCart').css('transform','translateY(0px)')
}

function closecart(){
    $('.modalCart').css('transform','translateY(200px)')

}

function rendercart() {
    if(cart.length > 0) {
        var html = '';
        for(let i=0;i< cart.length; i++){
            html += `<div class="cartlist-items">
            <div class="cartlist-up">
                    <img src="${cart[i].img}">
                <div class="cartlist-detail">
                    <p>${cart[i].name}</p>
                    <p>${numberwithComma(cart[i].price * cart[i].count)}</p>
                    <div class="cartlist-amount">
                        <p onclick="deinitems('-', ${i})" class="btnc">-</p>
                        <p id="countitems${i}" style="margin: 0 20px;">${cart[i].count}</p>
                        <p onclick="deinitems('+', ${i})" class="btnc">+</p>
                    </div>
                </div>
            </div>                         
        </div>`
        }
        $("#mycart").html(html)
    }


}

function deinitems(action, index) {
    if(action == '-') {
        if(cart[index].count > 0) {
            cart[index].count--;
            $("#countitems"+index).text(cart[index].count)

            if(cart[index].count <= 0) {
                Swal.fire({
                    icon: 'warning',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel'
                }).then((res) => {
                  if(res.isConfirmed) {
                     cart.splice(index, 1) 
                     console.log(cart)
                     rendercart();
                     $("#cartcount").css('display','flex').text(cart.length)
                     
                     if(cart.length <= 0) {
                        $("#cartcount").css('display','none')
                     }
                  }  
                  else {
                    cart[index].count++;
                    $("#countitems"+index).text(cart[index].count)
                    rendercart();
                  }
                })
            }
            rendercart();
        }
        
    }
    else if(action == '+') {
        cart[index].count++;
        $("#countitems"+index).text(cart[index].count)
        rendercart();
    }
}