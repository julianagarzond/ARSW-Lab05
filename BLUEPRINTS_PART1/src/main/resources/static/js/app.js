var api = apiclient;
var app = (function() {
    var _author;

    var _map = function (list){
        return mapping = list.map(function(blueprint){
            return {name:blueprint.name, pointsCount:blueprint.points.length};
            })
    }

    var _draw= function(blueprints){
        var start =blueprints.points[0];
        $("#canvas").text("Blueprint:" +blueprints.name);
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0,0,500,500);
        ctx.beginPath();
        ctx.strokeStyle= 'blue';
        ctx.moveTo(start.x,start.y);
        blueprints.points.map(function(point){
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
            _author=author;
            api.getBlueprintsByNameAndAuthor(name,author,_draw);
    }

    var getBlueprintsByAuthor = function (author){
            _author=author;
            if(author == null || author == "" ){
                alert("invalid author");
            } else {
                api.getBlueprintsByAuthor(author, _createTable);
            }
    }

     var _createTable = function(blueprints) {
          blueprints = _map(blueprints);
         _totalPoints(blueprints);
          $("#table > tbody").empty();
          blueprints.map(function(bp){
             console.log(bp);
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


      return{
      getBlueprintsByAuthor : getBlueprintsByAuthor , getBlueprintsByNameAndAuthor :getBlueprintsByNameAndAuthor
      } ;





} ) ();