(function () {
    document.querySelectorAll(".checkbox").forEach(element => {
        element.addEventListener("click", function (){
            if(!element.classList.contains("checked")){
                element.classList.add("checked");
            } else {
                element.classList.remove("checked"); 
            }    
        });    
    });
    
    let radio = document.querySelectorAll(".checkbox_radio");
    
    radio.forEach(element => {
        element.addEventListener("click", function (){
            radio.forEach(el => {
                el.classList.remove("checked");
            });
            element.classList.add("checked");
        });
    });
    
    var today = new Date();
    var tday = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = dd + '/' + mm + '/' + yyyy;
    todayHead = " / " + dd + "." + mm + "." + yyyy;
    
    var foopicker = new FooPicker({
        id: 'datepicker',
        dateFormat: 'dd/MM/yyyy',
        disable: [],
        mindate: {
            d:tday.getDate(),
            m:tday.getMonth()+1,
            y:tday.getFullYear()
        }
    });
    
    var foopicker2 = new FooPicker({
        id: 'datepicker2',
        dateFormat: 'dd/MM/yyyy',
        disable: [],
        mindate: {
            d:tday.getDate(),
            m:tday.getMonth()+1,
            y:tday.getFullYear()
        }
    });
    
    document.getElementById("todayDateHeader").innerHTML = todayHead;
    document.getElementById("datepicker").value = today;
    document.getElementById("datepicker2").value = today;
    
    function parseDate(datestr){
        return {
            d: parseInt(datestr.substr(0,2)),
            m: parseInt(datestr.substr(3,2)),
            y: parseInt(datestr.substr(-4))
        }
    }
    
    let userChangeDeparture = false;
    
    document.getElementById("datepicker2").addEventListener("blur", function(){
        userChangeDeparture = true;
    });
    
    document.getElementById("datepicker").addEventListener("blur", function(){
        let x = document.getElementById("datepicker").value;
        let y = document.getElementById("datepicker2").value;
        ddate = parseDate(x);
        tdate = parseDate(y);
        tday = new Date(ddate.y, ddate.m, ddate.d, 0, 0, 0, 0);
        tmday = new Date(tdate.y, tdate.m, tdate.d, 0, 0, 0, 0);
        
        if(!userChangeDeparture || tday.valueOf() > tmday.valueOf()){
            document.getElementById("datepicker2").value = x;
        }
        foopicker2.reinit({
            mindate: {
                d:tday.getDate(),
                m:tday.getMonth(),
                y:tday.getFullYear()
            }
        });
    });
    
    
    ////////////////////////////////////////////
    
    getList = function(){
        let list = {};
        list.id = vid;
        list.date = document.getElementById("todayDateHeader").innerHTML;
        console.log(list.date);
        list.names = document.getElementById("touristNames").value;
        list.description = document.getElementById("serviceDescription").value;
        list.adult = document.getElementById("adult").value;
        list.childrenReg = document.getElementById("childrenReg").value;
        list.childrenExtra = document.getElementById("childrenExtra").value;
        list.otherServices = document.getElementById("otherServices").value;
        list.contractingParty = document.getElementById("contractingParty").value;
        list.contractingPartyAddress = document.getElementById("contractingPartyAddress").value;
        list.arrival = document.getElementById("datepicker").value;
        list.departure = document.getElementById("datepicker2").value;
        list.notes = document.getElementById("notes").value;
        document.querySelectorAll(".checked").forEach(element => {
            list[element.dataset.check] = 1;
        });

        return list;

    };

    // save, print

    document.getElementById("printSelect").addEventListener("click", function(event){
        let list = getList();
        event.stopPropagation();

        if(list.hasOwnProperty("accomodation") || list.hasOwnProperty("reservation") || list.hasOwnProperty("tickets") || list.hasOwnProperty("transfers") || list.hasOwnProperty("transportation") || list.hasOwnProperty("vacation") || list.hasOwnProperty("excursion") || list.hasOwnProperty("excursionProgram") || list.hasOwnProperty("guideServices") || list.hasOwnProperty("medInsurance") || list.adult || list.childrenExtra || list.childrenReg || list.otherServices || list.contractingParty || list.contractingPartyAddress ||list.description ||  list.names || list.notes){

            localStorage.setItem('voucher-' + vid, JSON.stringify(list));
            saveId();
        } else {
            return false;
        }
        document.getElementById("popUpMenu").classList.remove("hide");
    });

    window.addEventListener("click", function(){
        if(!(document.getElementById("popUpMenu").classList.contains("hide"))){
            document.getElementById("popUpMenu").classList.add("hide");
        }
    });

    document.querySelectorAll(".for_print").forEach(element => {
        element.addEventListener("click", function(){
            document.getElementById("printForm").reset();
            window.location.href = element.dataset.href;
        });
    });
    
    // newVoucher

    document.getElementById("newVoucher").addEventListener("click", function(){
        localStorage.removeItem("voucher-edit-id");
        document.querySelectorAll("textarea").forEach(element => {
            element.value = "";
        });
        document.querySelectorAll("input").forEach(element => {
            element.value = "";
        });
        return window.location.reload();
    });

    // list
    document.getElementById("list").addEventListener("click", function(){
        location.href = './list.html';
    });

    ///////////////////////////////////////////
    // read,save,modify unique vid (voucher id)
    
    let vid;
    let Save = true;
    
    (function(){
        if(editId = localStorage.getItem("voucher-edit-id")){
            vid = parseInt(editId);
            // insert data into index.html function
            let list = localStorage.getItem('voucher-' + vid);
            let editData = JSON.parse(list);
            
            document.getElementById("todayDateHeader").innerHTML = editData.date;
            document.getElementById("touristNames").innerHTML = editData.names;
            document.getElementById("adult").value = editData.adult;
            document.getElementById("childrenReg").value = editData.childrenReg;
            document.getElementById("childrenExtra").value = editData.childrenExtra;
            document.getElementById("serviceDescription").value = editData.description;
            document.getElementById("otherServices").value = editData.otherServices;
            document.getElementById("contractingParty").value = editData.contractingParty;
            document.getElementById("contractingPartyAddress").value = editData.contractingPartyAddress;
            
            document.querySelectorAll(".checkbox_radio").forEach(element => {
                element.classList.remove("checked");
            });

            if(editData.hasOwnProperty("cash")){
                document.querySelector("[data-check = 'cash']").classList.add("checked");
            } else {
                document.querySelector("[data-check = 'bank']").classList.add("checked");
            }

            document.getElementById("notes").value = editData.notes;

            if(editData.hasOwnProperty("excursion")){
                document.querySelector("[data-check = 'excursion']").classList.add("checked");
            }

            if(editData.hasOwnProperty("vacation")){
                document.querySelector("[data-check = 'vacation']").classList.add("checked");
            }

            if(editData.hasOwnProperty("excursion")){
                document.querySelector("[data-check = 'excursion']").classList.add("checked");
            }

            if(editData.hasOwnProperty("reservation")){
                document.querySelector("[data-check = 'reservation']").classList.add("checked");
            }

            if(editData.hasOwnProperty("tickets")){
                document.querySelector("[data-check = 'tickets']").classList.add("checked");
            }
           
            document.getElementById("datepicker").value = editData.arrival;

            document.getElementById("datepicker2").value = editData.departure;

            if(editData.hasOwnProperty("transportation")){
                document.querySelector("[data-check = 'transportation']").classList.add("checked");
            }

            if(editData.hasOwnProperty("accomodation")){
                document.querySelector("[data-check = 'accomodation']").classList.add("checked");
            }

            if(editData.hasOwnProperty("excursionProgram")){
                document.querySelector("[data-check = 'excursionProgram']").classList.add("checked");
            }

            if(editData.hasOwnProperty("guideServices")){
                document.querySelector("[data-check = 'guideServices']").classList.add("checked");
            }

            if(editData.hasOwnProperty("medInsurance")){
                document.querySelector("[data-check = 'medInsurance']").classList.add("checked");
            }

            if(editData.hasOwnProperty("transfers")){
                document.querySelector("[data-check = 'transfers']").classList.add("checked");
            }

            Save = false;

        } else {
            let vids = localStorage.getItem('voucher-id');

            if(vids){
                vid = parseInt(vids);
                vid++;
            } else {
                vid = 1;    
            }
        };

        saveId = function(){
            if(Save){
                localStorage.setItem('voucher-id', vid);
            }
        };

    })();
    
    document.getElementById("counter").innerText = vid.toString
    ().padStart(10, "0");

})();
