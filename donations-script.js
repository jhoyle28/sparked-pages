document.addEventListener("DOMContentLoaded", () => { // Waits for the content to load
    let amt = parseFloat(localStorage.getItem("donationAmt")) || 0; // Gets the amount from localStorage (which saves data)
    let clickStrength = parseFloat(localStorage.getItem("clickStrength")) || 1;
    let cps = parseFloat(localStorage.getItem("cps")) || 0;
    let cpsFreq = parseFloat(localStorage.getItem("cpsFreq")) || 1000;
    document.getElementById("amount-display").textContent = `You have donated $${amt.toFixed(1)}0!`;
    document.getElementById("stats-panel").textContent = `$PS: $${cps.toFixed(1)}  Click Strength: $${clickStrength.toFixed(1)}`
    function donate() {
        amt += clickStrength;
        console.log(`Donated: $${amt}`)
        document.getElementById("amount-display").textContent = `You have donated $${amt.toFixed(1)}0!`;
        localStorage.setItem("donationAmt", amt); // Saves the data
    }
    document.getElementById("donate-button").addEventListener("click", donate); // Calls the function donate() when clicking
    setTimeout(cpsLoop, 1000); // Setting timeout fixes exploit where you can hold (Command + R)
    function cpsLoop() {
        amt += cps;
        console.log(`Donated: $${amt}`)
        document.getElementById("amount-display").textContent = `You have donated $${amt.toFixed(1)}0!`;
        localStorage.setItem("donationAmt", amt);
        setTimeout(cpsLoop, cpsFreq);
    }
    // SHOP System using dynamic DOM creation
    const shopItemsContainer = document.getElementById("shop-items-container");

    const shopItems = [
        {
            name: "Tung Tung Tung Sahur",
            description: "Slams the donate button very slowly (+0.2 $ps)",
            price: 50,
            function: "cps0.2"
        },
        {
            name: "Crappy Linewize Macbook",
            description: "Years of screen recording took this to the recycling bin (+0.2 Click Strength)",
            price: 300,
            function: "cs0.2"
        },
        {
            name: "Autoclicker",
            description: "You are now the most hated person on the planet (+1.2 $ps)",
            price: 250,
            function: "cps1.2"
        },
        {
            name: "Sparked Cheatbot",
            description: "You can now set the webpage to game-final.html (+2 Click Strength)",
            price: 2500,
            function: "cs2"
        },
        {
            name: "TikTok Autoscroller",
            description: "Gen alpha simulator (+20.5 $ps)",
            price: 3000,
            function: "cps20.5"
        },
        {
            name: "Drag Click Mouse",
            description: "Undergone 5 years of minecraft 'god bridging' (+20 Click Strength)",
            price: 10000,
            function: "cs20"
        },
        {
            name: "Mum's credit card",
            description: "Capable of mass destruction. (+500 $ps)",
            price: 100000,
            function: "cps500"
        },
        {
            name: "High interest bank account",
            description: "Cps is done 10ms more often",
            price: 1000,
            function: "freq"
        }
    ];


    /* Took a lot of staring at my screen to figure this out.
    Basically, it creates a couple divs for a shop item, getting the values from the list-object thingy above (shopItems)*/
    let shopIndex = 0;
    const itemsPerPage = 4;

    function refreshShop() {
        shopItemsContainer.innerHTML = ""; // Clear previous items

        const start = shopIndex * itemsPerPage;
        const end = start + itemsPerPage;

        // Show items for current page
        shopItems.slice(start, end).forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("shop-item");
            itemDiv.classList.add("slightly-translucent-on-hover");

            Object.keys(item).forEach(key => {
                const el = document.createElement("p");
                if (key !== "price" && key !== "function") {
                    el.textContent = item[key];
                    el.classList.add(`shop-item-${key}`);
                } else if (key === "price") {
                    el.textContent = `$${item[key]}`;
                    el.classList.add(`shop-item-${key}`);
                }
                itemDiv.appendChild(el);
            });

            if (item.function.slice(0, 3) === "cps") {
                itemDiv.onclick = () => {
                    purchaseUpgrade("cps", Number(item.function.slice(3)), item.price); // slice(3) for "cps1"
                };
            } else if (item.function.slice(0, 2) === "cs") {
                itemDiv.onclick = () => {
                    purchaseUpgrade("cs", Number(item.function.slice(2)), item.price); // slice(2) for "cs1"
                };
            } else if (item.function.slice(0, 3) === "freq") {
                itemDiv.onclick = () => {
                    purchaseUpgrade("freq", null, item.price)
                }
            } else {
                console.error("Function Object Error")
            }

            shopItemsContainer.appendChild(itemDiv);
        });

        // Scroll Up button (if not on first page)
        if (shopIndex > 0) {
            const upButton = document.createElement("p");
            upButton.classList.add("scroll-button");
            upButton.classList.add("slightly-translucent-on-hover")
            upButton.textContent = "↑";
            upButton.addEventListener("click", scrollUpward);
            shopItemsContainer.appendChild(upButton);
        }

        // Scroll Down button (if more pages ahead)
        if (end < shopItems.length) {
            const downButton = document.createElement("p");
            downButton.classList.add("scroll-button");
            downButton.classList.add("slightly-translucent-on-hover")
            downButton.textContent = "↓";
            downButton.addEventListener("click", scrollDownward);
            shopItemsContainer.appendChild(downButton);
        }
    }

    function purchaseUpgrade(type, amount, price) {
        if (amt >= price) {
            console.log(`Amount: ${amount}`)
            if (type === "cps") {
                cps += amount;
                console.log("CPS:", cps);
                localStorage.setItem("cps", cps);
                document.getElementById("stats-panel").textContent = `$PS: $${Math.round(cps * 10) / 10}  Click Strength: $${Math.round(clickStrength * 10) / 10}`
            } else if (type === "cs") {
                clickStrength += amount;
                console.log("Click Strength:", clickStrength);
                localStorage.setItem("clickStrength", clickStrength);
                document.getElementById("stats-panel").textContent = `$PS: $${Math.round(cps * 10) / 10}  Click Strength: $${Math.round(clickStrength * 10) / 10}`
            } else if (type === "freq") {
                if (cpsFreq > 10) {
                    cpsFreq -= 10;
                    console.log("CPS Frequency:", cpsFreq);
                    localStorage.setItem("cpsFreq", cpsFreq);
                } else {
                    console.error("You are too rich");
                }
            }
            amt -= price;
            console.log(`Donated: $${amt}`)
            document.getElementById("amount-display").textContent = `You have donated $${amt.toFixed(1)}0!`;
            localStorage.setItem("donationAmt", amt);
        }
    }

    function scrollDownward() {
        shopIndex++;
        refreshShop();
    }

    function scrollUpward() {
        if (shopIndex > 0) {
            shopIndex--;
            refreshShop();
        }
    }
    function resetProg() {
        localStorage.setItem("clickStrength", 1);
        localStorage.setItem("cps", 0);
        localStorage.setItem("cpsFreq", 1000);
        localStorage.setItem("donationAmt", 0);
        window.location.reload;
    }

    // Initial call
    refreshShop();
    document.addEventListener("keydown", function(event) {
        console.log(`Pressed: ${event.key}`);
        if (event.key == " ") {
            donate()
        }
    });
});
