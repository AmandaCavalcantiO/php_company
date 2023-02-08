$(function () {
    //############## GET CEP
    $('.wc_getCep').on('change', function () {
        var cep = $(this).val().replace('-', '').replace('.', '');
        if (cep.length === 8) {
            $.get("https://viacep.com.br/ws/" + cep + "/json", function (data) {
                if (!data.erro) {
                    $('.cep_district').val(data.bairro);
                    $('.cep_complement').val(data.complemento);
                    $('.cep_city').val(data.localidade);
                    $('.cep_address').val(data.logradouro);
                    $('.cep_uf').val(data.uf);
                }
            }, 'json');
        }
    });

    //############## MASK INPUT
    if ($('.formDate').length || $('.formTime').length || $('.formCep').length || $('.formCpf').length || $('.formPhone').length || $('.formCnpj').length || $('.formPercent').length || $('.formMoney').length) {

        $(".formDate").mask("99/99/9999");
        $(".formTime").mask("99/99/9999 99:99");
        $(".formCep").mask("99999-999");
        $(".formCpf").mask("999.999.999-99");
        $(".formCnpj").mask("99.999.999/9999-99");
        $(".formPercent").mask("99%");
        $(".formMoney").mask("#.##0,00", { reverse: true });

        var SPMaskBehavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        }, spOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(SPMaskBehavior.apply({}, arguments), options);
            }
        };
        $('.formPhone').mask(SPMaskBehavior, spOptions);
    }

    /*############## DATEPICKER*/
    if ($('.jwc_datepicker').length) {
        $("head").append('<link rel="stylesheet" href="' + BASE + '/_cdn/datepicker/datepicker.min.css">');
        $.getScript(BASE + '/_cdn/datepicker/datepicker.min.js');
        $.getScript(BASE + '/_cdn/datepicker/datepicker.pt-BR.js', function () {
            $('.jwc_datepicker').datepicker({
                language: 'pt-BR',
                autoClose: true
            });
        });
    }

    /*############## WC TAB  CUSTOM BY ALISSON*/
    $('html').on('click', '.wc_tab', function () {
        if (!$(this).hasClass('wc_active')) {
            var WcTab = $(this).attr('href');
            $('.wc_tab').removeClass('wc_active');
            $(this).addClass('wc_active');
            $('.wc_tab_target.wc_active').fadeOut(200, function () {
                $(WcTab).fadeIn(200).addClass('wc_active');
            }).removeClass('wc_active');
        }
        if (!$(this).hasClass('wc_active_go')) { return false; }
    });

    /*############## WC ACCORDION*/
    $('.wc_accordion').click(function () {
        $('.wc_accordion_toogle_active').slideUp(200, function () { $(this).removeClass('wc_accordion_toogle_active'); });
        $(this).find('.wc_accordion_toogle:not(.wc_accordion_toogle_active)').slideToggle(200).addClass('wc_accordion_toogle_active');
    });
    $('.wc_accordion div').click(function (e) { e.stopPropagation(); });
    /*############## HIGHLIGHT*/
    if ($('*[class="brush: php;"]').length) {
        $("head").append('<link rel="stylesheet" href="' + BASE + '/_cdn/highlight.min.css">');
        $.getScript(BASE + '/_cdn/highlight.min.js', function () { $('*[class="brush: php;"]').each(function (i, block) { hljs.highlightBlock(block); }); });
    }
    /*############## MODAL BOX*/
    if ($('*[rel*="shadowbox"]').length) {
        $("head").append('<link rel="stylesheet" href="' + BASE + '/_cdn/shadowbox/shadowbox.css">');
        $.getScript(BASE + '/_cdn/shadowbox/shadowbox.js', function () { Shadowbox.init(); });
    }

    /*############### CAPITALIZE TEXT FORMS*/
    //Call function *ucfirts or ucwords* for capitalize input[type=text]
    //keyup -> ao soltar a tecla
    $("form.form_capitalize textarea").keyup(function () {
        // force: true to lower case all letter except first
        let cp_value = ucfirst($(this).val(), true);
        $(this).val(cp_value);
    });
    // blur -> ao sair do campo
    $("form.form_capitalize input[type='text']").blur(function () {
        // to capitalize all word
        let cp_value = capitalize($(this).val());
        $(this).val(cp_value);
    });

    //Call function *lowercase* for lowercase input[type=email]
    $("form.form_capitalize input[type='email']").keyup(function () {
        let email = lowercase($(this).val());
        $(this).val(email);
    });


    //OTIMIZA TITULO DOS PRODUTOS (FACEBOOK/GOOGLE - LIMIT)
    $(".title_optimize").on("keyup click", function () {
        let limite = $(this).attr('maxlength');
        let caracteresDigitados = $(this).val().length;

        let caracteresRestantes = (parseInt(limite) - parseInt(caracteresDigitados));

        if (parseInt(caracteresDigitados) <= 65) {
            $(".chars").css('background-color', 'lawngreen').text(caracteresRestantes);
        } else {
            $(".chars").css('background-color', 'yellow').text(caracteresRestantes);
        }
    });

    //CONTADOR DE CARACTERES (SEO - LIMIT)
    $(".contador").on("keyup click", function () {
        let limite = $(this).attr('maxlength');
        let caracteresDigitados = $(this).val().length;

        let caracteresRestantes = (parseInt(limite) - parseInt(caracteresDigitados));
        $(".caracteres").text(caracteresRestantes);
    });
});

