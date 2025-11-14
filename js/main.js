/* jQuery-версия упрощённого dropdown выбора города */
$(function(){
    var $select = $('#citySelect');
    var $list = $select.find('.city-list');
    var $selected = $select.find('.city-selected');
    var $search = $('#citySearch');

    function openList(){ $select.attr('aria-expanded','true'); $list.show().attr('aria-hidden','false').removeAttr('hidden'); }
    function closeList(){ $select.attr('aria-expanded','false'); $list.hide().attr('aria-hidden','true').attr('hidden',''); }

    $select.on('click', function(e){
        e.stopPropagation();
        var opened = $select.attr('aria-expanded') === 'true';
        if(opened) closeList(); else { openList(); $search.val('').trigger('input'); setTimeout(function(){ $search.focus(); },0); }
    });

    $(document).on('click', function(e){ if(!$select.is(e.target) && $select.has(e.target).length===0) closeList(); });

    $search.on('input', function(){
        var q = $(this).val().toLowerCase().trim();
        $list.find('.city-item').each(function(){
            $(this).toggle( $(this).text().toLowerCase().indexOf(q) !== -1 );
        });
    });

    $list.on('click', '.city-item', function(){
        $selected.text($(this).data('city'));
        closeList();
    });

    $select.on('keydown', function(e){
        if(e.key === 'Escape'){ closeList(); $(this).blur(); }
        if(e.key === 'ArrowDown'){ e.preventDefault(); openList(); var $first = $list.find('.city-item:visible').first(); if($first.length) $first.focus(); }
    });
});

const $phone = $('.phone');
const TEMPLATE = '7(_ _ _)_ _ _-_ _-_ _';

// Показываем шаблон сразу при загрузке
$phone.each(function(index,elem){
    $(elem).val(TEMPLATE);
})

// При фокусе — если в поле шаблон, очищаем под ввод
$phone.on('focus', function(thsis) {
    if ($(this).val() === TEMPLATE) {
        $(this).val('7(');
    }
});

// При вводе — только цифры и форматирование
$phone.on('input', function() {
    let digits = $(this).val().replace(/\D/g, '');
    if (digits.startsWith('7')) digits = digits.slice(1);

    let formatted = '7(';
    if (digits.length > 0) formatted += digits.substring(0, 3);
    if (digits.length >= 4) formatted += ')-' + digits.substring(3, 6);
    if (digits.length >= 7) formatted += '-' + digits.substring(6, 8);
    if (digits.length >= 9) formatted += '-' + digits.substring(8, 10);

    $(this).val(formatted);
});

// Запрещаем ввод нецифровых символов
$phone.on('keypress', function(e) {
if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
}
});

// При потере фокуса — если нет цифр, возвращаем шаблон
$phone.on('blur', function() {
const digits = $(this).val().replace(/\D/g, '');
if (digits.length < 2) {
    $(this).val(TEMPLATE);
}
});




$(document).ready(function() {

    // --- Функция для инициализации ОДНОЙ карусели ---
    function initCarousel(carouselId) {
        // Используем переданный ID для выбора элементов внутри конкретной карусели
        const $carousel = $(`#${carouselId}`);
        const $inner = $carousel.find('.carouselInner');
        const $items = $carousel.find('.carouselItem');
        const $indicators = $carousel.find('.indicator');
        
        // Получаем ширину *контейнера* карусели, а не одного элемента (для расчета смещения)
        const itemWidth = $carousel.width(); 
        const totalSlides = $items.length;
        let currentIndex = 0;

        // Если слайдов нет, прекращаем инициализацию
        if (totalSlides === 0) {
            return;
        }

        /**
         * Обновляет активный индикатор и прокручивает карусель.
         */
        function goToSlide(newIndex) {
            // Проверка границ для циклической прокрутки
            if (newIndex >= totalSlides) {
                newIndex = 0;
            } else if (newIndex < 0) {
                newIndex = totalSlides - 1;
            }

            const offset = -newIndex * itemWidth;
            
            // Используем .css() для изменения transform, полагаясь на CSS transition для анимации
            $inner.css('transform', `translateX(${offset}px)`);
            
            currentIndex = newIndex;

            // Обновление индикаторов (смена src)
            $indicators.each(function(index, element) {
                const $indicator = $(element);
                const activeSrc = 'img/fittCircle.svg';
                const inactiveSrc = 'img/circle.svg';
                
                $indicator.attr('src', index === currentIndex ? activeSrc : inactiveSrc);
            });
        }

        // --- Обработчики событий (привязаны только к элементам внутри текущего $carousel) ---

        // Клик по правой стрелке (Вперед)
        $carousel.find('.strelkaRight').on('click', function() {
            goToSlide(currentIndex + 1);
        });

        // Клик по левой стрелке (Назад)
        $carousel.find('.strelkaLeft').on('click', function() {
            goToSlide(currentIndex - 1);
        });
        
        // Клик по индикаторам
        $indicators.on('click', function() {
            const slideTo = $(this).data('slide-to');
            goToSlide(slideTo);
        });
        
        // Инициализация: убедиться, что первый слайд активен
        goToSlide(0); 
    }

    // --- ИНИЦИАЛИЗАЦИЯ ВСЕХ КАЧЕЛЕЙ ---
    // Вызовите функцию для каждого уникального ID карусели на странице
    initCarousel('carousel-1');
    initCarousel('carousel-2');
    initCarousel('carousel-3');
    initCarousel('carousel-4');
    initCarousel('carousel-5');
    // initCarousel('carousel-3'); // Если добавите еще одну
});

