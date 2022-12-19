function openPopupAddSpending(){
    document.getElementById("modalAdd").style.display="block" 
    setPopupCurency()
}

function closePopupAddSpending(){
    document.getElementById("modalAdd").style.display="none"
    clearInput()
    document.getElementById("errorMessage").setAttribute("style","display:none")
 }

function clearInput(){
    document.getElementById("nameAddSpending").value = ''
    document.getElementById("valueAddSpending").value = ''
}

function setPopupCurency(){
    document.getElementById("popupCurency").innerText = selectedCurrency
}
///////////////////////////////////////////////////////////////////////

function openPopupEditSpending(){
    document.getElementById("modalEdit").style.display="block" 
    setPopupCurencyEdit()
}

function closePopupEditSpending(){
    document.getElementById("modalEdit").style.display="none"
    document.getElementById("errorMessageEdit").setAttribute("style","display:none")
 }

 function setPopupCurencyEdit(){
    document.getElementById("popupCurencyEdit").innerText = selectedCurrency
}

function popupEditAtributes(name,category,value){
    document.getElementById("nameEditSpending").value = name
    document.getElementById("valueEditSpending").value = value
    document.getElementById("categoryEditSpending").value = category
}

//////////////////////////////////////////////
window.onmousedown = function(event) {
    if (event.target.className === "modal" ) {
        event.target.style.display = "none"
        clearInput()
        document.getElementById("errorMessage").setAttribute("style","display:none")
    }
    if(event.target.className === "modalEdit"){
        event.target.style.display = "none"
        document.getElementById("errorMessageEdit").setAttribute("style","display:none")
    }
}
//////////////////////////////////////////////

$(document).on('keydown', 'input[pattern]', function(e){
    var input = $(this);
    var oldVal = input.val();
    var regex = new RegExp(input.attr('pattern'), 'g');
  
    setTimeout(function(){
      var newVal = input.val();
      if(!regex.test(newVal)){
        input.val(oldVal); 
      }
    }, 1);
  });