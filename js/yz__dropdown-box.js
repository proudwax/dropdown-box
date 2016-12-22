"use strict";

function throttle(func, ms) {
    var isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {
        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments);

        isThrottled = true;

        setTimeout(function() {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }
    return wrapper;
}

function getElemPosition(nodeList, elemList){
    var elemPosition = 0,
        elemCurrent = elemList.previousElementSibling;

    for(var i = 0; i < nodeList.length; i++){
        if(elemCurrent){
            elemCurrent = elemCurrent.previousElementSibling;
            elemPosition += 1
        }else{
            break;
        }
    }
    return elemPosition;
}

function getNotificationPosition(elemPosition, elemsInRow, countNodeList){
    var param = (elemPosition % elemsInRow) ? (elemPosition % elemsInRow) : elemsInRow;
    var notPosition = elemPosition + (elemsInRow - param) - 1;

    return notPosition < countNodeList ? notPosition : countNodeList - 1;
}

function getCoutInRow(windowWidth){
    if(windowWidth < 1023 && windowWidth >= 668){
        return 2;
    }else if(windowWidth < 667){
        return 1;
    }else{
        return 3;
    }
}

function renderNotification(notificationContent){
    var notificationNode = document.createElement('div');
        notificationNode.className = 'service__notification';
        notificationNode.innerHTML = notificationContent;

    notificationNode.querySelector('.service__bnt').addEventListener('click', function(e) {
        e.preventDefault();

        $(function() {
            $('#modal-call').bPopup({
                modalClose: true
            });
        });
    });

    return notificationNode;
}

function removeNotification(){
    var notification = document.querySelector('.service__notification');

    if (notification != null) {
        notification.remove();
    }
}

function dropdownBox(item, countRow){
    removeNotification();

    if(document.querySelector('.service__item.service__item_active')){
        document.querySelector('.service__item.service__item_active').classList.remove('service__item_active');
    }

    item.classList.add('service__item_active');

    var itemPosition = getElemPosition(listItems, item),
        notificationPosition = getNotificationPosition(itemPosition, countRow, countList),
        notification = renderNotification(item.querySelector('.service__info').innerHTML),
        parentList = listItems[0].offsetParent;

    // Добавить до - соседнего справа элемента, если соседа справа нет - добавить в конец
    parentList.insertBefore(notification, listItems.item(notificationPosition).nextElementSibling);
}

var listItems = document.querySelectorAll('.service__item');
var countList = listItems.length;

listItems.forEach(function(item, index){
    item.addEventListener('click', function(e){
        dropdownBox(item, getCoutInRow(window.innerWidth));
    });
});

throttle(window.addEventListener('resize', function(e){
    removeNotification();

    if(document.querySelector('.service__item.service__item_active')){
        document.querySelector('.service__item.service__item_active').classList.remove('service__item_active');
    }

    listItems.forEach(function(item, index){
        item.addEventListener('click', function(e){
            dropdownBox(item, getCoutInRow(window.innerWidth));
        });
    });
}), 300);
