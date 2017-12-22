function draw_me(url){

  console.log(url +" trying to draw");
  
d3.select("#container").selectAll("svg").remove();

var graphDiv = document.getElementById("container");
var svg = d3.select(graphDiv).append("svg")
            .attr('width', '100%')
            .attr('height', '100%')
var width = graphDiv.clientWidth;
var height = graphDiv.clientHeight;

var node_color = ['red','blue'];

svg = svg.call(d3.zoom().on("zoom", zoomed));

var color = d3.scaleOrdinal(d3.schemeCategory20);

svg.append("defs").append("marker")
    .attr("id", "arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 20)
    .attr("refY", 0)
    .attr("markerWidth", 5)
    .attr("markerHeight", 5)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr('fill', '#999');

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) {return d.id;}).distance(200))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));
 

d3.json(  url , function(error, graph) {
  if (error) throw error;
  
  console.log(graph);

  var link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
    .attr("marker-end", "url(#arrow)")
    .attr("stroke-width", 1)
    .style("stroke",function(d) { return color(d.role); })
    .on('mouseover', edge_mouseover)
    .on('mouseout', edge_mouseout)
    .on('click', edge_click);

 var node = svg.selectAll("circle")
     .data(graph.nodes)
    .enter().append("g")
      .attr("class", "nodes")
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended))
          .on('click', connectedNodes);

  node.append("circle")
      .attr("class", "nodes")
      .attr("r", 5)
      .attr("fill", "#3F4061")
      .on('mouseover', node_mouseover(0))
      .on('mouseout', node_mouseout);

 /* var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
    .attr("r", 5)
    .attr("fill", "#3F4061")
    .on('mouseover', node_mouseover(0))
    .on('mouseout', node_mouseout)
    .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended))
          .on('click', connectedNodes);
/*var nodelabels = svg.selectAll(".nodelabel")
       .data(graph.nodes)
       .enter()
       .append("text")
       .attrs({"x":function(d){return d.x;},
              "y":function(d){return d.y;},
              "class":"nodelabel",
              'font-size': 8,
              "stroke":"gray"})
       .text(function(d){return d.equity;});*/

  edgepaths = svg.selectAll(".edgepath")
            .data(graph.links)
            .enter()
            .append('path')
            .attrs({
                'class': 'edgepath',
                'fill-opacity': 0,
                'stroke-opacity': 0,
                'id': function (d, i) {return 'edgepath' + i}
            })
            .style("pointer-events", "none");

    edgelabels = svg.selectAll(".edgelabel")
        .data(graph.links)
        .enter()
        .append('text')
        .style("pointer-events", "none")
        .attrs({
            'class': 'edgelabel',
            'id': function (d, i) {return 'edgelabel' + i}
        });

  node.append("text")
      .attr('dx', 10)
      .attr('dy', '.35em')
      .text(function(d) {
        return d.equity;
      })
      .style('font-family', 'sans-serif')
      .style("font-weight", "bold")
      .style('fill', '#55584E')
      .style("font-size", "11");

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

   node.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

    // nodelabels.attr("x", function(d) { return d.x; })
    //               .attr("y", function(d) { return d.y; });

    edgepaths.attr('d', function (d) {
            return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
        });

        edgelabels.attr('transform', function (d) {
            if (d.target.x < d.source.x) {
                var bbox = this.getBBox();

                rx = bbox.x + bbox.width / 2;
                ry = bbox.y + bbox.height / 2;
                return 'rotate(180 ' + rx + ' ' + ry + ')';
            }
            else {
                return 'rotate(0)';
            }
        });
  }
  function node_mouseover(opacity){
        return function(d) {
            // check all other nodes to see if they're connected
            // to this one. if so, keep the opacity at 1, otherwise
            // fade
            node.style("stroke-opacity", function(o) {
                thisOpacity = isConnected(d, o) ? 1 : opacity;
                return thisOpacity;
            });
            node.style("fill-opacity", function(o) {
                thisOpacity = isConnected(d, o) ? 1 : opacity;
                return thisOpacity;
            });
            // also style link accordingly
            link.style("stroke-opacity", function(o) {
                return o.source === d || o.target === d ? 1 : opacity;
            });
            link.style("stroke-width", function(o){
                return o.source === d || o.target === d ? o.source.colour : 2;
            });
            link.attr('marker-end', o => (opacity === 1 || o.source === d || o.target === d ? 'url(#arrow)' : 'url(#arrow-fade)'));
            link.style('stroke-width', '2.5px');
        };
  }
  function node_mouseout(){
        node.style("stroke-opacity", 1);
        node.style("fill-opacity", 1);
        link.style("stroke-opacity", 1);
        link.style("stroke-width", 1);
        link.attr("marker-end", "url(#arrow)");
       // link.style("stroke", "#ddd");
  }
  function isConnected(a, b) {
    return linkedByIndex[`${a.index},${b.index}`] || linkedByIndex[`${b.index},${a.index}`] || a.index === b.index;
  }

