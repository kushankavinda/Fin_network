<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Fin network</title>

    <!-- Bootstrap -->
    <link href="vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">  
    <!-- Font Awesome -->
    <link href="vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">  
    <link href="vendors/pnotify/dist/pnotify.css" rel="stylesheet">
    <link href="vendors/pnotify/dist/pnotify.buttons.css" rel="stylesheet">
    <!-- Custom Theme Style -->
    <link href="build/css/custom.min.css" rel="stylesheet"> 
  </head>
<%String company=request.getParameter("param");%>
<script>
var company_name="<%=company%>";

</script>
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
                  	   <li><a><i class="fa fa-home"></i>Select a year for Left<span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a  id="2011_L">2011</a></li>
                      <li><a id="2012_L">2012</a></li>
                      <li><a id="2013_L">2013</a></li>
                      <li><a  id="2014_L">2014</a></li>
                      <li><a  id="2015_L">2015</a></li>
                      <li><a id="2016_L">2016</a></li>
                    </ul>
                  </li>
                   <li><a><i class="fa fa-home"></i>Select a year for Right<span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a  id="2011_R">2011</a></li>
                      <li><a id="2012_R">2012</a></li>
                      <li><a id="2013_R">2013</a></li>
                      <li><a  id="2014_R">2014</a></li>
                      <li><a  id="2015_R">2015</a></li>
                      <li><a id="2016_R">2016</a></li>
                    </ul>
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
                    <h3 id="companyN">
                   	 <%=company %>
                    </h3>
                  </div>
                  <div class="col-md-6">
                  </div>
                </div>

                <div class="col-md-6 col-sm-6 col-xs-6" >
                 <div class="x_panel tile fixed_height_320">
                      <div class="x_title">
                        <h2 id="yearShow">year </h2>
                        <ul class="nav navbar-right panel_toolbox">              
                          <li><a class="close-link" style="left:25px"><!-- <i class="fa fa-close" ></i>--></a>
                          </li>
                        </ul>
                      <div class="clearfix"></div>
                      </div>
                      <div class="x_content" id="content_L" style="height: 250px;">
                      
                      </div>
                  </div>
                </div>
               
                 <div class="col-md-6 col-sm-6 col-xs-6" >
                 <div class="x_panel tile fixed_height_320">
                      <div class="x_title">
                        <h2 id="yearShowR">year </h2>
                        <ul class="nav navbar-right panel_toolbox">              
                          <li><a class="close-link" style="left:25px"><!--<i class="fa fa-close" ></i>--></a>
                          </li>
                        </ul>
                      <div class="clearfix"></div>
                      </div>
                      <div class="x_content" id="content_R" style="height: 250px;">
                      </div>
                  </div>
                </div>




                
                

                <div class="clearfix"></div>
              </div>
            </div>

          </div>
          <br />

          <div class="row" id="r1">
         
              </div>
            </div>
          </div>
        </div>
        <!-- /page content -->

        <!-- footer content -->
       <footer>
         
        </footer>
        <!-- /footer content -->
      </div>
    </div>

    <!-- jQuery -->
    <script src="vendors/jquery/dist/jquery.min.js"></script>  
    <!-- Bootstrap -->
    <script src="vendors/bootstrap/dist/js/bootstrap.min.js"></script>  
    <script src="vendors/pnotify/dist/pnotify.js"></script>
    <script src="vendors/pnotify/dist/pnotify.buttons.js"></script>
    <script src="build/js/custom.min.js"></script>
    <script src="js/d3.v4.min.js"></script>
    <script src="js/d3-selection-multi.v1.js"></script>
    <script src="js/graph_draw.js"></script>
    
    <script>
     $(document).ready(function (){
             $('.ui-pnotify').remove();
  
             $('#2011_L').click(function(){ draw_us("../../FinNetwork/rest/company_name/2011&"+company_name,0);$("#yearShow").text("2011"); return false; });
             $('#2012_L').click(function(){ draw_us("../../FinNetwork/rest/company_name/2012&"+company_name,0);$("#yearShow").text("2012"); return false; });
             $('#2013_L').click(function(){ draw_us("../../FinNetwork/rest/company_name/2013&"+company_name,0);$("#yearShow").text("2013"); return false; });
             $('#2014_L').click(function(){ draw_us("../../FinNetwork/rest/company_name/2014&"+company_name,0);$("#yearShow").text("2014"); return false; });
             $('#2015_L').click(function(){ draw_us("../../FinNetwork/rest/company_name/2015&"+company_name,0);$("#yearShow").text("2015"); return false; });
             $('#2016_L').click(function(){ draw_us("../../FinNetwork/rest/company_name/2016&"+company_name,0);$("#yearShow").text("2016"); return false; });


             $('#2011_R').click(function(){ draw_us("../../FinNetwork/rest/company_name/2011&"+company_name,1);$("#yearShowR").text("2011"); return false;});
             $('#2013_R').click(function(){ draw_us("../../FinNetwork/rest/company_name/2013&"+company_name,1);$("#yearShowR").text("2013"); return false;}); 
             $('#2014_R').click(function(){ draw_us("../../FinNetwork/rest/company_name/2014&"+company_name,1);$("#yearShowR").text("2014"); return false;});
             $('#2015_R').click(function(){ draw_us("../../FinNetwork/rest/company_name/2015&"+company_name,1);$("#yearShowR").text("2015"); return false;});
             $('#2016_R').click(function(){ draw_us("../../FinNetwork/rest/company_name/2016&"+company_name,1);$("#yearShowR").text("2016"); return false;});
     });
     $(document).ready(function(){
    	 
    	    $("#2011_R").click(function(){
    	        var leftYear= $("#yearShow").text();
    	        analyseGraph("2011&"+company_name,leftYear,company_name);
    	       
    	    });

    	    $("#2013_R").click(function(){
    	        var leftYear= $("#yearShow").text();
    	        analyseGraph("2013&"+company_name,leftYear,company_name);
    	    });

    	    $("#2014_R").click(function(){
    	        var leftYear= $("#yearShow").text();
    	        analyseGraph("2014&"+company_name,leftYear,company_name);
    	    });
    	    $("#2015_R").click(function(){
    	        var leftYear= $("#yearShow").text();
    	        analyseGraph("2015&"+company_name,leftYear,company_name);
    	    });
    	    $("#2016_R").click(function(){
    	        var leftYear= $("#yearShow").text();
    	        analyseGraph("2016&"+company_name,leftYear,company_name);
    	    });

    	    $("#2011_L").click(function(){
    	        var rightYear= $("#yearShowR").text();
    	        analyseGraph("2011&"+company_name,rightYear,company_name);
    	    });
    	    $("#2012_L").click(function(){
    	        var rightYear= $("#yearShowR").text();
    	        analyseGraph("2012&"+company_name,rightYear,company_name);
    	    });
    	    $("#2013_L").click(function(){
    	        var rightYear= $("#yearShowR").text();
    	        analyseGraph("2013&"+company_name,rightYear,company_name);
    	    });
    	    $("#2014_L").click(function(){
    	        var rightYear= $("#yearShowR").text();
    	        analyseGraph("2014&"+company_name,rightYear,company_name);
    	    });
    	    $("#2015_L").click(function(){
    	        var rightYear= $("#yearShowR").text();
    	        analyseGraph("2015&"+company_name,rightYear,company_name);
    	    });
    	    $("#2016_L").click(function(){
    	        var rightYear= $("#yearShowR").text();
    	        analyseGraph("2016&"+company_name,rightYear,company_name);
    	    });
     });
    </script>
	
  </body>
</html>