//############## ON READY
$(document).ready(function () {

    //Coloca asterisco Vermelho nos Inputs required
    $(":not(input[typeof='radio'], input[typeof='checkbox']):required").prev().prepend('<b class="font_red">* </b>');

    //Muda a Classe do Pai dos input[type='radio']:: label.label_check (de fa fa-circle para  icon-radio-checked) caso esteja :checked
    $("form input[type='radio']").each(function (index, element) {
        if ($(this).is(':checked')) {
            $(this).parent().removeClass('icon-radio-unchecked').addClass(' icon-radio-checked');
            $(this).parent().siblings().not("span").removeClass(' icon-radio-checked').addClass('icon-radio-unchecked');
        }
    });

    //Muda a Classe do Pai dos input[type='checkbox']:: label.label_check (de fa fa-square para icon-checkbox-checked) caso esteja :checked
    $("form input[type='checkbox']").each(function (index, element) {
        if ($(this).is(':checked')) {
            $(this).parent().removeClass('icon-checkbox-unchecked').addClass('icon-checkbox-checked');
            //REMOVE A CLASSE DO BOTÃO ON/OFF
            if ($(this).parent().hasClass('switch')) {
                $(this).parent().removeClass('icon-checkbox-checked');
            }
        }
    });

    if ($('.trigger-sucess').length) {
        setTimeout(function () {
            window.location.href = 'http://localhost/php_books/v7/index.php?class=PersonList'
        }, 2000);
    }

    //OTIMIZA TITULO (FACEBOOK/GOOGLE - LIMIT)
    if ($(".title_optimize").length) {
        let limite = $(".title_optimize").attr('maxlength');
        let caracteresDigitados = $(".title_optimize").val().length;
        let caracteresRestantes = (parseInt(limite) - parseInt(caracteresDigitados));


        var limitChars = $(".contador").attr('maxlength');
        var counterChar = $(".contador").val();
        var resultChars = (parseInt(limitChars) - parseInt(counterChar.length));

        if (caracteresDigitados <= 65) {
            $(".chars").css('background-color', 'lawngreen').text(caracteresRestantes);
        } else {
            $(".chars").css('background-color', 'yellow').text(caracteresRestantes);
        }
        $(".caracteres").text(resultChars);

    }

});

/*TEXT FUNCTION*/
function ucfirst(str, force) {
    str = force ? str.toLowerCase() : str;
    return str.replace(/(\b)([a-zA-Z])/, function (firstLetter) {
        return firstLetter.toUpperCase();
    });
}

function abreviacao(s) {
    return /^([A-Z]\.)+$/.test(s);
}

function numeralRomano(s) {
    return /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(s);
}

function capitalize(texto) {
    let prepos = ["da", "do", "das", "dos", "a", "e", "de"];
    return texto.split(' ') // quebra o texto em palavras
        .map((palavra) => { // para cada palavra
            if (abreviacao(palavra) || numeralRomano(palavra)) {
                return palavra;
            }
            palavra = palavra.toLowerCase();
            if (prepos.includes(palavra)) {
                return palavra;
            }
            return palavra.charAt(0).toUpperCase() + palavra.slice(1);
        })
        .join(' '); // junta as palavras novamente
}

function lowercase(str) {
    return str.toLowerCase();
}
