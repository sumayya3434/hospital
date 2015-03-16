
var jsonData = {},
  hospListHeader = {},
  docListHeader = {};

$(document).ready( function () {
  
    function initializeDatatables(table) {
      $('#'+table).dataTable({
        "aLengthMenu": [[3, 5, 7,-1], [3, 5, 7, "All"]],
        "iDisplayLength": 5,
        "bDestroy" : true //to re-initiliaze table without errors
      });
    }

    $.ajax({
      type: 'GET',
      dataType: "json",
      url: 'json/hosp_info.json',
      data: '',
      success: function(response) {
        jsonData = response.hospital;
        hospListHeader= response.headers.hosp_list;
        docListHeader = response.headers.doc_list;
        hospital_details(); 
      },
      complete: function(response) {

      }
    });
     
    function hospital_details() {
        $("#doc_table_wrapper").hide(); 
        $("#info_table_wrapper").show();

        
        //for table header
        var row = $("<tr/>");
        $.each(hospListHeader , function(key, value) {
            row.append ($("<th>" + value + "</th>" ));
        });
        $("table#info_table > thead").html('').append(row);

        //for table content
       
        $.each(jsonData, function(i, f) {
          var phne = f.HELPLINE;
      
          var  tblRow = "<tr><td><img src='images/hosp_logo1.png' class='hosp_image'><span class='link'>" + f.NAME + "</span></td><td>" + f.LOCATION+ "</td><td><input readonly class='phoneField' value="+phne+" ></td></tr>";
         
          
          $("#info_table > tbody").append(tblRow);
           $(".phoneField").mask("9999-9999999");
         
         

        });
       
       initializeDatatables('info_table');
    }



    function doctor_details(hosp_name) {
      
        $("#info_table_wrapper").hide();
        $("#doc_table_wrapper").show();
        $("#backButton").removeClass("home_button");
         

        //for table header

        var row = $("<tr/>");
        $.each(docListHeader , function(key,value) {
          row.append ($("<th>" + value + "</th>" ));
        });
        $("table#doc_table > thead").html('').append(row); 

        //for table content

        var tblRow ='';
        $("#doc_table").dataTable().fnClearTable();
        $.each(jsonData , function(key,value) {
          if(value.NAME === hosp_name) {
         
            $.each(value.DOCTORS, function(k,v) {
                
                var table = new $.fn.dataTable.Api( '#doc_table' );
                table.row.add([v.Name,v.Specialization,v.ContactNo ]).draw();
            });
            
          }
        });

        

       initializeDatatables('doc_table');
       
    }

    $("#info_table tbody").on("click", "span.link", function() {
       var hosp_name = $(this).text();
      
       doctor_details(hosp_name);
    });


    $('#backButton').click(function(){
      $("#doc_table_wrapper").hide(); 
      $("#info_table_wrapper").show(); 
      $("#backButton").addClass("home_button");
    });

});