//Toggle stores whether the highlighting is on
var toggle = 0;
//Create an array logging what is connected to what
var linkedByIndex = {};
for (i = 0; i < graph.nodes.length; i++) {
    linkedByIndex[i + "," + i] = 1;
};
graph.links.forEach(function (d) {
    linkedByIndex[d.source.index + "," + d.target.index] = 1;
});
//This function looks up whether a pair are neighbours
function neighboring(a, b) {
    return linkedByIndex[a.index + "," + b.index];
}

function edge_mouseover(d) {
  d3.select(this).style('stroke-width', '3.5px');
}

function edge_mouseout(d) {
  d3.select(this).style('stroke-width', '1px');
}

function connectedNodes() {
    if (toggle == 0) {
        //Reduce the opacity of all but the neighbouring nodes
        d = d3.select(this).node().__url__;
        node.style("opacity", function (o) {
            return neighboring(d, o) | neighboring(o, d) ? 1 : 0;
        });
        link.style("opacity", function (o) {
            return d.index==o.source.index | d.index==o.target.index ? 1 : 0;
        })
            .style('stroke-width', '2.5px');

        edgelabels.append('textPath')
            .attr('xlink:href', function (d, i) {return '#edgepath' + i})
            .style("text-anchor", "middle")
            .style("pointer-events", "none")
            .style("font", "11px sans-serif")
            .style("font-weight", "bold")
            .style('fill', '#55584E')
            .attr("startOffset", "50%")
            .text(function (o) {return d.index==o.source.index | d.index==o.target.index ? o.role : "";});

        $('#sideBar').css('display', 'none');
        $('#container').css('left', '0px');
        //Reduce the op
        toggle = 1;

    } else {
        //Put them back to opacity=1
        node.style("opacity", 1);
        link.style("opacity", 1);
        edgelabels.text("");
        $('#sideBar').css('display', 'none');
        $('#container').css('left', '0px');
      // svg.selectAll("text").remove();
        toggle = 0;
    }
}
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

function zoomed() {
  svg.attr("transform", "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ")" + " scale(" + d3.event.transform.k + ")");
}
function edge_click(d){
  new PNotify({
      title: 'Edge Details',
      text: 'Source: '+d.source.equity+'<br> Target: '+d.target.equity+'<br>Role: '+d.role+'<br>Senteces: '+d.three_sentences,
      type: 'success',
      styling: 'bootstrap3'
  });
}
}


