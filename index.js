// console.log("js file attached");

const showCard = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displaAllData(data.data.tools));
};

const displaAllData = (data) => {
  const container = document.getElementById("card-container");
  //   console.log(container);
  data.slice(0, 6).forEach((element) => {
    const innerContainer = document.createElement("div");
    innerContainer.innerHTML = `
      <div class="card card-compact p-3 bg-base-100 h-full shadow relative">
                           <figure><img class='rounded-xl' src="${element.image}" alt="Shoes" /></figure>
           <div class="card-body mb-16">
                     <h2 class="card-title font-bold">Features</h2>
                     <ol class='list-decimal'>
                     <li>${element.features[0]}</li>
                     <li>${element.features[1]}</li>
                     <li>${element.features[2]}</li>
                     </ol>
                    
             <div class=' absolute bottom-0 right-0 left-0 p-3'>        
                <div class="card-actions d-flex justify-between items-center border-t py-2">
                      <div>
                            <h1 class="text-xl font-bold">${element.name}</h1>
                             12/12/12
                      </div>
                      <div>
                      <label for="my-modal-3" onclick="cardDetail('${element.id}')" class="rounded-full text-red-500  bg-red-100 px-4 py-3 cursor-pointer"><i
                      class="fa-solid fa-arrow-right"></i></label>
                             
                      </div>
                </div>
            </div>
          </div>
       </div>
     
      `;

    container.appendChild(innerContainer);
  });
};

const cardDetail = (id) => {
  const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => showCardDetail(data));
};

const showCardDetail = () => {
  const modalContainer = document.getElementById("modal-container");
  const innerContainer = document.createElement("div");
  innerContainer.innerHTML = `
  <input type="checkbox" id="my-modal-3" class="modal-toggle" />
  <div class="modal">
      <div class="modal-box w-11/12 max-w-5xl relative overflow-visible">
          <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-[-16px] top-[-16px]">✕</label>
          <h3 class="text-lg font-bold">Congratulations random Internet user!</h3>
          <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia
              for free!</p>
      </div>
  </div>
  
  
  `;
  modalContainer.appendChild(innerContainer);
};
showCard();
