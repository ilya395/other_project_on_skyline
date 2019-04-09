
var multiItemSlider = (function () {
  return function (selector) {
    var
      _mainElement = document.querySelector(selector), // основный элемент блока
      _sliderWrapper = _mainElement.querySelector('.project-slaider__slaids-row'), // обертка для .slider-item

      _sliderItems = _mainElement.querySelectorAll('.project-slaider__slaid'), // элементы (.slider-item)

      _sliderControls = _mainElement.querySelectorAll('.project-slaider__arrow-item'), // элементы управления

      _sliderControlLeft = _mainElement.querySelector('.on-left'), // кнопка "LEFT"

      _sliderControlRight = _mainElement.querySelector('.on-right'), // кнопка "RIGHT"

      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
      _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
      _positionLeftItem = 0, // позиция левого активного элемента
      _transform = 0, // значение трансформации .slider_wrapper
      _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
      _items = [], // массив элементов

      _sliderControlDots = _mainElement.querySelectorAll('.project-slaider__dot-item'); // массив кнопочек
      
      console.log(_sliderWrapper);
      console.log(_sliderItems.length);
      console.log(_sliderControls.length);
      console.log(_sliderControlLeft);
      console.log(_sliderControlRight);
      console.log(_wrapperWidth);
      console.log(_itemWidth);
      console.log(_sliderControlDots.length);

    // наполнение массива _items
    _sliderItems.forEach(function (item, index) {
      _items.push({ item: item, position: index, transform: 0 });
    });

    var position = {
      getItemMin: function () {
        var indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position < _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax: function () {
        var indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position > _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMin: function () {
        return _items[position.getItemMin()].position;
      },
      getMax: function () {
        return _items[position.getItemMax()].position;
      }
    }

    var slideIndex = 1;

    var _transformItem = function (direction) {
      var nextItem;

      showSlides(slideIndex);

      if (direction === 'right') {
        _positionLeftItem++;
        if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
          nextItem = position.getItemMin();
          _items[nextItem].position = position.getMax() + 1;
          _items[nextItem].transform += _items.length * 100;
          _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
        }
        _transform -= _step;
        showSlides(slideIndex += 1);
        console.log(slideIndex);
      }
      if (direction === 'left') {
        _positionLeftItem--;
        if (_positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          _items[nextItem].position = position.getMin() - 1;
          _items[nextItem].transform -= _items.length * 100;
          _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
        }
        _transform += _step;
        showSlides(slideIndex -= 1);
        console.log(slideIndex);
      }
      _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';

      function showSlides(n) {

        if (n > _sliderControlDots.length) {
          slideIndex = 1;
        }
        if (n < 1) {
          slideIndex = _sliderControlDots.length;
        }

        for (var i = 0; i < _sliderControlDots.length; i++) {
          _sliderControlDots[i].className = _sliderControlDots[i].className.replace("active", "");
        }

        _sliderControlDots[slideIndex - 1].className += " active";
      }

    }

    // обработчик события click для кнопок "назад" и "вперед"
    var _controlClick = function (e) {
      var direction = this.classList.contains('on-right') ? 'right' : 'left';
      e.preventDefault();
      _transformItem(direction);
    };

    var _setUpListeners = function () {
      // добавление к кнопкам "назад" и "вперед" обработчика _controlClick для события click
      _sliderControls.forEach(function (item) {
        item.addEventListener('click', _controlClick);
      });
    }

    // инициализация
    _setUpListeners();

    return {
      right: function () { // метод right
        _transformItem('right');
      },
      left: function () { // метод left
        _transformItem('left');
      }
    }

  }
}());

var slider = multiItemSlider('.project-slaider__container')