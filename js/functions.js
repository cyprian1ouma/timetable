const validationanchor=$(".validation")
const toggle=$("#nav-toggle")
// toggle.prop("checked",true)
let serverdate

function getserverdate(){
    const dfd=$.Deferred()
    $.get(
        "../controllers/settingsoperations.php",
        {
            getserverdate:true
        },
        (data)=>{
            serverdate=new Date(data)
            dfd.resolve()
        }
   )
   return dfd.promise()
}

// get current server date 
getserverdate()

function setactivemenu(menu){
    menu.addClass("active")
}

const patterns={
    mobile:/^\d{10,12}$/,
    name:/^\[a-zA-z]+$/,
    password:/^[\w@-]{5,20}$/,
    email:/^[a-z\d\.-]+@[a-z\d]+\.[a-z]{2,8}(\.[a-z]{2,8})?$/
}

validationanchor.on("click",function(e){
    const id=$(this).attr("data-id") 
    let pagetonavigate=$(this).attr("href")
    e.preventDefault()
    $.post(
      "../controllers/useroperations.php",
      {
        getuserprivilege:true,
        objectid: id
      },
      function(data){
        const allowed=parseInt($.trim(data.toString()))
        if(allowed==0){
          bootbox.alert({
            message: "Sorry. Your are not authorized to perform this operation.",
          })
        }else{
          window.location.href=pagetonavigate
        }
      }
    )
   })

function validatefielddata(validatevalue,format){
    return patterns[format].test(validatevalue)?true:false
}

function subtractYears(numOfYears, date = new Date()) {
    date.setFullYear(date.getFullYear() - numOfYears);
    return date;
}

function formatDate(value) {
    let date = new Date(value);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return day + '-' + month + '-' + year;
}

function isJSON(str) {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
}

function getloggedinuser(){
    const username=$(".username")
    const role=$(".role")
    const image=$(".profilephoto")

    $.getJSON(
        "../controllers/useroperations.php",
        {
            getloggedinuser:true
        },
        (data)=>{
            username.html(data[0].firstname+' '+data[0].middlename)
            role.html(data[0].systemadmin?'Admin Account':'User Account')
            image.attr("src","../images/blankavatar.jpg")
        }
    )
}


// Logout person
$("#logout").on("click",function(e){
    e.preventDefault()
    window.location.href="../controllers/personoperations.php?logoff"
})

$("#logoutuser").on("click",function(e){
    e.preventDefault()
    window.location.href="../controllers/useroperations.php?logout"
})


function getcountries(obj,option='all'){
    $.getJSON(
        "../controllers/countryoperations.php",
        {
            getcountries:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((country)=>{
                results+=`<option value='${country.nationalityid}'>${country.countryname}</option>`
            })
            obj.html(results)
        }
    )
}

function exporttable(tableid,sheetname,documentname){
    // check if multiple tables are to be exported
    var wb = XLSX.utils.table_to_book(document.getElementById(tableid), {sheet:sheetname});
    var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), `${documentname}.xlsx`);

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
}

function exportMultipleTables(tableIds, sheetNames, documentName) {
    // Create a new workbook
    var wb = XLSX.utils.book_new()

    // Convert each table to a worksheet and append to the workbook
    tableIds.forEach((tableId, index) => {
        var tableElement = document.getElementById(tableId)
        var ws = XLSX.utils.table_to_sheet(tableElement)
        XLSX.utils.book_append_sheet(wb, ws, sheetNames[index])
    });

    // Write the workbook to a binary string
    var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'binary'})

    // Convert binary string to ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length)
        var view = new Uint8Array(buf)
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF
        return buf
    }

    // Save the workbook
    saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), `${documentName}.xlsx`);
}

function getusers(obj,option){
    $.getJSON(
        "../controllers/useroperations.php",
        {
            getuserslist:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((user)=>{
                results+=`<option value='${user.id}'>${user.firstname} ${user.middlename} ${user.lastname}</option>`
            })
            obj.html(results)
        }
    )
}

function setDatePicker(controlname,maxdate=true, mindate=false){
    if(maxdate){
        controlname.datepicker({ 
            yearRange: "c-70:c+0",
            dateFormat: 'dd-M-yy',
            changeMonth:true,
            changeYear:true,
            maxDate: new Date()
        })
    }else if(mindate){
        controlname.datepicker({ 
            yearRange: "c-0:c+20",
            dateFormat: 'dd-M-yy',
            changeMonth:true,
            changeYear:true,
            minDate: new Date()
        })
    }else{
        controlname.datepicker({ 
            yearRange: "c-70:c+20",
            dateFormat: 'dd-M-yy',
            changeMonth:true,
            changeYear:true
        })
    }
}

function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
}

