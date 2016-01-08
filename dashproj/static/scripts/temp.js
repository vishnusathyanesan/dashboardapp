   $("#gform_13").submit(function(e) {
       // e.preventDefault();

       // alert();
       // e.preventDefault();
       var input_13_16 = $("#input_13_16 :selected").val();
       // alert(input_13_16); extensions 845 commercial, 803 interior, 802 exterior and other 852
       var ext_no = '';
       if (input_13_16 === 'Extension maison') {
           ext_no = '803';
       }
       if (input_13_16 === 'Intérieur') {
           ext_no = '803';
       }
       if (input_13_16 === 'Extérieur') {
           ext_no = '845';
       }
       if (input_13_16 === 'Commercial') {
           ext_no = '803';
       }
       if (input_13_16 === 'Autre') {
           ext_no = '852';
       }

       /* 
       Commercial: 845
        Interieur: 803
        Exterieur: 852
        Other (autre): 852
       if(input_13_16 === 'Extension maison')
       {
        ext_no = '400';
       }
       if(input_13_16 === 'Intérieur')
       {
        ext_no = '401';
       }
       if(input_13_16 === 'Extérieur')
       {
        ext_no = '402';
       }
       if(input_13_16 === 'Commercial')
       {
        ext_no = '405';
       }
       if(input_13_16 === 'Autre')
       {
        ext_no = '404';
       } */
       alert(ext_no);
       var input_13_24 = $('#input_13_24').val();
       var data = {
           "key": "c2ccd6b2604c01fbe93d9962801706fd",
           "exten": ext_no,
           "number": input_13_24
       }
       function callClient(){
         $.ajax({
                   type: 'post',
                   url: '<?php echo home_url(); ?>/ubity_api.php',
                   data: data,
                   success: function(dd) {
                       // alert(dd); 
                       // $('#gform_13').unbind('submit').submit();
                   }
               });
       }
       setTimeout(function () { callClient(); }, 5 * 60 * 1000);
       

   });