function draw_us(url,side){
    if(side==0){
	    console.log(url +" trying to draw in left");
		d3.select("#content_L").selectAll("svg").remove();
		var graphDiv = document.getElementById("content_L");
    }else{
    	console.log(url +" trying to draw in right");
    	d3.select("#content_R").selectAll("svg").remove();
    	var graphDiv = document.getElementById("content_R");
    }
	var svg = d3.select(graphDiv).append("svg")
	            .attr('width', '100%')
	            .attr('height', '100%')
	var width = graphDiv.clientWidth;
	var height = graphDiv.clientHeight;

	var node_color = ['red','blue'];

	svg = svg.call(d3.zoom().on("zoom", zoomed));

	var color = d3.scaleOrdinal(d3.schemeCategory20);

	svg.append("defs").append("marker")
	    .attr("id", "arrow")
	    .attr("viewBox", "0 -5 10 10")
	    .attr("refX", 20)
	    .attr("refY", 0)
	    .attr("markerWidth", 5)
	    .attr("markerHeight", 5)
	    .attr("orient", "auto")
	  .append("svg:path")
	    .attr("d", "M0,-5L10,0L0,5")
	    .attr('fill', '#999');

	var simulation = d3.forceSimulation()
	    .force("link", d3.forceLink().id(function (d) {return d.id;}).distance(200))
	    .force("charge", d3.forceManyBody())
	    .force("center", d3.forceCenter(width / 2, height / 2));
	 

	d3.json(  url , function(error, graph) {
	  if (error) throw error;
	  
	  console.log(graph);
	 // analyseGraph(graph,0);

	  var link = svg.append("g")
	    .attr("class", "links")
	    .selectAll("line")
	    .data(graph.links)
	    .enter().append("line")
	    .attr("marker-end", "url(#arrow)")
	    .attr("stroke-width", 1)
	    .style("stroke",function(d) { return color(d.role); })
	    .on('mouseover', edge_mouseover)
	    .on('mouseout', edge_mouseout)
	    .on('click', edge_click);

	 var node = svg.selectAll("circle")
	      .data(graph.nodes)
	    .enter().append("g")
	      .attr("class", "nodes")
	      .call(d3.drag()
	          .on("start", dragstarted)
	          .on("drag", dragged)
	          .on("end", dragended))
	          .on('click', connectedNodes);

	  node.append("circle")
	      .attr("class", "nodes")
	      .attr("r", 5)
	      .attr("fill", "#3F4061")
	      .on('mouseover', node_mouseover(0))
	      .on('mouseout', node_mouseout);

	 /* var node = svg.append("g")
	    .attr("class", "nodes")
	    .selectAll("circle")
	    .data(graph.nodes)
	    .enter().append("circle")
	    .attr("r", 5)
	    .attr("fill", "#3F4061")
	    .on('mouseover', node_mouseover(0))
	    .on('mouseout', node_mouseout)
	    .call(d3.drag()
	          .on("start", dragstarted)
	          .on("drag", dragged)
	          .on("end", dragended))
	          .on('click', connectedNodes);
	/*var nodelabels = svg.selectAll(".nodelabel")
	       .data(graph.nodes)
	       .enter()
	       .append("text")
	       .attrs({"x":function(d){return d.x;},
	              "y":function(d){return d.y;},
	              "class":"nodelabel",
	              'font-size': 8,
	              "stroke":"gray"})
	       .text(function(d){return d.equity;});*/

	  edgepaths = svg.selectAll(".edgepath")
	            .data(graph.links)
	            .enter()
	            .append('path')
	            .attrs({
	                'class': 'edgepath',
	                'fill-opacity': 0,
	                'stroke-opacity': 0,
	                'id': function (d, i) {return 'edgepath' + i}
	            })
	            .style("pointer-events", "none");

	    edgelabels = svg.selectAll(".edgelabel")
	        .data(graph.links)
	        .enter()
	        .append('text')
	        .style("pointer-events", "none")
	        .attrs({
	            'class': 'edgelabel',
	            'id': function (d, i) {return 'edgelabel' + i}
	        });

	  node.append("text")
	      .attr('dx', 10)
	      .attr('dy', '.35em')
	      .text(function(d) {
	        return d.equity;
	      })
	      .style('font-family', 'sans-serif')
	      .style("font-weight", "bold")
	      .style('fill', '#55584E')
	      .style("font-size", "11");

	  simulation
	      .nodes(graph.nodes)
	      .on("tick", ticked);

	  simulation.force("link")
	      .links(graph.links);

	  function ticked() {
	    link
	        .attr("x1", function(d) { return d.source.x; })
	        .attr("y1", function(d) { return d.source.y; })
	        .attr("x2", function(d) { return d.target.x; })
	        .attr("y2", function(d) { return d.target.y; });

	   node.attr("transform", function (d) {
	        return "translate(" + d.x + "," + d.y + ")";
	    });

	    // nodelabels.attr("x", function(d) { return d.x; })
	    //               .attr("y", function(d) { return d.y; });

	    edgepaths.attr('d', function (d) {
	            return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
	        });

	        edgelabels.attr('transform', function (d) {
	            if (d.target.x < d.source.x) {
	                var bbox = this.getBBox();

	                rx = bbox.x + bbox.width / 2;
	                ry = bbox.y + bbox.height / 2;
	                return 'rotate(180 ' + rx + ' ' + ry + ')';
	            }
	            else {
	                return 'rotate(0)';
	            }
	        });
	  }
	  function node_mouseover(opacity){
	        return function(d) {
	            // check all other nodes to see if they're connected
	            // to this one. if so, keep the opacity at 1, otherwise
	            // fade
	            node.style("stroke-opacity", function(o) {
	                thisOpacity = isConnected(d, o) ? 1 : opacity;
	                return thisOpacity;
	            });
	            node.style("fill-opacity", function(o) {
	                thisOpacity = isConnected(d, o) ? 1 : opacity;
	                return thisOpacity;
	            });
	            // also style link accordingly
	            link.style("stroke-opacity", function(o) {
	                return o.source === d || o.target === d ? 1 : opacity;
	            });
	            link.style("stroke-width", function(o){
	                return o.source === d || o.target === d ? o.source.colour : 2;
	            });
	            link.attr('marker-end', o => (opacity === 1 || o.source === d || o.target === d ? 'url(#arrow)' : 'url(#arrow-fade)'));
	            link.style('stroke-width', '2.5px');
	        };
	  }
	  function node_mouseout(){
	        node.style("stroke-opacity", 1);
	        node.style("fill-opacity", 1);
	        link.style("stroke-opacity", 1);
	        link.style("stroke-width", 1);
	        link.attr("marker-end", "url(#arrow)");
	       // link.style("stroke", "#ddd");
	  }
	  function isConnected(a, b) {
	    return linkedByIndex[`${a.index},${b.index}`] || linkedByIndex[`${b.index},${a.index}`] || a.index === b.index;
	  }

	//Toggle stores whether the highlighting is on
	var toggle = 0;
	//Create an array logging what is connected to what
	var linkedByIndex = {};
	for (i = 0; i < graph.nodes.length; i++) {
	    linkedByIndex[i + "," + i] = 1;
	};
	graph.links.forEach(function (d) {
	    linkedByIndex[d.source.index + "," + d.target.index] = 1;
	});
	//This function looks up whether a pair are neighbours
	function neighboring(a, b) {
	    return linkedByIndex[a.index + "," + b.index];
	}

	function edge_mouseover(d) {
	  d3.select(this).style('stroke-width', '3.5px');
	}

	function edge_mouseout(d) {
	  d3.select(this).style('stroke-width', '1px');
	}

	function connectedNodes() {
	    if (toggle == 0) {
	        //Reduce the opacity of all but the neighbouring nodes
	        d = d3.select(this).node().__url__;
	        node.style("opacity", function (o) {
	            return neighboring(d, o) | neighboring(o, d) ? 1 : 0;
	        });
	        link.style("opacity", function (o) {
	            return d.index==o.source.index | d.index==o.target.index ? 1 : 0;
	        })
	            .style('stroke-width', '2.5px');

	        edgelabels.append('textPath')
	            .attr('xlink:href', function (d, i) {return '#edgepath' + i})
	            .style("text-anchor", "middle")
	            .style("pointer-events", "none")
	            .style("font", "11px sans-serif")
	            .style("font-weight", "bold")
	            .style('fill', '#55584E')
	            .attr("startOffset", "50%")
	            .text(function (o) {return d.index==o.source.index | d.index==o.target.index ? o.role : "";});

	        $('#sideBar').css('display', 'none');
	        $('#container').css('left', '0px');
	        //Reduce the op
	        toggle = 1;

	    } else {
	        //Put them back to opacity=1
	        node.style("opacity", 1);
	        link.style("opacity", 1);
	        edgelabels.text("");
	        $('#sideBar').css('display', 'none');
	        $('#container').css('left', '0px');
	      // svg.selectAll("text").remove();
	        toggle = 0;
	    }
	}
	});

	function dragstarted(d) {
	  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	  d.fx = d.x;
	  d.fy = d.y;
	}

	function dragged(d) {
	  d.fx = d3.event.x;
	  d.fy = d3.event.y;
	}

	function dragended(d) {
	  if (!d3.event.active) simulation.alphaTarget(0);
	  d.fx = null;
	  d.fy = null;
	}

	function zoomed() {
	  svg.attr("transform", "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ")" + " scale(" + d3.event.transform.k + ")");
	}
	function edge_click(d){
	  new PNotify({
	      title: 'Edge Details',
	      text: 'Source: '+d.source.equity+'<br> Target: '+d.target.equity+'<br>Role: '+d.role+'<br>Senteces: '+d.three_sentences,
	      type: 'success',
	      styling: 'bootstrap3'
	  });
	}
	
    
	}


