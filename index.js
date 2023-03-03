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
  <div class="modal-box w-11/12 max-w-5xl h-fit max-h-fit relative overflow-visible">
  <label for="my-modal-3"
      class="btn btn-sm btn-circle bg-red-500 border-0 hover:bg-red-400 absolute right-[-16px] top-[-16px]">✕</label>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div class="border-2 border-red-300 rounded-lg p-5 bg-red-50">
          <p class="text-2xl font-bold">
              ChatGPT is an AI-powered chatbot platform that uses OpenAI's GPT technology to simulate human
              conversation.
          </p>
          <div class="flex justify-between text-center gap-3 my-8">
              <div class="bg-white rounded-lg p-6 w-full text-red-500 font-bold text-lg">
                  <p>Basic</p>
                  <p>$10/month</p>
              </div>
              <div class="bg-white rounded-lg p-6 w-full text-red-500 font-bold text-lg">
                  <p>standard</p>
                  <p>$100/year</p>
              </div>
              <div class="bg-white rounded-lg p-6 w-full text-red-500 font-bold text-lg">
                  <p>pro</p>
                  <p>$300/lifetime</p>
              </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                  <h1 class="text-2xl font-bold p-2">Features</h1>
                  <ul class="list-disc pl-5 ">
                      <li>Customizable responses

                      </li>
                      <li> Multilingual support</li>
                      <li>Seamless integration</li>
                  </ul>
              </div>
              <div>
                  <h1 class="text-2xl font-bold p-2">integration</h1>
                  <ul class="list-disc pl-5 ">
                      <li>FB Messenger</li>
                      <li>Slack</li>
                      <li>Telegram</li>
                  </ul>
              </div>
          </div>
      </div>
      <div class="p-5 border rounded-lg text-center">
          <img src="Rectangle 15 (1).png" alt="">
          <h1 class="text-xl font-bold py-3">hello world,things been bad</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia architecto, tenetur
              natus
          </p>
      </div>
  </div>
</div>
  </div>
  
  
  `;
  modalContainer.appendChild(innerContainer);
};
showCard();