$('.sellAccordion').on('click', function(){
    const $accordion = $(this);


    const $progressRed = $accordion.find('.progressRed')||null;
    const $accordionTop = $accordion.find('.sellAccTop')||null;
    const $accBot = $accordion.find('.sellAccBot')||null;
    const $accTop = $accordion.find('.sellAccTop')||null;
    const $accButt = $accordion.find('.sircle')||null;
    const $accStrelka = $accordion.find('.down-arrow')||null;
    var colorText;
    var border;
    var boxShadow;
    if($accordion.hasClass('color-none')){
        colorText = '#212121';
        border = '#F14635';
        boxShadow = '0px 0px 16px rgba(90, 107, 160, 0.2)';
    }else{
        colorText = '#F14635';
    }
    

    if(!$accBot.hasClass('open')){
        
        if(border){
            $accordion.css({
                border:'1px solid '+border,
                'box-shadow':boxShadow
            })
        }

        const contentHeight = $accBot[0].scrollHeight ;  
        


        gsap.to($accBot, {
            duration: 0.2,
            bottom: -$accordionTop.height(),
            ease: CustomEase.create("custom", "M0,0 C0,0.408 0.032,0.929 0.123,0.981 0.208,1.032 0.289,1 1,1 "),
            onStart: function(){
                $accBot.addClass('open');
                $accTop.css({
                    color: colorText
                })
            },
            height: contentHeight  
        })
        gsap.to($progressRed,{
            duration: 0.2,
            onStart: function(){
                $progressRed.css({
                    display:'block',
                    border:'4px solid #F14635'
                })

            },
            width:'50%'
        });
        gsap.to($accButt,{
            duration: 0.2,
            onStart: function(){
                $accButt.css({
                    border:'0px'
                })

            },
            backgroundColor: '#F14635',
            rotate:180

        })
        gsap.to($accStrelka ,{
            duration: 0.2,
            
            borderTopColor: '#FFF'


        })
        $accBot.removeClass('close');

    }else{

        
        gsap.to($accBot, {
            duration: 0.2,
            bottom: 0,
            ease: CustomEase.create("custom", "M0,0 C0,0.408 0.032,0.929 0.123,0.981 0.208,1.032 0.289,1 1,1 "),
            onStart: function(){
                $accBot.addClass('close');
                $accTop.css({
                    color:'#212121'
                })
            },
            height: 0
        });
        gsap.to($progressRed,{
            duration: 0.2,
            ease: CustomEase.create("custom", "M0,0 C0,0.408 0.032,0.929 0.123,0.981 0.208,1.032 0.289,1 1,1 "),
            
            width:'0%',
            onComplete: function(){
                $progressRed.css({
                    display:'none',
                    border:'0px solid #F14635'
                })
                if(border){               
                    $accordion.css({
                        border:'none',
                        'box-shadow':'none'
                    })
                }
            }
        })
        gsap.to($accButt,{
            duration: 0.2,
            onStart: function(){
                $accButt.css({
                    border:'1px solid #C9C9C9',

                })
                

            },
            backgroundColor: '#FFF',
            rotate:0

        })
        gsap.to($accStrelka ,{
            duration: 0.2,
            
            borderTopColor: '#333'


        })
        
        $accBot.removeClass('open');
    }
});
 
