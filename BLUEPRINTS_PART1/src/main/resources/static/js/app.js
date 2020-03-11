var api = apiclient;
var app = (function() {
    var blueprint ={author:null , points:[] , name: null}
    var memory=[];
    var _author;
    var _flag;
    var _blueprints;
    var _map = function (list){
        return mapping = list.map(function(blueprint){
            return {name:blueprint.name, pointsCount:blueprint.points.length};
            })
    }

    var _draw= function(blueprints){

        blueprint=blueprints;
        memory.map(function(element){
              blueprint.points.push(element)});
        var start =blueprint.points[0];
        $("#canvas").text("Blueprint:" +blueprint.name);
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0,0,500,500);
        ctx.beginPath();
        ctx.strokeStyle= 'blue';
        ctx.moveTo(start.x,start.y);
        blueprint.points.map(function(point){
            ctx.lineTo(point.x,point.y);
        })
        ctx.stroke();
        ctx.closePath();
        }

    var _totalPoints = function(blueprints){
        var result = blueprints.reduce(function(cont,pos)
        { return cont +pos.pointsCount;},0);
        $("#totalPoints > h2").text("Total user points: "+result);
    }

    var getBlueprintsByNameAndAuthor = function(author,name){
            memory = [];
            _author=author;
            api.getBlueprintsByNameAndAuthor(name,author,_draw);
    }

    var getBlueprintsByAuthor = function (author){

            if(author == null || author == "" ){
                alert("invalid author");
            } else {
                _author=author;
                api.getBlueprintsByAuthor(author, _createTable);
            }
    }

     var _createTable = function(blueprints) {
          blueprints = _map(blueprints);
         _totalPoints(blueprints);
          $("#table > tbody").empty();
          blueprints.map(function(bp){
             $("#table > tbody").append(
                            "<tr> <td>" +
                            bp.name +
                            "</td>" +
                            "<td>" +
                            bp.pointsCount +
                            "</td> " +
                                 "<td><form><button type='button' onclick='app.getBlueprintsByNameAndAuthor( \"" +
                                            _author +
                                            '" , "' +
                                            bp.name +
                                            "\")' >Open</button></form></td>" +
                                            "</tr>"
                        );
                    });

     }

     var saveUpdate = function(){

        if(blueprint!=null){

            return $.ajax({
                        url: "/blueprints/"+ blueprint.author +"/"+blueprint.name,
                        type: 'PUT',
                        data: JSON.stringify(blueprint),
                        contentType: "application/json"

            })
        }
       }

       var createBlueprint = function(name){
            blueprint.push({name:name});
            console.log(blueprint);
            return $.ajax({
                                    url: "/blueprints/"+ blueprint.author +"/"+blueprint.name,
                                    type: 'PUT',
                                    data: JSON.stringify(blueprint),
                                    contentType: "application/json"

                        })


       }

       var openBlueprint= function(){
           document.getElementById("popupForm").style.display="block";
           var canvas = document.getElementById("canvas"),
           context = canvas.getContext("2d");
           context.clearRect(0,0,canvas.width,canvas.height);
           }
       var closeBlueprint =function(){
             document.getElementById("popupForm").style.display="none";
       }





     return{
         init:function(){
            var canvas = document.getElementById("canvas"),
            context = canvas.getContext("2d");

            _author=null;


            _flag =false;
            if(window.PointerEvent) {
                canvas.addEventListener("pointerdown", function(event){
                    var rect= canvas.getBoundingClientRect();

                    var posX= Math.round((event.pageX-rect.left) / (rect.right - rect.left)*canvas.width);
                    var posY= Math.round((event.pageY- rect.top) /(rect.bottom-rect.top)*canvas.height);
                    blueprint.points.push({x:posX,y:posY});
                    memory.push({x:posX,y:posY});
                    _draw(blueprint);


                    });


            }
            else {
                canvas.addEventListener("mousedown", function(event){
                 var rect= canvas.getBoundingClientRect();
                 var x= Math.round((event.clientX-rect.left) / (rect.right - rect.left)*canvas.width);
                 var y= Math.round((event.clientY- rect.top) /(rect.bottom-rect.top)*canvas.height);

                alert('mousedown at '+x+','+y);
                });
            }

         },
         getBlueprintsByAuthor : getBlueprintsByAuthor,
         getBlueprintsByNameAndAuthor :getBlueprintsByNameAndAuthor,
         saveUpdate :saveUpdate,
         createBlueprint:createBlueprint,
         closeBlueprint:closeBlueprint,
         openBlueprint:openBlueprint

     };






} ) ();