/* 2019.09.23 kang nuri */
/* autocomplete.js */

function smttCitySearch(_id) {
    var _url = "http://ibedemo.topas.net:20000/air/b2c/AIR/AAA/AIRAAATRP010001007001.k1xml";
    $(_id).autocomplete({
        source:function(request, response) {
            $.ajax({
                type:'get',
                url : _url + "?searchtext=" + encodeURI($(_id).val()) + "&biztype=&KSESID=air:b2c:SELK138TI:SELK138TI::00",
                dataType: 'xml',
                success:function (xmlResponse) {
                    var citys = [];
                    var num = 1;
                    $(xmlResponse).find('vocomcd130').each(function() {
                        citys.push(
                            {
                               'airportkornm' : $(this).find('airportkornm').text(),
                               'airportcd' : $(this).find('airportcd').text(),
                               'nationkornmtooltip' : $(this).find('nationkornmtooltip').text(),
                               'citykornm' : $(this).find('citykornm').text()
    
                            });
                        num++;
                        if(num == 11) return false;
                    });
                    console.log(citys);
                    response(
                        citys
                    );
                }
            })
        },
        minLength: 2,
        search:function(event, ui) {
          var isSelect = $(this).attr('isSelect');
          isSelect = (typeof isSelect == "undefined") ? 0 : isSelect;
    
          if(isSelect == 1) {
              console.log('선택 직후 처리X');
          }
        },
        focust: function(event, ui) {
          event.preventDefault();
        },
        select: function(event, ui) {
            event.preventDefault();
            $(_id).val(ui.item.airportkornm + "/" + ui.item.nationkornmtooltip + " (" + ui.item.airportcd + ")");
            $(this).attr('isSelect', 1);
    
            setTimeout(function(obj) {
                $(obj).attr('isSelect', 0);
            }, 500, this);
        }
    }).autocomplete("instance")._renderItem = function(ul, item) {
        console.log(ul);
        return $("<li>")
            .append("<p><span>" + item.airportkornm  + "</span>("+ item.airportcd + ")</p>")
            .append("<p class='ct_country'>" + item.nationkornmtooltip+"</p>")
            .appendTo(ul);
    }
    ;
}