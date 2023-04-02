const loadAiData = () => {
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    fetch(url)
        .then((res) => res.json())
        .then((data) => diaplayAiData(data.data.tools));
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
                                <div style="color: blue; font-size: 46px; cursor: pointer;"> ➡</div>
                            </div>
            </div>
                        
                        
        `;
        aiContainer.appendChild(aiDiv);
    });
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
