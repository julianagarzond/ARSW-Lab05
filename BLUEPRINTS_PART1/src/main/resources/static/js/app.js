var app =(function () {
    var _author;

    var _map = function (list){
        var mapping =list.map(function(blueprint)){
            return {key:blueprint.name, value: blueprint.point.length};}
    }


    var getBlueprintsByAuthor = function(author){
            _author=author;
            if(author != null || author != "" ){
                alert("invalid author");
            } else {
                apiMock.getBlueprintsByAuthor(author);}
        }

     var _createTable = function(blueprints) {
        list = _map(list);
        $("#table> tbody").empty();

        }

     var _totalPoints(blueprints) {
        console.log(blueprints);

}


} ) ();