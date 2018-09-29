var fadeTime = 200;

$("#ListGen").on("change",".quantity input",(function() {
  updateQuantity(this);
}));

$("#ListGen").on("click",".remove button",(function() {
  removeItem(this);
}));

$(document).ready(function() {
  for(i=0;i<Data.length;i++)
  $("#ListGen").append("<div class='basket-product'><div class='item'><div class='product-image'><img src='"+Data[i]['img_url']+"' class='product-frame'></div><div class='product-details'><h1><strong><span class='item-quantity'>1</span> x "+Data[i]['name']+"</strong></h1><p><strong>Type : "+Data[i]['type']+"</strong></p><p><strong>Discount : "+Data[i]['discount']+" &percnt;</strong></p><p>Product ID - "+Data[i]['id']+"</p></div></div><div class='price'>"+Data[i]['price']+"</div><div class='quantity'><input type='number' value='1' min='1' class='quantity-field'></div><div class='subtotal'>"+Data[i]['price']+"</div><div class='remove'><button>Remove from Cart</button></div></div>");
  updateSumItems();
});


/* Recalculate cart */
function recalculateCart(onlyTotal) {
  var subtotal = 0;

  /* Sum up row totals */
  $('.basket-product').each(function() {
    subtotal += parseFloat($(this).children('.subtotal').text());
  });

  /* Calculate totals */
  var total = subtotal;

  /*If switch for update only total, update only total display*/
  if (onlyTotal) {
    /* Update total display */
    $('.total-value').fadeOut(fadeTime, function() {
      $('#basket-total').html(total.toFixed(2));
      $('.total-value').fadeIn(fadeTime);
    });
  } else {
    /* Update summary display. */
    $('.final-value').fadeOut(fadeTime, function() {
      $('#basket-subtotal').html(subtotal.toFixed(2));
      $('#basket-total').html(total.toFixed(2));
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

  for(i=0;i<Data.length;i++)
  $("#ListGen").append("<div class='basket-product'><div class='item'><div class='product-image'><img src='"+Data[i]['img_url']+"' class='product-frame'></div><div class='product-details'><h1><strong><span class='item-quantity'>1</span> x "+Data[i]['name']+"</strong></h1><p><strong>Type : "+Data[i]['type']+"</strong></p><p><strong>Discount : "+Data[i]['discount']+" &percnt;</strong></p><p>Product ID - "+Data[i]['id']+"</p></div></div><div class='price'>"+Data[i]['price']+"</div><div class='quantity'><input type='number' value='1' min='1' class='quantity-field'></div><div class='subtotal'>"+Data[i]['price']+"</div><div class='remove'><button>Remove from Cart</button></div></div>");
  updateSumItems();
  updateQuantity();
  recalculateCart();
}


/* Update quantity */
function updateQuantity(quantityInput) {
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.price').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;

  /* Update line price display and recalc cart totals */
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

/* Remove item from cart */
function removeItem(removeButton) {
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
    updateSumItems();

  });
}
