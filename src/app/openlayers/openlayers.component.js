function loadmap(){
	var map = new ol.Map({
			layers: [
			  new ol.layer.Tile({
				source: new ol.source.OSM()
			  })
			],
			target: 'map',
			view: new ol.View({
			  projection: 'EPSG:4326',
			  center: [0, 0],
			  zoom: 2
			})
		  });
		  map.on('singleclick', get_coords);
}
	  
	  
function get_coords(evt){
    var coordinate = evt.coordinate;
    list = String(coordinate).split(",");
    var sentence = "lon="+String(list[0])+" lat="+String(list[1]);
	console.log("Latitude: "+list[1]+"\nLongitude: "+list[0]);
}