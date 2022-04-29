let http = new XMLHttpRequest();
http.open('get', '../json/medicine.json', true);
http.send();

http.onload = function(){
     if(this.readyState == 4 && this.status == 200){
          let medicine = JSON.parse(this.responseText);

          let output = "";
          for(let i of medicine){
               output += `
                    <div class="med">
                         <div class="list">
                              <button onclick="window.location.href='${i.profile}';">
                                   <div class="pic">
                                        <img src="${i.img}" alt="dp" height="90px" width="90px">
                                   </div>
                                   <div class="info">
                                        <label class="m_name">${i.name}</label>
                                        <label class="m_info1">${i.info1}</label>
                                        <label class="m_info2">${i.info2}</label>
                                        <label class="m_indication">${i.indication}</label>
                                        <label class="m_dosage">${i.Dosage}</label>
                                   </div>
                              </button>
                         </div>       
                    </div>
               `;
          }
          document.querySelector("#med-list").innerHTML = output;
     }
}