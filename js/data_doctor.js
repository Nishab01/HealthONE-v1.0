let http = new XMLHttpRequest();
http.open('get', '../json/doctor.json', true);
http.send();

http.onload = function(){
     if(this.readyState == 4 && this.status == 200){
          let doctor = JSON.parse(this.responseText);

          let output = "";
          for(let i of doctor){
               output += `
                    <div class="doc">
                         <div class="list">
                              <button onclick="window.location.href='${i.profile}';">
                                   <div class="pic">
                                        <img src="${i.img}" alt="dp" height="90px" width="90px">
                                   </div>
                                   <div class="info">
                                        <label class="d_name">${i.name}</label>
                                        <label class="d_degree">${i.degree}</label>
                                        <label class="d_special">${i.speciality}</label>
                                        <label class="d_phone">${i.phone}</label>
                                        <label class="d_time">${i.time}</label>
                                   </div>
                              </button>
                         </div>       
                    </div>
               `;
          }
          document.querySelector("#doc-list").innerHTML = output;
     }
}