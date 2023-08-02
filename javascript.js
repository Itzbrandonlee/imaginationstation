$(function(){
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
        }
    });

    var paint = false;
    var paint_erase = "paint";
    var canvas = document.getElementById("paint");
    var context = canvas.getContext('2d');
    var container = $("#container");
    var mouse = {x:0, y:0};

    if(localStorage.getItem("imgCanvas") != null){
        var img = new Image();
        img.onload = function(){
            context.drawImage(img, 0, 0);
        }
        img.src = localStorage.getItem("imgCanvas");
    };

    context.lineWidth = 3;
    context.lineJoin = "round";
    context.lineCap = "round";

    container.mousedown(start);
    container.mousemove(move);
    container.mouseup(end);
    container.mouseleave(end);

    container.touchStart(start);
    container.touchMove(move);
    container.touchEnd(end);

    $("#reset").on("click",function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });

    $("#save").on("click", function(){
    if(typeof(localStorage) != null){
        localStorage.setItem("imgCanvas", canvas.toDataURL());
    } else {
        window.alert("Your browser does not supprt local storage!");
    }
});

    $("#erase").on("click", function(){
        if(paint_erase == "paint"){
            paint_erase = "erase";
        } else {
            paint_erase = "paint";
        }
        $(this).toggleClass("eraseMode");
    });

    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            context.lineWidth = ui.value;
        }
    });

    $("#paintColor").change(function(){
        $("#circle").css("background-color", $(this).val());
    });

    function start(e){
        paint = true;
        context.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        context.moveTo(mouse.x, mouse.y);
    }

    function move(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint == true){
            if(paint_erase == "paint"){
                context.strokeStyle = $("#paintColor").val();
            } else {
                context.strokeStyle = "white";
            }
            context.lineTo(mouse.x, mouse.y);
            context.stroke();
        }
    }

    function end(e){
        paint = false;
    }

    function touchStart(e){
        start(e.touches[0]);
    }

    function touchMove(e){
        move(e.touches[0]);
    }

    function touchEnd(e){
        end(e.changedTouches[0]);
    }

    canvas.addEventListener('touchStart', touchStart, false);
    canvas.addEventListener('touchMove', touchMove, false);
    canvas.addEventListener('touchEnd', touchEnd, false);

});