function analyseGraph(url,otherYear){
	var urlR="../../FinNetwork/rest/company_name/" +url;
	var urlL="../../FinNetwork/rest/company_name/" +otherYear+"&AMERICAN EXPRESS CO";
	var graphRight,graphLeft;
	console.log("came here");
	d3.json(  urlR , function(error,graphRight) {
		  if (error) throw error;
		  console.log("came here2 : "+Object.keys(graphRight.nodes).length);
		  	d3.json(  urlL , function(error, graphLeft) {	
		  		if (error) throw error;
		  		 console.log("came here3 : "+Object.keys(graphLeft.nodes).length);
	//analyse different nodes between graphRight and graphLeft-----------------
	//create array to keep differnt noodes id
	    var differentNode= [];
		var elementOfD=0;
		var k=0;
		var sizeOfLargeJson=0;
		var sizeOfSmallJson=0;
	
	if(  Object.keys(graphRight.nodes).length > Object.keys(graphLeft.nodes).length){
		
	
		
		sizeOfLargeJson=Object.keys(graphRight.nodes).length;
		sizeOfSmallJson=Object.keys(graphLeft.nodes).length;
		
		console.log("sizeOfLargeJson : "+sizeOfLargeJson);
		console.log("sizeOfSmallJson : "+sizeOfSmallJson);
		
		/*for(var j=0;j<sizeOfLargeJson;j++){
			console.log("print : "+Object.keys(graphRight.nodes).length +" : "+graphLeft.nodes[i].id);
		}*/
		
	    for(var j=0;j<sizeOfLargeJson;j++){
	        console.log(" j : "+j);
	    	for(var i=0;i<sizeOfSmallJson;i++){
	    		 console.log(" i : "+i);
	    		console.log("compare : "+graphRight.nodes[j].id +" : "+graphLeft.nodes[i].id);
	    		
				if( graphRight.nodes[j].id ==graphLeft.nodes[i].id){
					++k;
				}
		    }
	    	if(k == 0){
	    		console.log(" differnt nodes : "+graphRight.nodes[j].id);
				differentNode[elementOfD]=graphRight.nodes[j].id;
				++elementOfD;
			}else{
				k=0;
			}
		}  	
	}else{
  		sizeOfLargeJson=Object.keys(graphLeft.nodes).length;
		sizeOfSmallJson=Object.keys(graphRight.nodes).length;
		
		

	    for(var j=0;j<sizeOfLargeJson;j++){
	        console.log(" j : "+j);
	    	for(var i=0;i<sizeOfSmallJson;i++){
	    		 console.log(" i : "+i);
	    		console.log("compare : "+graphLeft.nodes[j].id +" : "+graphRight.nodes[i].id);
	    		
				if( graphLeft.nodes[j].id ==graphRight.nodes[i].id){
					++k;
				}
		    }
	    	if(k == 0){
	    		console.log(" differnt nodes : "+graphLeft.nodes[j].id);
				differentNode[elementOfD]=graphLeft.nodes[j].id;
				++elementOfD;
			}else{
				k=0;
			}
		} 
	} 
	
	if(elementOfD !==0){
		var nu_of_different_companies=elementOfD+1;
	}else{
		var nu_of_different_companies=elementOfD;
	}
	var graphDiv = document.getElementById("r1");
	graphDiv.innerHTML ="There are "+nu_of_different_companies+" differnt companies are connected with AMERICAN EXPRESS CO in these two years";  
	
	});
	}); 
	
}

