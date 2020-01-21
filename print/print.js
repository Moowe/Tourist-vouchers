/////////////////////////////////////////////
////// Inser into print



(function(){
    let vid;
    if(editId = localStorage.getItem("voucher-edit-id")){
        vid = parseInt(editId);
        localStorage.removeItem("voucher-edit-id");
    } else {
        vid = localStorage.getItem('voucher-id');
    }
    
    
    let list = localStorage.getItem('voucher-' + vid);
    let burq = JSON.parse(list);
    
    function trimmStartComma(data){
        return data.substring(2);
    }
    
    let dots = ".........................................................................................................................................."

    // date

    document.getElementById("todayDate").innerHTML = burq.date;


    // names
    
    let names = document.getElementById("names");
    let x = "";
    
    if(burq.names){
        burq.names.split("\n").forEach(element => {
            element = element.trim();
            if(element.length){
                names.innerHTML += ", " + element;
            }
        });
        if(burq.adult){
            x += ", " + languageSelect.adult[lng] + " " + burq.adult;
        }
        if(burq.childrenReg){
            x += ", " + languageSelect.childrenReg[lng] + " " + burq.childrenReg;
        }
        if(burq.childrenExtra){
            x += ", " + languageSelect.childrenExtra[lng] + " " + burq.childrenExtra;
        }
        if(x){
            names.innerHTML += "<br>" + "(" + trimmStartComma(x) + ")";
        }
    }

    if(names.innerHTML.length == 0){
        names.classList.remove("bold");
        names.innerHTML = dots;
    }

    document.getElementById("names").innerHTML = trimmStartComma(names.innerHTML);
    
    // description of the service

    document.getElementById("description").innerHTML = burq.description.trim();

    if(description.innerHTML.length == 0){
        description.innerHTML = dots;
    }

    // type of service
    let type = "";

    if(burq.excursion){
        type += ", " + languageSelect.excursion[lng];
    }

    if(burq.vacation){
        type += ", " + languageSelect.vacation[lng];
    }

    if(burq.reservation){
        type += ", " + languageSelect.reservation[lng];
    }
    
    if(burq.tickets){
        type += ", " + languageSelect.tickets[lng];
    }

    if(type == ""){
        document.getElementById("type").innerHTML = dots;
    } else {
        document.getElementById("type").innerHTML = trimmStartComma(type);
    }
    
    // prepaid services 

    let extras = "";

    if(burq.transportation){
        extras += ", " + languageSelect.transportation[lng];
    }
    
    if(burq.accomodation){
        extras += ", " + languageSelect.accomodation[lng];
    }
    
    if(burq.excursionProgram){
        extras += ", " + languageSelect.excursionProgram[lng];
    }
    
    if(burq.guideServices){
        extras += ", " + languageSelect.guideServices[lng];
    }
    
    if(burq.medInsurance){
        extras += ", " + languageSelect.medInsurance[lng];
    }
    
    if(burq.transfers){
        extras += ", " + languageSelect.transfers[lng];
    }

    if(extras == ""){
        document.getElementById("extras").innerHTML = dots;
    } else {
        document.getElementById("extras").innerHTML = trimmStartComma(extras);
    }

    // dates

    document.getElementById("dates").innerHTML += languageSelect.arrival[lng] + " " + burq.arrival.bold() + "\xa0" + "\xa0" + "\xa0" + "\xa0" + "\xa0" + "\xa0";
    document.getElementById("dates").innerHTML += languageSelect.departure[lng] + " " + burq.departure.bold();

    // contracting party name

    document.getElementById("contractor").innerHTML = burq.contractingParty.trim();

    if(contractor.innerHTML.length == 0){
        contractor.innerHTML = dots;
    }

    // contracting party address

    document.getElementById("contractorAddress").innerHTML = burq.contractingPartyAddress.trim();

    if(contractorAddress.innerHTML.length == 0){
        contractorAddress.innerHTML = dots;
    }
    
    // notes

    if(burq.notes){
        document.getElementById("notes").innerHTML = burq.notes;
        document.getElementsByClassName("hidden")[0].classList.remove("hidden");  
    }

    // display counter

    let counter = localStorage.getItem('voucher-id');;

    document.getElementById("counter").innerText = counter.toString().padStart(10, "0");

    // print preview ::DISABLED::
    
    //window.print();

})();