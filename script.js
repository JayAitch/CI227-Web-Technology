/**

to do list:-


- Insert sorted results into div creation logic
* 		Attempt to insert picture from url into img designated by primary_image_id in json
*
*

- Styling returned divs via class .results and its container
*		Maximum size in pictures
*		Potentialy text size via ems
*
*
- Clean up js methods and test
(
**/
window.addEventListener("load", init);

function init(){
	console.log("loaded");	
	//add onClick to search button via DOM manipulation, prevent default action
	var refineSearch = document.getElementById("search-button");	
	refineSearch.addEventListener("click", function(event){getJson(), event.preventDefault()});
	
	/*
	var searchButton = document.getElementById('refine-search-toggle');	
	searchButton.addEventListener("click", function(event){createSearchURL(), event.preventDefault()});
	*/
}

//function to test search return
function getJson(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200) {
			console.log("whole json and XHR object and printout");
			console.log(xhttp);
			console.log(xhttp.responseText);
			Ajson = JSON.parse(xhttp.responseText);
			
			console.log(Ajson.meta.result_count);
			
			// remove existing results
			destroy();
			// print results on submit
			test();
		}
	}
	xhttp.open("GET", createSearchURL(), true);
	xhttp.send();
}

function createSearchURL(){
	var searched = document.getElementById("search-text");
	//using /q to search as it is the most inclusive
	var searchURL = "http://www.vam.ac.uk/api/json/museumobject/search?q=";
	var searchArray = searched.value.split(" ")
	console.log(searchArray);
	//query searchArray to search everything when nothing is entered
	if(searchArray != 0){
		//iterater to build search url
		for(var i = 0; i <= searchArray.length - 1; i++){
			searchURL +=  searchArray[i]+ "+";
		}
		console.log(searchURL);
		console.log("Search value:" + searched.value);
		return searchURL;		
	}
	return "http://www.vam.ac.uk/api/json/museumobject";
}


// thoughts on adding conditional to call a seperate function to populate these after the first search?
function test(){	
	var results = ["1","2","3","4","5","6","7","8","9"];
	console.log(results);
	// createImageURL();
	
	for(var i = 0; i <= results.length; i++){
		if(results[i]){
			var r = document.createElement("div"); // create elements
			var rTitle = document.createElement("p");
			var rObject = document.createElement("p");
			var rArtist = document.createElement("p");
			var rDate = document.createElement("p");
			var rImg = document.createElement("img");
			var rImgLink = document.createElement("a");
			
			r.setAttribute("class", "result"); // set attributes of elements
			rImg.setAttribute("src",  createImageURL(Ajson.records[i].fields.primary_image_id));
			rImg.setAttribute("alt", "result" + results[i]);
			rImgLink.setAttribute("href", createImageURL(Ajson.records[i].fields.primary_image_id));
			rImgLink.setAttribute("target", "_blank");
			rTitle.textContent = "Title: " + Ajson.records[i].fields.title;
			rObject.textContent = "Object: " + Ajson.records[i].fields.object;
			rArtist.textContent = "Artist: " + Ajson.records[i].fields.artist;
			rDate.textContent = "Date: " + Ajson.records[i].fields.date_text;
			
			var t = document.querySelector("#results");// identify target and append elements to it
			rImgLink.appendChild(rImg);
			r.appendChild(rImgLink);
			r.appendChild(rTitle);
			r.appendChild(rObject);
			r.appendChild(rArtist);
			r.appendChild(rDate);
			t.appendChild(r);
		}
	}
}

function createImageURL(imag_id){
	var domain = "http://media.vam.ac.uk/media/thira/collection_images/"
	var imageSize =	"_jpg_o.jpg"
	var local_imag_id = imag_id;;
	var imageURL = domain + local_imag_id.slice(0, 6) + "/" + local_imag_id + imageSize;
	console.log(local_imag_id);
	console.log()
	console.log(local_imag_id.slice(0, 6))
	console.log(local_imag_id.slice(6, 10))
	console.log(imageURL);
	return imageURL;
	
}

// remove all child nodes(results)
function destroy(){
	var p = document.querySelector("#results");
	// while there is a child, remove it
	while (p.firstChild) {
		p.removeChild(p.firstChild);
	}
}