function draw_me_new(url){

	  console.log(url +" trying to draw");
	  
	d3.select("#container").selectAll("svg").remove();

	var graphDiv = document.getElementById("container");
	var svg = d3.select(graphDiv).append("svg")
	            .attr('width', '100%')
	            .attr('height', '100%')
	var width = graphDiv.clientWidth;
	var height = graphDiv.clientHeight;
    
	var node_color = ['red','blue'];
    
	svg = svg.call(d3.zoom().on("zoom", zoomed));
    
	var color = d3.scaleOrdinal(d3.schemeCategory20);

	svg.append("defs").append("marker")
	    .attr("id", "arrow")
	    .attr("viewBox", "0 -5 10 10")
	    .attr("refX", 20)
	    .attr("refY", 0)
	    .attr("markerWidth", 5)
	    .attr("markerHeight", 5)
	    .attr("orient", "auto")
	  .append("svg:path")
	    .attr("d", "M0,-5L10,0L0,5")
	    .attr('fill', '#999');

	var simulation = d3.forceSimulation()
	    .force("link", d3.forceLink().id(function (d) {return d.id;}).distance(200))
	    .force("charge", d3.forceManyBody())
	    .force("center", d3.forceCenter(width / 2, height / 2));
	 

	d3.json(  url , function(error, graph) {
	  if (error) throw error;
	  
	  console.log(graph);

	  var link = svg.append("g")
	    .attr("class", "links")
	    .selectAll("line")
	    .data(graph.links)
	    .enter().append("line")
	    .attr("marker-end", "url(#arrow)")
	    .attr("stroke-width", 1)
	    .style("stroke",function(d) { return color(d.role); })
	    .on('mouseover', edge_mouseover)
	    .on('mouseout', edge_mouseout)
	    .on('click', edge_click);

	 var node = svg.selectAll("circle")
	     .data(graph.nodes)
	    .enter().append("g")
	      .attr("class", "nodes")
	      .call(d3.drag()
	          .on("start", dragstarted)
	          .on("drag", dragged)
	          .on("end", dragended))
	          .on('click', connectedNodes);

	  node.append("circle")
	      .attr("class", "nodes")
	      .attr("r", 5)
	      .attr("fill", "#3F4061")
	      .on('mouseover', node_mouseover(0))
	      .on('mouseout', node_mouseout);

	  edgepaths = svg.selectAll(".edgepath")
	            .data(graph.links)
	            .enter()
	            .append('path')
	            .attrs({
	                'class': 'edgepath',
	                'fill-opacity': 0,
	                'stroke-opacity': 0,
	                'id': function (d, i) {return 'edgepath' + i}
	            })
	            .style("pointer-events", "none");

	    edgelabels = svg.selectAll(".edgelabel")
	        .data(graph.links)
	        .enter()
	        .append('text')
	        .style("pointer-events", "none")
	        .attrs({
	            'class': 'edgelabel',
	            'id': function (d, i) {return 'edgelabel' + i}
	        });

	  node.append("text")
	      .attr('dx', 10)
	      .attr('dy', '.35em')
	      .text(function(d) {
	        return d.equity;
	      })
	      .style('font-family', 'sans-serif')
	      .style("font-weight", "bold")
	      .style('fill', '#55584E')
	      .style("font-size", "10"); //changed font size

	  simulation
	      .nodes(graph.nodes)
	      .on("tick", ticked);

	  simulation.force("link")
	      .links(graph.links);

	  function ticked() {
	    link
	        .attr("x1", function(d) { return d.source.x; })
	        .attr("y1", function(d) { return d.source.y; })
	        .attr("x2", function(d) { return d.target.x; })
	        .attr("y2", function(d) { return d.target.y; });

	   node.attr("transform", function (d) {
	        return "translate(" + d.x + "," + d.y + ")";
	    });

	    // nodelabels.attr("x", function(d) { return d.x; })
	    //               .attr("y", function(d) { return d.y; });

	    edgepaths.attr('d', function (d) {
	            return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
	        });

	        edgelabels.attr('transform', function (d) {
	            if (d.target.x < d.source.x) {
	                var bbox = this.getBBox();

	                rx = bbox.x + bbox.width / 2;
	                ry = bbox.y + bbox.height / 2;
	                return 'rotate(180 ' + rx + ' ' + ry + ')';
	            }
	            else {
	                return 'rotate(0)';
	            }
	        });
	  }
	  function node_mouseover(opacity){
	        return function(d) {
	            // check all other nodes to see if they're connected
	            // to this one. if so, keep the opacity at 1, otherwise
	            // fade
	        
	            node.style("stroke-opacity", function(o) {
	                thisOpacity = isConnected(d, o) ? 1 : opacity;
	                return thisOpacity;
	            });
	            node.style("fill-opacity", function(o) {
	                thisOpacity = isConnected(d, o) ? 1 : opacity;
	                return thisOpacity;
	            });
	            // also style link accordingly
	            link.style("stroke-opacity", function(o) {
	                return o.source === d || o.target === d ? 1 : opacity;
	            });
	            link.style("stroke-width", function(o){
	                return o.source === d || o.target === d ? o.source.colour : 2;
	            });
	            link.attr('marker-end', o => (opacity === 1 || o.source === d || o.target === d ? 'url(#arrow)' : 'url(#arrow-fade)'));
	            link.style('stroke-width', '2.5px');
	        };
	  }
	  function node_mouseout(){
	        node.style("stroke-opacity", 1);
	        node.style("fill-opacity", 1);
	        link.style("stroke-opacity", 1);
	        link.style("stroke-width", 1);
	        link.attr("marker-end", "url(#arrow)");
	       // link.style("stroke", "#ddd");
	  }
	  function isConnected(a, b) {
	    return linkedByIndex[`${a.index},${b.index}`] || linkedByIndex[`${b.index},${a.index}`] || a.index === b.index;
	  }

	//Toggle stores whether the highlighting is on
	var toggle = 0;
	//Create an array logging what is connected to what
	var linkedByIndex = {};
	for (i = 0; i < graph.nodes.length; i++) {
	    linkedByIndex[i + "," + i] = 1;
	};
	graph.links.forEach(function (d) {
	    linkedByIndex[d.source.index + "," + d.target.index] = 1;
	});
	//This function looks up whether a pair are neighbours
	function neighboring(a, b) {
	    return linkedByIndex[a.index + "," + b.index];
	}

	function edge_mouseover(d) {
	  d3.select(this).style('stroke-width', '3.5px');
	}

	function edge_mouseout(d) {
	  d3.select(this).style('stroke-width', '1px');
	}

	function connectedNodes() {
	    if (toggle == 0) {
	        //Reduce the opacity of all but the neighbouring nodes
	        d = d3.select(this).node().__url__;
	        node.style("opacity", function (o) {
	            return neighboring(d, o) | neighboring(o, d) ? 1 : 0;
	        });
	        link.style("opacity", function (o) {
	            return d.index==o.source.index | d.index==o.target.index ? 1 : 0;
	        })
	            .style('stroke-width', '2.5px');

	        edgelabels.append('textPath')
	            .attr('xlink:href', function (d, i) {return '#edgepath' + i})
	            .style("text-anchor", "middle")
	            .style("pointer-events", "none")
	            .style("font", "11px sans-serif")
	            .style("font-weight", "bold")
	            .style('fill', '#55584E')
	            .attr("startOffset", "50%")
	            .text(function (o) {return d.index==o.source.index | d.index==o.target.index ? o.role : "";});

	        $('#sideBar').css('display', 'none');
	        $('#container').css('left', '0px');
	        //Reduce the op
	        toggle = 1;

	    } else {
	        //Put them back to opacity=1
	        node.style("opacity", 1);
	        link.style("opacity", 1);
	        edgelabels.text("");
	        $('#sideBar').css('display', 'none');
	        $('#container').css('left', '0px');
	      // svg.selectAll("text").remove();
	        toggle = 0;
	    }
	}
	});

	function dragstarted(d) {
	  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	  d.fx = d.x;
	  d.fy = d.y;
	}

	function dragged(d) {
	  d.fx = d3.event.x;
	  d.fy = d3.event.y;
	}

	function dragended(d) {
	  if (!d3.event.active) simulation.alphaTarget(0);
	  d.fx = null;
	  d.fy = null;
	}

	function zoomed() {
	  svg.attr("transform", "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ")" + " scale(" + d3.event.transform.k + ")");
	}
	function edge_click(d){
	  new PNotify({
	      title: 'Edge Details',
	      text: 'Source: '+d.source.equity+'<br> Target: '+d.target.equity,
	      type: 'success',
	      styling: 'bootstrap3'
	  });
	}
	}
