// console.log("js file attached");

const showCard = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displaAllData(data.data.tools));
};

// function for displaying data in UI
const displaAllData = (allData) => {
  const container = document.getElementById("card-container");
  //   console.log(container);
  allData.slice(0, 6).forEach((element) => {
    const innerContainer = document.createElement("div");
    innerContainer.innerHTML = `
      <div class="card card-compact p-3 bg-base-100 h-full shadow relative">
                           <figure><img class='rounded-xl' src="${
                             element.image
                           }" alt="Shoes" /></figure>
           <div class="card-body mb-16">
                     <h2 class="card-title font-bold">Features</h2>
                     <ol class='list-decimal pl-5'>
                     <li>${
                       element.features[0] ? element.features[0] : "And more"
                     }</li>
                     <li>${
                       element.features[1] ? element.features[1] : "And more"
                     }</li>
                     <li>${
                       element.features[2] ? element.features[2] : "And more"
                     }</li>
                     </ol>
                    
             <div class=' absolute bottom-0 right-0 left-0 px-6 py-3'>        
                <div class="card-actions d-flex justify-between items-center border-t py-2">
                      <div>
                            <h1 class="text-xl font-bold">${element.name}</h1>
                             <p><i class="fa-solid fa-calendar-days"></i> ${
                               element.published_in
                             }</p>
                      </div>
                      <div>
                    
                     
                    <label onclick="cardDetail('${element.id}')" for="${
      element.id
    }" class="rounded-full text-red-500  bg-red-100 px-4 py-3 cursor-pointer"><i
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

// function for modal ----
const cardDetail = (id) => {
  const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => showCardDetail(data.data));
};

const showCardDetail = (modalData) => {
  const modalContainer = document.getElementById("modal-container");
  const innerContainer = document.createElement("div");
  innerContainer.innerHTML = `
  <input type="checkbox" id="${modalData.id}" class="modal-toggle" />
        <div class="modal ">

            <div class="modal-box w-11/12 max-w-5xl h-full lg:h-fit mx-h-full lg:max-h-fit  relative overflow-scroll lg:overflow-visible">
                <div class="modal-action absolute top-[-24px] lg:top-[-40px] right-0 lg:right-[-16px]">
                    <label for="${modalData.id}"
                        class="rounded-full text-white font-bold bg-red-500 px-4 py-3 cursor-pointer">✕</label>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div class="border-2 border-red-300 rounded-lg p-5 bg-red-50">
                        <p class="text-2xl font-bold">
                            ${modalData.description}
                        </p>
                        <div class="grid grid-cols-1 lg:grid-cols-3 justify-between text-center gap-3 my-8">
                            <div class="bg-white rounded-lg p-6 w-full text-red-500 font-bold text-lg">
                                <p>${modalData.pricing[0].plan}</p>
                                <p>${
                                  modalData.pricing[0].price
                                    ? modalData.pricing[0].price
                                    : "Free of cost"
                                }</p>
                            </div>
                            <div class="bg-white rounded-lg p-6 w-full text-red-500 font-bold text-lg">
                                <p>${modalData.pricing[1].plan}</p>
                                <p>${
                                  modalData.pricing[1].price
                                    ? modalData.pricing[1].price
                                    : "Free of cost"
                                }</p>
                            </div>
                            <div class="bg-white rounded-lg p-6 w-full text-red-500 font-bold text-lg">
                                <p>${modalData.pricing[2].plan}</p>
                                <p>${
                                  modalData.pricing[2].price
                                    ? modalData.pricing[2].price
                                    : "Free of cost"
                                }</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h1 class="text-2xl font-bold p-2">Features</h1>
                                <ul class="list-disc pl-5 ">
                                    <li>${modalData.features["1"].feature_name}
                                    </li>
                                    <li>${
                                      modalData.features["2"].feature_name
                                    }</li>
                                    <li>${
                                      modalData.features["3"].feature_name
                                    }</li>
                                   
                                    
                                </ul>
                            </div>
                            <div>
                                <h1 class="text-2xl font-bold p-2">integration</h1>
                                <ul class="list-disc pl-5 ">
                                    <li>${modalData.integrations[0]}</li>
                                    <li>${modalData.integrations[1]}</li>
                                    <li>${modalData.integrations[2]}</li>
                                   
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="p-5 border rounded-lg text-center order-first lg:order-last">
                    <div class="relative">
                    <p class="bg-red-500 rounded-lg w-fit text-white px-3 py-1 absolute top-2 right-2">${
                      modalData.accuracy.score * 100
                    }% accuraacy</p>
                    <img src="${
                      modalData.image_link[0]
                        ? modalData.image_link[0]
                        : modalData.image_link[1]
                    }" alt="">
                    </div>
                        <h1 class="text-xl font-bold py-3">${
                          modalData.input_output_examples[0].input
                            ? modalData.input_output_examples[0].input
                            : modalData.input_output_examples[1].input
                        }</h1>
                        <p>
                        ${
                          modalData.input_output_examples[0].output
                            ? modalData.input_output_examples[0].output
                            : modalData.input_output_examples[1].output
                        }
                        </p>
                    </div>
                </div>

            </div>
        </div>
 
 `;
  modalContainer.appendChild(innerContainer);
};
showCard();