function getglaccountclasses(obj, option='all'){
    $.getJSON(
        "../controllers/glaccountoperations.php",
        {
            getglaccountclasses:true
        },
        (data)=>{

            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((glclass)=>{
                results+=`<option value='${glclass.id}'>${glclass.classname}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getglaccounts(obj, groupid=0,option='all'){
    $.getJSON(
        "../controllers/glaccountoperations.php",
        {
            getglaccounts:true,
            groupid
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((glaccount)=>{
                results+=`<option value='${glaccount.id}' data-accountcode='${glaccount.accountcode}'>${glaccount.accountname}</option>`
            })
            obj.html(results)
        }
    )   
}

function getpropertyunitcategories(obj, option='all'){
    $.getJSON(
        "../controllers/propertyoperations.php",
        {
            getpropertyunitcategories:true
        },
        (data)=>{

            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((category)=>{
                results+=`<option value='${category.categoryid}'>${category.categoryname}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getbranches(obj, option='all'){
    $.getJSON(
        "../controllers/branchoperations.php",
        {
            getbranches:true
        },
        (data)=>{

            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((branch)=>{
                results+=`<option value='${branch.branchid}'>${branch.branchname}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getproperties(obj, option='all'){
    $.getJSON(
        "../controllers/propertyoperations.php",
        {
            filterproperties:true,
            branchid:0
        },
        (data)=>{

            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((property)=>{
                results+=`<option value='${property.propertyid}'>${property.propertyname}</option>`
            })
            obj.html(results)
        }
    ) 
}

function sanitizestring(str){
    return str==''?str:str.replace("'","''").trim()
}


function convertToRoman(num) {
    if (num <= 0 || num >= 4000) {
        return "Invalid input. Please enter a number between 1 and 3999.";
    }

    const romanNumerals = [
        ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
        ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
        ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
        ["", "M", "MM", "MMM"]
    ];

    const thousands = Math.floor(num / 1000);
    const hundreds = Math.floor((num % 1000) / 100);
    const tens = Math.floor((num % 100) / 10);
    const ones = num % 10;

    return (
        romanNumerals[3][thousands] +
        romanNumerals[2][hundreds] +
        romanNumerals[1][tens] +
        romanNumerals[0][ones]
    );
}

function convertToAscii(num) {
    if (num < 0 || num > 255) {
        return "Invalid input. Please enter a number between 0 and 255.";
    }

    return String.fromCharCode(num);
}

function convertToNumeric(char) {
    if (char.length !== 1) {
        return "Invalid input. Please enter a single character.";
    }

    const asciiCode = char.charCodeAt(0);
    return asciiCode;
}
  
function isOnlyLetters(text) {
    // Use a regular expression to check if the string contains only letters from a to z
    const regex = /^[a-z]+$/i; // The 'i' flag makes the check case-insensitive

    return regex.test(text);
}


function getvoteheads(obj, option='all'){
    $.getJSON(
        "../controllers/accountoperations.php",
        {
            getvoteheads:true
        },
        (data)=>{

            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((item)=>{
                results+=`<option value='${item.itemid}'>${item.itemname}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getidocuments(obj, option='all'){
    $.getJSON(
        "../controllers/settingsoperations.php",
        {
            getregistrationdocuments:true
        },
        (data)=>{

            let results=option=='all'?"<option value='0' data-expires='1'>&lt;All&gt;</option>":"<option value='' data-expires='1'>&lt;Choose&gt;</option>"
            data.forEach((document)=>{
                results+=`<option value='${document.documentid}' data-expires=${document.expires}>${document.documenttypename}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getblocks(obj, propertyid,option='all'){
    const dfd=$.Deferred()
    $.getJSON(
        "../controllers/propertyoperations.php",
        {
            getblocks:true,
            propertyid
        },
        (data)=>{

            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((block)=>{
                results+=`<option value='${block.blockid}'>${block.blockname}</option>`
            })
            obj.html(results)
            dfd.resolve()
        }
    ) 
    return dfd.promise()
}

function getmaritalstatuses(obj, option='all'){
    $.getJSON(
        "../controllers/settingsoperations.php",
        {
            getmaritalstatuses:true
        },
        (data)=>{

            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((maritalstatus)=>{
                results+=`<option value='${maritalstatus.id}'>${maritalstatus.maritalstatus}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getreligions(obj, option='all'){
    $.getJSON(
        "../controllers/settingsoperations.php",
        {
            getreligions:true
        },
        (data)=>{

            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((religion)=>{
                results+=`<option value='${religion.id}'>${religion.religionname}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getsalutations(obj, option='all'){
    $.getJSON(
        "../controllers/settingsoperations.php",
        {
            getsalutations:true
        },
        (data)=>{

            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((salutation)=>{
                results+=`<option value='${salutation.id}'>${salutation.salutation}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getpropertyunittypes(obj, option='all'){
    $.getJSON(
        "../controllers/propertyoperations.php",
        {
            getunittypes:true
        },
        (data)=>{

            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((unittype)=>{
                results+=`<option value='${unittype.typeid}'>${unittype.typename}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getpropertyowners(obj, option='all'){
    $.getJSON(
        "../controllers/owneroperations.php",
        {
            getowners:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((owner)=>{
                results+=`<option value='${owner.ownerid}'>${owner.name}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getpropertyunits(obj,propertyid,option='all'){
    $.getJSON(
        "../controllers/propertyoperations.php",
        {
            filterpropertyunits:true,
            propertyid
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((unit)=>{
                results+=`<option value='${unit.unitid}'>${unit.unitname}</option>`
            })
            obj.html(results)
        }
    ) 
}

function gettenantcategories(obj,option='all'){
    $.getJSON(
        "../controllers/settingsoperations.php",
        {
            gettenantcategories:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((category)=>{
                results+=`<option value='${category.categoryid}'>${category.categoryname}</option>`
            })
            obj.html(results)
        }
    ) 
}


function getpropertyowners(obj,unitid,option='all'){
    $.getJSON(
        "../controllers/owneroperations.php",
        {
            getpropertyunitowners:true,
            unitid
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((owner)=>{
                results+=`<option value='${owner.ownerid}'>${owner.ownername}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getinventorytypes(obj,option='all'){
    $.getJSON(
        "../controllers/inventoryoperations.php",
        {
            getinventorytypes:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((type)=>{
                results+=`<option value='${type.typeid}'>${type.typename}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getinventorycategories(obj,typeid,option='all'){
    $.getJSON(
        "../controllers/inventoryoperations.php",
        {
            filterinventorycategory:true,
            typeid
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((category)=>{
                results+=`<option value='${category.categoryid}'>${category.categoryname}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getbanks(obj,option='all'){
    dfd= $.Deferred()
    $.getJSON(
        "../controllers/bankoperations.php",
        {
            getbanks:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((bank)=>{
                results+=`<option value='${bank.bankid}'>${bank.bankname}</option>`
            })
            obj.html(results)
            dfd.resolve()
        }
    ) 
    return dfd.promise()
}

//function for getting a bank branch
function getbankbranches(obj,bankid,option='all'){
    dfd=$.Deferred()
    $.getJSON(
        "../controllers/bankoperations.php",
        {
          getbranches:true,
          bankid
        },
        (data)=>{
            let results = option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((branch)=>{
                results+=`<option value='${branch.branchid}'>${branch.branchname} </option>`
            })
            // console.log(results)
            obj.html(results)
            dfd.resolve()
        }
    )
    return dfd.promise()
}

function gotonotifications(notificationid){
    $('html, body').animate({
        scrollTop: (notificationid.offset().top-300)
      }, 1000)
}


function populatemonths(obj){
    const months=["January","February","March","April","May","June","July","August","September","October","November","December"]
    let results=""
    months.forEach((month,i)=>{
        results+=`<option value=${i+1}>${month}</option>`
    })
    obj.html(results)
    getserverdate().done(()=>{
        const currentmonth=serverdate.getMonth()
        obj.val(currentmonth+1) 
    })
}

function populateyears(obj){
    let results=""
    
    for (let i=2010;i<=2050;i++){
        results+=`<option value=${i}>${i}</option>`
    }

    obj.html(results)

    getserverdate().done(()=>{
        const currentyear=serverdate.getFullYear()
         obj.val(currentyear)
    })
}


function generatenumbers(style,startat,units,padzeros=false,prefix="",suffix=""){
    const numbers=[], totalunits=Number(startat)+Number(units)-1

    if(style=="numeric" || style=="roman"){
        if(parseInt(startat)){
            for( let i=startat;i<=totalunits;i++){
                currentno=style=="roman"?decimalToRoman(i):i
                if(padzeros==false){
                    numbers.push(`${prefix}${currentno}${suffix}`)
                }else{
                    let padding="", currnolength=currentnoi.toString().length
                    for(let j=currnolength;j<totalunits.toString().length;j++){
                        padding+=`0`
                    }
                    numbers.push(`${prefix}${padding}${currentno}${suffix}`)
                }
            }
            return numbers
        }else{
            return "invalid start number"
        }
    }else if(style=="alphabetic"){
        // check that start style is a single alphabetic letter
        startat=startat.toUpperCase()
        const pattern=/^[A-Z]$/
        if(pattern.test(startat)){
            const numericstart=convertToNumeric(startat)
            for(i=numericstart;i<totalunits;i++){
                if(padding==false){
                    numbers.push(`${prefix}${convertToAscii(i)}${suffix}`)
                }else{
                    let padding="", currnolength=convertToAscii(i).toString().length
                    for(let j=currnolength;j<totalunits.toString().length;j++){
                        padding+=`0`
                    }
                    numbers.push(`${prefix}${padding}${convertToAscii(i)}${suffix}`)
                }
            }
            return numbers
        }else{
            return "invalid start number"
        }
    }
}

function decimalToRoman(num) {
    // Array of objects containing Roman numeral and corresponding value
    const romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ]
    
    // Initialize result string
    let romanNumeral = ''
    
    // Iterate through the array of objects
    for (const item of romanNumerals) {
        while (num >= item.value) {
            romanNumeral += item.numeral
            num -= item.value
        }
    }
    
    return romanNumeral
}


function getjobgroups(obj,option='all'){
    $.getJSON(
        "../controllers/payrolloperations.php",
        {
            getjobgroups:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((jobgroup)=>{
                results+=`<option value='${jobgroup.jobgroupid}'>${jobgroup.jobgroupname}</option>`
            })
            obj.html(results)
        }
    ) 
}


function getjobnotches(obj,option='all'){
    $.getJSON(
        "../controllers/payrolloperations.php",
        {
            getnotches:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((notch)=>{
                results+=`<option value='${notch.notchid}'>${notch.notchname}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getjobpositions(obj,option='all',showtop=0){
    $.getJSON(
        "../controllers/payrolloperations.php",
        {
            getjobpositions:true
        },
        (data)=>{
            let results=showtop==1?`<option value="0">&lt;Top&gt;</option>`:option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            // results+=
            data.forEach((position)=>{
                results+=`<option value='${position.positionid}'>${position.positionname}</option>`
            })
            obj.html(results)
        }
    ) 
}


function getcreditors(obj,option='all'){
    $.getJSON(
        "../controllers/creditoroperations.php",
        {
            getcreditors:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((creditor)=>{
                results+=`<option value='${creditor.creditorid}'>${creditor.creditorname}</option>`
            })
            obj.html(results)
        }
    ) 
}

function renumbertablerows(table){
    table.find("tbody tr").each(function(i){
        $(this).find("td").eq(0).text(Number(i+1))
    })
}


function getpayrollitems(obj,category='<all>',option='all',addgross=false){
    dfd=$.Deferred()
    $.getJSON(
        "../controllers/payrolloperations.php",
        {
            getpayrollitems:true,
            category
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            if(addgross){
                results+=`<option value='gross'>&lt;Gross Salary&gt;</option>`
            }   
            data.forEach((item)=>{
                results+=`<option value='${item.itemid}'>${item.itemname}</option>`
            })
            obj.html(results)
            dfd.resolve()
        }
    ) 
    return dfd.promise()
}

function getemploymentterms(obj,option='all'){
    $.getJSON(
        "../controllers/payrolloperations.php",
        {
            getemploymentterms:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((term)=>{
                results+=`<option value='${term.termid}'>${term.termname}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getjobcategories(obj,option='all'){
    $.getJSON(
        "../controllers/payrolloperations.php",
        {
            getjobcategories:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((category)=>{
                results+=`<option value='${category.categoryid}'>${category.categoryname}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getdepartments(obj,option='all'){
    $.getJSON(
        "../controllers/departmentoperations.php",
        {
            getdepartments:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((department)=>{
                results+=`<option value='${department.departmentid}'>${department.departmentname}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getTodaysDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()]; // Get month name from the array
    const year = date.getFullYear(); // Get full year

    return `${day}-${month}-${year}`;
}

function gettaxlabels(obj,option='all'){
    $.getJSON(
        "../controllers/payrolloperations.php",
        {
            gettaxlabels:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((taxlabel)=>{
                results+=`<option value='${taxlabel.payeid}' ${taxlabel.current==1?'selected': ''}>${taxlabel.label}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getstatutoryitems(obj,option='all'){
    $.getJSON(
        "../controllers/payrolloperations.php",
        {
            getstatutoryitems:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((item)=>{
                results+=`<option value='${item.itemid}'>${item.itemname}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getpayrollitemgroups(obj,option='all'){
    $.getJSON(
        "../controllers/payrolloperations.php",
        {
            getpayrollitemgroups:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value='0'>&lt;None&gt;</option>"
            data.forEach((group)=>{
                results+=`<option value='${group.groupid}'>${group.groupname}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getrelationships(obj, option='all'){
    $.getJSON(
        "../controllers/settingsoperations.php",
        {
            getrelationships:true
        },
        (data)=>{

            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((relationship)=>{
                results+=`<option value='${relationship.relationshipid}'>${relationship.description}</option>`
            })
            obj.html(results)
        }
    ) 
}