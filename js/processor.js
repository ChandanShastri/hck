var DataB;
var fadeTime = 200;

$("#ListGen").on("change",".quantity input",(function() {
  updateQuantity(this);
}));

$("#ListGen").on("click",".remove button",(function() {
  removeItem(this);
}));

function DataGen(){
  console.log('Developed by Chandan Shastri - crshastri@gmail.com');
  console.log(DataB);

  if(DataB==null)
  {
  DataB = JSON.parse(localStorage.getItem('RawData'));
  if(DataB==null)
  {
    localStorage.setItem('RawData', JSON.stringify(Data));
    DataB = JSON.parse(localStorage.getItem('RawData'));
  }
  console.log('DataB is Loaded with localStorage Data');
  $('#ListGen').each(function () {
    console.log(this);
      //updateQuantity(this);
});



  console.log(DataB);
  if(DataB!=null){
  for(i=0;i<DataB.length;i++){
    $("#ListGen").append("<div class='basket-product'><div class='item'><div class='product-image'><img src='"+DataB[i]['img_url']+"' class='product-frame'></div><div class='product-details'><h1><h5><span class='item-quantity'>"+DataB[i]['quantity']+"</span> x "+DataB[i]['name']+"</h5></h1><p><h6>Type : "+DataB[i]['type']+"</h6></p><p><h6 class='dst'>Discount : <span class='disc'>"+DataB[i]['discount']+"</span> &percnt;</h6></p><p class='tens'>Product ID - <span class='idtagr'>"+DataB[i]['id']+"</span></p></div></div><div class='price'>"+DataB[i]['price']+"</div><div class='quantity'><input type='number' value='"+DataB[i]['quantity']+"' min='1' class='quantity-field'></div><div class='subtotal'>"+DataB[i]['price']+"</div><div class='remove'><button onclick='RemoveData("+DataB[i]['id']+")'>Remove from Cart</button></div></div>");
}}
/*
$('.basket-product').each(function () {
    updateQuantity(this);
    console.log('CHECK');
});
*/


  }
  else {
    for(i=0;i<DataB.length;i++){
      $("#ListGen").append("<div class='basket-product'><div class='item'><div class='product-image'><img src='"+DataB[i]['img_url']+"' class='product-frame'></div><div class='product-details'><h1><h5><span class='item-quantity'>"+DataB[i]['quantity']+"</span> x "+DataB[i]['name']+"</h5></h1><p><h6>Type : "+DataB[i]['type']+"</h6></p><p><h6 class='dst'>Discount : <span class='disc'>"+DataB[i]['discount']+"</span> &percnt;</h6></p><p class='tens'>Product ID - <span class='idtagr'>"+DataB[i]['id']+"</span></p></div></div><div class='price'>"+DataB[i]['price']+"</div><div class='quantity'><input type='number' value='"+DataB[i]['quantity']+"' min='1' class='quantity-field'></div><div class='subtotal'>"+DataB[i]['price']+"</div><div class='remove'><button onclick='RemoveData("+DataB[i]['id']+")'>Remove from Cart</button></div></div>");
  }
  }




}





$(document).ready(function() {
  DataGen();
  updateSumItems();
  updateQuantity();
  recalculateCart();
});




function RemoveData(d){
console.log('Index of '+d);
for(i=0;i<DataB.length;i++)
{
  if(DataB[i]['id']==d)
  {
    console.log('Item Deleted');
    console.log(DataB[i]);
    M.toast({html: DataB[i]['name']+' &nbsp has been deleted from the Cart'});
  DataB.splice(i,1);
  break;
}

}

console.log(DataB);
localStorage.setItem('RawData', JSON.stringify(DataB));
console.log('Changes saved to Local Storage.')
}



function recalculateCart(onlyTotal) {
  var subtotal = 0;


  $('.basket-product').each(function() {
    subtotal += parseFloat($(this).children('.subtotal').text());
  });


  var total = subtotal;
 var discount=total*(0.12);

 var tdiscount=total*(0.04);
 total=total-discount-tdiscount;

  if (onlyTotal) {

    $('.total-value').fadeOut(fadeTime, function() {
      $('#basket-total').html(total.toFixed(2));
      $('.total-value').fadeIn(fadeTime);
    });
  } else {

    $('.final-value').fadeOut(fadeTime, function() {
      $('#basket-subtotal').html(subtotal.toFixed(2));
      $('#basket-total').html(total.toFixed(2));
      $('#basket-discount').html(discount.toFixed(2));
      $('#basket-tdiscount').html(tdiscount.toFixed(2));
      if (total == 0) {
        $('.checkout-cta').fadeOut(fadeTime);
      } else {
        $('.checkout-cta').fadeIn(fadeTime);
      }
      $('.final-value').fadeIn(fadeTime);
    });
  }
}





function reloadData(){
  document.getElementById('ReloadItem').innerHTML="";
  console.log('Data Loaded from Original JSON');
  localStorage.setItem('RawData', JSON.stringify(Data));
  DataB = JSON.parse(localStorage.getItem('RawData'));
  DataGen();
  updateSumItems();
  updateQuantity();
  recalculateCart();
}






function updateQuantity(quantityInput) {

  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.price').text());
  var idtag = parseInt(productRow.children('.idtagr').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;


var productIDtag = $(quantityInput).parent().parent();
var idtag = parseInt(productIDtag.children('.item').children('.product-details').children('.tens').children('.idtagr').text());

  console.log(idtag);
  for(i=0;i<DataB.length;i++)
  {
    if(DataB[i]['id']==idtag)
    {
      console.log('Item Quantity Updated');
      DataB[i]['quantity']=quantity;
      console.log(DataB[i]);
      localStorage.setItem('RawData', JSON.stringify(DataB));
    break;
  }
  }



  productRow.children('.subtotal').each(function() {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });

  productRow.find('.item-quantity').text(quantity);
  updateSumItems();
}

function updateSumItems() {
  var sumItems = 0;
  $('.quantity input').each(function() {
    sumItems += parseInt($(this).val());
  });
  $('.total-items').text(sumItems);
  if(sumItems==0)
  {
    document.getElementById('ReloadItem').innerHTML="<br><br><button class='checkout-ctc' onclick='reloadData()'>Reload JSON Data</button>";
  }
}


function removeItem(removeButton) {

  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
    updateSumItems();

  });
}
