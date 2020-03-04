
var app = (function() {
    var _author;

    var _map = function (list){
        return mapping = list.map(function(blueprint){
            return {name:blueprint.name, pointsCount:blueprint.points.length};
            })
    }

    var _totalPoints = function(blueprints){
        var result = 0;
        for(index = 0; index<blueprints.length; index ++){
            result = result+blueprints[index].points;
        }
        return result;
        $("#totalPoints > h2").text("Total user points: " + result);
    }

    function _setAuthorName(author) {
            _author = author;
    };


    var getBlueprintsByAuthor = function (author){
            _setAuthorName(author);
            if(author == null || author == "" ){
                alert("invalid author");
            } else {
                apimock.getBlueprintsByAuthor(author, _createTable);
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
                            "<td><form><button type='button' >Open</button></form></td>" +
                            "</tr>"
                        );
                    });

     }


      return{
      getBlueprintsByAuthor : getBlueprintsByAuthor} ;





} ) ();