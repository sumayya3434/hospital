var jsonData = {};

$(document).ready( function () {
  
  function initializeDatatables(info_table) {
    $('#info_table').dataTable({
      "aLengthMenu": [[3, 5, 7,-1], [3, 5, 7, "All"]],
      "iDisplayLength": 5
    });
  }
  

  $.ajax({
    type: 'GET',
    dataType: "json",
    url: 'json/hospital_info.json',
    data: '',
    success: function(response) {
      jsonData = response.hospital;
      jsonHeader= response.headers;
      jsonHead = response.doc_list;
      $("#info_table > tbody").html('');
      
      $.each(response.headers , function(key,value) {
        var row = $("<tr/>");
        $("table#info_table > thead").append(row); 
		    
        $.each(value ,function(k,v) {
			   row.append ($("<th>" + v + "</th>" ));
        });

	    });
		
      $.each(response.hospital, function(i, f) {
        var tblRow = "<tr><td><span class='link'>" + f.NAME + "</span></td><td>" + f.LOCATION+ "</td><td>" + f.HELPLINE + "</td></tr>";
        $("#info_table > tbody").append(tblRow);
      });
    },
    complete: function(response) {
      initializeDatatables('info_table');
    }
  });




  function doctor_details(hosp_name) {
      
       var dataTable = $('#info_table').dataTable();
       $("#backButton").removeClass("home_button");
       
        dataTable.fnClearTable();
        
        $.each(jsonHead , function(key,value) {
        var row = $("<tr/>");
        $("table#info_table > thead").append(row); 
        
        $.each(value ,function(k,v) {
         row.append ($("<th>" + v + "</th>" ));
        });
        $("table#info_table > thead").html('').append(row);

      });
       $("#info_table > tbody").html('');
       $.each(jsonData , function(key,value) {

        if(value.NAME === hosp_name) {
          $.each(value.DOCTORS ,function(k,v) {
    
              var Name= v.Name;
              var Spec = v.Specialisation;
              var No = v.ContactNo;
             
              dataTable.fnAddData([
                  Name,
                  Spec,
                  No
                  
              ]);
         

        });
       }
    });

  }

  $("#info_table tbody").on("click", "span.link", function() {
    var hosp_name = $(this).text();
    doctor_details(hosp_name);
  });


  $('#backButton').click(function(){
     var dataTable = $('#info_table').dataTable();
      dataTable.fnClearTable();
    
      $("#info_table > tbody").html('');
     
      $.each(jsonHeader , function(key,value) {
          var row = $("<tr/>");
          $("table#info_table > thead").append(row); 
          $.each(value ,function(k,v) {
            row.append ($("<th>" + v + "</th>" ));
          });
          $("table#info_table > thead").html('').append(row);
      });
       
      $.each(jsonData, function(i, f) {
        var tblRow = "<tr><td><span class='link'>" + f.NAME + "</span></td><td>" + f.LOCATION+ "</td><td>" + f.HELPLINE + "</td></tr>";
        $("#info_table > tbody").append(tblRow);
      });
    
   });
 
});














