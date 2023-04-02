const loadAiData = () => {
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    fetch(url)
        .then((res) => res.json())
        .then((data) => diaplayAiData(data.data.tools));
};

const loadAiDetailsById = (id) => {
    if (id <= 9) {
        id = `0${id}`;
    }
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    console.log(url)
    fetch(url)
        .then((res) => res.json())
        .then((data) => showAiDetailsModal(data.data));
};

const diaplayAiData = (ais) => {
    const aiContainer = document.getElementById("ai__container");
    ais.forEach((ai) => {
        const aiDiv = document.createElement("div");
        aiDiv.classList.add("col");
        aiDiv.innerHTML = `
            <div class="card p-3 h-100">
                            <img style="height: 250px; border-radius: 15px" src="${ai.image}" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Features</h5>
                                <p id="ai__features" class="card-text">
                                    // TODO: Fix loop through Features
                                    ${ai.features[0]} </br>
                                    ${ai.features[1]}</br>
                                    ${ai.features[2]} </br>
                                    ${ai.features[3]}
                                </p>
                            </div>
                            <div class="card-footer d-flex justify-content-between align-items-center">
                                <div><h5 class="card-title ">${ai.name}</h5>
                                <div class="text-body-secondary"
                                    >
                                    🗓
                                    ${ai.published_in}</div
                                ></div>
                                <div onclick="loadAiDetailsById(${ai.id})" data-bs-toggle="modal" data-bs-target="#aiDetails" style="color: blue; font-size: 46px; cursor: pointer;"> ➡</div>
                            </div>
            </div>
                        
                        
        `;
        aiContainer.appendChild(aiDiv);
    });
};

// Show AI Details
const showAiDetailsModal = (details) => {
    console.log(details);
    const detailsContainer = document.getElementById("modal__content");
    detailsContainer.innerHTML = "";
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("d-flex");
    cardContainer.innerHTML = `
        <div style="background-color: #fef7f7" class="card p-3 me-4">
            <h5 class="card-title">
                    ${details.description}
            </h5>
            <div class="d-flex" >
                <div style="background-color: white" class="p-3 fw-bold m-1"> ${details?.pricing[0]?.price} ${details?.pricing[0]?.plan}</div>
                <div style="background-color: white" class="p-3 fw-bold m-1"> ${details?.pricing[1]?.price} ${details?.pricing[1]?.plan}</div>
                <div style="background-color: white" class="p-3 fw-bold m-1"> ${details?.pricing[2]?.price} ${details?.pricing[2]?.plan}</div>
            </div>
        </div>

        <div class="card p-3">
            <img
                src="${details.image_link[0]}"
                class="card-img-top"
                alt="..."
            />
            <div class="card-body text-center">
                <h5 class="card-title">
                    ${details.tool_name}
                </h5>
                <p class="card-text">
                    ${details.description}
                </p>
            </div>
        </div>
        
    `;
    detailsContainer.appendChild(cardContainer);
};
const loadFeatures = (features) => {
    features.forEach((feature) => {
        console.log(feature);
        const featuresContainer = document.getElementById("ai__features");
        const singleAiFeatures = document.createElement("ol");
        singleAiFeatures.innerHTML = `
            <li>
                ${feature}
            </li>
        `;
        featuresContainer?.appendChild(singleAiFeatures);
    });
};

loadAiData();
