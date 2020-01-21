(function(){

    createPDF = function(lng){
        let list = getList();
        let doc = new jsPDF();

        // bold
        function b(){
           doc.setFontStyle("bold");
        }

        // normal
        function n(){
            doc.setFontStyle("normal");
        }

        // size
        function s(size){
            doc.setFontSize(size);
        }

        // trim 

        function trimmStartComma(data){
            let regEx = /^,/i;
            if(regEx.test(data)){
                return data.substring(1);
            } else {
                return data;
            }
        }

        // base64

        function toDataURL(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
              var reader = new FileReader();
              reader.onloadend = function() {
                callback(reader.result);
              }
              reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
          }

        // text arrange

        let y = 60;

        function textArrange(input, split, separator){
            let str = "";
     
             input.split(split).forEach(element => {
                 element = element.trim();
                 if(element.length){
                     if(doc.getTextDimensions(str + separator + element).w > 135){
                         doc.text(trimmStartComma(str).trim(), 62, y);
                         str = separator  + element;
                         y += 4.2;
                     } else {
                         str += separator  + element;
                     }
                 }
             });
 
             doc.text(trimmStartComma(str).trim(), 62, y);
             y += 4.2; 
         };

        // pdf

        // header
        doc.setFont("arial");
        s(13);
        doc.text(languageSelect.p1[lng], 15, 15);
        b();
        doc.text(languageSelect.p2[lng], lng ? 97 : 82, 15);
        n();
        s(11);
        doc.text(languageSelect.p3[lng], 15, 22);
        b();
        doc.text(languageSelect.p4[lng], lng ? 78 : 65, 22);
        s(13);
        doc.text(languageSelect.p5[lng], 15, 31);
        doc.text(languageSelect.p16[lng], 15, 37);
        doc.text(counter.innerHTML, 22, 37);
        doc.text(list.date, 50, 37);
        n();
        doc.setLineWidth(0.1);
        doc.line(15, 40, 134, 40);
        doc.line(15, 40.8, 134, 40.8);
        //add image
        // if(lng == 1){
        //     doc.addImage(maxLogoBg, 134, 8.5, 68, 37);
        // } else {
        //     doc.addImage(maxLogoEn, 134, 8.5, 68, 37);
        // } 
        

        // content

        // names

        s(10);
        b();

        doc.text(languageSelect.p6[lng], 17, 60);
        
        textArrange(list.names, "\n", ", ");
        n();
        let people = "";

        if(list.adult){
            people += ", " + languageSelect.adult[lng] + " " + list.adult;
        }
        if(list.childrenReg){
            people += ", " + languageSelect.childrenReg[lng] + " " + list.childrenReg;
        }
        if(list.childrenExtra){
            people += ", " + languageSelect.childrenExtra[lng] + " " + list.childrenExtra;
        }

        if(people){
            people = "(" + trimmStartComma(people).trim() + ")";
            doc.text(people, 62, y);
            y += 4.2;
        }

        //description
        y += 5;
        b();
        doc.text(languageSelect.p7[lng], 17, y);
        n();

        textArrange(list.description, " ", " ");


        //type
        y += 2;

        doc.text(languageSelect.p8[lng], 17, y);

        let type = "";

        if(list.excursion){
            type += ", " + languageSelect.excursion[lng];
        }

        if(list.vacation){
            type += ", " + languageSelect.vacation[lng];
        }

        if(list.reservation){
            type += ", " + languageSelect.reservation[lng];
        }
        
        if(list.tickets){
            type += ", " + languageSelect.tickets[lng];
        }

        type = trimmStartComma(type).trim();

        doc.text(type, 62, y);
        
        //prepaid services

        y += 6.2;

        doc.text(languageSelect.p9[lng], 17, y);
        let extras = "";

        if(list.transportation){
            extras += ">" + languageSelect.transportation[lng];
        }
        
        if(list.accomodation){
            extras += ">" + languageSelect.accomodation[lng];
        }
        
        if(list.excursionProgram){
            extras += ">" + languageSelect.excursionProgram[lng];
        }
        
        if(list.guideServices){
            extras += ">" + languageSelect.guideServices[lng];
        }
        
        if(list.medInsurance){
            extras += ">" + languageSelect.medInsurance[lng];
        }
        
        if(list.transfers){
            extras += ">" + languageSelect.transfers[lng];
        }

        textArrange(extras, ">", ", ");

        //notes
        y += 2;
        doc.text(languageSelect.p10[lng], 17, y);
        textArrange(list.notes," "," ");

        //dates 

        y += 6.2;
        b();
        doc.text(languageSelect.p11[lng], 17, y);
        n();
        doc.text(languageSelect.arrival[lng], 62, y);
        b();
        doc.text(list.arrival, lng ? 83:74, y);
        n();
        doc.text(languageSelect.departure[lng], lng ? 107 : 97, y);
        b();
        doc.text(list.departure, lng ? 126 : 114, y);
        n();

        //contracting party

        y += 7;
        b();
        doc.text(languageSelect.p12[lng], 17, y);
        n();
        doc.text(list.contractingParty, 62, y);

        //contracting party address

        y += 5;
        doc.text(languageSelect.p13[lng], 17, y);
        doc.text(list.contractingPartyAddress, 62, y);

        //rectangle
        y += 10;
        doc.rect(17, y, 176, 70); 

        //stamp
        y += 62;
        doc.text(languageSelect.p14[lng], 27, y);

        //www
        doc.text(languageSelect.p15[lng], 156, (y-52));

        //sos pic
        y = 245;

        //add image
        // if(lng == 1){
        //     doc.addImage(phoneBg, 17, y, 176, 25);
        // } else {
        //     doc.addImage(phoneEn, 17, y, 176, 25);
        // }

        // dash
        y += 30;
        doc.line(17, y, 193, y);    
        
        // info
        y += 5;
        b();
        doc.text(languageSelect.f1[lng], 17, y);
        n();
        s(8.8);
        y += 3.2;
        doc.text(languageSelect.f2[lng], 17, y);
        
        /* save */
        doc.save("vaucher" + list.id + ".pdf");
    };

    document.getElementById("pdfBg").addEventListener("click", function(){
       createPDF(1);
       localStorage.removeItem("voucher-edit-id");
       document.querySelectorAll("textarea").forEach(element => {
           element.value = "";
       });
       document.querySelectorAll("input").forEach(element => {
           element.value = "";
       });
       return window.location.reload();
    })   

    document.getElementById("pdfEn").addEventListener("click", function(){
        createPDF(0);
        localStorage.removeItem("voucher-edit-id");
        document.querySelectorAll("textarea").forEach(element => {
            element.value = "";
        });
        document.querySelectorAll("input").forEach(element => {
            element.value = "";
        });
        return window.location.reload();
     })   
})();