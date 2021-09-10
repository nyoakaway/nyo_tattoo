let tattooShop = null
let applyTattoo = null
let atualPart = 'head'

$(document).ready(function() {
    document.onkeydown = function(data) {
        if (data.keyCode == 27) {
            $('footer').html('');
            $(".loja-de-tattoo").fadeOut();
            $('#total').html('0'); 
            change = {};
            $.post('http://nyo_tattoo/reset', JSON.stringify({}))           
        }
    }

     $("#leftHeading").click(function() {
        $.post('http://nyo_tattoo/leftHeading', JSON.stringify({ value: 10 }));
    })

    $("#handsUp").click(function() {
        $.post('http://nyo_tattoo/handsUp', JSON.stringify({}));
    })

    $("#rightHeading").click(function() {
        $.post('http://nyo_tattoo/rightHeading', JSON.stringify({ value: 10 }));
    })

    $("#payament").click(function() {
        $(".loja-de-tattoo").fadeOut()
        $.post('http://nyo_tattoo/payament', JSON.stringify({ price: $('#total').text() }));
        $('#total').html('0');
        applyTattoo = null;
        tattooShop = null
    }) 

    window.addEventListener('message', function(event) {
        let item = event.data;
        if (item.openNui) {
            tattooShop = item.shop;
            applyTattoo = item.tattoo
            $(".loja-de-tattoo").fadeIn()
            $('footer').html('')

            if (tattooShop[atualPart]){
                if (tattooShop[atualPart].active){
                    for (var i = 0; i <= (tattooShop[atualPart].tattoo.length - 1); i++) {
                        let partName = tattooShop[atualPart].tattoo[i].name; 
                        let dlcName = tattooShop[atualPart].tattoo[i].part; 
                        let customname = tattooShop[atualPart].tattoo[i].cname;
                        let price = tattooShop[atualPart].tattoo[i].price;
                            $("footer").append(`
                                <div class="item-tattoo" data-partname="${partName}" data-partid="${i}" data-parttype="${atualPart}" onclick="select(this)" id="${atualPart}${i}">
                                    <div class="img-tattoo" style="background-image: url('https://127.0.0.1/${atualPart}/${dlcName}/${partName}.jpg')">  
                                        <div class="overlay">
                                            <span>${i} ${customname} ${price}</span>
                                        </div>
                                    </div>
                                </div>
                            `);

                        if(applyTattoo[partName]){
                            select2(i);
                        }
                    }
                }                
            }
        }

        if (item.atualizaPrice) {
            $('#total').html(item.price) 
        }       
    })
});

function updateLoja(atualPart) {
    $('footer').html('')
    if (tattooShop[atualPart]){
        if (tattooShop[atualPart].active){
            for (var i = 0; i <= (tattooShop[atualPart].tattoo.length - 1); i++) {
                let partName = tattooShop[atualPart].tattoo[i].name; 
                let dlcName = tattooShop[atualPart].tattoo[i].part; 
                let customname = tattooShop[atualPart].tattoo[i].cname;
                let price = tattooShop[atualPart].tattoo[i].price;
                    $("footer").append(`
                        <div class="item-tattoo" data-partname="${partName}" data-partid="${i}" data-parttype="${atualPart}" onclick="select(this)" id="${atualPart}${i}">
                            <div class="img-tattoo" style="background-image: url('https://127.0.0.1/${atualPart}/${dlcName}/${partName}.jpg')">  
                                <div class="overlay">
                                <span>${i} - ${customname}</span>
                                </div>
                            </div>
                        </div>
                    `);

                    if(applyTattoo[partName]){
                        select2(i);
                    }
            }
        }       
    }
}

function update_valor() {
    const formatter = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 })
    let total = 0
    for (let key in change) { if (!change[key] == 0) { total += 40 } }
    $('#total').html(formatter.format(total))
}


function selectPart(element) {
    atualPart = element.dataset.idpart
    let dataPart = element.dataset.title
    $('header h1').html(dataPart)
    $('.submenu-item').find('img').css('filter', 'brightness(100%)')
    $('.submenu-item').removeClass('subActive')
    $(element).addClass('subActive')
    updateLoja(atualPart)
}

function select(element) {
    partId = element.dataset.partid;
    partName = element.dataset.partname;
    partType = element.dataset.parttype;

    if(applyTattoo[partName]){
        applyTattoo[partName] = null;
    }else{
        applyTattoo[partName] = true;
    }
    
    if( $(`#${atualPart}${partId}`).find('.overlay').css("background-color") == 'rgb(12, 150, 31)') {
        $(`#${atualPart}${partId}`).css("border", "0");
        $(`#${atualPart}${partId}`).find('.overlay').css("background-color", "rgba(0, 0, 0, 0.507)");
    }else{
        $(`#${atualPart}${partId}`).css("border", "1px solid #85a016");
        $(`#${atualPart}${partId}`).find('.overlay').css("background-color", "#0c961f");
    }    

    $.post('http://nyo_tattoo/changeTattoo', JSON.stringify({ type: partName, id: partId, type: partType }));    
}

function select2(id) {
    if( $(`#${atualPart}${id}`).find('.overlay').css("background-color") == 'rgb(12, 150, 31)') {
        $(`#${atualPart}${id}`).css("border", "0");
        $(`#${atualPart}${id}`).find('.overlay').css("background-color", "rgba(0, 0, 0, 0.507)");
    }else{
        $(`#${atualPart}${id}`).css("border", "1px solid #85a016");
        $(`#${atualPart}${id}`).find('.overlay').css("background-color", "#0c961f");
    }    
}
