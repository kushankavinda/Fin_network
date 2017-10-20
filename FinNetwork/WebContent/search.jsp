<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.finnetwork.controllers.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Search Companies</title>

<!-- Bootstrap -->
<link href="vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">  
<!-- Font Awesome -->
<link href="vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">  
<!-- Custom Theme Style -->
<link href="build/css/custom.min.css" rel="stylesheet"> 
<style>
	#myInput {
	  background-image: url('css/search.png');
	  background-position: 6px 6px;
	  background-repeat: no-repeat;
	  width: 100%;
	  font-size: 16px;
	  padding: 12px 20px 12px 40px;
	  border: 1px solid #ddd;
	}
	#resultDiv a:hover{
		text-decoration: underline;
	}
	#resultDiv{
		height: auto;
	}
</style>
</head>
<body class="nav-md">
    <div class="container body">
      <div class="main_container">
        <div class="col-md-3 left_col">
          <div class="left_col scroll-view">
            <div class="navbar nav_title" style="border: 0;">
              <a href="index.html" class="site_title"><!-- <i class="fa fa-paw"></i> --> <span>Fin Network</span> </a>
            </div>

            <div class="clearfix"></div>

            <br />

            <!-- sidebar menu -->
            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
                <h3>General</h3>
                <ul class="nav side-menu">
                  <li><a href="index.html"><i class="fa fa-calendar"></i> Annual Basis <span class="fa fa-chevron-down"></span></a>
                    
                  </li>
                  <li><a href="search.jsp"><i class="fa fa-home"></i> Company Basis </a>
                    
                  </li>                
              
                </ul>
              </div>     

            </div>
            <!-- /sidebar menu -->

         
          </div>
        </div>

        <!-- top navigation -->
        <div class="top_nav">
          <div class="nav_menu">
            <div class="nav toggle">
                <a id="menu_toggle"><i class="fa fa-bars"></i></a>
            </div>
          </div>
        </div>
        <!-- /top navigation -->

        <!-- page content -->
        <div class="right_col" role="main">

          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="dashboard_graph">

                <div class="row x_title">
                  <div class="col-md-6">
                    <h3>Search Companies <small>FEIIIY2 data set</small></h3>
                  </div>
                  <div class="col-md-6">
                  </div>
                </div>

                <div class="col-md-12 col-sm-9 col-xs-12" >
                  <div id="container" class="demo-placeholder" style="height: auto;">                 	
					    <input type="text" id="myInput" onkeyup="searchCompany()" placeholder="Search for companies..." title="Type in a name">				              	  
                  </div>
                </div>
                
				<!-- When the page is loaded, list of all the companies is sent from server side to client side
					 and they are hidden
				 -->
                <div class="col-md-6 col-sm-3 col-xs-12 bg-white">               		
               		<div>
               			<%  List<String> finalList = SearchController.searchCompanies(); %> 
						    <ul id="finalList" style="list-style:none;">
						    <% 
						    for(int i=0; i<finalList.size(); i++){ %>					    	
						    	<li style="display:none;"><a href="#" onclick="returnURL(this); return false;"><%= finalList.get(i) %></a></li>					    					    	
					    <% } %>
					    
					    
					    
					   </ul>
               		</div>
                </div>

                <div class="clearfix">
                	
                </div>
              </div>
            </div>

          </div>
          <br />
			
		  <!-- Created a div to display search results -->	
          <div class="row" id="resultDiv">
          	    	
          </div>
             
        </div>
        </div>
        </div>
        <!-- /page content -->
 
 
 	<!-- jQuery -->
    <script src="vendors/jquery/dist/jquery.min.js"></script>  
    <!-- Bootstrap -->
    <script src="vendors/bootstrap/dist/js/bootstrap.min.js"></script>  
    <script src="build/js/custom.min.js"></script>
    <script src="js/d3.v3.min.js"></script>
    <script src="js/c3.min.js"></script>
    <script src="js/d3-selection-multi.v1.js"></script>
    <script src="js/search_result.js"></script>
 
 	<script>
 	
 	/* If user click a particular link without hitting enter key, this function get invoked 
 	    and passes the url along with the company name or CIK as a parameter
 	*/
 	function returnURL(url){
 		var companyName = url.innerHTML.split(":")[1];
 		window.location = '../../FinNetwork/companyYearWise.jsp?param=' + companyName;
 	}
 	
 	var input = document.getElementById("myInput");
 	
 	
 	/* Add a event listener to catch the enter key press.
 	   If enter is pressed, displayResult function get called with the url 
 	   	which passes along with the company name or CIK as a parameter
 	*/
	input.addEventListener("keydown", function (e) {
 	    if (e.keyCode === 13) { 	    	  
 	    	var param = document.getElementById("myInput").value;
 	    	dispalyResult("../../FinNetwork/rest/SearchCompanies?myInput=" + param);
 	    	document.getElementById("myInput").value = null;
 	    }
 	});	
	
	
	// function to filter searching companies
	function searchCompany(){ 			
				
		var filter = input.value.toUpperCase();
		var ul = document.getElementById("finalList");
		var li = ul.getElementsByTagName("li");
		
		var i, a;		
		
		for(i=0; i<li.length; i++){
			a = li[i].getElementsByTagName("a")[0]; 	
			
			// companies that contain the input value will be displayed and other remain hidden
			if(a.innerHTML.toUpperCase().indexOf(filter) > -1){
				li[i].style.display = "";				
			} else{
				li[i].style.display = "none";
			}
			
			// if the search box value is null, all the list items wil be hidden
			if(!document.getElementById("myInput").value){
				li[i].style.display = "none";
			}			
		}
	}
	
 	</script>    
 	
  </body>
</html>