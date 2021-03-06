<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- Meta, title, CSS, favicons, etc. -->
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Fin network</title>

<!-- Bootstrap -->
<link href="vendors/bootstrap/dist/css/bootstrap.min.css"
	rel="stylesheet">
<!-- Font Awesome -->
<link href="vendors/font-awesome/css/font-awesome.min.css"
	rel="stylesheet">
<link href="vendors/pnotify/dist/pnotify.css" rel="stylesheet">
<link href="vendors/pnotify/dist/pnotify.buttons.css" rel="stylesheet">
<!-- Custom Theme Style -->
<link href="build/css/custom.min.css" rel="stylesheet">
<style type="text/css">
#container {
	position: relative;
	overflow: hidden;
}
</style>
</head>
<%String company=request.getParameter("param");%>
<script>
var company_to_pass_draw_me="<%=company%>";
</script>
<body class="nav-md">
	<div class="container body">
		<div class="main_container">
			<div class="col-md-3 left_col">
				<div class="left_col scroll-view">
					<div class="navbar nav_title" style="border: 0;">
						<a href="index.html" class="site_title"> <!-- <i class="fa fa-paw"></i> -->
							<span>Fin Network</span>
						</a>
					</div>

					<div class="clearfix"></div>

					<br />

					<!-- sidebar menu -->
					<div id="sidebar-menu"
						class="main_menu_side hidden-print main_menu">
						<div class="menu_section">
							<h3>General</h3>
								<ul class="nav side-menu">
								<li><a><i class="fa fa-calendar"></i>All Companies <span
										class="fa fa-chevron-down"></span></a>
									<ul class="nav child_menu">
										<li><a >2011</a></li>
										<li><a >2012</a></li>
										<li><a >2013</a></li>
										<li><a >2014</a></li>
										<li><a >2015</a></li>
										<li><a >2016</a></li>
									</ul></li>
						
                      <li><a href="compareByYears.jsp?param=<%=company%>"><i class="fa fa-home"></i>Compare by years</a>
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
									<h3 id="company_name">
										<%=company%>
									</h3>
								</div>
								<div class="col-md-6">
									<h3 id="show_year"></h3>
								</div>
							</div>

							<div class="col-md-12 col-sm-9 col-xs-12">
								<div id="container" class="demo-placeholder" style="height: 500px;">
										<nav aria-label="Page navigation example" style="float:right;margin-top:0">
						<ul class="pagination">
							
						
							
							<li class="page-item" id="2011_y"><a class="page-link" >2011</a></li>
							<li class="page-item" id="2012_y"><a class="page-link" >2012</a></li>
							<li class="page-item" id="2013_y"><a class="page-link" >2013</a></li>
							<li class="page-item" id="2014_y"><a class="page-link" >2014</a></li>
							<li class="page-item" id="2015_y"><a class="page-link" >2015</a></li>
							<li class="page-item" id="2016_y"><a class="page-link" >2016</a></li>
							
						</ul>
					</nav>								
							    </div>
							</div>
							<div class="col-md-3 col-sm-3 col-xs-12 bg-white"></div>

							<div class="clearfix"></div>
						</div>
					</div>

				</div>
				<br />

				<div class="row">
						
				</div>
			</div>
		</div>
	</div>
	<!-- /page content -->

	<!-- footer content -->
	<footer> </footer>
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
<% //	String a="../../FinNetwork/rest/company_name/2016&"+company; %>
	<script>
	
     $(document).ready(function (){
             $('.ui-pnotify').remove();
     // draw_me("2011_data");
      
      $('#2011_y').click(function(){ draw_me("../../FinNetwork/rest/company_name/2011&"+company_to_pass_draw_me); $("#show_year").text("2011"); return false; });
      $('#2012_y').click(function(){ draw_me("../../FinNetwork/rest/company_name/2012&"+company_to_pass_draw_me); $("#show_year").text("2012");return false; });
      $('#2013_y').click(function(){ draw_me("../../FinNetwork/rest/company_name/2013&"+company_to_pass_draw_me); $("#show_year").text("2014");return false; });
      $('#2014_y').click(function(){ draw_me("../../FinNetwork/rest/company_name/2014&"+company_to_pass_draw_me); $("#show_year").text("2014");return false; });
      $('#2015_y').click(function(){ draw_me("../../FinNetwork/rest/company_name/2015&"+company_to_pass_draw_me); $("#show_year").text("2015");return false; });
      $('#2016_y').click(function(){ draw_me("../../FinNetwork/rest/company_name/2016&"+company_to_pass_draw_me); $("#show_year").text("2016");return false; });


    
  
     });
    
    </script>

</body>
</html>
